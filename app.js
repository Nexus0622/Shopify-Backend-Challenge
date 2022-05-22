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

let items = {};
let warehouses = {};

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
})

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

    

    form.classList.add("inactive");
    list.classList.remove("inactive");
}

function unhideWarehouse()
{
    const form = document.getElementById(warehouseId);
    const list = document.getElementById(listContainer);
    form.classList.remove("inactive");
    list.classList.add("inactive");
}

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

    const form = document.getElementById(addId);
    const invList = document.getElementById(listContainer);

    form.classList.add("inactive");
    invList.classList.remove("inactive");

}

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

    hideForm();
}

function deleteItem(itemName)
{
    delete items[itemName];
    document.getElementById(itemName).remove();

    hideForm();
}

function addWarehouse()
{
    let warehouseName = document.getElementById("warehouse-id").value;
    let warehouseLoc = document.getElementById("warehouse-location").value;
    let warehouseManager = document.getElementById("warehouse-manager").value;

    let warehouse = {
        name:warehouseName,
        location:warehouseLoc,
        manager:warehouseManager,
        items:{}
    };

    warehouses[warehouseName] = warehouse;

    hideWarehouse();
}

function addToWarehouse()
{
    console.log("woorking");
}