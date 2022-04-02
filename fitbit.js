// retreive current date
let date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
if (month < 10) month = "0" + month;
if (day < 10) day = "0" + day;
let today = year + "-" + month + "-" + day;

// my fitbit token
const access_token =
	"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzg5Q0QiLCJzdWIiOiI0M1BHRFYiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd3BybyB3bnV0IHdzbGUgd3dlaSB3c29jIHdzZXQgd2FjdCB3bG9jIiwiZXhwIjoxNjUwNTUwNDE2LCJpYXQiOjE2NDc5NTg0MTZ9.rxaM9ibMMaTpOGQ-k7aYaiIs7CB9J8ydNHuGcIsAA20";

activityUrl = `https://api.fitbit.com/1/user/-/activities/date/${today}.json`;
foodUrl = `https://api.fitbit.com/1/user/-/foods/log/caloriesIn/date/${today}/1d.json`;

function jsonFromResponse(response) {
	console.log(response);
	if (!response.ok) {
		throw Error("Error");
	}
	return response.json();
}

const getWithAuth = {
	method: "GET",
	headers: { Authorization: "Bearer " + access_token },
};

Promise.all([
	fetch(activityUrl, getWithAuth).then(jsonFromResponse),
	fetch(foodUrl, getWithAuth).then(jsonFromResponse),
]).then(([data, foodData]) => {
	console.log({ data, foodData });

	// add calories out data to html
	let caloriesBurned = `<p>Calories Burned: <span class="text-danger">${data.summary.caloriesOut} </span></p>`;
	document.querySelector("#calories-burned").innerHTML = caloriesBurned;

	// add calories out foodData to html
	let caloriesEaten = `<p>Calories Eaten: <span class="text-success">${foodData["foods-log-caloriesIn"][0].value}</span> </p>`;
	document.querySelector("#calories-eaten").innerHTML = caloriesEaten;

	let calorieDeficit = '<p>Desired Deficit: <span class="text-warning">500 </span></p>';
	document.querySelector("#calorie-deficit").innerHTML = calorieDeficit;

	// adds bmr data to html
	const bmr = `<p>BMR: ${data.summary.caloriesBMR}</p>`;
	document.querySelector("#bmr").innerHTML = bmr;

	// add floor count data to html
	const floorCount = `<p>Floor Count: ${data.summary.floors}</p>`;
	document.querySelector("#floor-count").innerHTML = floorCount;

	// add step count data to html
	const stepCount = `<p>Step Count: ${data.summary.steps}</p>`;
	document.querySelector("#step-count").innerHTML = stepCount;

	// add resting heart rate data to html
	const restingHeartRate = `<p>Resting Heart Rate: ${data.summary.restingHeartRate}</p>`;
	document.querySelector("#heart-rate").innerHTML = restingHeartRate;

	calorieDeficit = 500;

	// redeclaring variable from activity url
	caloriesBurned = data.summary.caloriesOut;

	// redeclaring variable from food url
	caloriesEaten = foodData["foods-log-caloriesIn"][0].value;

	const caloriesAvailable = `<p> Calories Available<span class="text-success"> Right Now</span>: ${
		caloriesBurned - caloriesEaten - calorieDeficit} </p>`;
	document.querySelector("#calories-available").innerHTML = caloriesAvailable;
});
