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
    .catch((error) => errorMessage());
}

function displayResults(data) {
  console.log(data);
  let books = data.results.books;
  bookList = document.getElementById("book-list");
  bookList.innerText = "";
  // document.getElementById("date").value = "";
  // document.getElementById("category").value = "Categories";
  let headerCategory = document.createElement("h2");
  let headerDate = document.createElement("h3");

  headerCategory.textContent = `Top ${books.length} Books in ${data.results.display_name}`;
  headerCategory.className = "header category";

  headerDate.textContent = `Best Seller Date: ${data.results.bestsellers_date}`;
  headerDate.className = "header best-seller-date";
  bookList.append(headerCategory, headerDate);

  let titleAuthorHeader = document.createElement("div");
  let titleHeader = document.createElement("div");
  let authorHeader = document.createElement("div");
  titleHeader.textContent = "Book Title";
  authorHeader.textContent = "Author Name";
  titleAuthorHeader.append(titleHeader, authorHeader);
  titleAuthorHeader.className = "title-author-header";
  bookList.append(titleAuthorHeader);

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
    paraAuthor.textContent = `${i + 1}. ${bookAuthor}`;

    divTitles.append(paraTitle);
    divAuthors.append(paraAuthor);
    divCombined.append(divTitles, divAuthors);
    bookList.append(divCombined);
  }
}

function errorMessage() {
  bookList = document.getElementById("book-list");
  bookList.innerText = "No results found.";
}
