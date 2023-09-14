//盤面のパラメータ
let N = 8;
let size = 60;
let H = N * size;

//盤面情報
let board = [
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,-1,1,0,0,0],
  [0,0,0,1,-1,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
]
let direct = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];

//ターン情報
let turn = 1;

function setup() {
  createCanvas(H+100, H);
}

//背景を書く
function drawBackground()
{
  fill('lightgreen');
  rect(0,0,H,H);
  for(let x = 0;x < H;x += size){
    line(x,0,x,H);
    line(0,x,H,x);
  }
}

//盤面を描画
function drawBoard(){
  for(let i=0;i<N;i++){
    for(let j=0;j<N;j++){
      if(board[i][j] == 0) continue;
      else if(board[i][j] == 1) fill('black');
      else fill('white');
      circle(j*size+size/2, i*size+size/2, size*0.8);
    }
  }
}

function c(a){
  return 0 <= a && a < N;
}

function cc(a,b){
  return c(a) && c(b);
}

//指定した方向に何個の石が取れるか
function revNumDir(x,y,d){
  let ret = 0;
  x += d[0];
  y += d[1];
  while(cc(x,y)){
    if(board[y][x] == turn*-1) ret++;
    else if(board[y][x] == turn) return ret;
    else return 0;
    x += d[0];
    y += d[1];
  }
  return 0;
}

//指定した場所に石が置けるか
function canPut(x,y){
  if(board[y][x] != 0) return false;
  let revs = 0;
  for(let i=0;i<direct.length;i++){
    revs += revNumDir(x,y,direct[i]);
  }
  return revs > 0;
}

//指定された方向に石をひっくり返していく
function revDir(x,y,d){
  let num = revNumDir(x,y,d);
  for(let i=1;i<=num;i++){
    board[y+d[1]*i][x+d[0]*i] = turn;
  }
}

//周りの石をひっくり返す
function rev(x,y){
  for(let i=0;i<direct.length;i++){
    revDir(x,y,direct[i]);
  }
}

//マウスクリック時
function mouseClicked(){
  let x = floor(mouseX / size);
  let y = floor(mouseY / size);
  
  if(cc(x,y) == false) return;
  if(canPut(x,y) == false) return;
  
  rev(x,y);
  board[y][x] = turn;
  turn *= -1;
}

//現在の白と黒の個数をカウントして表示する
function drawText(){
  let b = board.flat().filter(n => n==1).length;
  let w = board.flat().filter(n => n == -1).length;
  
  textSize(28);
  fill('black');
  text("黒："+b,H+10,30);
  fill('white');
  text("白："+w,H+10,65);
}

function draw() {
  background(220);
  drawBackground();
  drawBoard();
  drawText();
}