let weather = {
    "apiKey": "97933fae3a9f44d07f02a1a66909b6bc",
    fetchWeather: function(city, state_code) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city.toUpperCase()
            + "&units=imperial&appid=" 
            + this.apiKey
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity} = data.main;
        const { visibility } = data;
        const { speed } = data.wind;
        const { country } = data.sys;
        document.querySelector(".city").innerText = name;
        document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".visibility").innerText = "Visibility: " + visibility + " ft.";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + " mi/h";
        document.querySelector(".country").innerText = "Country: " + country;
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document
.querySelector(".search button")
.addEventListener("click", function () {
weather.search();
});

document
.querySelector(".search-bar")
.addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

weather.fetchWeather("Indianapolis");