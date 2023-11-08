const storedCart = JSON.parse(localStorage.getItem("cart"));
const cart = storedCart || [];

const fetchData = () => {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        throw new Error("DOWNLOAD API ERROR");
      }
      return response.json();
    })
    .then((books) => {
      console.log(books);
      const cardsDiv = document.getElementById("cards-div");

      books.forEach((book) => {
        const divRow = document.createElement("div");
        divRow.className = "g-1 col-6 col-md-4 col-lg-3 col-xl-2 align-items-center ";
        const divCard = document.createElement("div");
        divCard.className = "border border-secondary";
        const img = document.createElement("img");
        img.className = "card-img-top";
        img.src = book.img;
        img.style = "height:350px;";
        const divCardBody = document.createElement("div");
        divCardBody.className = "card-body bg-info-subtle p-2";
        const h5 = document.createElement("h5");
        h5.className = "card-title";
        h5.innerText = book.title;
        const p = document.createElement("p");
        p.className = "card-text";
        p.innerText = book.price;
        const a = document.createElement("a");
        a.className = "btn btn-primary mb-3";
        a.innerText = "Scarta";
        const button = document.createElement("button");
        button.className = "btn btn-success";
        button.innerText = "Aggiungi al carrello";

        divCardBody.appendChild(h5);
        divCardBody.appendChild(p);
        divCardBody.appendChild(a);
        divCardBody.appendChild(button);
        divCard.appendChild(img);
        divCard.appendChild(divCardBody);
        divRow.appendChild(divCard);
        cardsDiv.appendChild(divRow);
        a.addEventListener("click", function (e) {
          divRow.remove();
        });
        button.addEventListener("click", function (e) {
          cart.push(book);
          addToCart();

          //   list.innerHTML = cart.map((cartBook) => `<li class="list-group-item">${cartBook.title}</li>`).join("");

          localStorage.setItem("cart", JSON.stringify(cart));
        });
      });
    });
};
window.onload = function () {
  fetchData();
  addToCart();
};

const addToCart = function () {
  list.innerHTML = "";
  cart.forEach((cartBook) => {
    const list = document.getElementById("list");
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.innerText = cartBook.title;
    list.appendChild(li);
  });
};
