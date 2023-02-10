const formEl = document.querySelector(".form")
let phoneNumber = document.querySelector("#phone-number")
let getInfo = document.querySelector("#get-info")
let anotherUser = document.querySelector("#another-user")
let termsCon = document.querySelector("#terms-con")
const errorField = document.querySelector("span")
// const one = document.querySelectorById()

// console.log(errorField)
function addUser(newUser) {
    fetch("http://localhost:8000/users", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(() => {
        console.log("finished")
    })
}

let usersArray = []

function getUsers() {
    fetch("http://localhost:8000/users")
    .then((res) => res.json())
    .then((data) => {
        usersArray = data
        console.log(usersArray)
    })
}
 const onSubmit = (event) => {
    event.preventDefault();
    let obj = {
        // id: 0,
        phone: "",
        getinfo: false,
        anotheruser: false,
        termscon: false
    }
    getUsers()


    if (phoneNumber.value) {
        for (const element of usersArray) {
            console.log(element)
            console.log(phoneNumber.value)
            if (element == phoneNumber.value) {

                obj = {
                    phone: phoneNumber.value,
                    getinfo: getInfo.value,
                    anotheruser: anotherUser.value,
                    termscon: termsCon.value
                }

                // myTimeout = setTimeout(addUser(obj), 1000)
                
                addUser(obj)
              break;
            }
          }




        // usersArray.forEach((item, index, arr) => {
        //     if (item.phone != phoneNumber.value) {
        //         obj = {
        //             phone: phoneNumber.value,
        //             getinfo: getInfo.value,
        //             anotheruser: anotherUser.value,
        //             termscon: termsCon.value
        //         }
                
        //         addUser(obj);
        //     } else {
        //         errorField.innerHTML = "Пользователь с этим номером уже существует!"
        //     }
        // })
        
        // console.log(obj);
    } else {
        errorField.innerHTML = "Введите номер телефона"
    }
 }