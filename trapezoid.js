const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");
const { lerp } = require("canvas-sketch-util/math");

const colorCount = random.rangeFloor(1, 6);
const palette = random.shuffle(random.pick(palettes).slice(0, colorCount));
console.log(palette);
const settings = {
  suffix: `pallete-${palette}`,
  dimensions: "A4",
  pixelsPerInch: 300
};

function createUV(coord, count) {
  return count <= 1 ? 0.5 : coord / (count - 1);
}

const sketch = () => {
  function createGrid(count = 5) {
    const points = [];
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const color = random.pick(palette);
        const u = createUV(x, count);
        const v = createUV(y, count);
        points.push({
          color,
          position: [u, v]
        });
      }
    }
    return points;
  }

  const points = createGrid(5);
  const margin = 100;
  // render functionrandom.pick(palette)
  return ({ context, width, height }) => {
    points.forEach(data => {
      const {
        position: [u, v],
        color
      } = data;

      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.beginPath();
      context.strokeStyle = color;
      context.lineWidth = 40;
      context.stroke();
      context.closePath();
    });
  };
};

canvasSketch(sketch, settings);
