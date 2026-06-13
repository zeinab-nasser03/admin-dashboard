// Elements

const body = document.body;

const themeToggler =
    document.querySelector(".theme-toggler");

const menuBtn =
    document.getElementById("menu-btn");

const closeBtn =
    document.getElementById("close-btn");

const sidebar =
    document.getElementById("sidebar");

const modal =
    document.getElementById("modal");

const openModalBtn =
    document.getElementById("openModal");

const closeModalBtn =
    document.getElementById("closeModal");

const productForm =
    document.getElementById("productForm");

const productTable =
    document.querySelector("#productTable tbody");

const searchInput =
    document.getElementById("searchProduct");

// Local Storage

let products =
    JSON.parse(localStorage.getItem("products"))
    || [];

// Dark Mode

if(localStorage.getItem("theme") === "dark"){

    body.classList.add("dark-theme");

}

themeToggler.addEventListener("click", () => {

    body.classList.toggle("dark-theme");

    if(body.classList.contains("dark-theme")){

        localStorage.setItem("theme","dark");

    }
    else{

        localStorage.setItem("theme","light");

    }

});

// Mobile Sidebar

menuBtn.addEventListener("click", () => {

    sidebar.classList.add("show");

});

closeBtn.addEventListener("click", () => {

    sidebar.classList.remove("show");

});

// Modal

openModalBtn.addEventListener("click", () => {

    modal.style.display = "flex";

});

closeModalBtn.addEventListener("click", () => {

    modal.style.display = "none";

});

window.addEventListener("click", (e) => {

    if(e.target === modal){

        modal.style.display = "none";

    }

});

// Save Products

function saveProducts(){

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

}

// Render Products

function renderProducts(){

    productTable.innerHTML = "";

    products.forEach((product,index) => {

        const row =
        document.createElement("tr");

        row.innerHTML = `
            <td>${product.name}</td>
            <td>$${product.price}</td>
            <td>${product.category}</td>
            <td>
                <button
                class="deleteBtn"
                data-index="${index}">
                Delete
                </button>
            </td>
        `;

        productTable.appendChild(row);

    });

}

// Add Product

productForm.addEventListener(
"submit",
function(e){

    e.preventDefault();

    const name =
    document.getElementById("productName")
            .value
            .trim();

    const price =
    document.getElementById("productPrice")
            .value
            .trim();

    const category =
    document.getElementById("productCategory")
            .value;


    if(
        name === "" ||
        price === "" ||
        category === ""
    ){

        alert(
        "Please fill all fields."
        );

        return;
    }

    if(Number(price) <= 0){

        alert(
        "Price must be greater than 0."
        );

        return;
    }

    const product = {

        name,
        price,
        category

    };

    products.push(product);

    saveProducts();

    renderProducts();

    productForm.reset();

    modal.style.display = "none";

});

// Delete Product

document.addEventListener(
"click",
function(e){

    if(
      e.target.classList.contains(
      "deleteBtn")
    ){

        const index =
        e.target.dataset.index;

        const confirmDelete =
        confirm(
        "Are you sure you want to delete this product?"
        );

        if(confirmDelete){

            products.splice(index,1);

            saveProducts();

            renderProducts();

        }

    }

});

// Search Product

searchInput.addEventListener(
"keyup",
function(){

    const value =
    this.value.toLowerCase();

    const rows =
    document.querySelectorAll(
    "#productTable tbody tr"
    );

    rows.forEach(row => {

        const text =
        row.textContent.toLowerCase();

        if(text.includes(value)){

            row.style.display = "";

        }
        else{

            row.style.display = "none";

        }

    });

});

renderProducts();
