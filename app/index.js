const api = {
    key: "478fb28cdd1df3249472c9bb6f1cffc0",
    base: "https://api.openweathermap.org/data/2.5/"
}
const months = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Augt", "Sep",
    "Oct", "Nov", "Dec"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
        "Friday", "Saturday"];

$(document).ready(function(){    
    let date = new Date();
    document.querySelector(".result_dates").innerText =
    `${days[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()}`;


    $('.search_button').click(setQuery);
    $('.input_search').keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            setQuery();
        }
    });
    
    function setQuery(){
        getResults($(".input_search").val());
    }

    function getResults(query){
        fetch(`${api.base}weather?q=${query}&units=metrics&APPID=${api.key}`)
            .then(weather => {
                return weather.json();
            }).then(displayResults);
    }

    function displayResults(weather){
        try{
            document.querySelector(".result_city").innerText = 
                `${weather.name}, ${weather.sys.country}`;

            document.querySelector(".result_temp").innerHTML = 
                `${Math.round(weather.main.temp)-273}<span>°C</span>`;

            let weather_temp = weather.weather[0].main;
            document.querySelector(".result_weather").innerText =
            weather_temp;
            console.log(weather_temp);
            
            switch(weather_temp){
                case "Clouds" : $("body")
                    .css("background-image", 'url("src/Cloudly\ weather.png"');
                    break;
                case "Clear" : $("body")
                    .css("background-image", 'url("src/Sunny\ weather.jpg"');
                    break;
                case "Snow" : $("body")
                    .css("background-image", 'url("src/Snow\ weather.jpg"');
                    break;
                case "Rain" : $("body")
                    .css("background-image", 'url("src/Rain\ weather.jpg"');
                    break;            
                case "Thunderstorm" : $("body")
                    .css("background-image", 'url("src/thunder\ weather.jpg"');
                    break;
                default :  $("body")
                    .css("background-image", 'url("src/Cloudly\ weather.png"');
                    break;

            }

            document.querySelector("#value_low").innerText = 
                `${Math.round(weather.main.temp_min)-273}°C`;
            document.querySelector("#value_high").innerText = 
                `${Math.round(weather.main.temp_max)-273}°C`;
            $('.input_search').val("");

            
        }catch(err){
            document.querySelector(".result_city").innerText = "City not";
        }
    }

});