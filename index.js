const container = document.querySelector(".products-display");
// const featbtn = document.querySelector(".feat-btn")
// const featshow = document.querySelector('.feat-show')
// const first = document.querySelector('.first')
// const servbtn = document.querySelector(".serv-btn")
// const servshow = document.querySelector(".serv-show")
// const second = document.querySelector(".second")

// var hamburger = document.querySelector(".hamburger");
// hamburger.addEventListener("click", function(){
//     document.querySelector("body").classList.toggle("active");
// })

const newItem = (title, desc, id, source, price) => {
    return `
        <div class="tem">
            <a id="${id}" href="./basket/basket.html" onclick="goDetails(event)">
                <div id="${id}" >
                    <div class="tem__imageblock">
                        <img src=${source}>
                    </div>
                    <div class="tem__textblock">
                        <h4>${title}</h4>
                        <h4>${price}</h4>
                    </div>
                </div>    
            </a>
            <div class="tem__btns">
                <div class="for_user">
                    <i onclick="addBasketFromDB(${id})" class="fa-solid fa-cart-shopping"></i>
                    <i onclick="addFavoritesFromDB(${id})" class="fa-regular fa-bookmark"></i>
                </div>
            </div> 
        </div>       
    `}
            
let productsArray = []
function getProducts() {
    fetch("http://localhost:8000/products")
    .then((res) => res.json())
    .then((data) => {
        productsArray = data
        // console.log(productsArray)
        displayCards()
    })
}
getProducts()

function displayCards() {
    let newCard = ""
    if (productsArray.length) {
    productsArray.forEach((item, index, arr) => {
        newCard += newItem(item.title, item.desc, item.id, item.source, item.price)
        container.innerHTML = newCard
        // console.log(container)
    })
    } else {
        newCard = ""
        container.innerHTML = newCard
    }
 }

 let basketon = []
 const addBasketFromDB = (id) => {
    fetch(`http://localhost:8000/products/${id}`)
    .then((res) => res.json())
    .then((data) => {
        basketon.push(data)
        console.log(basketon)
        pushToDB(basketon)
    })
}

let favorites = []
 const addFavoritesFromDB = (id) => {
    fetch(`http://localhost:8000/products/${id}`)
    .then((res) => res.json())
    .then((data) => {
        favorites.push(data)
        console.log(favorites)
        pushToD(favorites)
    })
}

function pushToD(variable) {
    if (variable.length) {
        variable.forEach((item, index, arr) => {
            fetch("http://localhost:8000/favorites", {
                method: "POST",
                body: JSON.stringify(item),
                headers: {
                    "Content-Type": "application/json"
                }
            }).finally(() => {
        })
    })
}}
function pushToDB(variable) {
    if (variable.length) {
        variable.forEach((item, index, arr) => {
            fetch("http://localhost:8000/basket", {
                method: "POST",
                body: JSON.stringify(item),
                headers: {
                    "Content-Type": "application/json"
                }
            }).finally(() => {
        })
    })
}}

var basket = []
const goDetails = (event) => {
    var productId = event.currentTarget.id

    basket.push(productId)
    localStorage.setItem("basket", JSON.stringify(basket))
}


const successCallback = (position) => {
    console.log(position);
  };
  
  const errorCallback = (error) => {
    console.log(error);
  };

// const location = (event) => {
//     event.preventDefault;
//     navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
// }



// let list = []
// fetch(`http://localhost:8000/products`, {})
// .then((res) => res.json())
// .then((data) => list = data)
// let total = 0
// let listprice = []
// for (let index in list){

//     let curObj = list[index];

//     curObj = curObj['price'] * 1.2
//     listprice.push(curObj) 
//     total +=curObj   
// }
// let list = []
// fetch(`http://localhost:8000/products/[price]`, {})
// .then((res) => res.json())
// .then((data) => console.log(data))

// let total = 0
// let listprice = []
// for (let index in list){

//     let curObj = list[index];

//     curObj = curObj['price'] * 1.2
//     listprice.push(curObj) 
//     total +=curObj   
// }