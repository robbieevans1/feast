// variable to target specific html elements
const searchForm = document.querySelector(".search");
const input = document.querySelector(".newsInput");
const newsList = document.querySelector(".news-list");

// listens for sumbit of news form
searchForm.addEventListener("submit", retrieve);

// funtion to return news articls and add them to html
function retrieve(e) {
	if (input.value == "") {
		alert("Please search for a topic");
		return;
	}

	newsList.innerHTML = "";
	e.preventDefault();

	const apiKey = "f48fe9f6872f4171b08493ed8a0bc110";
	let topic = input.value;

	let url = `https://newsapi.org/v2/everything?q=${topic}&apiKey=${apiKey}`;

	fetch(url)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			console.log(data);
			data.articles.forEach((article) => {
				let li = document.createElement("li");
				let a = document.createElement("a");
				a.classList.add('news-text')
        li.classList.add('news-url')
				a.setAttribute("href", article.url);
				a.setAttribute("target", "_blank");
				a.textContent = article.title;
				li.appendChild(a);
				newsList.appendChild(li);
			});
		});
}
