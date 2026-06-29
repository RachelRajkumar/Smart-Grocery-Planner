let groceryItems =
JSON.parse(localStorage.getItem("groceryItems")) || [];

let budget =
localStorage.getItem("budget") || 0;

document.getElementById("budgetDisplay").textContent =
budget;

renderItems();

function setBudget(){

    budget =
    document.getElementById("budget").value;

    if(budget === ""){
        alert("Please Enter Budget");
        return;
    }

    localStorage.setItem("budget",budget);

    document.getElementById("budgetDisplay")
    .textContent = budget;

    updateSummary();
}

function addItem(){

    let name =
    document.getElementById("itemName").value.trim();

    let price =
    document.getElementById("itemPrice").value;

    if(name === "" || price === ""){
        alert("Fill All Fields");
        return;
    }

    groceryItems.push({
        name:name,
        price:Number(price)
    });

    localStorage.setItem(
        "groceryItems",
        JSON.stringify(groceryItems)
    );

    document.getElementById("itemName").value = "";
    document.getElementById("itemPrice").value = "";

    renderItems();
}

function renderItems(){

    const itemList =
    document.getElementById("itemList");

    itemList.innerHTML = "";

    groceryItems.forEach((item,index)=>{

        let li =
        document.createElement("li");

        li.innerHTML = `
            <div class="product-info">
                <span class="product-name">
                    ${item.name}
                </span>

                <span class="product-price">
                    ₹${item.price}
                </span>
            </div>

            <button
            class="delete-btn"
            onclick="deleteItem(${index})">
            🗑 Delete
            </button>
        `;

        itemList.appendChild(li);
    });

    updateSummary();
}

function deleteItem(index){

    groceryItems.splice(index,1);

    localStorage.setItem(
        "groceryItems",
        JSON.stringify(groceryItems)
    );

    renderItems();
}

function updateSummary(){

    let total =
    groceryItems.reduce(
        (sum,item)=>sum + item.price,
        0
    );

    document.getElementById("totalCost")
    .textContent = total;

    document.getElementById("remaining")
    .textContent =
    budget - total;
}

function searchItems(){

    let searchValue =
    document.getElementById("search")
    .value
    .toLowerCase();

    let filtered =
    groceryItems.filter(item =>
        item.name
        .toLowerCase()
        .includes(searchValue)
    );

    const itemList =
    document.getElementById("itemList");

    itemList.innerHTML = "";

    filtered.forEach((item,index)=>{

        let li =
        document.createElement("li");

        li.innerHTML = `
            <div class="product-info">
                <span class="product-name">
                    ${item.name}
                </span>

                <span class="product-price">
                    ₹${item.price}
                </span>
            </div>

            <button
            class="delete-btn"
            onclick="deleteFilteredItem('${item.name}')">
            🗑 Delete
            </button>
        `;

        itemList.appendChild(li);
    });
}

function deleteFilteredItem(name){

    groceryItems =
    groceryItems.filter(
        item => item.name !== name
    );

    localStorage.setItem(
        "groceryItems",
        JSON.stringify(groceryItems)
    );

    renderItems();
}