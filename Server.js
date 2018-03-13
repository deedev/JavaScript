
var blobs = [];

function Blob(id, x, y, r){
    this.id = id;
    this.x = x;
    this.y = y;
    this.r = r;
}

var express = require("express");
var app = express();

app.use(express.static("./public"));
app.set("view engine","ejs");
app.set("views", "views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

setInterval(heartbeat, 33);
function heartbeat(){
    io.sockets.emit("heartbeat", blobs);
}

io.on("connection", function(socket){
    console.log("Connecting: " + socket.id);

    socket.on("start", function(data){
        console.log(socket.id + " : " + data.x + " : "+ data.y + " : " + data.r);
        let blob = new Blob(socket.id, data.x, data.y, data.r);
        blobs.push(blob);
    });

    socket.on("update", function(data){
        console.log(socket.id + " : " + data.x + " : "+ data.y + " : " + data.r);
        var blob;
        for(let i = 0; i < blobs.length; i++){
            if(socket.id == blobs[i].id){
                blob = blobs[i];
            }
        }
        blob.x = data.x;
        blob.y = data.y;
        blob.r = data.r;
    });

    socket.on("disconnect", function(){
        for(let i = 0; i< blobs.length; i++){
            if(blobs[i].id == socket.id){
                blobs.splice(i, 1);
            };
        };
    });
});

app.get("/", function(req, res){
    res.render("index");
})

