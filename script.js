let
  word = document.querySelector(".word"),
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

  difficulty = localStorage.getItem('dif') !== null ?
    localStorage.getItem('dif') : 'medium',

  intervalTimer = setInterval(_ =>
  {
    time--;
    timeEl.innerHTML = time + 's';
    if(time === 0)
    {
      clearInterval(intervalTimer);
      $('body').modal({
        title: 'Time Out ',
        class: 'mini',
        closeIcon: true,
        content: `You're score is ${score}`,
        actions: [{
          text: 'Reload',
          class: 'blue',
          click: function() {location.reload();},
        }]
      }).modal('show');
    }
  }, 1000),

  getRandom = _ =>
  {
    return words[Math.floor(Math.random() * words.length)];
  },

  addWord = _ =>
  {
    randomWord = getRandom();
    word.innerHTML = randomWord;
  };

$('.ui.dropdown').dropdown();
difficultyEl.value = localStorage.getItem('dif') !== null ?
  localStorage.getItem('dif') : 'medium',
  text.focus();
addWord();

text.addEventListener("input", e =>
{
  let insertedText = e.target.value;
  if(insertedText == randomWord)
  {
    addWord();

    score++;
    scoreEl.innerHTML = score;

    e.target.value = "";

    if(difficulty == 'hard')
      time += 2;
    if(difficulty == 'medium')
      time += 3;
    if(difficulty == 'easy')
      time += 5;

    timeEl.innerHTML = time + 's';
  }
});
settingForm.addEventListener('change', (e) =>
{
  difficulty = e.target.value;
  localStorage.setItem('dif', difficulty);
});