const API_KEY = "7f9d4b67d2c749a5833c9e4e16d891fe"; //from newsapi.org
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

async function fetchNews(query) { //from news api, news is fetched
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json(); //conversion in json format
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    //to create the clone of news template
    articles.forEach((article) => {
        if (!article.urlToImage) return; //only news with imgs
        const cardClone = newsCardTemplate.content.cloneNode(true); //inside template, all the things of card should get cloned
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

//fill the data in the news card template
function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    //convert date to readable format
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    //when clicked on article, we need to go to the article URL 
    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank"); //open in new tab
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active"); //if not null
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return; // ignore i.e. has not entered as search text
    fetchNews(query); //else fetch
    curSelectedNav?.classList.remove("active"); //when searching, the selected active class to be removed
    curSelectedNav = null;
});

//when logo is clicked it shd reload
function reload() {
    window.location.reload();
}