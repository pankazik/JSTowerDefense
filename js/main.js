var canvas = document.getElementById('box');
var ctx = canvas.getContext('2d');
var boxHeight = canvas['height'];
var boxWidth = canvas['width'];
var pointsHeight = (boxHeight-50)/50;
var pointsWidth = (boxWidth-50)/50;
var mapMoves = [];
var lastX = 0;
var lastY = 0;

for (var i = 0; i < pointsWidth; i++) {
  mapMoves.push(1);
}
for (var i = 0; i < pointsHeight; i++) {
  mapMoves.push(2)
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffle(mapMoves)
ctx.fillRect(lastX, lastY, 50, 50);
for (var i = 0; i <= mapMoves.length; i++) {
  if (mapMoves[i]==1) {
    lastX+=50
    ctx.fillRect(lastX, lastY, 50, 50);
  }else {
    lastY+=50
    ctx.fillRect(lastX, lastY, 50, 50);
  }
}
