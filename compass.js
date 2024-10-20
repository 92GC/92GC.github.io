function calculateCompass() {
  let xScore = 0; // Engagement Axis (X)
  let yScore = 0; // Belief Axis (Y)

  // Questions contributing to X (Engagement)
  const engagementQuestions = [1, 3, 5, 8]; // Odd numbered questions plus Q8
  const beliefQuestions = [2, 4, 6, 7, 8];  // Even numbered questions plus Q8

  // Loop over all the questions and get the selected answer values
  for (let i = 1; i <= 8; i++) {
    const answer = document.querySelector(`input[name="q${i}"]:checked`);
    if (answer) {
      const value = parseInt(answer.value);

      if (engagementQuestions.includes(i)) {
        if (i === 8) {
          // Special handling for question 8
          if (value === 1) { xScore += 1; } // Jim Simons (Engagement)
          if (value === 3) { xScore += 1; yScore += 1; } // George Soros (Both)
        } else {
          xScore += value;
        }
      }

      if (beliefQuestions.includes(i)) {
        if (i === 8) {
          // Special handling for question 8
          if (value === 2) { yScore += 1; } // Roaring Kitty (Belief)
          if (value === 3) { xScore += 1; yScore += 1; } // George Soros (Both)
        } else {
          yScore += value;
        }
      }
    }
  }

  // Hide form on submit
  document.getElementById("futarchy-test").style.display = "none";

  // Display the result based on the final x and y scores
  showResult(xScore, yScore);
}

function showResult(x, y) {
  let resultText = "";
  let resultImage = "";

  // Determine result and corresponding image
  if (x >= 6 && y >= 6) {
    resultText = "You are a Proph3t. You make the world a little more +EV everyday!";
    resultImage = "futard.png";
  } else if (x >= 6 && y <= 5) {
    resultText = "You are a Votecel. May you live in interesting times!";
    resultImage = "votecel.png";
  } else if (x <= 5 && y >= 6) {
    resultText = "You are a Pepe. You like disrupting but lack guidance!";
    resultImage = "pepe.png";
  } else {
    resultText = "You are an NPC. Current thing good 😉!";
    resultImage = "npc.png";
  }

  // Show result text and image
  document.getElementById("result").innerText = resultText;
  document.getElementById("result-image").src = resultImage;

  // Show the result container
  document.getElementById("result-container").style.display = 'block';
}
