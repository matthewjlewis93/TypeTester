document.addEventListener("keydown", (e) => {
  pressedKey = e.key;
  if (e.key === " ") {
    pressedKey = "space";
  }
  document.getElementById(pressedKey.toUpperCase()).classList.add("pressed");
});
document.addEventListener("keyup", (e) => {
  pressedKey = e.key;
  if (e.key === " ") {
    pressedKey = "space";
  }
  document.getElementById(pressedKey.toUpperCase()).classList.remove("pressed");
});
