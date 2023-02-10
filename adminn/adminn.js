const container = document.querySelector(".products");
const form = document.querySelector(".add-form");
const formEdit = document.querySelector(".edit-form");
const inputTitle = form.querySelector("#name");
const inputDesc = form.querySelector("textarea");
const inputPicture = form.querySelector("#picture");
const inputPrice = form.querySelector("#price");
const inputCountry = form.querySelector("#country");
const inputDostavka = form.querySelector("#dostavka");
const inputProducer = form.querySelector("#producer");
const inputSex = form.querySelector("#sex");
const inputClothType = form.querySelector("#cloth-type");
const inputTitleEdit = formEdit.querySelector("#nameEdit");
const inputPictureEdit = formEdit.querySelector("#pictureEdit");
const inputPriceEdit = formEdit.querySelector("#priceEdit");
const inputDescEdit = formEdit.querySelector("textarea");
const inputCountryEdit = formEdit.querySelector("#countryEdit");
const inputDostavkaEdit = formEdit.querySelector("#dostavkaEdit");
const inputProducerEdit = formEdit.querySelector("#producerEdit");
const inputSexEdit = formEdit.querySelector("#sexEdit");
const inputClothTypeEdit = formEdit.querySelector("#cloth-typeEdit");
const basketContainer = document.querySelector(".basket")

console.log(inputClothType)
console.log(inputClothType.options[inputClothType.selectedIndex].text)
// console.log(inputClothType.options[inputClothType.selectedIndex].value)
// console.log(inputPicture)
const newItem = (title, desc, id, source, price, withForAdmin = true) => {
    return `
            <div class="products__item" id="${id}">
                <div class="products__item__imageblock">
                    <img id="image-${id}" src=${source} alt="">
                </div>
                <div class="products__item__textblock">
                    <h3 id="title">${title}</h3>
                    <p id="description">${desc}</p>
                </div>
                <div class="products__item__btns">
                    <div class="for_user">
                        <i onclick="addBasketFromDB(${id})" class="fa-solid fa-cart-shopping"></i>
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
                <div>
                    <h3 id="price">${price}</h3>
                </div>
            </div>
            `}


let cardsArray = []
let basket = []

function getProducts() {
    fetch("http://localhost:8000/products")
    .then((res) => res.json())
    .then((data) => {
        cardsArray = data
        displayCards()
    })
}
getProducts()
// console.log(cardsArray)

function addProduct(newObject) {
    fetch("http://localhost:8000/products", {
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
            title: inputTitle.value,
            desc: inputDesc.value,
            source: inputPicture.value,
            price: inputPrice.value,
            country: inputCountry.value,
            dostavka: inputDostavka.value,
            producer: inputProducer.options[inputProducer.selectedIndex].text,
            sex: inputSex.options[inputSex.selectedIndex].text,
            clothtype: inputClothType.options[inputClothType.selectedIndex].text,
            favorites: false,
            basket: false
        }
        addProduct(obj)
        inputTitle.value = ""
        inputDesc.value = ""
        inputPicture.value = ""
        inputPrice.value = ""
        inputCountry.value = ""
        inputDostavka.value = ""
        inputProducer.value = ""

        event.target.setAttribute("id", "")
 }


 function displayCards() {
    let newCard = ""
    if (cardsArray.length) {
    cardsArray.forEach((item, index, arr) => {
        newCard += newItem(item.title, item.desc, item.id, item.source, item.price)
        container.innerHTML = newCard
    })
    } else {
        newCard = ""
        container.innerHTML = newCard
    }
 }
 //for deleting

 function removeItem(id) {
    fetch(`http://localhost:8000/products/${id}`, {
        method: "DELETE"
    }).finally(() => {
        getProducts()
    })
    // displayCards()
 }

// for editing

function editItem(id) {
    
    let item = document.getElementById(`${id}`)
    let title = item.querySelector("#title").innerHTML
    let desc = item.querySelector("#description").innerHTML
    let picture = item.querySelector(`#image-${id}`)
    let price = item.querySelector("#price")
    console.log(title)
    console.log(desc)
    inputTitleEdit.value = title
    inputDescEdit.value = desc
    inputPictureEdit.value = picture.src
    inputPriceEdit.value = price.value
    formEdit.setAttribute("id", `${id}`)
}

function editItemFetch(id, newObj) {
fetch(`http://localhost:8000/products/${id}`, {
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
        let newObj = {
            title: inputTitleEdit.value,
            desc: inputDescEdit.value,
            price: inputPriceEdit.value,
            country: inputCountryEdit.value,
            dostavka: inputDostavkaEdit.value,
            producer: inputProducerEdit.options[inputProducerEdit.selectedIndex].text,
            sex: inputSexEdit.options[inputSexEdit.selectedIndex].text,
            clothtype: inputClothTypeEdit.options[inputClothTypeEdit.selectedIndex].text,
        }
        editItemFetch(formId, newObj)
        // errorFieldEdit("")
        inputTitleEdit.value = ""
        inputDescEdit.value = "" 
        formEdit.setAttribute("id", "")
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

