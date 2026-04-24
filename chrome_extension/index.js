let myLeads = [];
const inputEl = document.getElementById("input-el");
const generateBtn = document.getElementById("generate");
const ulEl = document.getElementById("ul-el");

generateBtn.addEventListener("click", function(){
        console.log("Button clicked!");
        myLeads.push(inputEl.value);
      inputEl.value = "";  
    console.log(myLeads);

    renderLeads()
    
});

function renderLeads() {
    let listItems = "";
    for(let i = 0; i < myLeads.length; i++){
      listItems += `
       <li>
         <a target='_blank' href='${myLeads[i]}'>
           ${myLeads[i]}
         </a>
      </li>
    `;  
   }
   console.log(listItems);
   
    ulEl.innerHTML = listItems;
}


