const basketon = document.querySelector(".container-basketon")

console.log(basketon)
const newItem = (title, desc, id, source, price, country, dostavka, producer, sex, clothtype) => {
    return `
        <div class="favorites">
        <h1>Ваши покупки</h1>
            <h2>${title}</h2>
            <div id="${id}" class="favorites__block">
                <div class="favorites__block__image">
                    <img src=${source}>
                    
                <div id="favorites__block__price">
                <h3>Этот ${title} стоит ${price} $</h3>
                
                <i onclick="removeItem(${id})" class="fa-solid fa-trash"></i>
                <div>
                </div>
            </div>
                </div>
                <div class="favorites__block__text">
                    <p>Описание: ${desc}</p>     
                    <p>Страна производитель: ${country}</p>     
                    <p>Доставка в течении: ${dostavka} дней</p> 
                    <p>Производитель: ${producer}</p> 
                    <p>Пол: ${sex} </p> 
                </div>    
            </div>  
            
        </div>       
    `}

let basketarray = []
function getBasket() {
    fetch("http://localhost:8000/basket")
    .then((res) => res.json())
    .then((data) => {
        basketarray = data
        displayCards()
    })
}
getBasket()


// <i class="fa-regular fa-bookmark"></i>
// <i class="fa-solid fa-triangle-exclamation"></i>
function displayCards() {
    let newCard = ""
    if (basketarray.length) {
    basketarray.forEach((item, index, arr) => {
        newCard += newItem(item.title, item.desc, item.id, item.source, item.price)
        basketon.innerHTML = newCard
    })
    } else {
        newCard = ""
        basketon.innerHTML = newCard
    }
 }

 function removeItem(id) {
    fetch(`http://localhost:8000/basket/${id}`, {
        method: "DELETE"
    }).finally(() => {
        getBasket()
    })
    // displayCards()
 }