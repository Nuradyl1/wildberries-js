const con = document.querySelector(".con")

const newItem = (title, desc, id, source, price, country, dostavka, producer, sex, clothtype) => {
    return `
        <div class="em">
            <h2>${title}</h2>
            <div id="${id}" class="em__block">
                <div class="em__block__image">
                    <img src=${source}>
                    
                <div id="em__block__price">
                <h3>Этот ${title} стоит ${price} $</h3>
                
                <div>
                <i onclick="removeItem(${id})" class="fa-solid fa-trash"></i>
                </div>
            </div>
                </div>
                <div class="em__block__text">
                    <p>Описание: ${desc}</p>     
                    <p>Страна производитель: ${country}</p>     
                    <p>Доставка в течении: ${dostavka} дней</p> 
                    <p>Производитель: ${producer}</p> 
                    <p>Пол: ${sex} </p> 
                </div>    
            </div>  
            
        </div>       
    `}

let favoritesarray = []
function getFavorites() {
    fetch("http://localhost:8000/favorites")
    .then((res) => res.json())
    .then((data) => {
        favoritesarray = data
        displayCards()
    })
}
getFavorites()

function displayCards() {
    let newCard = ""
    if (favoritesarray.length) {
    favoritesarray.forEach((item, index, arr) => {
        newCard += newItem(item.title, item.desc, item.id, item.source, item.price)
        con.innerHTML = newCard
    })
    } else {
        newCard = "Избранных пока нет"
        con.innerHTML = newCard
    }
 }

 function removeItem(id) {
    fetch(`http://localhost:8000/favorites/${id}`, {
        method: "DELETE"
    }).finally(() => {
        getBasket()
    })
}