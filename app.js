const express = require("express");
const { json } = require("express/lib/response");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.sendFile('index.html');
});

app.post("/", function(req, res) {
    const query = req.body.CityName;
    const apiKey = "2d81b25062e907fb3673bd33e47f07cd";
    const unit = "metric";
    const url =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        query +
        "&units=" +
        unit +
        "&appid=" +
        apiKey +
        "";
    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const description = weatherData.weather[0].description;
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<p>The weather is currently " + description + "</p>");
            res.write("<img src= " + imageURL + ">");
            res.write(
                "<h1>The temprature in " +
                query +
                " is " +
                temp +
                " degrees Celcius.</h1>"
            );

            res.send();
        });
    });
});

app.listen(3000, function() {
    console.log("server up hommi!");
});