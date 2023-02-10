const content = document.querySelector(".page")
var totalNumber = document.querySelector("#totalnumber")



const newItem = (title, desc, id, source, price, country, dostavka, producer, sex, clothtype) => {
    return `
        <div class="m">
            <h2>${title}</h2>
            <div id="${id}" class="m__block">
                <div class="m__block__image">
                    <img src=${source}>
                </div>
                <div class=m__block__price>
                    <div id="personalInfo">
                        <h4>Ваши данные</h4>
                        <div>
                            <input type="text" placeholder="Фамилия" required></input>
                            <input type="text" placeholder="Имя" required></input>
                        </div>                
                        <input type="text" placeholder="ИНН" required></input>
                        <p>
                            ИНН необходим для таможенного оформления. Ваши данные будут надежно защищены.
                        </p>
                    </div>
                    <input placeholder="Выберите адрес доставки" type="text"></input>
                    <select name="" id="payment-type" >
                        <option value="">Способ оплаты</option>
                        <option value="">Paypal</option>
                        <option value="">MasterCard</option>
                        <option value="">Visa</option>
                        <option value="">Sber pay</option>
                    </select>
                    <div id="total">
                        <input id="totalnumber" type="text" required default="1" placeholder="Количество" onchange="changeAmount(event)"></input>
                        <h2>Общая сумма: </h2>
                    </div>
                    <div id="cartInfo">
                        <input type="text" placeholder="0000 0000 0000 0000" required></input>
                        <div>
                            <input type="text" placeholder="ММ" required></input>
                            <h2>/</h2>
                            <input type="text" placeholder="ГГ" required></input>
                            <input type="text" placeholder="CVV/CVC" required></input>
                        </div>
                    </div> 
                    <a href="../cart/cart.html">
                        <button class="hot" id="${id}" onclick="addToBasketStorage(event)">
                        Оплатить
                        </button>
                    </a>  
                </div>    
            </div>  
            <div>
                <a href="../index.html">Вернуться назад</a>
            </div>  
        </div>       
    `}

// const plusNumber = (event) => {
//     event.preventDefault;

//     totalNumber += 1
// }
// const minusNumber = (event) => {
//     event.preventDefault;
//     if (totalNumber > 0) {
//         totalNumber += 1
//     }
// }
let cart = []
cart = JSON.parse(localStorage.getItem("basket"))
baska = parseInt(cart)

let infoArray = []
function getInfo(id) {
    fetch(`http://localhost:8000/products/${id}`)
    .then((res) => res.json())
    .then((data) => {
        infoArray.push(data)
        // console.log(infoArray)  
    }).finally(() => displayInfo())
}

// function getPrice (id) {
//     fetch(`http://localhost:8000/products/${id}`)
//     .then((res) => res.json())
//     .then((data) => {
//         infoArray.push(data)  
//     }).finally(() => displayAmount())
// }

let price = 0
function getPrice() {
    let newcard = ""
    infoArray.forEach((item) => {
        newcard += parseInt(item.price)
    })
    price = newcard
}

const changeAmount = (event) => {
    event.preventDefault(); 
}

// getPrice(parseInt(baska))
getInfo(parseInt(baska))

function displayInfo() {
    let newcard = ""
    infoArray.forEach((item, index, arr) => {
        newcard += newItem(item.title, item.desc, item.id, item.source,
             item.price, item.country, item.dostavka, item.producer,
             item.sex, item.clothtype)
        content.innerHTML = newcard
    })
}


console.log(totalNumber)

// google.maps.event.addListener(map, 'click', function( event ){
//     alert( "Latitude: "+event.latLng.lat()+" "+", longitude: "+event.latLng.lng() ); 

// var myLatlng = new google.maps.LatLng(event.latLng.lat(),event.latLng.lng() );
// var marker = new google.maps.Marker({
//     position: myLatlng,
//     map: map,
//     title: 'Hello World!'
// });
//   });