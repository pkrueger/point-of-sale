const options = {
  flavors: [
    {
      name: "Cookie Dough",
      image:
        "https://celebratingsweets.com/wp-content/uploads/2014/04/Cookie-Dough-Ice-Cream-1-5.jpg",
      price: 1,
      quantity: 0,
    },
    {
      name: "Vanilla",
      image:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/ultimate-vanilla-ice-cream-1628511695.jpg",
      price: 1,
      quantity: 0,
    },
    {
      name: "Strawberry",
      image:
        "https://www.realfoodwithjessica.com/wp-content/uploads/2017/07/paleostrawberryicecream2.jpg",
      price: 2,
      quantity: 0,
    },
  ],
  vessels: [
    {
      name: "Waffle Cone",
      image: "https://m.media-amazon.com/images/I/71VNjBMakfL._SL1500_.jpg",
      price: 2,
    },
    {
      name: "Waffle Bowl",
      image: "http://images.wbmason.com/350/L_JOY66050.jpg",
      price: 4,
    },
  ],
  toppings: [
    {
      name: "Sprinkles",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/f/f6/Sprinkles2.jpg",
      price: 1,
    },
    {
      name: "Chocolate Chips",
      image:
        "https://www.eatthis.com/wp-content/uploads/sites/4/2020/05/chocolate-chips.jpg?quality=82&strip=1&resize=640%2C360",
      price: 2,
    },
  ],
};

// Empty Cart
let cart = [
  {
    name: "Strawberry",
    price: 4,
    quantity: 2,
  },
];

let cartItemTemplate = {
  name: "Strawberry",
  price: 4,
  quantity: 2,
};

// Make it so that the toppings and vessels can only be added once
// Invoke by onclick on all menu items
function addToCart(name) {}

// Returns the category of what is passed to addToCart
function findCategory(name) {}

// Searches cart to see if something shows up inside
function searchCart(name) {}

// This will be run inside of drawCart()
// Looks at the amount of times something shows up in the cart and returns it
// for the quantity
function updateQuantity() {}

// Totals all items in cart
function totalCart() {
  let total = 0;

  for (const item of cart) {
    total += item.quantity * item.price;
  }
  // @ts-ignore
  document.getElementById("total").innerText = total;
}

// Draw from looking at the cart
// May need to split into 3 functions for each category
// Invoke inside addToCart
function drawCart() {
  let template = "";

  for (const item of cart) {
    if (item.quantity) {
      template += `
                <div class="row text-center">
                  <div class="col-6">${item.name}</div>
                  <div class="col-2">${item.quantity}</div>
                  <div class="col-2">${item.price}</div>
                  <div class="col-2">${item.quantity * item.price}</div>
                </div>`;
    }
  }

  // @ts-ignore
  document.getElementById("cart").innerHTML = template;
}

// Looks at the options array and prints out all choices based on the category
// Invoke at page load
function drawMenu() {
  drawToppingsMenu();
  drawVesselsMenu();
  drawFlavorsMenu();
}
// #region

function drawToppingsMenu() {
  let template = "";

  for (const topping of options.toppings) {
    template += `
                <div class="col-md-3">
                  <img src="${topping.image}" alt="${topping.name}"
                  class="img-fluid"
                  />
                  <p>${topping.name} $<span>${topping.price}</span></p>
                </div>`;
  }
  // @ts-ignore
  document.getElementById("toppings").innerHTML = template;
}

function drawVesselsMenu() {
  let template = "";

  for (const vessel of options.vessels) {
    template += `
                <div class="col-md-3">
                  <img src="${vessel.image}" alt="${vessel.name}"
                  class="img-fluid"
                  />
                  <p>${vessel.name} $<span>${vessel.price}</span></p>
                </div>`;
  }
  // @ts-ignore
  document.getElementById("vessels").innerHTML = template;
}

function drawFlavorsMenu() {
  let template = "";

  for (const flavor of options.flavors) {
    template += `
                <div class="col-md-3">
                  <img src="${flavor.image}" alt="${flavor.name}"
                  class="img-fluid"
                  />
                  <p>${flavor.name} $<span>${flavor.price}</span></p>
                </div>`;
  }
  // @ts-ignore
  document.getElementById("flavors").innerHTML = template;
}
// #endregion

// Clears out cart
// Invoke in onclick from a checkout button
function checkoutCart() {
  if (confirm("Checkout?")) {
    cart = [];
  }
}

// Removes an item from the cart
// Invoke in onclick on an html button or icon
function removeFromCart() {}

drawMenu();
