let myLeads = ["www.awesomelead.com", "window.com", "window.img"]
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
let generate = document.getElementById("generate")
const ulEl = document.getElementById("ul-el")

generate.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    console.log(myLeads)
    
})


for (let i = 0; i < myLeads.length; i++) {
  
    ulEl.innerHTML += "<li>" + myLeads[i] + "</li>"
    
}
