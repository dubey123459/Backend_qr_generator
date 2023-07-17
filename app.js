const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
res.sendFile( __dirname + "/index.html")
});

app.post("/",function(req,res){

 const query = req.body.cityName;
const apiKey = "e52b1cbfe0b8ab1922485ba8a1e56ebe"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey+ "&units=metric"
https.get(url,function(response){

    response.on("data",function(data){
       const weather_data =  JSON.parse(data);
       const temp = weather_data.main.temp;
       const weatherDescription = weather_data.weather[0].description
    const icon = weather_data.weather[0].icon;
    const iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
// we are using res.write because you can write only one res.send
res.write( "<h1>" + "The Temp of "+ req.body.cityName + " is " + temp + " degree celcius " + "</h1>" );
    res.write( "<p>" + "The weather is currently " + weatherDescription + "</p>" );
    res.write("<img src= " + iconUrl +" /> ")

       res.send();
    })
})

})


    

app.listen(3000,function(){
    console.log("server is listning 3000 port");
})

