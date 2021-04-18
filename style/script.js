


//create an array to hold searches
var searchArray = []

//show user recent saves from local storage
var recentList = document.getElementById("search-list");

//show current weather
var showingDailyWeather = document.getElementById("current-weather")
var showSearch
var showRecentSearches = function() {
    recentList.innerHTML = "";
    recentList.style.fontStyle = "bold";
    let recentSearch = JSON.parse(localStorage.getItem("city"));
    for( let i = 0; i < recentSearch.length; i ++){
	    showSearch = document.createElement("button");
        showSearch.style.marginTop = "10px";
        showSearch.style.backgroundColor = "#275DAD";
        showSearch.style.color = "white";
        showSearch.style.borderRadius = "10px";
        showSearch.style.width = "88px";
        showSearch.style.outline = "none";
        showSearch.innerHTML = recentSearch[i];
		recentList.appendChild(showSearch)
        showSearch.addEventListener("click", function(){
            alert(showSearch.textContent);
            userInput = showSearch.textContent;
            searchApi();
            fiveDayForecast();
           
        
        })
	}
    
}
showRecentSearches()

//variable for user Input
var userInput

//Your API key is 06d97477f39a3a5f5e609c4ab7a291b1
var searchApi = function (){
    showingDailyWeather.innerHTML = ""
    fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=06d97477f39a3a5f5e609c4ab7a291b1"
    )
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data.coord);
        var latitude = data.coord.lat;
        var longitude = data.coord.lon;
    fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude +
        "&units=imperial&exclude=minutely,hourly&appid=06d97477f39a3a5f5e609c4ab7a291b1"
    )
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        //current date
        var currentDayData = data.current.dt;
        currentDay = dayjs.unix(currentDayData).format("MMMM DD, YYYY")
        //current temperature
        var currentTemp = data.current.temp;
        //current humidity
        var currentHumidity = data.current.humidity;
        //current wind speed
        var currentWindSpeed = data.current.wind_speed;
        //current UV index
         var currentUV = data.current.uvi;
         var currentIcon = data.current.weather[0].icon;
    console.log(currentIcon)
        //show current Icon
        var currentIconDisplay = document.createElement("img")
        currentIconDisplay.src = "http://openweathermap.org/img/wn/" + currentIcon + "@2x.png"
        showingDailyWeather.appendChild(currentIconDisplay)
        //show current date
        var currentDateDisplay = document.createElement("li");
        currentDateDisplay.innerHTML = userInput + " " + currentDay;
        showingDailyWeather.appendChild(currentDateDisplay)
        //show current temp
        var currentTempDisplay = document.createElement("li");
        currentTempDisplay.innerHTML = "Temp: " + currentTemp;
        showingDailyWeather.appendChild(currentTempDisplay);
        //Show current Humidity
        var currentHumidityDisplay = document.createElement("li");
        currentHumidityDisplay.innerHTML = "Humidity: " + currentHumidity + "%";
        showingDailyWeather.appendChild(currentHumidityDisplay);
        //show current Wind Speed
        var currentWindDisplay = document.createElement("li");
        currentWindDisplay.innerHTML = "Wind Speed: " +currentWindSpeed;
        showingDailyWeather.appendChild(currentWindDisplay);
        //Show current UV
        var currentUvDisplay = document.createElement("li");
        currentUvDisplay.innerHTML = "UV index: " + currentUV;
        showingDailyWeather.appendChild(currentUvDisplay);

    })
})}

//variables to hold five day forecast
var day1List = document.getElementById("day1List");
var day2List = document.getElementById("day2List");
var day3List = document.getElementById("day3List");
var day4List = document.getElementById("day4List");
var day5List = document.getElementById("day5List");

