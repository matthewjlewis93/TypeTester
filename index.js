import books from "/books.js";

let currentIndex = 0;
let totalWords = 0;
let testState = "start";
let testBody = document.getElementById("testing-body");

document.addEventListener("keydown",(event) => keydownEventHandler(event));

resetTest()

document.addEventListener("keyup", (e) => {
  let pressedKey = keyProcessor(e);
  setTimeout(
    () => document.getElementById(pressedKey).classList.remove("pressed"),
    100
  );
});

function keydownEventHandler(keypressEvent) {
  let pressedKey = keyProcessor(keypressEvent);
  console.log(testState)
  switch (testState) {
    case "start":
      document.getElementById(pressedKey).classList.add("pressed");
      keypressEvent.key !== "Shift" && nextLetter(keypressEvent.key);
      break;
    case "end":
      keypressEvent.key === "Enter" && resetTest();
      break;
    case "reset":
      document.getElementById(pressedKey).classList.add("pressed");
      keypressEvent.key !== "Shift" && nextLetter(keypressEvent.key) && startTest();
      break;
  }
}

function nextLetter(key) {
  if (testBody.innerText[currentIndex] === " ") {
    testBody.innerText = testBody.innerText.substring(currentIndex + 1);
    currentIndex = 0;
    totalWords += 1;
    document.getElementById("score").innerText = totalWords;
    testBody.innerHTML = [...testBody.innerText]
      .toSpliced(0, 1, `<span class='current'>${testBody.innerText[0]}</span>`)
      .join("");
    return;
  }

  if (currentIndex === 0) {
    testBody.innerHTML = testBody.innerHTML.replace(
      `<span class="current">${testBody.innerText[0]}</span>${testBody.innerText[1]}`,
      `<span class=${
        key === testBody.innerText[currentIndex] ? "correct" : "incorrect"
      }>${testBody.innerText[currentIndex]}</span><span class="current">${
        testBody.innerText[1]
      }</span>`,
      1
    );
  } else {
    testBody.innerHTML = testBody.innerHTML.replace(
      '<span class="current">' +
        testBody.innerText[currentIndex] +
        "</span>" +
        testBody.innerText[currentIndex + 1],
      `<span class=${
        key === testBody.innerText[currentIndex] ? "correct" : "incorrect"
      }>${testBody.innerText[currentIndex]}</span><span class="current">${
        testBody.innerText[currentIndex + 1]
      }</span>`,
      1
    );
  }
  currentIndex += 1;
  return true;
}
function startTest() {
  testState = "start";
  document.getElementById("timer").classList.add("active");
  setTimeout(() => {
    endTest();
  }, 1000 * 60);
}

function resetTest() {
  testState = "reset";
  totalWords = 0;
  document.getElementById('score').innerText = 0;
  let currentBook = books[Math.floor(Math.random() * 10) + 1];
  testBody.innerHTML = [...currentBook]
    .toSpliced(0, 1, `<span class='current'>${currentBook[0]}</span>`)
    .join("");
  document.getElementById("timer").classList.remove("active");
}

function endTest() {
  testState = "end";
  document.getElementById("score").innerText =
    "Final WPM: " + totalWords + " \nPress enter to restart";
}

function keyProcessor(event) {
  switch (event.key) {
    case " ":
      return "SPACE";
    case '"':
      return "quote";
    case "Shift":
      return event.code;
    case "Tab":
      return;
    default:
      return event.key.toUpperCase();
  }
}
