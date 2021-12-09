"use strict"
let productNameInput = document.getElementById("productName");
let productPriceInput = document.getElementById('productPrice');
let productCategoryInput = document.getElementById('productCategory');
let productDescInput = document.getElementById('productDesc');
let myBtn = document.getElementById('mainBtn');
let updateBtn = document.getElementById('upBtn');
let updatBtn = document.getElementById('updateBtn');
let deleteBtn = document.getElementById('deleteBtn');
let search = document.getElementById('productSearch');
let productsContainer = [];

if (localStorage.getItem('ourProducts') != null) {
    productsContainer = JSON.parse(localStorage.getItem('ourProducts'));
    displayProduct();
}

function addProduct() {
    if (
        validateProductName() &&
        productPriceInput.value != "" &&
        productCategoryInput.value != "" &&
        productDescInput.value != ""
    ) {
        let products = {
            name: productNameInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            desc: productDescInput.value
        }
        productsContainer.push(products);
        localStorage.setItem('ourProducts', JSON.stringify(productsContainer));
        displayProduct()
        clearProduct()
    } else {

        document.getElementById("lastAlert").classList.remove("d-none");
        document.getElementById("lastAlert").classList.add("d-block");

    }
}

myBtn.addEventListener('click', addProduct);

function displayProduct() {

  let  productBox = ``;
    for (let i = 0; i < productsContainer.length; i++) {
        productBox += `     <tr>
        <td>${i}</td>
        <td>${productsContainer[i].name}</td>
        <td>${productsContainer[i].price}</td>
        <td>${productsContainer[i].category}</td>
        <td>${productsContainer[i].desc}</td>
        <td><button onclick='retriveProduct(${i})' id='updateBtn' class=" btn btn-outline-warning m-2">Update</button></td>
        <td><button onclick='deleteProduct(${i})' id='deleteBtn' class=" btn btn-outline-danger m-2">Delete</button></td>
    </tr>`

    }
    document.getElementById('tableBody').innerHTML = productBox;
}
function clearProduct() {

    productNameInput.value = '';
    productPriceInput.value = '';
    productCategoryInput.value = '';
    productDescInput.value = '';
}

function deleteProduct(index) {
    productsContainer.splice(index, 1);
    localStorage.setItem('ourProducts', JSON.stringify(productsContainer));
    displayProduct();

}
let pdctIndex;
function retriveProduct(index) {
    updateBtn.classList.remove('d-none');
    myBtn.classList.add('d-none');

    pdctIndex = index;

    productNameInput.value = productsContainer[pdctIndex].name;
    productPriceInput.value = productsContainer[pdctIndex].price;
    productCategoryInput.value = productsContainer[pdctIndex].category;
    productDescInput.value = productsContainer[pdctIndex].desc;
}
function updateProduct() {
    productsContainer[pdctIndex].name = productNameInput.value;
    productsContainer[pdctIndex].price = productPriceInput.value;
    productsContainer[pdctIndex].category = productCategoryInput.value;
    productsContainer[pdctIndex].desc = productDescInput.value;

    localStorage.setItem('ourProducts', JSON.stringify(productsContainer));
    displayProduct();
    clearProduct();

    updateBtn.classList.add('d-none');
    myBtn.classList.remove('d-none');

}
function searchProduct(index) {
    productBox = ``;
    for (let i = 0; i < productsContainer.length; i++) {
        if (productsContainer[i].name.toLowerCase().includes(index.toLowerCase())) {
            productBox += `     <tr>
        <td>${i}</td>
        <td>${productsContainer[i].name}</td>
        <td>${productsContainer[i].price}</td>
        <td>${productsContainer[i].category}</td>
        <td>${productsContainer[i].desc}</td>
        <td><button onclick='retriveProduct(${i})' id='updateBtn' class=" btn btn-outline-warning m-2">Update</button></td>
        <td><button onclick='deleteProduct(${i})' id='deleteBtn' class=" btn btn-outline-danger m-2">Delete</button></td>
    </tr>`
        }
    }
    document.getElementById('tableBody').innerHTML = productBox;
}

search.addEventListener('keyup', function () { searchProduct(this.value) });

function validateProductName() {
    let regexPname = /^[A-Z][a-z A-Z]{3,}/;

    if (regexPname.test(productNameInput.value) == true) {
        productNameInput.classList.add("is-valid");
        productNameInput.classList.remove("is-invalid");
        document.querySelector(".alert").classList.add("d-none");
        document.querySelector(".alert").classList.remove("d-block");

        myBtn.removeAttribute("disabled");

        return true;
    } else {
        productNameInput.classList.add("is-invalid");
        productNameInput.classList.remove("is-valid");
        document.querySelector(".alert").classList.remove("d-none");
        document.querySelector(".alert").classList.add("d-block");
        myBtn.disabled = true;
        myBtn.setAttribute("disabled", "true");

        return false;
    }
}

productNameInput.addEventListener("keyup", validateProductName);