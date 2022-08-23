$(window).on("load", function () {
  var $preloader = $("#p_prldr"),
    $svg_anm = $preloader.find(".svg_anm");
  $svg_anm.fadeOut();
  $preloader.delay(100).fadeOut("slow");
});
$(".select").click(function () {
  $("li").slideToggle("fast");
});

$(".first ").hover(function () {
  $(this).find("#select2 li").toggle("fast");
});

// рандомное изображение
let backgrounds = [
  "url(images/cap.jpg) top center",
  "url(images/spider.jpg) top center",
  "url(images/ironman.jpg) top center",
  "url(images/vanda.jpg) top center",
];
document.body.style.background =
  backgrounds[Math.floor(Math.random() * (backgrounds.length + 1))];

var city3 = $(input).text();
var city2;
var input = $("#city");

$("#cityB").on("click", function () {
  $("#tablo").css("display", "flex");
  $("#mapsShow").css("display", "block");
  $("#adress").css("display", "block");
  $(".p").css("display", "block");
  $("#OUT1").css("display", "block");
  $("#OUT11").css("display", "block");
  var city = $("#city").val();

  function getWeather2() {
    var city4 = $("#city").val();
    var apiURI4 = `https://api.openweathermap.org/data/2.5/weather?q=${city4}&units=metric&appid=5b58aee62c41eb64fcab16edce2e5cc1`;

    //делаем запрос на данные о погоде
    console.log("success getWeather22");
    console.log(apiURI4);
    return $.ajax({
      url: apiURI4,
      dataType: "jsonp",
      type: "GET",
      async: "true",
      timeout: 800,
    }).done(dataHandler2);
  }
  function dataHandler2(data) {
    dataString = JSON.stringify(data);
    var tempMode = Math.round(data.main.temp);
    var m4 = znak.indexOf(data.weather[0].description);
    if (data.main.temp && data.sys) {
      // отображение иконки
      if (data.weather) {
        var imgURL =
          "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
        document.getElementById("demo27").innerHTML =
          "Погода: " + " " + znakRU[m4];
        document.getElementById("demo125").innerHTML =
          "Температура: " + " " + tempMode + "°C";
        $("#tmp24").attr("src", imgURL);
      }
    }
  }

  function dataHandler3(data) {
    dataString = JSON.stringify(data);
    var now = new Date();
    let h = now.getHours();
    var num = 8 - Math.floor(h / 3);
    var m = znak.indexOf(data.list[num + 5].weather[0]["description"]);
    var m1 = znak.indexOf(data.list[num + 13].weather[0]["description"]);
    var m2 = znak.indexOf(data.list[num + 21].weather[0]["description"]);
    var m3 = znak.indexOf(data.list[num + 29].weather[0]["description"]);
    var name = data.city.name;
    $("#cityC").text("в" + " " + name);
    console.log(data.list[num + 29].weather[0]["description"]);
  }
});

var $tempMode = $("#tempMode");
var $tempText = $("#temp-text");

function formatTemperature(kelvin) {
  var clicked = false;
  var fahr = ((kelvin * 9) / 5 - 459.67).toFixed(0);
  var cels = (kelvin - 273.15).toFixed(1);

  $tempText.html(cels);

  var firstClick = false;
  $tempMode.off("click").on("click", function () {
    firstClick = true;
    console.log(clicked);
    clicked === false ? (clicked = true) : (clicked = false);
    clicked === true ? $tempMode.html("F&deg") : $tempMode.html("C&deg");
    if (clicked) {
      $tempText.html(fahr);
    } else $tempText.html(cels);
  });

  if (cels > 24) {
    $("#temp-text").css("color", "red");
  } else if (cels < 18) {
    $("#temp-text").css("color", "blue");
  }
}

function dataHandler(data) {
  dataString = JSON.stringify(data);
  console.log(data.main.temp);
  formatTemperature(data.main.temp);
  if (data.main.temp && data.sys) {
    if (data.weather) {
      var imgURL =
        "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
      $("#weatherImg").attr("src", imgURL);

      var k = znak.indexOf(data.weather[0].description);
      $("#weather-text").text(znakRU[k]);
    }

    if (data.wind) {
      var knots = data.wind.speed;
      $windText.html(knots.toFixed(1) + " М/С");
      var knots2 = data.wind.speed * 1.9438445;
      $windText2.html(knots2.toFixed(1) + " Узлов");
    }
    if (data.main) {
      var hum2 = data.main.pressure;
      var mm = (data.main.pressure * 0.75006).toFixed(0);
      $windText3.html(mm + " мм.рт.ст.");
    }
    if (data.main) {
      var hum3 = data.main.humidity;
      $windText4.html(hum3 + " %");
    }
  }
}

function getWeather(locdata) {
  console.log("getWeather has been called.");
  var lat = locdata.latitude;
  var lon = locdata.longitude;

  var apiURI =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=5b58aee62c41eb64fcab16edce2e5cc1";

  //выводим данные IP
  if (locdata) {
    console.log("success");
    $("#city-text").html(locdata.city);
  } else {
    console.log("fail");
  }

  //делаем запрос на данные о погоде
  console.log("success getWeather");
  console.log(apiURI);
  return $.ajax({
    url: apiURI,
    dataType: "jsonp",
    type: "GET",
    async: "true",
  }).done(dataHandler);
}

var counter = 0;

function getLocation() {
  console.log("Update# " + counter++);

  //делаем запрос на локализацию устройства
  return $.ajax({
    url: "https://ipapi.co/jsonp/",
    dataType: "jsonp",
    type: "GET",
    async: "true",
  });
}

var updateInterval = setInterval(getLocation().done(getWeather), 30000);
//});

function showDateTime2() {
  var now = new Date();
  date.textContent = `${now.toLocaleDateString("ru-ru", {
    day: "numeric",
    month: "long",
  })} ${now.getFullYear()}`;
  time.textContent = correctTime(now);
}
showDateTime2();
setInterval(showDateTime2, 1000);

let stopwatchId, stopwatch_ms, timerId, timer_ms;

// Общая функция корректного отображения времени.
function correctTime(time) {
  let h = time.getHours(),
    m = time.getMinutes(),
    s = time.getSeconds();
  return `${(h < 10 ? "0" : "") + h}:${(m < 10 ? "0" : "") + m}:${
    (s < 10 ? "0" : "") + s
  }`;
}
// В Opera отображение ведущего нуля часов глючит в Intl.
function correctTimeIntl(time) {
  let format = Intl.DateTimeFormat("ru-ru", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return format.format(time);
}
showDateTime2();
