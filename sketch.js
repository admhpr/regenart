const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: "A4",
  pixelsPerInch: 300
};

const sketch = () => {
  function createUV(coord, count) {
    return count <= 1 ? 0.5 : coord / (count - 1);
  }
  function createGrid() {
    const points = [];
    const count = 5;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = createUV(x, count);
        const v = createUV(y, count);
        points.push([u, v]);
      }
    }
    return points;
  }
  const points = createGrid();

  // render function
  return ({ context, width, height }) => {
    context.fillStyle = "white";

    points.forEach(([u, v]) => {
      const x = u * width;
      const y = v * height;

      context.beginPath();
      context.arc(x, y, 100, 0, Math.PI * 2, false);
      context.storkeStyle = "black";
      context.lineWidth = 40;
      context.stroke();
    });
  };
};

canvasSketch(sketch, settings);
