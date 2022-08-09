let currDate = new Date();

let formatedDate = `${currDate.getDate()}.${currDate.getMonth()}.${currDate.getFullYear()}`;
$(document).ready(function () {
	$("#search-button").click(updateWeather);
	//$(".main-container").hide();
	$(".error-container").hide();
	updateWeather();
});

function updateWeather() {
	let cityName = $("#search-input").val();

	if (cityName != "") {
		$.ajax({
			method: "GET",
			url: `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=cc0fb1f6f366a72737d0205fc07790ca&units=metric`,
			dataType: "json",
			success: function (res) {
				$(".error-container").hide();
				$(".main-container").show();
				// let weathers = res.list.filter((w) => {
				// 	let date = new Date(w.dt_txt);

				// 	return (
				// 		date.getFullYear() == currDate.getFullYear() &&
				// 		date.getMonth() == currDate.getMonth() &&
				// 		date.getDate() == currDate.getDate()
				// 	);
				// });
				let weathers = res.list.slice(0, 5);

				$("#city-name").text(res.city.name);
				$("#wather-date").text(formatedDate);
				$("#weater-temp").text(`${parseInt(weathers[0].main.temp)}°C`);
				$("#weather-img").attr(
					"src",
					`http://openweathermap.org/img/wn/${weathers[0].weather[0].icon}@2x.png`
				);
				$("#min-temp").text(`${weathers[0].main.temp_min}°C`);
				$("#max-temp").text(`${weathers[0].main.temp_max}°C`);
				$("#wind-speed").text(`${weathers[0].wind.speed}`);
				$("#weater-text").text(weathers[0].weather[0].main);

				$("#hourly-table-head").empty();
				$("#hourly-table-body").empty();

				let tr1 = $("<tr></tr>");
				let tr2 = $("<tr></tr>");
				let tr3 = $("<tr></tr>");
				let tr4 = $("<tr></tr>");
				let tr5 = $("<tr></tr>");

				let dayName = currDate.toLocaleString("en-us", {
					weekday: "long",
				});

				tr1.append(`<td class="columnName">${dayName}</td>`);
				weathers.forEach((w) => {
					let d = new Date(w.dt_txt);

					tr1.append(
						`<td>${(d.getHours() < 10 ? "0" : "") + d.getHours()}:${
							(d.getMinutes() < 10 ? "0" : "") + d.getMinutes()
						}</td>`
					);
				});

				tr2.append($('<td class="columnName"></td>'));
				weathers.forEach((w) => {
					tr2.append(`<td class="weather-icon-td">
                    <div><img src="http://openweathermap.org/img/wn/${w.weather[0].icon}@2x.png"></img></div></td>`);
				});

				tr3.append($(`<td class="columnName">Forecast</td>`));
				weathers.forEach((w) => {
					tr3.append(`<td>${w.weather[0].main}</td>`);
				});

				tr4.append($(`<td class="columnName">Temp(°C)</td>`));
				weathers.forEach((w) => {
					tr4.append(`<td>${w.main.temp}°C</td>`);
				});

				tr5.append($(`<td class="columnName">Wind(km/h)</td>`));
				weathers.forEach((w) => {
					tr5.append(`<td>${w.wind.speed}</td>`);
				});

				tr1.appendTo("#hourly-table-head");
				tr2.appendTo("#hourly-table-body");
				tr3.appendTo("#hourly-table-body");
				tr4.appendTo("#hourly-table-body");
				tr5.appendTo("#hourly-table-body");
			},
			error: function (e) {
				$(".main-container").hide();
				$(".error-container").show();
			},
		});
	} else alert("invalid city name");
}
