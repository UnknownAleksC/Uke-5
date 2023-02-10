// MODEL
const mainDiv = document.getElementById('app');
let screen = 'list';
let shoppingListItems = [];
let inputValue = '';
let buttonDisable = '';
let wallet = 200;
let price = [4.99, 9.99, 14.99, 19.99];
let cartItems = [];
let cartItemsPrices = [];

// VIEW
view();
function view() {
    if (screen === 'list') viewList();
    else if (screen === 'cart') viewCart();
}

function viewList() {
    mainDiv.innerHTML = /*HTML*/`
    <h2>Handleliste</h2>
    <div class="shoppingList">${listItems()}</div> <br/> 
    <input type="text" maxlength="16" size="16" value='' oninput='changeValue(this)'/> 
    <button class="addItem" onclick="addItem()">ADD</button> <br/><br/>
    <div>DU KAN HA MAKS 10 VARER I HANDLELISTEN</div>
    <button class="goToCart" onclick="goToCart()">TID FOR SHOPPING!</button>
    `;
}

function viewCart() {
    mainDiv.innerHTML =/*HTML*/`
    <h2>Let us go shopping!<h2>
    <div class="shoppingWrapper">
    <div class="shoppingList2">${shoppingListLayout()}</div>
    <div class="shoppingStore">${storeLayout()}</div>
    <div class="shoppingCart">${shoppingCartLayout()}</div>
    </div>
    `
}

// CONTROLLER
// Handliste
function listItems() {
    let itemsDiv = '';
    for (let i = 0; i < shoppingListItems.length; i++) {
        itemsDiv += `<div>${shoppingListItems[i]} 
        <button class="remove" onclick="removeItem(${i})">❌</button></div>`;
    }
    return itemsDiv;
}

function addItem() {
    if (shoppingListItems.length < 10 && inputValue !== '') {
        shoppingListItems.push(`${inputValue}`);
        inputValue = '';
    }
    view();
}

function removeItem(arrayNum) {
    shoppingListItems.splice(arrayNum, 1);
    view();
}

function changeValue(checkThis) {
    inputValue = checkThis.value;
}

function goToCart() {
    screen = 'cart';
    view();
}

// Handlevogn

// Liste
function shoppingListLayout() {
    let itemsDiv = '<h3 class="header">📝SHOPPING LISTE📝<h3> <hr>';
    for (let i = 0; i < shoppingListItems.length; i++) {
        itemsDiv += `<div>${shoppingListItems[i]}</div>`;
    }
    return itemsDiv;
}

// Butikk
function storeLayout() {
    let shopDiv = '<h3 class="header">🏪BUTIKKEN🏪<h3> <hr>';
    // let shopItems = ['Goblin Potion', 'Badeleke', 'Vaskebjørn', 'Villa', '2kg Sjokolade', 'Sekk med penger', 'Holy Grail']
    // let randomNum = Math.floor(Math.random() * shopItems.length);

    for (let i = 0; i < shoppingListItems.length; i++) {
        let randomNum = Math.floor(Math.random() * 4);
        shopDiv += `<div class="shopItem" onclick="buyItem(${randomNum}, ${i})">${shoppingListItems[i]} - ${price[randomNum]}$</div>`;
        // if (i <= shoppingListItems.length && i + shoppingListItems.length % randomNum >= randomNum) {
        //     shopDiv += `<div>${shopItems[(Math.floor(Math.random() * shopItems.length))]} - ${price[Math.floor(Math.random() * 6)]}$</div>`;
        // }
    }
    shopDiv += `</br>` + `<div>Lommebok: ${wallet}$</div>`;
    return shopDiv;
}

// Ved kjøp, send item til cart
function buyItem(itemPrice, index) {
    wallet -= price[itemPrice].toFixed(0);
    cartItems.push(shoppingListItems[index]);
    cartItemsPrices.push(itemPrice);
    shoppingListItems.splice(index, 1);
    view();
}

// Shopping Cart
function shoppingCartLayout() {
    let cartDiv = '<h3 class="header">🛒Shopping Cart🛒<h3> <hr>';
    for (let i = 0; i < cartItems.length; i++) {
        cartDiv += `<div class="shopItem" onclick="sellItem(${i})">${cartItems[i]}</div>`;
    }
    return cartDiv;
}

// Selger items for verdien av arrayets plass istedenfor det du kjøpte for 
function sellItem(cartItemNum) {
    wallet += cartItemsPrices[cartItemNum];
    shoppingListItems.push(cartItems[cartItemNum]);
    cartItemsPrices.splice(cartItemNum, 1);
    cartItems.splice(cartItemNum, 1);
    view();
}

