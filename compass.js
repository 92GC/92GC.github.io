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

  // Hide all the question elements
  const questionElements = document.querySelectorAll(".question");
  questionElements.forEach(function (question) {
    question.style.display = "none";
  });
  document.getElementById('result-container').style.display = 'block';
  document.getElementById('compass-container').style.display = 'block';
  // Display the result based on the final x and y scores
  showResult(xScore, yScore);
}

function showResult(x, y) {
  const canvas = document.getElementById("compass");
  const ctx = canvas.getContext("2d");

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw grid lines dividing the compass into four quadrants
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;

  // Horizontal and Vertical middle lines
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.stroke();

  // Draw labels
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText("Votecel", 10, 20); // Top-left
  ctx.fillText("Futard", canvas.width - 60, 20); // Top-right
  ctx.fillText("NPC", 10, canvas.height - 10); // Bottom-left
  ctx.fillText("Pepe", canvas.width - 50, canvas.height - 10); // Bottom-right

  // Plot the user's result as a big red dot
  const xPos = (x / 6) * canvas.width;
  const yPos = canvas.height - (y / 6) * canvas.height; // Flip Y-axis

  ctx.beginPath();
  ctx.arc(xPos, yPos, 10, 0, 2 * Math.PI); // Draw a large red dot
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.strokeStyle = "black"; // Optional stroke for contrast
  ctx.stroke();

  // Show the result text
  let resultText = "";
  if (x >= 6 && y >= 6) {
    resultText = "You are a Futard. You make the world a little more +EV everyday!";
    resultImage = "futard.png";
  } else if (x >= 6) {
    resultText = "You are a Votecel. May you live in interesting times!";
    resultImage = "votecel.png";
  } else if (y >= 6) {
    resultText = "You are a Pepe. You like disrupting but lack guidance!";
    resultImage = "pepe.png";
  } else {
    resultText = "You are an NPC. Current thing good 😉!";
    resultImage = "npc.png";
  }

  document.getElementById("result-image").src = resultImage; // Set the image source
  document.getElementById("result").innerText = resultText;
  document.getElementById("result-container").style.display = "block";
}
