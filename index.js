import books from "/books.js";
let currentIndex = 0;
let totalWords = 0;
let testBody = document.getElementById("testing-body");
startTest();

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
}
function startTest() {
  let currentBook = books[Math.floor(Math.random() * 6)];
  testBody.innerHTML = [...currentBook]
    .toSpliced(0, 1, `<span class='current'>${currentBook[0]}</span>`)
    .join("");

  document.addEventListener("keydown", (e) => {
    let pressedKey = keyProcessor(e);
    document.getElementById(pressedKey).classList.add("pressed");
    e.key !== "Shift" && nextLetter(e.key);
  });

  document.addEventListener("keyup", (e) => {
    let pressedKey = keyProcessor(e);
    setTimeout(
      () => document.getElementById(pressedKey).classList.remove("pressed"),
      100
    );
  });
}

function endTest() {
  document.removeEventListener;
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
