let express = require("express");
let cors = require("cors");
let http = require("http");
let bodyParser = require("body-parser");
let path = require("path");

const port=9000

app = express();

const server= http.createServer(app).listen(process.env.PORT || port, '0.0.0.0', () => {
  console.log("Server is running.");
});

app.use(cors());

app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());


app.post("/server", (req, res) => {
    io.emit("command", req.body);
    console.log(req.body);

    res.status(201).json({ status: "reached" });
  });


let io = require("socket.io")(server,{
  cors: {
    // origin: "http://localhost:3000",
    origin: "https://backpackers-frontend2.herokuapp.com",

}
  });


  
io.on("connection", (socket) => {
    socket.on("command", function (data) {
      io.emit("command", data);
      console.log(data);
    });
  });
