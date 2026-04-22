let counter = document.getElementById("counter"); 
let count = 0
let saveCount = document.getElementById("save-el");
function increment() {
    count += 1;
    counter.innerHTML = count;
    console.log("button was clicked");
    console.log(count);
       
}

function save() {
    let countStr = count + " - ";
    saveCount.textContent += countStr 
    console.log(count);
    alert (count + " people have entered the station");
    count = 0;
    counter.innerHTML = count;
    
}