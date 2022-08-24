let key = "iE2grWsZsq8mkbil2FkrjUoCB3vk3uI4";
let form = document.getElementById("form");
let container = document.getElementById("container");
let bookList;
let bookCategory;

form.addEventListener("submit", fetchResults);

function fetchResults(e) {
  e.preventDefault();
  let date = document.getElementById("date").value;
  let bookCategory = document.getElementById("category").value;
  let url = `https://api.nytimes.com/svc/books/v3/lists/${date}/${bookCategory}.json?api-key=${key}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => displayResults(data))
    .catch((error) => console.log("error fetching data"));
}

function displayResults(data) {
  console.log(data);
  let books = data.results.books;
  bookList = document.getElementById("book-list");
  bookList.innerText = "";

  let header = document.createElement("h2");
  let header2 = document.createElement("h3");

  header.textContent = `Top ${books.length} Books in ${data.results.display_name}`;
  header.className = "header";

  header2.textContent = `Best Seller Date: ${data.results.bestsellers_date}`;
  header2.className = "header";

  bookList.append(header, header2);

  let divTitles = document.createElement("div");
  divTitles.className = "books titles";
  let divAuthors = document.createElement("div");
  divAuthors.className = "authors titles";
  let divCombined = document.createElement("div");
  divCombined.className = "book-combined";

  for (let i = 0; i < books.length; i++) {
    let bookTitle = data.results.books[i].title;
    let bookAuthor = data.results.books[i].author;

    let titleCase = bookTitle
      .toLowerCase()
      .split(" ")
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");

    let paraTitle = document.createElement("p");
    paraTitle.textContent = `${i + 1}. ${titleCase}`;

    let paraAuthor = document.createElement("p");
    paraAuthor.textContent = `${bookAuthor}`;

    divTitles.append(paraTitle);
    divAuthors.append(paraAuthor);
    divCombined.append(divTitles, divAuthors);
    bookList.append(divCombined);
  }
}
