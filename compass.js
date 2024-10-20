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

  // Plot the result on the compass
  plotOnCompass(x, y);
}

function plotOnCompass(x, y) {
  const canvas = document.getElementById('compassCanvas');
  const ctx = canvas.getContext('2d');

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the compass grid
  drawCompassGrid(ctx);

  // Calculate the position on the compass
  const xPos = 200 + (x - 6) * 33;  // Adjust to map X score to canvas
  const yPos = 200 - (y - 6) * 33;  // Adjust to map Y score to canvas

  // Draw the user's position
  ctx.beginPath();
  ctx.arc(xPos, yPos, 10, 0, Math.PI * 2, true); // Draw circle at the calculated position
  ctx.fillStyle = "red";
  ctx.fill();
}

function drawCompassGrid(ctx) {
  // Draw horizontal and vertical axes
  ctx.beginPath();
  ctx.moveTo(200, 0);
  ctx.lineTo(200,
  400);
  ctx.moveTo(0, 200);
  ctx.lineTo(400, 200);
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Draw grid lines for visual reference
  ctx.strokeStyle = "#888";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 400; i += 33) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 400);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(400, i);
    ctx.stroke();
  }

  // Label the quadrants
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText("High Futarchy", 250, 30);
  ctx.fillText("Low Futarchy", 250, 370);
  ctx.fillText("High Participation", 10, 30);
  ctx.fillText("Low Participation", 10, 370);
}
