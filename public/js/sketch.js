var blob;
var blobs = [];
var socket;
var foods = [];
function setup() {
  createCanvas(windowWidth, windowHeight);

  socket = io("http://localhost:3000");

  blob = new Blob(random(0, width),random(0, height),30,color(random(1, 254),random(1, 254),random(1, 254)));

  for(let i = 0; i < 200; i++){
    let eat = new Blob(random(-width, width),random(-height, height),5,color(random(3,255),random(1,250),random(1,255)));
    foods.push(eat);
  }

  var data = {
    x: blob.pos.x,
    y: blob.pos.y,
    r: blob.r
  };

  socket.emit("start", data);

  socket.on("heartbeat", function(data){
    console.log(data);
    blobs = data;
  });

}
function draw() {

  background(255);
  translate(width/2 - blob.pos.x, height/2 - blob.pos.y);

  for(let i = blobs.length - 1; i >= 0 ; i--){

    var id = blobs[i].id;
    console.log(id + " : " + socket.id);

    if(id !== socket.id) {
      

      fill(111);
      stroke(69);
      strokeWeight(4);
      ellipse(blobs[i].x, blobs[i].y, blobs[i].r*2, blobs[i].r*2);
    };
  };

  blob.show();
  blob.blobby();

  blob.update();
  for(let i = foods.length - 1; i >= 0; i--){
    foods[i].show();
    if(blob.eat(foods[i])){
      foods.splice(i, 1);
    }
  }

  var data = {
    x: blob.pos.x,
    y: blob.pos.y,
    r: blob.r
  };
  socket.emit("update", data);
}
