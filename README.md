# If changing questions, note:
x and y max are not dynamically set 

change here

  // Show the result text
  let resultText = "";
  if (x >= 5.5 && y >= 7) {
    resultText = "You are a Futard. You make the world a little more +EV everyday!";
    resultImage = "futard.png";
  } else if (x >= 5.5) {
    resultText = "You are a Votecel. Every vote counts!";
    resultImage = "votecel.png";
  } else if (y >= 7) {
    resultText = "You are a Pepe. You believe in meme magic!";
    resultImage = "pepe.png";
  } else {
    resultText = "You are an NPC. Current thing good 😉!";
    resultImage = "npc.png";
  }
  
and

here 

  const xMax = 11; // Maximum xScore
  const yMax = 14; // Maximum yScore