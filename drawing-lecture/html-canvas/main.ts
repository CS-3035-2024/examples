function draw() {
  // create canvas element and add it to the DOM
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);

  // set a background style to make it easier to see the canvas
  canvas.style.setProperty("background", "lightgrey");

  // get canvas graphics context
  const gc = canvas.getContext("2d");
  if (!gc) return;

  // draw something
  gc.fillRect(10, 10, 50, 50);
}

draw();
