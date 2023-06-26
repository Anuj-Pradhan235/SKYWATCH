const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {
  const query = req.body.cityName;
  const appKey = "12ab62c8286ee55e64516e3681e9b2f41";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    appKey +
    "&units=" +
    unit;
  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      const wheatherData = JSON.parse(data);
      const temp = wheatherData.main.temp;
      const desc = wheatherData.weather[0].description;

      const iconID = wheatherData.weather[0].icon;

      const iconSrc = "https://openweathermap.org/img/wn/" + iconID + "@2x.png";

      res.write(
        "<h1 style='font-family: Arial, sans-serif; font-size: 34px; font-weight: bold; text-align: center; color:purple;'>The Temp of " +
          query +
          " is " +
          temp +
          " Celsius</h1>"
      );
      res.write(
        "<h2 style='font-family: Arial, sans-serif; font-size: 24px; font-weight: bold; text-align: center;'>The Weather is currently " +
          desc +
          "</h2>"
      );
      res.write(
        "<div style='text-align: center;'> <img src=" +
          iconSrc +
          "  ' ></img> </div>"
      );

      res.send();
    });
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server is listening on port :3000");
});
