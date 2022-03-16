var canvas = document.getElementById('box');
var ctx = canvas.getContext('2d');
var boxHeight = canvas['height'];
var boxWidth = canvas['width'];
var pointsHeight = (boxHeight-50)/50;
var pointsWidth = (boxWidth-50)/50;
var mapMoves = [];
var checkPoints = [[15,15]];
var lastX = 0;
var lastY = 0;
const canvasMap = new Path2D();
const turrets = new Path2D();
const enemy = new Path2D();
const ranger = new Path2D();
var turretList = [];
var enemyList = [];
var selectedTurret = 0;
let showRange = [0,0];
let money = 500;
let gamestate = false;
let updator,mobGen,shooting;

function Turret(dmg,range,xpos,ypos){
  this.dmg = dmg;
  this.range = range;
  this.xpos = xpos;
  this.ypos = ypos;
  this.rangex = range+xpos;
  this.rangey = range+ypos;
}
function Enemy(){
  this.health = Math.floor(Math.random()*200+400);
  this.currentPlace = [15,15];
  this.timer=1;
  this.currentMove = checkPoints[this.timer];
  ctx.fillStyle='green'
  ctx.fillRect(15,15,20,20)
}

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
canvasMap.rect(lastX, lastY, 50, 50)
for (var i = 0; i <= mapMoves.length; i++) {
  if (mapMoves[i]==1) {
    lastX+=50
    canvasMap.rect(lastX, lastY, 50, 50);
    checkPoints.push([lastX+15,lastY+15]);
  }else {
    lastY+=50
    canvasMap.rect(lastX, lastY, 50, 50);
    checkPoints.push([lastX+15,lastY+15]);
  }
}

canvas.addEventListener('mouseup', function(event) {

  if (ctx.isPointInPath(canvasMap, event.offsetX-10, event.offsetY-10)||
  (ctx.isPointInPath(canvasMap, event.offsetX+10, event.offsetY+10))
)
{
    alert('cannot place here',event.offsetX, event.offsetY);
  }
  else if(money>=200){
    money-=200;
    turrets.rect(event.offsetX-10,event.offsetY-10,20,20)
    turretList.push(new Turret(10,70,event.offsetX,event.offsetY))
    drawTurrets();
  }
}
)

function drawTurrets(){
  ctx.fillStyle = 'blue'
  ctx.fill(turrets)
}

function drawMap() {
  ctx.fillStyle = 'red';
  ctx.fill(canvasMap);
  document.getElementById('money').innerHTML = money;
}

function newEnemy(){
enemyList.push(new Enemy())
}

function drawEnemy(){
  for (var i = 0; i < enemyList.length; i++) {
      ctx.fillStyle='green';
      ctx.fillRect(enemyList[i]['currentPlace'][0],enemyList[i]['currentPlace'][1],20,20);
  }
}

function mapUpdate(){
  ctx.clearRect(0,0,boxWidth,boxHeight)
  drawMap();
    for (var i = 0; i < enemyList.length; i++) {
      if (enemyList[i]['currentMove']==checkPoints[checkPoints.length-1]) {
      enemyList.splice(i,1)
      continue;
      }
      if(enemyList[i]['currentPlace'].toString()===enemyList[i]['currentMove'].toString()){
        enemyList[i]['timer']+=1;
        enemyList[i]['currentMove'] = checkPoints[enemyList[i]['timer']]
      }
      if (enemyList[i]['currentPlace']!=enemyList[i]['currentMove']) {
        if (enemyList[i]['currentPlace'][0]!=enemyList[i]['currentMove'][0]) {
          enemyList[i]['currentPlace'][0]+=1;
        }
        if (enemyList[i]['currentPlace'][1]!=enemyList[i]['currentMove'][1]) {
          enemyList[i]['currentPlace'][1]+=1;
        }
      }
    }
    drawEnemy();
    drawTurrets();
}

function turretShoot(){
  for (var i = 0; i < turretList.length; i++) {
    for (var j = 0; j < enemyList.length; j++) {
        if(Math.abs(turretList[i]['xpos']-enemyList[j]['currentPlace'][0])<turretList[i]['range']&&
        Math.abs(turretList[i]['ypos']-enemyList[j]['currentPlace'][1])<turretList[i]['range']
      ){
        ctx.beginPath();
        ctx.moveTo(turretList[i]['xpos'],turretList[i]['ypos']);
        ctx.lineTo(enemyList[j]['currentPlace'][0]+10,enemyList[j]['currentPlace'][1]+10)
        ctx.stroke();
        console.log('shoot');
        enemyList[j]['health']-=150;
        if (enemyList[j].health<=0) {
          enemyList.splice(j,1)
          money+=20;
        }
        break;

        }
      }
    }
  }

function switchState(){
  if (!gamestate) {
    gamestate = true;
    ctx.clearRect(0,0,boxWidth,boxHeight)
    updator = setInterval(mapUpdate,20);
    mobGen = setInterval(newEnemy,700)
    shooting = setInterval(turretShoot,700);
  }else {
    gamestate = false;
    clearInterval(updator);
    clearInterval(mobGen);
    clearInterval(shooting);
  }
 }

function drawRanger(mousex,mousey){
  ctx.beginPath();
  ctx.arc(mousex,mousey, 70, 0, 2 * Math.PI);
  ctx.rect(event.offsetX-10,event.offsetY-10,20,20)
  ctx.stroke();
}

 canvas.addEventListener('mousemove', function(){
   if (!gamestate) {
     ctx.clearRect(0,0,boxWidth,boxHeight)
     drawTurrets()
     drawMap();
     drawEnemy();
     drawRanger(event.offsetX,event.offsetY)
   }

 })
