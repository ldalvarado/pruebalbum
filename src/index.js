const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const path = __dirname + '/public/';

//ruta
const app = express();
app.use(express.static(path));
var corsOptions = {
    origin: "http://localhost:8080"
};
app.use(cors(corsOptions));

// cors application/json
app.use(bodyParser.json());

// cors application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function (req,res) {
    res.sendFile(path + "index.html");
});

app.use('/api/videos',require('./routes/videos.routes'));
//require("./routes/videos.routes")(app);

// listar puertos
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});