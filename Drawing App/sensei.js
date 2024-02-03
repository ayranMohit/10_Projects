console.log("its connected to drawing app");
const decreaseBtn = document.getElementById("decrease");
const increaseBtn = document.getElementById("increase");
const sizeSpan = document.getElementById("size");
const colorInput = document.getElementById("color");
const clearBtn = document.getElementById("clear");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let size = 5;
let x = undefined;
let y = undefined;
canvas.addEventListener("mousedown", () => {
  isPressed = true;
  x = e.offsetX;
  y = e.offsetY;
});
canvas.addEventListener("mouseup", () => {
  isPressed = false;
  x = undefined;
  y = undefined;
});
canvas.addEventListener("mousemove", (e) => {
  if (isPressed) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;
    drawingCircle(x2, y2);
    drawingline(x, y, x2, y2);
    x = x2;
    y = y2;
  }
});
drawingline = (x, y, x2, y2) => {
  ctx.lineWidth = size;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.closePath();
};
drawingCircle = (x, y) => {
  ctx.beginPath();
  ctx.arc(x, y, size / 2, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
};
increaseBtn.onclick = () => {
  if (size < 50) {
    size += 5;
  }
  sizeSpan.innerText = size;
};
decreaseBtn.onclick = () => {
  sizeSpan.innerText = size;
  if (size > 5) {
    size -= 5;
  }
};
sizeSpan.innerText = size;

clearBtn.onclick = () => {
  if (color == "white") {
    color = colorInput.value;
    clearBtn.classList.remove("on");
  } else {
    color = "white";
    clearBtn.classList.add("on");
  }
};
colorInput.addEventListener("change", (e) => {
  color = e.target.value;
});
