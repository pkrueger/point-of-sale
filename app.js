const options = {
  flavors: [
    {
      name: "Cookie Dough",
      image:
        "https://celebratingsweets.com/wp-content/uploads/2014/04/Cookie-Dough-Ice-Cream-1-5.jpg",
      price: 1,
      quantity: 0,
      category: "flavor",
    },
    {
      name: "Vanilla",
      image:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/ultimate-vanilla-ice-cream-1628511695.jpg",
      price: 1,
      quantity: 0,
      category: "flavor",
    },
    {
      name: "Strawberry",
      image:
        "https://www.realfoodwithjessica.com/wp-content/uploads/2017/07/paleostrawberryicecream2.jpg",
      price: 2,
      quantity: 0,
      category: "flavor",
    },
  ],
  vessels: [
    {
      name: "Waffle Cone",
      image: "https://m.media-amazon.com/images/I/71VNjBMakfL._SL1500_.jpg",
      price: 2,
      category: "vessel",
      quantity: 0,
    },
    {
      name: "Waffle Bowl",
      image: "http://images.wbmason.com/350/L_JOY66050.jpg",
      price: 4,
      category: "vessel",
      quantity: 0,
    },
  ],
  toppings: [
    {
      name: "Sprinkles",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/f/f6/Sprinkles2.jpg",
      price: 1,
      category: "topping",
      quantity: 0,
    },
    {
      name: "Chocolate Chips",
      image:
        "https://www.eatthis.com/wp-content/uploads/sites/4/2020/05/chocolate-chips.jpg?quality=82&strip=1&resize=640%2C360",
      price: 2,
      category: "topping",
      quantity: 0,
    },
  ],
};

// Empty Cart
// I'm using this method because I want things to show up in the cart in the
//  order they are clicked in.
let cart = [];

// Invoke by onclick on all menu items.
// Uses searchCart() to only let one topping or vessel be added in the cart.
// If the category is flavor use the searchCart() to see if only the quantity
//  needs to be updated.
// If flavor, topping or vessel have not been added to the cart yet it will
//  be pushed to the end of cart with the price and updateQuantity() will add
//  a quantity to the object in the cart.
function addToCart(name, category) {
  let item = returnItem(name, category);
  let isInCart = searchCart(name);
  let alreadyHasVessel = searchVessel(name);

  if (!isInCart && !alreadyHasVessel) {
    item.quantity++;
    console.log(item.quantity);
    cart.push(item);
  } else if (category == "flavor") {
    item.quantity++;
  }

  drawCart();
}

// Searches cart to see if item shows up inside
function searchCart(name) {
  if (cart.find((item) => item.name === name)) {
    return true;
  } else {
    return false;
  }
}

// Searches if there is already a vessel in the cart
function searchVessel(name) {
  if (name == "Waffle Cone") {
    return searchCart("Waffle Bowl");
  }
  if (name == "Waffle Bowl") {
    return searchCart("Waffle Cone");
  }

  return false;
}

// Returns full object with name and category given
function returnItem(name, category) {
  if (category == "topping") {
    return options.toppings[options.toppings.findIndex((o) => o.name === name)];
  } else if (category == "vessel") {
    return options.vessels[options.vessels.findIndex((o) => o.name === name)];
  } else {
    return options.flavors[options.flavors.findIndex((o) => o.name === name)];
  }
}

// Totals all items in cart
function totalCart() {
  let total = 0;

  for (const item of cart) {
    total += item.quantity * item.price;
  }
  // @ts-ignore
  document.getElementById("total").innerText = total;
}

// Clears out cart
// Invoke in onclick from a checkout button
function checkoutCart() {
  if (confirm("Checkout?")) {
    cart = [];
    drawCart();
  }
}

// Removes an item from the cart
// Invoke in onclick on an html button or icon
function removeFromCart(name, category) {
  let item = returnItem(name, category);
  item.quantity--;

  if (!item.quantity) {
    cart.splice(cart[cart.findIndex((o) => o == item)], 1);
  }

  drawCart();
}

// Draw from looking at the cart
// May need to split into 3 functions for each category
// Invoke inside addToCart
function drawCart() {
  let template = "";

  for (const item of cart) {
    if (item.quantity) {
      template += `
                <div class="row text-center cart-item">
                  <div class="col-6">
                    <span onclick="removeFromCart('${item.name}', '${
        item.category
      }')">✖️</span>
                    ${item.name}
                  </div>
                  <div class="col-2">${item.quantity}</div>
                  <div class="col-2">${item.price}</div>
                  <div class="col-2">${item.quantity * item.price}</div>
                </div>`;
    }
  }

  // @ts-ignore
  document.getElementById("cart").innerHTML = template;
  totalCart();
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
                <div class="col-md-3" onclick="addToCart('${topping.name}', '${topping.category}')">
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
                <div class="col-md-3" onclick="addToCart('${vessel.name}', '${vessel.category}')">
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
                <div class="col-md-3" onclick="addToCart('${flavor.name}', '${flavor.category}')">
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

drawMenu();
