// Constants for ease of updating code
const addId = "add-item-form";
const warehouseId = "add-warehouse-form";
const warehouseName = "warehouse-id";
const warehouseLoc = "warehouse-location";
const warehouseManager = "warehouse-manager";
const titleId = "item-title";
const headerId = "header";
const quantityId = "item-quantity";
const descId = "item-description";
const listId = "inventory-list";
const header = document.getElementById("add-title");
const addErr = document.getElementById("add-error");
const listContainer = "inventory-container";
const warehouseList = "warehouse-list";

let items = {};
let warehouses = {};

// General on click event listeners
document.addEventListener("click", (event) => {

    target = document.getElementById(event.target.id);
    event.preventDefault();

    if (target == null)
        return;

    if (target.id == "add-button")
        unhideForm();

    if (target.id == "close-add-form")
        hideForm();
    
    if (target.id == "close-warehouse-form")
        hideWarehouse();

    if (target.id == "warehouse-button")
        unhideWarehouse();

    if (target.classList.contains("inventory-item"))
        editItem(target.id)

    if (target.id == "add-warehouse-button")
        addWarehouse()
    
    if (target.id == "view-warehouses")
    {
        viewWarehouses();
    }
    
    if (target.id == "return-button")
    {
        document.getElementById("warehouse-container").classList.add("inactive");
        document.getElementById("warehouse-ul").remove();
        hideForm();
    }

    if (target.id == "return-to-warehouse")
    {
        document.getElementById("warehouse-content").classList.add("inactive");
        document.getElementById("warehouse-container").classList.remove("inactive");
        document.getElementById("warehouse-content-ul").remove();
    }
})

// Display the add item form
function unhideForm()
{
    const form = document.getElementById(addId);
    const list = document.getElementById(listContainer);
    const title = document.getElementById(headerId);
    const button = document.getElementById("action-button");

    button.innerHTML = "Add to inventory"
    title.innerHTML = "Add an item";

    if (document.getElementById("delete-button") != null)
    {
        document.getElementById("delete-button").remove();
    }

    if (document.getElementById("add-to-warehouse-button") != null)
    {
        document.getElementById("add-to-warehouse-button").remove();
    }

    form.classList.remove("inactive");
    list.classList.add("inactive");
    console.log(document.getElementById(listId).childElementCount == 0);
    button.onclick = addItem.bind(addItem, event)
}

// Hide the add item form
function hideForm()
{
    const form = document.getElementById(addId);
    const list = document.getElementById(listContainer);

    const itemTitle = document.getElementById(titleId);
    const itemQuantity = document.getElementById(quantityId);
    const itemDesc = document.getElementById(descId);

    itemTitle.value = "";
    itemQuantity.value = "";
    itemDesc.value = "";

    

    form.classList.add("inactive");
    list.classList.remove("inactive");
}

// Hide the add warehouse form
function hideWarehouse()
{
    const form = document.getElementById(warehouseId);
    const list = document.getElementById(listContainer);

    const warehouseTitle = document.getElementById(warehouseName);
    const warehouseLocation = document.getElementById(warehouseLoc);
    const warehouseManage = document.getElementById(warehouseManager);

    warehouseTitle.value = "";
    warehouseLocation.value = "";
    warehouseManage.value = "";

    document.getElementById("warehouse-header").innerHTML = "";

    form.classList.add("inactive");
    list.classList.remove("inactive");
}

// Display the add warehouse form
function unhideWarehouse()
{
    const form = document.getElementById(warehouseId);
    const list = document.getElementById(listContainer);
    form.classList.remove("inactive");
    list.classList.add("inactive");
}

// Add item to list and item hashmap
function addItem(e)
{
    e.preventDefault();

    const itemTitle = document.getElementById(titleId);
    const itemQuantity = document.getElementById(quantityId);
    const itemDesc = document.getElementById(descId);

    let title = itemTitle.value;
    let quant = itemQuantity.value;
    let desc = itemDesc.value;

    if (title == "" || quant == "")
    {
        addErr.innerHTML = "Title and quantity fields must be filled";
        return
    }

    if (document.getElementById(title) != null)
    {
        addErr.innerHTML = "Item already in inventory";
        return;
    }
    else if (addErr.innerHTML != null)
    {
        addErr.innerHTML = null;
    }

    let item = {
        title:title,
        quantity: quant,
        description: desc
    };

    items[title] = item;

    const list = document.getElementById(listId);

    const li = document.createElement("li");
    li.setAttribute("id", title);
    li.setAttribute("class", "inventory-item border");
    li.innerHTML= title + `  (${item.quantity})`;

    list.appendChild(li);

    header.innerHTML = "Click an item to view details";

    hideForm();

}

// Display the edit item form
function editItem(itemName)
{

    if (document.getElementById("delete-button") == null)
    {
        const deleteButton = document.createElement("button");
        deleteButton.setAttribute("id", "delete-button");
        deleteButton.onclick = deleteItem.bind(deleteItem, itemName);
        deleteButton.innerHTML = "Delete this item"

        document.getElementById("buttons").appendChild(deleteButton);
    }
    else
    {
        const deleteButton = document.getElementById("delete-button");
        deleteButton.onclick = deleteItem.bind(deleteItem, itemName);
    }

    if (document.getElementById("add-to-warehouse-button") == null)
    {
        const cardHeader = document.getElementById("card-header");
        const warehouseButton = document.createElement("button");
        warehouseButton.innerHTML = "Add to warehouse";
        warehouseButton.setAttribute("id", "add-to-warehouse-button");
        warehouseButton.onclick = addToWarehouse.bind(addToWarehouse, itemName);
        cardHeader.appendChild(warehouseButton)
    }
    else
    {
        const warehouseButton = document.getElementById("add-to-warehouse-button");
        warehouseButton.onclick = addToWarehouse.bind(addToWarehouse, itemName);
    }

    const title = document.getElementById(headerId);
    const button = document.getElementById("action-button");


    button.innerHTML = "Update inventory item";
    title.innerHTML= "Update an item";

    const itemTitle = document.getElementById(titleId);
    const itemQuantity = document.getElementById(quantityId);
    const itemDesc = document.getElementById(descId);

    let item = items[itemName];

    console.log(item);

    itemTitle.value = item.title;
    console.log(item.title);
    itemQuantity.value = item.quantity;
    itemDesc.value = item.description;

    const form = document.getElementById(addId);
    const list = document.getElementById(listContainer);

    form.classList.remove("inactive");
    list.classList.add("inactive");

    console.log("item name is " + itemName);

    button.onclick = updateItem.bind(updateItem, itemName);
}

