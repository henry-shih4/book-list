let key = "iE2grWsZsq8mkbil2FkrjUoCB3vk3uI4";
let form = document.getElementById("form");
let bookList;
let bookCategory = "Manga";

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
  header.textContent = `Category: ${data.results.display_name}`;
  header2.textContent = `Best Seller Date: ${data.results.bestsellers_date}`;

  bookList.append(header, header2);

  for (let i = 0; i < books.length; i++) {
    let para = document.createElement("p");
    para.textContent = data.results.books[i].title;
    bookList.append(para);
  }
}
