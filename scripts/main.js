"use strict";

let carts=document.querySelectorAll('.add-cart');

let products = [
    {
     name: 'Apple',
     tag: 'apple',
     price: 1700,
     inCart: 0
    },
    {
     name: 'Dell',
     tag: 'dell',
     price: 1400,
     inCart: 0
    },
    {
     name: 'Samsung',
     tag: 'samsung',
     price: 1800,
     inCart: 0
    },
    {
     name: 'Microsoft',
     tag: 'microsoft',
     price: 2200,
     inCart: 0
    },
    {
     name: 'HP',
     tag: 'hp',
     price: 1950,
     inCart: 0
    },
    {
     name: 'ASUS',
     tag: 'asus',
     price: 2400,
     inCart: 0
    },
    //Tablet    
    {
     name: 'LENOVO',
     tag: 'lenovo',
     price: 750,
     inCart: 0
    },
    {
     name: 'TAB-S-8',
     tag: 'samsung-tablet',
     price: 800,
     inCart: 0
    },
    {
     name: 'IPAD',
     tag: 'ipad',
     price: 900,
     inCart: 0
    },
    {
     name: 'SURFACE',
     tag: 'surface',
     price: 560,
     inCart: 0
    },
    {
     name: 'XIAOMI',
     tag: 'xiaomi',
     price: 650,
     inCart: 0
    },
    {
     name: 'GOOGLE',
     tag: 'google',
     price: 985,
     inCart: 0
    }
 ]

for (let i=0; i<carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }

}

function cartNumbers(product, action) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    let cartItems = localStorage.getItem('productInCart');
    cartItems = JSON.parse(cartItems);


    if(action == "decrease") {
        localStorage.setItem('cartNumbers', productNumbers - 1);
        document.querySelector('.cart span').textContent = productNumbers - 1;

    } else if (productNumbers) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
        }
        else {
           localStorage.setItem('cartNumbers', 1); 
           document.querySelector('.cart span').textContent = 1;
        }

    // if(productNumbers) {
    // localStorage.setItem('cartNumbers', productNumbers + 1);
    // document.querySelector('.cart span').textContent = productNumbers + 1;
    // }
    // else {
    //     localStorage.setItem('cartNumbers', 1);
    //     document.querySelector('.cart span').textContent = 1;
    // }

    setItems(product);

 }

 function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        if (cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        } 
        cartItems[product.tag].inCart += 1;
    }
    else {
        product.inCart = 1; 
        cartItems = {
            [product.tag]: product
    } 
    }
    localStorage.setItem("productsInCart", JSON.stringify
    (cartItems));
 }

function totalCost(product, action) {
    let cartCost = localStorage.getItem('totalCost');

    console.log('My cartCost is', cartCost);
    console.log(typeof cartCost);
    if (action == "decrease") {
        cartCost = parseInt(cartCost);

        localStorage.setItem('totalCost', cartCost - product.price);
    }

    else if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + 
        product.price);
    }
    else {
        localStorage.setItem("totalCost", product.price);
    }

}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector
    (".products");
    let cartCost = localStorage.getItem('totalCost');

    // console.log(cartItems);
    if(cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
            <ion-icon name="close-circle-outline"></ion-icon>
            <img src="./images/${item.tag}.jpg">
            <span>${item.name}</span></div>
            <div class="price">${item.price}
            </div>
            <div class="quantity">
            <ion-icon class="decrease" name="remove-circle-outline"></ion-icon>
            <span>${item.inCart}</span> 
            <ion-icon class="increase" name="add-circle-outline"></ion-icon>
            </div>
            <div class="total">
                $${item.inCart * item.price}
                </div>
            `;
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total:
                </h4>
                <h4 class="basketTotal">
                    $${cartCost}
                </h4>
            `;
    } 
    deleteButtons();
    manageQuantity();
}

