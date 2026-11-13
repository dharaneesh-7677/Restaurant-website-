
let cart = [];

// ADD FOOD TO CART

function addToCart(name, price) {

    let existing = cart.find(
        item => item.name === name
    );

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    displayCart();

    alert(name + " added to cart!");
}

// INCREASE QUANTITY

function increase(index) {

    cart[index].quantity++;

    displayCart();
}

// DECREASE QUANTITY

function decrease(index) {

    cart[index].quantity--;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    displayCart();
}

// REMOVE FOOD

function removeItem(index) {

    cart.splice(index, 1);

    displayCart();
}

// DISPLAY CART AND TOTAL

function displayCart() {

    let cartItems =
        document.getElementById("cart-items");

    let totalElement =
        document.getElementById("total");

    if (!cartItems || !totalElement) return;

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "Your cart is empty.";
    }

    cart.forEach((item, index) => {

        let subtotal =
            item.price * item.quantity;

        total += subtotal;

        cartItems.innerHTML += `
            <div class="cart-item">

                <div>
                    <strong>${item.name}</strong>

                    <p>
                        ₹${item.price} x ${item.quantity}
                    </p>

                    <b>Subtotal: ₹${subtotal}</b>
                </div>

                <div>
                    <button type="button"
                    onclick="decrease(${index})">-</button>

                    <button type="button"
                    onclick="increase(${index})">+</button>

                    <button type="button"
                    class="remove-btn"
                    onclick="removeItem(${index})">
                    Remove
                    </button>
                </div>

            </div>
        `;
    });

    totalElement.innerText = total;
}

// PLACE ORDER

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayCart();

        let form =
            document.getElementById("order-form");

        if (!form) return;

        form.addEventListener(
            "submit",
            function(event) {

                event.preventDefault();

                if (cart.length === 0) {
                    alert("Please add food to your cart!");
                    return;
                }

                let name =
                    document.getElementById(
                        "customer-name"
                    ).value.trim();

                let phone =
                    document.getElementById(
                        "customer-phone"
                    ).value.trim();

                let address =
                    document.getElementById(
                        "customer-address"
                    ).value.trim();

                if (!/^[0-9]{10}$/.test(phone)) {
                    alert("Enter a valid 10-digit phone number.");
                    return;
                }

                let total = cart.reduce(
                    (sum, item) =>
                        sum + item.price * item.quantity,
                    0
                );

                let message =
                    "GURU RESTAURANT - NEW ORDER\n\n";

                message += "Customer: " + name + "\n";
                message += "Phone: " + phone + "\n";
                message += "Address: " + address + "\n\n";

                message += "ORDER DETAILS:\n";

                cart.forEach(item => {

                    message +=
                        item.name +
                        " x " + item.quantity +
                        " = Rs." +
                        (item.price * item.quantity) +
                        "\n";
                });

                message +=
                    "\nTOTAL BILL: Rs." + total;

                message +=
                    "\n\nPlease confirm my order.";

                // CHANGE TO YOUR WHATSAPP NUMBER
                let restaurantNumber =
                    "91XXXXXXXXXX";

                if (
                    !/^91[0-9]{10}$/.test(
                        restaurantNumber
                    )
                ) {
                    alert(
                        "Please enter your restaurant WhatsApp number in script.js."
                    );
                    return;
                }

                let whatsappURL =
                    "https://wa.me/" +
                    restaurantNumber +
                    "?text=" +
                    encodeURIComponent(message);

                window.open(whatsappURL, "_blank");
            }
        );
    }
);
