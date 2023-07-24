const circles = document.querySelectorAll(".circle");
const buttonNames = []; // Array to store button names

circles.forEach((circle, index) => {
  let isMouseDown = false;

  // Function to display the name input box
  function showNameInput() {
    const name = prompt("Enter a name for the button:");
    if (name) {
      circle.innerHTML = name;
      resizeFont(circle);
      buttonNames[index] = name; // Save the name to the array
      saveButtonNames(); // Save all button names to the cache
    }
  }

  // Function to resize the font based on the button size
  function resizeFont(button) {
    const buttonSize = button.offsetWidth;
    const fontSize = buttonSize * 0.15;
    button.style.fontSize = `${fontSize}px`;
  }

  // Function to move the button down
  function moveButtonDown() {
    circle.style.transform = "translateY(20px)";
  }

  // Function to move the button back up
  function moveButtonUp() {
    circle.style.transform = "translateY(0)";
  }

  circle.addEventListener("mousedown", () => {
    isMouseDown = true;
    setTimeout(() => {
      if (isMouseDown) {
        showNameInput();
      }
    }, 3000);

    moveButtonDown();
  });

  circle.addEventListener("mouseup", () => {
    isMouseDown = false;
    moveButtonUp();
  });

  circle.addEventListener("mouseout", () => {
    isMouseDown = false;
    moveButtonUp();
  });

  window.addEventListener("resize", () => {
    resizeFont(circle);
  });

  resizeFont(circle);

  // Retrieve the button name from the array and set it on the button
  if (buttonNames[index]) {
    circle.innerHTML = buttonNames[index];
    resizeFont(circle); // Resize font after setting the text
  }
});

// Function to save all button names to the cache
function saveButtonNames() {
  localStorage.setItem("buttonNames", JSON.stringify(buttonNames));
}

// Function to retrieve all button names from the cache
function getButtonNames() {
  const names = localStorage.getItem("buttonNames");
  return names ? JSON.parse(names) : [];
}

// Retrieve button names from cache on page load
buttonNames.push(...getButtonNames());
