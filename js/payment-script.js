// Utility functions
function getBasePrice() {
    const priceElement = document.getElementById('price');
    return parseFloat(priceElement.getAttribute('data-base-price'));
}

function updatePrice() {
    const basePrice = getBasePrice();
    const quantity = parseInt(document.getElementById('quantity').value);
    const totalPrice = (basePrice * quantity).toFixed(2);
    document.getElementById('price').innerText = `$${totalPrice}`;
}

function getPriceInINR() {
    const basePrice = getBasePrice();
    const quantity = parseInt(document.getElementById('quantity').value);
    const totalPriceUSD = basePrice * quantity;
    const usdToInrRate = 83;
    return Math.round(totalPriceUSD * usdToInrRate * 100); // Razorpay expects paise
}

// Quantity change (+ / -)
function changeQuantity(change) {
    const input = document.getElementById("quantity");
    let current = parseInt(input.value);
    let newValue = current + change;

    if (newValue >= 1 && newValue <= 5) {
        input.value = newValue;
        updatePrice();

        // Update PayPal buttons on quantity change
        document.getElementById('paypal-button-container').innerHTML = '';
        initPayPal();
    }
}

// Razorpay Integration
function initRazorpay() {
    const options = {
        key: "YOUR_RAZORPAY_KEY_ID", // Replace with your actual Razorpay Key ID
        amount: getPriceInINR(),
        currency: "INR",
        name: "NightOwl Store",
        description: "Taylor Swift Eras Tour Bookmarks",
        image: "../image/logo.png",
        handler: function (response) {
            alert("Payment successful! Razorpay Payment ID: " + response.razorpay_payment_id);
        },
        prefill: {
            email: "customer@example.com",
            contact: "+919900000000",
        },
        theme: {
            color: "#3399cc"
        }
    };

    let rzp = new Razorpay(options);
    rzp.on('payment.failed', function (response) {
        alert(response.error.description);
    });

    document.getElementById('rzp-button1').onclick = function (e) {
        options.amount = getPriceInINR(); // Update amount before opening
        rzp = new Razorpay(options);
        rzp.open();
        e.preventDefault();
    };
}

// PayPal Integration
function initPayPal() {
    paypal.Buttons({
        createOrder: function (data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: (getBasePrice() * parseInt(document.getElementById('quantity').value)).toFixed(2)
                    }
                }]
            });
        },
        onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
                alert('Transaction completed by ' + details.payer.name.given_name);
            });
        }
    }).render('#paypal-button-container');
}

// Initialize everything when the DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    updatePrice();
    initRazorpay();
    initPayPal();
});
