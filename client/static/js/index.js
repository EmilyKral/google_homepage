const luckyButton = document.querySelector("#lucky-button");
const searchButton = document.querySelector("#search-button");
const mainSearch = document.querySelector("#main-search");

luckyButton.addEventListener("click", feelingLucky);
searchButton.addEventListener("click", search);

function feelingLucky(e) {
	e.preventDefault();
	let searchTerm = mainSearch.value;
	searchTerm = searchTerm.trim().toLowerCase();
	fetch(`http://localhost:3000/search/${searchTerm}/random`)
	.then(response => response.json())
	.then(data => {
		if(data.url){
			window.location = data.url;
		} else {
			storeSearchResult(searchTerm);
			location.href = "./search-results.html";
		}
		});
}

function search(e) {
	e.preventDefault();
	let searchTerm = mainSearch.value;
	if (searchTerm) {
		storeSearchResult(searchTerm);
		location.href = "./search-results.html";
	}
}

function storeSearchResult(searchTerm) {
	const options = {
		method: "PUT",
		body: JSON.stringify({ searchTerm: searchTerm }),
		headers: {
			"Content-Type": "application/json"
		}
	};

	fetch("http://localhost:3000/store", options);
}
