// Initialize Google Pay API
const paymentsClient = new google.payments.api.PaymentsClient({
    environment: 'TEST', // Change to 'PRODUCTION' for production environment
    merchantInfo: {
        merchantId: 'YOUR_MERCHANT_ID',
        merchantName: 'Your Organization Name'
    },
    paymentDataRequest: {
        transactionInfo: {
            totalPriceStatus: 'FINAL',
            totalPrice: '10.00', // Donation amount
            currencyCode: 'USD' // Currency code
        },
        allowedPaymentMethods: ['CARD', 'TOKENIZED_CARD'],
        cardRequirements: {
            allowedCardNetworks: ['VISA', 'MASTERCARD'],
            billingAddressRequired: true,
            billingAddressFormat: 'FULL'
        }
    }
});

// Function to handle payment request
function onGooglePayButtonClick() {
    const paymentDataRequest = paymentsClient.createPaymentDataRequest();
    paymentsClient.loadPaymentData(paymentDataRequest)
        .then(function (paymentData) {
            // Handle successful payment
            console.log('Payment successful:', paymentData);
        })
        .catch(function (err) {
            // Handle errors
            console.error('Payment failed:', err);
        });
}

// Attach event listener to Google Pay button
document.getElementById('google-pay-button').addEventListener('click', onGooglePayButtonClick);
// Create cursor element dynamically
const cursor = document.createElement("div");
cursor.id = "custom-cursor";
document.body.appendChild(cursor);

// Move cursor on mouse movement
document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});
document.addEventListener("DOMContentLoaded", function () {
    // Create cursor overlay element
    const cursor = document.createElement("div");
    cursor.classList.add("cursor");
    document.body.appendChild(cursor);

    // Move cursor with mouse
    document.addEventListener("mousemove", (e) => {
        cursor.style.top = `${e.clientY}px`;
        cursor.style.left = `${e.clientX}px`;
    });

    // Theme toggle functionality
    const toggleBtn = document.createElement("button");
    toggleBtn.classList.add("toggle-btn");
    toggleBtn.textContent = "🌙 Dark Mode";

    document.body.appendChild(toggleBtn);

    // Check user preference
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        toggleBtn.textContent = "☀️ Light Mode";
    } else {
        document.body.classList.add("light-mode");
    }

    // Toggle theme on button click
    toggleBtn.addEventListener("click", function () {
        if (document.body.classList.contains("dark-mode")) {
            document.body.classList.remove("dark-mode");
            document.body.classList.add("light-mode");
            toggleBtn.textContent = "🌙 Dark Mode";
            localStorage.setItem("theme", "light");
        } else {
            document.body.classList.remove("light-mode");
            document.body.classList.add("dark-mode");
            toggleBtn.textContent = "☀️ Light Mode";
            localStorage.setItem("theme", "dark");
        }
    });
});