//function for five day forecast call to api
var fiveDayForecast = function(){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=06d97477f39a3a5f5e609c4ab7a291b1"
        )
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            var latitude = data.coord.lat;
            var longitude = data.coord.lon;
        fetch(
            "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude +
            "&units=imperial&exclude=minutely,hourly&appid=06d97477f39a3a5f5e609c4ab7a291b1"
        )
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            day1List.innerHTML = "";
            day2List.innerHTML = "";
            day3List.innerHTML = "";
            day4List.innerHTML = "";
            day5List.innerHTML = "";
            //get day 1 data
            var tempDay1 = data.daily[1].temp.day;
            var windDay1 = data.daily[1].wind_speed;
            var humidDay1 = data.daily[1].humidity;
            var iconDay1 = data.daily[1].weather[0].icon;
            var day1Data = data.daily[1].dt;
            var day1Date = dayjs.unix(day1Data).format("MMMM DD, YYYY");
            //display day 1 data
            var day1DateDisplay = document.createElement("li");
            day1DateDisplay.innerHTML = day1Date;
            day1List.appendChild(day1DateDisplay);
            var day1IconDisplay = document.createElement("img");
            day1IconDisplay.src =  "http://openweathermap.org/img/wn/" + iconDay1 + "@2x.png";
            day1List.appendChild(day1IconDisplay);
            var day1TempDisplay = document.createElement("li");
            day1TempDisplay.innerHTML = "Temp: " + tempDay1;
            day1List.appendChild(day1TempDisplay);
            var day1WindDisplay = document.createElement("li");
            day1WindDisplay.innerHTML = "Wind Speed: " + windDay1;
            day1List.appendChild(day1WindDisplay);
            var day1HumidDisplay = document.createElement("li");
            day1HumidDisplay.innerHTML = "Humidity: " + humidDay1 + "%";
            day1List.appendChild(day1HumidDisplay);

            //get day 2 data
            var tempDay2 = data.daily[2].temp.day;
            var windDay2 = data.daily[2].wind_speed;
            var humidDay2 = data.daily[2].humidity;
            var iconDay2 = data.daily[2].weather[0].icon;
            var day2Data = data.daily[2].dt;
            var day2Date = dayjs.unix(day2Data).format("MMMM DD, YYYY");
            //display day 2 data
            var day2DateDisplay = document.createElement("li");
            day2DateDisplay.innerHTML = day2Date;
            day2List.appendChild(day2DateDisplay);
            var day2IconDisplay = document.createElement("img");
            day2IconDisplay.src =  "http://openweathermap.org/img/wn/" + iconDay2 + "@2x.png";
            day2List.appendChild(day2IconDisplay);
            var day2TempDisplay = document.createElement("li");
            day2TempDisplay.innerHTML = "Temp: " + tempDay2;
            day2List.appendChild(day2TempDisplay);
            var day2WindDisplay = document.createElement("li");
            day2WindDisplay.innerHTML = "Wind Speed: " + windDay2;
            day2List.appendChild(day2WindDisplay);
            var day2HumidDisplay = document.createElement("li");
            day2HumidDisplay.innerHTML = "Humidity: " + humidDay2 + "%";
            day2List.appendChild(day2HumidDisplay);

             //get day 3 data
             var tempDay3 = data.daily[3].temp.day;
             var windDay3 = data.daily[3].wind_speed;
             var humidDay3 = data.daily[3].humidity;
             var iconDay3= data.daily[3].weather[0].icon;
             var day3Data = data.daily[3].dt;
             var day3Date = dayjs.unix(day3Data).format("MMMM DD, YYYY");
             //display day 3 data
             var day3DateDisplay = document.createElement("li");
             day3DateDisplay.innerHTML = day3Date;
             day3List.appendChild(day3DateDisplay);
             var day3IconDisplay = document.createElement("img");
             day3IconDisplay.src =  "http://openweathermap.org/img/wn/" + iconDay3 + "@2x.png";
             day3List.appendChild(day3IconDisplay);
             var day3TempDisplay = document.createElement("li");
             day3TempDisplay.innerHTML = "Temp: " + tempDay3;
             day3List.appendChild(day3TempDisplay);
             var day3WindDisplay = document.createElement("li");
             day3WindDisplay.innerHTML = "Wind Speed: " + windDay3;
             day3List.appendChild(day3WindDisplay);
             var day3HumidDisplay = document.createElement("li");
             day3HumidDisplay.innerHTML = "Humidity: " + humidDay3 + "%";
             day3List.appendChild(day3HumidDisplay);

             //get day 4 data
             var tempDay4 = data.daily[4].temp.day;
             var windDay4 = data.daily[4].wind_speed;
             var humidDay4 = data.daily[4].humidity;
             var iconDay4 = data.daily[4].weather[0].icon;
             var day4Data = data.daily[4].dt;
             var day4Date = dayjs.unix(day4Data).format("MMMM DD, YYYY");
             //display day 4 data
             var day4DateDisplay = document.createElement("li");
             day4DateDisplay.innerHTML = day4Date;
             day4List.appendChild(day4DateDisplay);
             var day4IconDisplay = document.createElement("img");
             day4IconDisplay.src =  "http://openweathermap.org/img/wn/" + iconDay4 + "@2x.png";
             day4List.appendChild(day4IconDisplay);
             var day4TempDisplay = document.createElement("li");
             day4TempDisplay.innerHTML = "Temp: " + tempDay4;
             day4List.appendChild(day4TempDisplay);
             var day4WindDisplay = document.createElement("li");
             day4WindDisplay.innerHTML = "Wind Speed: " + windDay4;
             day4List.appendChild(day4WindDisplay);
             var day4HumidDisplay = document.createElement("li");
             day4HumidDisplay.innerHTML = "Humidity: " + humidDay4 + "%";
             day4List.appendChild(day4HumidDisplay);

            //get day 5 data
            var tempDay5 = data.daily[5].temp.day;
            var windDay5 = data.daily[5].wind_speed;
            var humidDay5 = data.daily[5].humidity;
            var iconDay5 = data.daily[5].weather[0].icon;
            var day5Data = data.daily[5].dt;
            var day5Date = dayjs.unix(day5Data).format("MMMM DD, YYYY");
            //display day 5 data
            var day5DateDisplay = document.createElement("li");
            day5DateDisplay.innerHTML = day5Date;
            day5List.appendChild(day5DateDisplay);
            var day5IconDisplay = document.createElement("img");
            day5IconDisplay.src =  "http://openweathermap.org/img/wn/" + iconDay5 + "@2x.png";
            day5List.appendChild(day5IconDisplay);
            var day5TempDisplay = document.createElement("li");
            day5TempDisplay.innerHTML = "Temp: " + tempDay5;
            day5List.appendChild(day5TempDisplay);
            var day5WindDisplay = document.createElement("li");
            day5WindDisplay.innerHTML = "Wind Speed: " + windDay5;
            day5List.appendChild(day5WindDisplay);
            var day5HumidDisplay = document.createElement("li");
            day5HumidDisplay.innerHTML = "Humidity: " + humidDay5 + "%";
            day5List.appendChild(day5HumidDisplay);
    })
   
})}

// save user input to local storage
//and call api functions
var searchCity = function(){
    //getting value of textarea
    userInput = $.trim($("#user-input").val());
    //pushing that to an array
    searchArray.push(userInput);
    recentSearch = localStorage.setItem("city", JSON.stringify(searchArray));
    $("#user-input").val("");
    showRecentSearches();
    searchApi();
    fiveDayForecast();
}



