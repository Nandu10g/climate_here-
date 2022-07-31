
console.log("I am from clientside js bro")

const msg1 = document.querySelector("#msg-1")
const msg2 = document.querySelector("#msg-2")

document.querySelector('button').addEventListener('click',(e)=>{
    e.preventDefault();

    msg1.textContent = "Loading..."
    msg2.textContent = ""

    let address = "/weather?address=";
    let location = document.querySelector('input').value;
    
    fetch(address + location).then((response)=>{
        response.json().then((res) => {
            if(res.error) {
                msg1.textContent = res.error;
            }
            else {
                let {location, data:forecast} = res;
                msg1.textContent = location
                msg2.textContent = forecast
            }
        })
    })
})