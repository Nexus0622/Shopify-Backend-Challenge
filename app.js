const addButton = document.getElementById("add-button");

document.addEventListener("click", (event) => {
    target = event.target.id;

    if (target == "add-button")
        unhideAdd();

    if (target == "close-add-form")
        hideAdd();
})

function unhideAdd()
{
    const form = document.getElementById("add-item-form");
    form.classList.remove("inactive");
}

function hideAdd()
{
    const form = document.getElementById("add-item-form");
    form.classList.add("inactive")
}