function deleteButtons(){
    let deleteButtons = document.querySelectorAll('.product ion-icon');
    let productName;
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let cartCost = localStorage.getItem('totalCost');

    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click',() => {
            productName = deleteButtons[i].parentElement.textContent.trim().toLowerCase().replace(/ /g, '');
            
            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);

            localStorage.setItem('totalCost', cartCost - ( cartItems [productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
        
            displayCart();
            onLoadCartNumbers();
        });
    }
}

    function manageQuantity(){
        let decreaseButtons = document.querySelectorAll('.decrease');
        let increaseButtons = document.querySelectorAll('.increase');
        let cartItems = localStorage.getItem('productsInCart');
        let currentQuantity = 0;
        let currentProduct = "";
        cartItems = JSON.parse(cartItems);
        console.log(cartItems);

        for  (let i=0; i < decreaseButtons.length; i++) {
            decreaseButtons[i].addEventListener('click', () =>{
                currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
                console.log(currentQuantity);
                currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
                console.log(currentProduct);


               if (cartItems[currentProduct].inCart > 1) {
                   cartItems[currentProduct].inCart -= 1;
                   cartNumbers(cartItems[currentProduct], "decrease");
                   totalCost(cartItems[currentProduct], "decrease");
                   localStorage.setItem('productsInCart', JSON.stringify(cartItems));

                displayCart();
            }
            });
        }
            for  (let i=0; i < increaseButtons.length; i++) {
                increaseButtons[i].addEventListener('click', () =>{
                    currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
                    console.log(currentQuantity);

                
                currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
                console.log(currentProduct);

                    // Increase
                   cartItems[currentProduct].inCart += 1;
                   cartNumbers(cartItems[currentProduct]);
                   totalCost(cartItems[currentProduct]);
                   localStorage.setItem('productsInCart', JSON.stringify(cartItems));

                displayCart();
            
                    
                });

        }
    }


// Enquiry page
// First name
function validateForm() {
    let a = document.forms["myForm"]["fname"].value;
    if (a == "") {
      alert("Name must be filled out");
      return false;
    };
// Lastname
    let b = document.forms["myForm"]["lastname"].value;
    if (b == "") {
      alert("Lastname must be filled out");
      return false;
    };
// Email address
    let c  = document.forms["myForm"]["email"].value;
    if (c == "") {
      alert("Email address must be filled out");
      return false;
    };
// Telephone number
    var d = document.forms["myForm"]["num"].value;
    if(!/^[0-9]+$/.test(d)){
      alert("Please only enter numeric characters only for your Phone number! (Allowed input:0-9)");
      return false;
    };
// Address
    let e  = document.forms["myForm"]["address"].value;
    if (e == "") {
      alert("Address must be filled out");
      return false;
    };
// Suburb
    let f  = document.forms["myForm"]["suburb"].value;
    if (f == "") {
      alert("Suburb must be filled out");
      return false;
    };
 // Postcode 
    let g = document.forms["myForm"]["postcode"].value;
    const inpObj = document.getElementById("id1");
  if (!inpObj.checkValidity()) {
    document.getElementById("demo").innerHTML = inpObj.validationMessage;
  } else {
    document.getElementById("demo").innerHTML = "Input OK";
  }; 
// Name on card
  let h  = document.forms["myForm"]["name-on-card"].value;
    if (h == "") {
      alert("Name on card must be filled out");
      return false;
    };


var m = document.forms["myForm"]["expiry-date"].value;
if(!/^[0-9]+$/.test(m)){
  alert("Please only enter numeric characters only for Expiry Date! (Allowed input:0-9)")
  return false;
};

var n = document.forms["myForm"]["card_number"].value;
if(!/^[0-9]+$/.test(n)){
  alert("Please only enter numeric characters only for Card number! (Allowed input:0-9)")
  return false;
};

var k = document.forms["myForm"]["cvv"].value;
if(!/^[0-9]+$/.test(k)){
  alert("Please only enter numeric characters only for CVV! (Allowed input:0-9)")
  return false;
};
}

// Redirecting page
function myFunc() {
    location.replace("payment.html");
};

// Redirecting page
function myFunc1() {
    location.replace("index.html");
}


 onLoadCartNumbers();
 displayCart();
