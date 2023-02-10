const cont = document.querySelector("#productInf");
const recomdation = document.querySelector(".recommendations")
// console.log(recom)
let id = JSON.parse(localStorage.getItem("basket"))
const newItem = (title, desc, id, source, price, country, dostavka, producer, sex, clothtype) => {
    return `
        <div class="em">
            <h2>${title}</h2>
            <div id="${id}" class="em__block">
                <div class="em__block__image">
                    <img src=${source}>
                </div>
                <div class="em__block__text">
                    <p>Описание: ${desc}</p>     
                    <p>Страна производитель: ${country}</p>     
                    <p>Доставка в течении: ${dostavka} дней</p> 
                    <p>Производитель: ${producer}</p> 
                    <p>Пол: ${sex} </p> 
                </div>
                <div class=em__block__price>
                    <h3>Этот ${title} стоит ${price} $</h3>
                    <a href="../cart/cart.html">
                        <button class="hot" id="${id}" onclick="addToBasketStorage(event)">
                        Добавить в корзину
                        </button>
                    </a>
                        <button class="hot" id="${id}" onclick="addFavoritesFromDB(${id})">
                        Добавить в избранное
                        </button>
                    <div>
                        <i class="fa-regular fa-bookmark"></i>
                        <i class="fa-solid fa-triangle-exclamation"></i>
                    </div>
                </div>    
            </div>  
            <div>
                <a href="../index.html">Вернуться назад</a>
            </div>  
        </div>       
    `}
    
const newI = (title, desc, id, source, price) => {
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

let currentItem = []
function getIte(id) {
    fetch(`http://localhost:8000/products/${id}`)
    .then((resp) => resp.json())
    .then((data) => {
     currentItem = data
     console.log(data)
     console.log(currentItem)
     console.log(currentItem.sex)
     
    userRecom(currentItem.sex)
})
}
getIte(id)

let filtered = []
function userRecom (name) {
    fetch("http://localhost:8000/products")
        .then((resp) => resp.json())
        .then((data) => {
            const filteredArray = data.filter((item) => item.sex === name)
            // const newArr = 
            console.log(filteredArray);
            filtered = filteredArray
            displayRecom()
})
}

function displayRecom() {
    let newCard = ""
    if (filtered.length) {
    filtered.forEach((item, index, arr) => {
        newCard += newI(item.title, item.desc, item.id, item.source, item.price)
        recomdation.innerHTML = newCard
    })
    } else {
        newCard = ""
        recomdation.innerHTML = newCard
    }
 }


let inbasket = []
const addToBasketStorage = (event) => {
    let productId = event.currentTarget.id
    inbasket.push(productId)
    localStorage.setItem("inbasket", JSON.stringify(inbasket))
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

const goDetails = (event) => {
    var productId = event.currentTarget.id

    basket.push(productId)
    localStorage.setItem("basket", JSON.stringify(basket))
}
function removeItem(id) {
    fetch(`http://localhost:8000/favorites/${id}`, {
        method: "DELETE"
    }).finally(() => {
        getBasket()
    })
}

let infoArray = []
function getInfo(id) {
    fetch(`http://localhost:8000/products/${id}`)
    .then((res) => res.json())
    .then((data) => {
        infoArray.push(data)
        // console.log(infoArray)  
    }).finally(() => displayInfo())
}

getInfo(parseInt(id))

function displayInfo() {
    let newcard = ""
    infoArray.forEach((item, index, arr) => {
        newcard += newItem(item.title, item.desc, item.id, item.source,
             item.price, item.country, item.dostavka, item.producer,
             item.sex, item.clothtype)
        cont.innerHTML = newcard
    })
}

// let recomArray = []
// function displayRecom () {
//     let newRecom ="" 
//     infoArray.forEach((item) => {
//         newRecom += newRec(item.title, item.desc, item.id, item.source,
//             item.price)

//         recomdation.innerHTML = newRecom
//     })
// }