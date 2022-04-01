const access_token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzg5Q0QiLCJzdWIiOiI0M1BHRFYiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd3BybyB3bnV0IHdzbGUgd3dlaSB3c29jIHdzZXQgd2FjdCB3bG9jIiwiZXhwIjoxNjUwNTUwNDE2LCJpYXQiOjE2NDc5NTg0MTZ9.rxaM9ibMMaTpOGQ-k7aYaiIs7CB9J8ydNHuGcIsAA20"

fetch('https://api.fitbit.com/1/user/-/activities/date/2021-03-06.json', {
  method: "GET",
  headers: {"Authorization": "Bearer " + access_token}
})
.then(response => response.json())
.then(json => console.log(json))