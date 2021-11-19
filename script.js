import waveClass from "./wave.js";

let gameField = document.querySelector(".raindrop");
const operations = ["*", "/", "+", "-"];
const startGameBlock = document.querySelector(".start-game");

let resultInput = document.querySelector(".result-input");
let count = document.querySelector(".count-number");
let gameOverCount = document.querySelector(".game-count-number");

const gameOver = document.querySelector(".game-over");
let result;
let bonusCount = 0;
const seaSound = document.querySelector(".sea-sound");
let audioMusic = document.querySelector(".audio-music");

let rightAnswer = 0;
let isLoseGame;
let waveSize = 200;
let errors = 0;

// seaSound.play();

const { width } = gameField.getBoundingClientRect();

gameOver.style.display = "none";

function createNewRaindrop(x = 40) {
  let raindrop = document.createElement("div");
  raindrop.style.animationDuration = "15s";
  let { firstNumber, operation, secondNumber } = generateEquationNumbers();

  switch (operation) {
    case "+":
      result = +firstNumber + +secondNumber;
      break;
    case "-":
      firstNumber = firstNumber + secondNumber;
      result = firstNumber - secondNumber;
      break;
    case "*":
      result = firstNumber * secondNumber;
      break;
    case "/":
      firstNumber = firstNumber * secondNumber;
      result = firstNumber / secondNumber;
      break;
  }
  raindrop.classList.add("circle");
  raindrop.style.width = `60px`;
  raindrop.style.height = `60px`;
  raindrop.style.left = `${x}px`;

  gameField.append(raindrop);
  raindrop.append(firstNumber);
  raindrop.append(operation);
	raindrop.append(secondNumber);

  // window.setTimeout(function () {
  //   gameField.removeChild(raindrop);
	// }, 3500);
 
	return raindrop;
}

window.setInterval(function () {
  createNewRaindrop(getRandomPosition(0, width - 50));
}, 3000);

function generateEquationNumbers() {
  let firstNumber = getRandomPosition(1, 10);
  let operation = operations[Math.floor(Math.random() * operations.length)];
  let secondNumber = getRandomPosition(1, 10);
  return {
    firstNumber,
    operation,
    secondNumber,
  };
}

function getRandomPosition(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

resultInput.addEventListener("change", () => {
  let rain = document.querySelector('.circle');
 
  if (resultInput.value == result) {
    bonusCount += 1;
    resultInput.value = "";
		count.textContent = +count.textContent + 10 + bonusCount;
		// 
    // rightAnswer += 1;
    // gameSpeed(rightAnswer);
    audioPlay("right");
    gameField.removeChild(rain);
	}
	

  resultInput.value = "";
});

function raindropLife() {
  let raindrop = document.querySelector('.circle');
  let raindropSize = parseInt(window.getComputedStyle(raindrop).getPropertyValue('top'));
  let windowMaxHeight = window.screen.availHeight - (window.outerHeight - window.innerHeight) - waveSize;
  console.log(windowMaxHeight)
  console.log(raindropSize)
  console.log(raindrop)
  	if (raindropSize >= windowMaxHeight) {
  		errors += 1;
  		resultInput.value = '';
  		// waveClass.waveGrow();
      count.textContent = +count.textContent - 7 + bonusCount;
      gameField.removeChild(raindrop);
  }
}
setInterval(raindropLife, 1000);
 


// function raindropLife() {
// 	let raindropSize = parseInt(window.getComputedStyle(raindrop).getPropertyValue('top'));
// 	let windowMaxHeight = window.screen.availHeight - (window.outerHeight - window.innerHeight) - waveSize;
// 	if (raindropSize >= windowMaxHeight) {
// 		errors += 1;
// 		resultInput.value = '';
// 		waveClass.waveGrow();
// 		count.textContent = +count.textContent - 7 + bonusCount;

// 		createNewRaindrop(getRandomPosition(0, width - 50));
// 		audioPlay('error');
// 		if (errors == 3) {
// 			startGame(count.textContent, isLoseGame = true)
// 			waveClass.waveReset();
// 			audioPlay('lose')
// 		}
// 	}
// }

// document.addEventListener('click', (e) => {
// 	const target = e.target;
// 	if (target.classList.contains('start-game-btn')) {
// 		startGame()
// 	}
// })

// function startGame(loseGameCount, isLoseGame = false) {
// 	if (isLoseGame) {
// 		gameOver.style.display = "flex";
// 		startGameBlock.style.display = "none";
// 		errors = 0;
// 		// circle.style.display = 'none';
// 		raindrop.remove()
// 		gameOverCount.textContent = loseGameCount;

// 	} else {
// 		count.textContent = 0;
// 		startGameBlock.style.display = "none";
// 		gameOver.style.display = "none";
// 		while (raindrop.firstChild) {
// 			raindrop.removeChild(raindrop.firstChild);
// 		}

// 		raindrop.style.display = 'block';
// 		// startGameBlock.removeChild(startGameBlock.firstChild);

// 		createNewRaindrop(getRandomPosition(0, width - 50));

// 		setInterval(raindropLife, 1000);
// 	}
// }

// function gameSpeed(rightAnswer) {
// 	switch (rightAnswer) {
// 		case 4:
// 			raindrop.style.animationDuration = '4s';
// 			break;
// 		case 7:
// 			raindrop.style.animationDuration = '3s';
// 			break;
// 		case 11:
// 			raindrop.style.animationDuration = '2s';
// 			break;
// 		case 15:
// 			raindrop.style.animationDuration = '1s';
// 			break;
// 	}
// }

function audioPlay(loseGame) {
  console.log(loseGame);
  if (loseGame === "lose") {
    audioMusic.src = "audio/lose.mp3";
  } else if (loseGame === "error") {
    audioMusic.src = "audio/error.mp3";
  } else {
    audioMusic.src = "audio/right.mp3";
  }

  audioMusic.play();
}
