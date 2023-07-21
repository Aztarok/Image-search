const part1 = "Ix5pr1PaaY";
const part2 = "vaF5V2ZDse";
const part3 = "xm28OTKzA3";
const part4 = "gCER8Tmmp8fUM";
const final = part1 + part2 + part3 + part4;

const formElement = document.querySelector("form");
const searchInput = document.getElementById("search-input");
const results = document.querySelector(".results");
const showMore = document.getElementById("show-more");
let searchData = "";
let page = 1;

async function search() {
    searchData = searchInput.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${searchData}&client_id=${final}`;
    const response = await fetch(url);
    const data = await response.json();
    if (page === 1) {
        results.innerHTML = "";
    }
    const resultsFilter = data.results;

    resultsFilter.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        results.appendChild(imageWrapper);
    });

    page++;

    if (page > 1) {
        showMore.style.display = "block";
    }
}

formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    search();
});

showMore.addEventListener("click", () => {
    search();
});
