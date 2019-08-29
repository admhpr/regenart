const canvasSketch = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");

const settings = {
  dimensions: "A4",
  pixelsPerInch: 300
};

const sketch = () => {
  const colorCount = random.rangeFloor(1, 6);
  const palette = random.shuffle(random.pick(palettes).slice(0, colorCount));
  function createUV(coord, count) {
    return count <= 1 ? 0.5 : coord / (count - 1);
  }
  function createGrid(count = 5) {
    const points = [];
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = createUV(x, count);
        const v = createUV(y, count);
        const radius = Math.abs(random.noise2D(u, v) * 0.2);
        points.push({
          color: random.pick(palette),
          radius,
          rotation: random.noise2D(u, v),
          position: [u, v]
        });
      }
    }
    return points;
  }

  // random.setSeed();
  const points = createGrid(50).filter(() => random.value() > 0.5);
  const margin = 100;
  // render function
  return ({ context, width, height }) => {
    context.fillStyle = "hsl(0, 0%, 98%)";
    context.fillRect(0, 0, width, height);

    points.forEach(data => {
      const {
        position: [u, v],
        radius,
        rotation,
        color
      } = data;

      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      // context.beginPath();
      // context.arc(x, y, radius * width, 0, Math.PI * 2, false);
      // context.storkeStyle = color;
      // context.lineWidth = 5;
      // context.fillStyle = color;
      // context.fill();
      context.save();
      context.fillStyle = color;
      context.font = `${radius * width}px "Arial"`;
      context.translate(x, y);
      context.rotate(rotation);
      context.fillText(`@`, 0, 0);
      context.restore();
    });
  };
};

canvasSketch(sketch, settings);
