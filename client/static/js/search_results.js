const searchBar = document.querySelector("#searchbar");
searchBar.addEventListener("keyup", searchAgain);

function fetchResults() {
	fetch("http://localhost:3000/store")
		.then(response => response.json())
		.then(displayResults);
}

function searchAgain(e) {
	let searchTerm = searchBar.value;
	if (e.key === "Enter") {
		storeSearchResult(searchTerm);
		setTimeout(fetchResults, 0);
	}
}

function displayResults(data) {
	removeResults();
	searchBar.value = data.searchTerm;
	let search = data.searchTerm.trim().toLowerCase();
	fetch(`http://localhost:3000/search/${search}`)
		.then(response => response.json())
		.then(data => {
			addAllResults(data.sites);
		})
		.catch(noResultsFound);
}

function noResultsFound() {
	let noResultsP = document.createElement("p");
	noResultsP.textContent = "No results found for this search term";
	noResultsP.style.fontSize = "20px";
	let main = document.querySelector("main");
	main.appendChild(noResultsP);
}

function addAllResults(array) {
	array.forEach(result => addResult(result));
}

function addResult(result) {
	const url = result.url;
	const title = result.title;
	const description = result.description;
	createResultSection(url, title, description);
}

function removeResults() {
	const main = document.querySelector("main");
	while (main.firstChild) {
		main.firstChild.remove();
	}
}

function makeShortUrl(url) {
	const spliturl = url.slice(8).split("/");
	const shorturl = "http://" + spliturl[0];
	return shorturl;
}

function createResultSection(url, title, desc) {
	let urlPara = document.createElement("p");
	urlPara.className = "url";
	urlPara.textContent = makeShortUrl(url);

	let heading = document.createElement("h3");
	heading.textContent = title;
	heading.style.fontSize = "20px";
	heading.style.paddingTop = "5px";
	heading.style.marginBottom = "3px";
	heading.style.fontWeight = "normal";

	let descPara = document.createElement("p");
	descPara.className = "description";
	descPara.textContent = desc;

	let link = document.createElement("a");
	link.setAttribute("href", url);
	link.appendChild(heading);
	link.style.textDecoration = "none";
	link.style.color = "#1a0dab";

	let section = document.createElement("section");
	section.className = "result";
	section.appendChild(urlPara);
	section.appendChild(link);
	section.appendChild(descPara);
	section.style.fontFamily = "arial, sans-serif";

	let main = document.querySelector("main");
	main.appendChild(section);
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

fetchResults();
