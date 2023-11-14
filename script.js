document.addEventListener("DOMContentLoaded", function () {
  let word = document.querySelector(".word"),
    text = document.querySelector(".text"),
    scoreEl = document.querySelector(".score"),
    timeEl = document.querySelector(".time"),
    endGameEl = document.querySelector(".end-game"),
    settings = document.querySelector(".settings"),
    settingForm = document.querySelector(".settings-form"),
    difficultyEl = document.querySelector(".difficulty"),
    words = [
      "apple",
      "banana",
      "hello",
      "mazda",
      "orange",
      "world",
      "cow",
      "mango",
      "congrats",
      "english",
      "range rover",
      "chris evans",
      "iron man",
      "captain america",
      "javascript",
      "python",
      "carrot",
    ],
    randomWord,
    score = 0,
    time = 10,
    difficulty =
      localStorage.getItem("dif") !== null
        ? localStorage.getItem("dif")
        : "medium",
    intervalTimer;

  // Function to get a random word
  const getRandom = () => {
    return words[Math.floor(Math.random() * words.length)];
  };

  // Function to add a new word and update score and timer
  const addWord = () => {
    randomWord = getRandom();
    word.innerHTML = randomWord;
  };

  // Interval timer for the countdown
  intervalTimer = setInterval(() => {
    time--;
    timeEl.innerHTML = time + "s";
    if (time === 0) {
      clearInterval(intervalTimer);
      showModal("Time Out", `Your score is ${score}`);
    }
  }, 1000);

  // Initial setup
  addWord();
  text.focus();

  // Event listener for user input
  text.addEventListener("input", (e) => {
    let insertedText = e.target.value;
    if (insertedText == randomWord) {
      addWord();

      score++;
      scoreEl.innerHTML = score;

      e.target.value = "";

      if (difficulty == "hard") time += 2;
      if (difficulty == "medium") time += 3;
      if (difficulty == "easy") time += 5;

      timeEl.innerHTML = time + "s";

      // Clear the interval if the player wins
      if (time > 0) {
        clearInterval(intervalTimer);
        intervalTimer = setInterval(() => {
          time--;
          timeEl.innerHTML = time + "s";
          if (time === 0) {
            clearInterval(intervalTimer);
            showModal("Time Out", `Your score is ${score}`);
          }
        }, 1000);
      }
    }
  });

  // Event listener for difficulty change
  settingForm.addEventListener("change", (e) => {
    difficulty = e.target.value;
    localStorage.setItem("dif", difficulty);
  });

  // Function to show a modal
  const showModal = (title, content) => {
    alert(`${title}\n${content}`);
    // You can replace the alert above with your own modal implementation
  };
});
