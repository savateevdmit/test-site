const WIDTH = 600, HEIGHT = 400;
const GRID_SфPACING = 40;
const POINT_DIAMETER = 15;
const COLORS = {
    POINT_INACTIVE: "#ecf0f1",
    POINT_HOVER: "#2980b9",
    POINT_ACTIVE: "#2c3e50"
};

let points = [];

SVG.on(document, 'DOMContentLoaded', () => {
  let draw = SVG().addTo('#drawing').size(WIDTH, HEIGHT);
  
  for (let x = GRID_SPACING; x < WIDTH; x += GRID_SPACING) {
    for (let y = GRID_SPACING; y < HEIGHT; y += GRID_SPACING) {
      //console.log(x + " " + y);
      points.push(draw.circle(POINT_DIAMETER).fill(COLORS.POINT_INACTIVE).move(x, y));
    };
  };
  
  for (point of points) {
    point.active = false;
    point.on('click', pointClick);
    point.on('mouseover', pointMouseOver);
    point.on('mouseout', pointMouseOut);
  }
});

function pointClick() {
  if (!this.active) {
    this.active = true;
    this.fill(COLORS.POINT_ACTIVE);
    this.size(POINT_DIAMETER * 1.4);
  } else {
    resetPoint(this);
    this.active = false;
  }
}

function pointMouseOver() {
  if (!this.active) {
    this.fill(COLORS.POINT_HOVER);
    this.size(POINT_DIAMETER * 1.1);
  }
}

function pointMouseOut() {
  if (!this.active) {
    resetPoint(this)
  }
}
  
function resetPoint(point) {
  point.fill(COLORS.POINT_INACTIVE);
  point.size(POINT_DIAMETER);
}

function horizontalDist(pointA, pointB) {
  return pointA.x() - pointB.x();
}

function verticalDist(pointA, pointB) {
  return pointA.y() - pointB.y();
}

function euclidianDist(pointA, pointB) {
  let dx = horizontalDist(pointA, pointB);
  let dy = verticalDist(pointA, pointB);
  return Math.sqrt(dx ** 2 + dy ** 2);
}

function manhattanDist(pointA, pointB) {
  return Math.abs(horizontalDist(pointA, pointB)) + Math.abs(verticalDist(pointA, pointB));
}
