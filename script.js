<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TouchBox</title>
  <link rel="stylesheet" href="styles.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cairo&display=swap">

</head>
<body>
    <!-- New container for the switches -->
    <div class="switch-container">
          <div class="touchbox-version">TouchBox 1.0 by XPISigmaArt (Twitter)</div>
      <div class="switch" id="🡸"></div>
      <div class="switch" id="🡻"></div>
      <div class="switch" id="🡺"></div>
      <div class="switch" id="LP"></div>
      <div class="switch" id="MP"></div>
      <div class="switch" id="HP"></div>
      <div class="switch" id="L1"></div>
      <div class="switch" id="LK"></div>
      <div class="switch" id="MK"></div>
      <div class="switch" id="HK"></div>
      <div class="switch" id="L2"></div>
      <div class="switch" id="🡹"></div>
      <div class="text" id="touchDisplay"></div>
 <div class="menu" onclick="toggleMenu()">    
    <div class="menu-trigger">
    <div class="menu-icon"></div>
    </div>
    <div class="menu-items" onclick="event.stopPropagation()">
      <div class="menu-item" onclick="openFileInput()">Upload Background</div>   
      <input type="file" id="fileInput" style="display: none" accept="image/*">
      <div class="menu-item" onclick="toggleButtonColor()">Button Color</div>
      <input type="color" id="colorPicker" style="display: none">
      <div class="menu-item" onclick="toggleVibration()">Vibration (<span id="vibration-status">On</span>)</div>
      <div class="menu-item" id="fullscreenMenuItem">Full Screen</div>
    </div>
  </div> 
    <div class="latest-switches-container" id="latestSwitchesContainer"></div>
      
<script src="script.js"></script>
      
      <audio id="switchSound" preload="auto">
  <source src="path_to_button.wav" type="audio/wav">
</audio>
   </div>

</body>
</html>
