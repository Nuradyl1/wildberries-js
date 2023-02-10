const container = document.querySelector(".products");
const form = document.querySelector(".add-form");
const formEdit = document.querySelector(".edit-form");
const inputTitle = form.querySelector("input");
const inputDesc = form.querySelector("textarea");
const inputTitleEdit = formEdit.querySelector("input");
const inputDescEdit = formEdit.querySelector("textarea");
const basketContainer = document.querySelector(".basket")

const newItem = (title, desc, id, withForAdmin = true) => {
    return `
            <div class="products__item" id="${id}">
                <div class="products__item__imageblock">
                    <img src="https://cdn.thewirecutter.com/wp-content/media/2022/07/laptop-under-500-2048px-acer-1.jpg" alt="">
                </div>
                <div class="products__item__textblock">
                    <h3>${title}</h3>
                    <p>${desc}</p>
                </div>
                <div class="products__item__btns">
                    <div class="for_user">
                        <i onClick="addBasketFromDB(${id})" class="fa-solid fa-cart-shopping"></i>
                        <i class="fa-regular fa-bookmark"></i>
                    </div>
                    ${withForAdmin ? 
                        `<div class="for_admin">
                            <i onclick="editItem(${id})" class="fa-solid fa-pen-to-square"></i>
                            <i onclick="removeItem(${id})" class="fa-solid fa-trash"></i>
                        </div>`
                        : ""
                    }
                </div>
            </div>
            `}

const errorField = (error) => {
    form.querySelector("span").innerHTML = error
} 
const errorFieldEdit = (error) => {
    formEdit.querySelector("span").innerHTML = error
} 
let cardsArray = []
let basket = []

function getProducts() {
    fetch("http://localhost:8080/products")
    .then((res) => res.json())
    .then((data) => {
        cardsArray = data
        displayCards()
    })
}
getProducts()

function addProduct(newObject) {
    fetch("http://localhost:8080/products", {
        method: "POST",
        body: JSON.stringify(newObject),
        headers: {
            "Content-Type": "application/json"
        }
    }).finally(() => {
        getProducts()
    })
}

const onSubmit = (event) => {
    event.preventDefault();

    let obj = {
        // id: 0,
        title: "",
        desc: "",
        favorites: false,
        basket: false
    }

    if (inputTitle.value && inputDesc.value) {
        obj = {
            ...obj,
            title: inputTitle.value,
            desc: inputDesc.value
        }
        errorField("")
        addProduct(obj)
        //cardsArray.push(obj)
        //displayCards()
        inputTitle.value = ""
        inputDesc.value = ""
        event.target.setAttribute("id", "")
    } else if (inputTitle.value && !inputDesc.value) {
        errorField("Не поля описания")
    } else if (!inputTitle.value && inputDesc.value) {
        errorField("Не поля заголовка")
    } else {
        errorField("Заполните все поля")
    }
 }


 function displayCards() {
    let newCard = ""
    if (cardsArray.length) {
    cardsArray.forEach((item, index, arr) => {
        // item.id = index
        newCard += newItem(item.title, item.desc, item.id)
        container.innerHTML = newCard 
    })
    } else {
        newCard = ""
        container.innerHTML = newCard
    }
 }


 //for deleting

 function removeItem(id) {
    // console.log(id)
    // cardsArray = cardsArray.filter((item, index, arr) => item.id == id)
    fetch(`http://localhost:8080/products/${id}`, {
        method: "DELETE"
    }).finally(() => {
        getProducts()
    })
    // displayCards()
 }

// for editing

function editItem(id) {
    let item = document.getElementById(`${id}`)
    let title = item.querySelector("h3").innerHTML
    let desc = item.querySelector("p").innerHTML
    inputTitleEdit.value = title
    inputDescEdit.value = desc
    formEdit.setAttribute("id", `${id}`)
}

function editItemFetch(id, newObj) {
fetch(`http://localhost:8080/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify(newObj),
    header: {
        "Conten-Type": "application/json"
    }
}).finally(() => {
    getProducts()
})
}

function onEdit(event) {
    event.preventDefault();

    const formId = event.target.id

    if (inputTitleEdit.value && inputDescEdit.value) {
        let newObj = {
            title: inputTitleEdit.value,
            desc: inputDescEdit.value
        }
        editItemFetch(formId, newObj)
        // cardsArray.forEach((item, index) => {
        //     if( item.id === parseInt(formId)) {
        //         item.title = inputTitleEdit.value
        //         item.desc = inputDescEdit.value
        //     }
        // })
        errorFieldEdit("")
        // displayCards()
        inputTitleEdit.value = ""
        inputDescEdit.value = "" 
        formEdit.setAttribute("id", "")
    } else if (inputTitleEdit.value && !inputDescEdit.value) {
        errorFieldEdit("Не поля описания")
    } else if (!inputTitleEdit.value && inputDescEdit.value) {
        errorFieldEdit("Не поля заголовка")
    } else {
        errorFieldEdit("Заполните все поля")
    }
}


const addBasketFromDB = (id) => {
    fetch(`http://localhost:8080/products/${id}`)
    .then((res) => res.json())
    .then((data) => console.log(data))
}

const addItemToStorage = (item) => {
    basket.push(item)
    localStorage.setItem("basket", JSON.stringify(basket))
}

function toggleBasket() {
    basketContainer.classList.toggle("on")

    basket = JSON.parse(localStorage.getItem("basket"))

    if(basket.length) {
        let all_items = ""
        basket.forEach((item) => {
            all_items += newItem(item.title, item.desc, item.id, false)
     })

     basketContainer.innerHTML = all_items
    } else {
        basketContainer.innerHTML = "No goods found"
    }
}

