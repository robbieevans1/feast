// retreive current date
let date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
if (month < 10) month = "0" + month;
if (day < 10) day = "0" + day;
let today = year + "-" + month + "-" + day;

// my fitbit a
const access_token =
	"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzg5Q0QiLCJzdWIiOiI0M1BHRFYiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd3BybyB3bnV0IHdzbGUgd3dlaSB3c29jIHdzZXQgd2FjdCB3bG9jIiwiZXhwIjoxNjUwNTUwNDE2LCJpYXQiOjE2NDc5NTg0MTZ9.rxaM9ibMMaTpOGQ-k7aYaiIs7CB9J8ydNHuGcIsAA20";

fetch(`https://api.fitbit.com/1/user/-/activities/date/${today}.json`, {
	method: "GET",
	headers: { Authorization: "Bearer " + access_token },
})
	.then((response) => {
		console.log(response);
		if (!response.ok) {
			throw Error("Error");
		}
		return response.json();
	})
	.then((data) => {
		console.log(data);
		const caloriesBurned = `<p>Calories Burned: ${data.summary.caloriesOut}</p>`;
		document.querySelector("#calories-burned").innerHTML = caloriesBurned;


		const bmr = `<p>BMR: ${data.summary.caloriesBMR}</p>`;
		document.querySelector("#bmr").innerHTML = bmr;

		const floorCount = `<p>Floor Count: ${data.summary.floors}</p>`;
		document.querySelector("#floor-count").innerHTML = floorCount;

		const stepCount = `<p>Step Count: ${data.summary.steps}</p>`;
		document.querySelector("#step-count").innerHTML = stepCount;

		const restingHeartRate = `<p>Resting Heart Rate: ${data.summary.restingHeartRate}</p>`;
		document.querySelector("#heart-rate").innerHTML = restingHeartRate;
	});
