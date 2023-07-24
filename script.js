  // Function to trigger vibration (if supported by the device)
    function vibrateDevice() {
      if ('vibrate' in navigator) {
        // Vibrate for 50 milliseconds
        navigator.vibrate(50);
      }
    }

    // Attach click events to buttons for desktop devices
    const circles = document.querySelectorAll(".circle");
    circles.forEach(circle => {
      circle.addEventListener("mousedown", () => {
        vibrateDevice(); // Vibrate when button is pressed
        circle.style.top = "20px"; // Move the button down by 20px
        console.log("Button Name:", circle.dataset.name);
      });

      circle.addEventListener("mouseup", () => {
        circle.style.top = "0"; // Move the button back up to its original position
      });
    });

    // Attach touch events to buttons for mobile devices
    circles.forEach(circle => {
      circle.addEventListener("touchstart", () => {
        vibrateDevice(); // Vibrate when button is pressed
        circle.style.top = "20px"; // Move the button down by 20px
        console.log("Button Name:", circle.dataset.name);
        playSound();

      });

      circle.addEventListener("touchend", () => {
        circle.style.top = "0"; // Move the button back up to its original position
      });
    });

function playSound() {
      const audio = document.getElementById('myAudio');
      audio.currentTime = 0; // Rewind the audio to the beginning to play it from the start each time
      audio.play();
    }

