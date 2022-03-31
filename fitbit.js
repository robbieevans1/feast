const access_token =
	"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzg5Q0QiLCJzdWIiOiI0M1BHRFYiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd3BybyB3bnV0IHdzbGUgd3dlaSB3c29jIHdzZXQgd2FjdCB3bG9jIiwiZXhwIjoxNjUwNTUwNDE2LCJpYXQiOjE2NDc5NTg0MTZ9.rxaM9ibMMaTpOGQ-k7aYaiIs7CB9J8ydNHuGcIsAA20";

fetch("https://api.fitbit.com/1/user/-/activities/date/2022-03-31.json", {
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


    const caloriesIn = `<p>Calories Eaten: ${data.summary.caloriesIn}</p>`
    document.querySelector('#calories-in').innerHTML = caloriesIn

    const floorCount = `<p>Floor Count: ${data.summary.floors}</p>`
    document.querySelector('#floor-count').innerHTML = floorCount

    const stepCount = `<p>Step Count: ${data.summary.steps}</p>`
    document.querySelector('#step-count').innerHTML = stepCount

    const restingHeartRate = `<p>Resting Heart Reate: ${data.summary.restingHeartRate}</p>`
    document.querySelector('#heart-rate').innerHTML = restingHeartRate
	});
