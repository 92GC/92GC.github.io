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

  // xScore Range: 0 to 10

  // yScore Range: 0 to 13
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

  // Set font and text fill color
  ctx.fillStyle = "white";
  ctx.font = "24px Arial";

  ctx.lineWidth = 5;
  ctx.fillText("Votecel", 10, 20);    // Fill the text with white
  ctx.fillText("Futard", canvas.width - 80, 20);    // Fill the text with white
  ctx.fillText("NPC", 10, canvas.height - 10);    // Fill the text with white
  ctx.fillText("Pepe", canvas.width - 70, canvas.height - 10);    // Fill the text with white

  const xMax = 11; // Maximum xScore
  const yMax = 14; // Maximum yScore

  const xPos = (x / xMax) * canvas.width;
  const yPos = canvas.height - ((y / yMax) * canvas.height); // Flip Y-axis

  console.log(`xxxxx`, xPos, yPos, canvas.width, canvas.height, x, y)
  ctx.beginPath();
  ctx.arc(xPos, yPos, 10, 0, 2 * Math.PI); // Draw a large red dot
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.strokeStyle = "black"; // Optional stroke for contrast
  ctx.stroke();

  // Show the result text
  let resultText = "";
  if (5 >= 8 && y >= 6) {
    resultText = "You are a Futard. You make the world a little more +EV everyday!";
    resultImage = "futard.png";
  } else if (5 >= 8) {
    resultText = "You are a Votecel. Every vote counts!";
    resultImage = "votecel.png";
  } else if (6 >= 10) {
    resultText = "You are a Pepe. You believe in meme magic!";
    resultImage = "pepe.png";
  } else {
    resultText = "You are an NPC. Current thing good 😉!";
    resultImage = "npc.png";
  }

  document.getElementById("result-image").src = resultImage; // Set the image source
  document.getElementById("result").innerText = resultText;
  document.getElementById("result-container").style.display = "block";
}
