function calculateCompass() {
  let xScore = 0; // Engagement Axis (X)
  let yScore = 0; // Belief Axis (Y)

  // Questions contributing to X (Engagement)
  const engagementQuestions = [1, 3]; // Odd numbered questions
  const beliefQuestions = [2, 4];     // Even numbered questions

  // Loop over all the questions and get the selected answer values
  for (let i = 1; i <= 4; i++) {
    const answer = document.querySelector(`input[name="q${i}"]:checked`);
    const value = parseInt(answer.value);

    if (engagementQuestions.includes(i)) {
      xScore += value;
    } else if (beliefQuestions.includes(i)) {
      yScore += value;
    }
  }

  // Display the result based on the final x and y scores
  showResult(xScore, yScore);
}

function showResult(x, y) {
  let resultText = "";
  let resultImage = "";

  // Determine result and corresponding image
  if (x >= 6 && y >= 6) {
    resultText = "You are a Proph3t (High Futarchy & High Participation)!";
    resultImage = "proph3t.png";
  } else if (x >= 6 && y <= 5) {
    resultText = "You are a Votecel (High Participation, Low Futarchy)!";
    resultImage = "votecel.png";
  } else if (x <= 5 && y >= 6) {
    resultText = "You are Pepe (Low Participation, High Futarchy)!";
    resultImage = "pepe.png";
  } else {
    resultText = "You are an NPC (Low Participation & Low Futarchy)!";
    resultImage = "npc.png";
  }

  // Show result text and image
  document.getElementById("result").innerText = resultText;
  document.getElementById("result-image").src = resultImage;

  // Show the result container
  document.getElementById("result-container").style.display = 'block';
}