// Update the item with the new information
function updateItem(itemName)
{
    console.warn(itemName);
    delete items[itemName];

    let itemTitle = document.getElementById(titleId).value;
    let itemQuantity = document.getElementById(quantityId).value;
    let itemDesc = document.getElementById(descId).value;

    let item = {
        title:itemTitle,
        quantity:itemQuantity,
        description:itemDesc
    }

    items[itemTitle] = item;

    let prevItem =  document.getElementById(itemName);

    prevItem.innerHTML =  item.title + `  (${item.quantity})`;
    prevItem.id = itemTitle;

    for (let key in warehouses)
    {
        if (itemName in warehouses[key].items)
        {   
            console.log("This is working");
            delete warehouses[key].items[itemName];
            warehouses[key].items[itemTitle] = item;
        }
    }

    hideForm();
}

// Delete an item
function deleteItem(itemName)
{
    delete items[itemName];
    document.getElementById(itemName).remove();

    hideForm();
}

// Add a warehouse
function addWarehouse()
{
    document.getElementById("warehouse-header").innerHTML = "";
    let warehouseName = document.getElementById("warehouse-id").value;
    let warehouseLoc = document.getElementById("warehouse-location").value;
    let warehouseManager = document.getElementById("warehouse-manager").value;

    if (warehouseName == "")
    {
        document.getElementById("warehouse-header").innerHTML = "Please enter a warehouse name"
        return;
    }

    if (warehouseName in warehouses)
        return;

    let warehouse = {
        name:warehouseName,
        location:warehouseLoc,
        manager:warehouseManager,
        items:{}
    };

    warehouses[warehouseName] = warehouse;

    document.getElementById("warehouse-header").innerHTML = "";
    document.getElementById("warehouse-header").innerHTML =  `${warehouseName} successfully added!`;

}

// Add an item to a warehouse
function addToWarehouse(itemName)
{
    document.getElementById("warehouse-title").innerHTML = "Click on a warehouse to add item";
    let warehouseOverlay = document.getElementById("warehouse-container");
    let form = document.getElementById(addId);
    let ul = document.createElement("ul");
    ul.setAttribute("id", "warehouse-ul")

    for (let key in warehouses)
    {
        let li = document.createElement("li");
        li.setAttribute("id", key);
        li.setAttribute("class", "warehouse-list");
        li.innerHTML = key;
        li.addEventListener("click", () => {

            if (itemName in warehouses[key].items)
                return;

            warehouses[key].items[itemName] = {itemName: items[itemName].quantity}; 
            document.getElementById("warehouse-title").innerHTML = `Successfully added to ${key}`;
            console.log(warehouses[key].items)
        })
    
        ul.appendChild(li);
    }

    document.getElementById(warehouseList).appendChild(ul);

    form.classList.add("inactive");
    warehouseOverlay.classList.remove("inactive");
}

// View a list of all warehouses
function viewWarehouses()
{
    document.getElementById("warehouse-title").innerHTML = "Click on a warehouse to view contents";
    let warehouseOverlay = document.getElementById("warehouse-container");
    let form = document.getElementById(addId);
    let ul = document.createElement("ul");
    ul.setAttribute("id", "warehouse-ul")

    for (let key in warehouses)
    {
        let li = document.createElement("li");
        li.setAttribute("id", key);
        li.setAttribute("class", "warehouse-list");
        li.innerHTML = key;
        li.addEventListener("click", () => {
            warehouseContent(key) 
            console.log(warehouses[key].items)
        })
    
        ul.appendChild(li);
    }

    document.getElementById(warehouseList).appendChild(ul);

    form.classList.add("inactive");
    warehouseOverlay.classList.remove("inactive");
}

// Display the items of a warehouse
function warehouseContent(warehouseName)
{
    document.getElementById("warehouse-content-title").innerHTML = "Click an item to remove it from this warehouse";
    let warehouseContent = document.getElementById("warehouse-content");
    let form = document.getElementById(addId);
    let ul = document.createElement("ul");
    ul.setAttribute("id", "warehouse-content-ul")

    for (let key in warehouses[warehouseName].items)
    {
        let li = document.createElement("li");
        li.setAttribute("id", `warehouse-${key}`);
        li.setAttribute("class", "warehouse-content-list");
        li.innerHTML = key;
        li.addEventListener("click", () => {
            delete warehouses[warehouseName].items[key];
            removeFromWarehouse(key);
        })
    
        ul.appendChild(li);
    }

    document.getElementById("warehouse-content-list").appendChild(ul);

    form.classList.add("inactive");
    warehouseContent.classList.remove("inactive");
}

// Remove an item from a warehouse
function removeFromWarehouse(itemName)
{
    document.getElementById(`warehouse-${itemName}`).remove();
}