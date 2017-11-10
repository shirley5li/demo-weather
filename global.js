var api = "https://fcc-weather-api.glitch.me/api/current?";
var lat, lon;
var tempUnit = 'C';
var currentTempInCelsius;

$( document ).ready(function(){
  // 获取经纬度
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = "lat=" + position.coords.latitude;
      var lon = "lon=" + position.coords.longitude;
      getWeather(lat, lon);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
  // 切换温度单位，摄氏度和华氏度  
  $("#tempunit").click(function() {
    var currentTempUnit = $("#tempunit").text();
    var newTempUnit = currentTempUnit == "C" ? "F" : "C";
    $("#tempunit").text(newTempUnit);
    if (newTempUnit == "F") {
      var fahTemp = Math.round(parseInt($("#temp").text()) * 9 / 5 + 32);
      // 显示华氏温度
      $("#temp").text(fahTemp + " " + String.fromCharCode(176));
    } else {
      // 显示摄氏温度
      $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
    }
  });
  
})
// 根据经纬度获取当地天气，默认摄氏度
function getWeather(lat, lon) {
  var urlString = api + lat + "&" + lon;
  $.ajax({
    url: urlString, 
    success: function(result) {
      $("#city").text(result.name + ", ");
      $("#country").text(result.sys.country);
      currentTempInCelsius = Math.round(result.main.temp * 10) / 10;
      $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
      $("#tempunit").text(tempUnit);
      $("#desc").text(result.weather[0].main);
      IconGen(result.weather[0].main);
    }
  });
}
// 根据返回的天气切换背景图片和图标
function IconGen(desc) {
  var desc = desc.toLowerCase();
  switch (desc) {
    case 'drizzle':
      document.body.style.backgroundImage = "url(images/drizzle.jpg)";
      $("#weatherIcon").attr("class", "wi wi-sprinkle");
      break;
    case 'clouds':
      document.body.style.backgroundImage = "url(images/clouds.jpg)";
      $("#weatherIcon").attr("class", "wi wi-cloudy");
      break;
    case 'rain':
      document.body.style.backgroundImage = "url(images/rain.jpg)";
      $("#weatherIcon").attr("class", "wi wi-rain");
      break;
    case 'snow':
      document.body.style.backgroundImage = "url(images/snow.jpg)";
      $("#weatherIcon").attr("class", "wi wi-snow");
      break;
    case 'clear':
      document.body.style.backgroundImage = "url(images/clear.jpg)";
      $("#weatherIcon").attr("class", "wi wi-day-sunny");
      break;
    case 'thunderstorm':
      document.body.style.backgroundImage = "url(images/thunderstorm.jpg)";
      $("#weatherIcon").attr("class", "wi wi-thunderstorm");
      break;
    default:
      document.body.style.backgroundImage = "url(images/clouds.jpg)";
      $("#weatherIcon").attr("class", "wi wi-cloudy");
  }
}

