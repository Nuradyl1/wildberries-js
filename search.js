let userSearch = document.getElementById("userSearch")
let contain = document.querySelector(".contain")
console.log(contain);

const newIt = (title, desc, id, source, price) => {
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
let filter = []
userSearch.addEventListener("change", () => {
    console.log(userSearch);
    fetch("http://localhost:8000/products")
        .then((resp) => resp.json())
        .then((data) => {
            const filteredArr = data.filter((item) => item.title.toLowerCase().includes(userSearch.value.toLowerCase()))
            // const newArr = 
            console.log(filteredArr);
            filter = filteredArr
            displayCa()
})
})


function displayCa() {
    let newCard = ""
    if (filter.length) {
    filter.forEach((item, index, arr) => {
        newCard += newIt(item.title, item.desc, item.id, item.source, item.price)
        contain.innerHTML = newCard
    })
    } else {
        newCard = ""
        contain.innerHTML = newCard
    }
 }

 
//  displayCards()