import books from "/books.js";
let currentBook = books[Math.floor(Math.random() * 6)];
let currentIndex = 0;
let testBody = document.getElementById("testing-body");
testBody.innerHTML = [...currentBook]
  .toSpliced(0, 1, `<span class='current'>${currentBook[0]}</span>`)
  .join("");

document.addEventListener("keydown", (e) => {
  let pressedKey = e.key;
  if (e.key === " ") {
    pressedKey = "space";
  }
  document.getElementById(pressedKey.toUpperCase()).classList.add("pressed");
  e.key !== "Shift" && nextLetter(e.key);
  setTimeout(
    () =>
      document
        .getElementById(pressedKey.toUpperCase())
        .classList.remove("pressed"),
    250
  );
});

function nextLetter(key) {
  if (testBody.innerText[currentIndex] === " ") {
    testBody.innerText = testBody.innerText.substring(currentIndex + 1);
    currentIndex = 0;
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
