const apiKey = "f082f707c21a107262d18bad4d41b2a3";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    // Basic validation to check if input is empty
    if(city === "") {
        alert("Please enter a city name");
        return;
    }

    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (response.status == 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            var data = await response.json();

            // Update Text Content
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

            // Update Weather Icon based on condition
            if (data.weather[0].main == "Clouds") {
                weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/1163/1163624.png";
            } else if (data.weather[0].main == "Clear") {
                weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/869/869869.png";
            } else if (data.weather[0].main == "Rain") {
                weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/1163/1163657.png";
            } else if (data.weather[0].main == "Drizzle") {
                weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/2675/2675876.png";
            } else if (data.weather[0].main == "Mist") {
                weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/4005/4005901.png";
            }

            // Show weather div and hide error
            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Event Listener for the button
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Optional: Allow pressing "Enter" key to search
searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});