function initMap() {
    // Initialize the map centered at a default location
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 20.5937, lng: 78.9629 }, // Default to India
        zoom: 12
    });

    // Try to get user's current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            // Center map to user's location
            map.setCenter(userLocation);

            // Add marker for user's location
            new google.maps.Marker({
                position: userLocation,
                map: map,
                title: "You are here"
            });

            // Call function to find nearby emergency services
            findNearbyServices(map, userLocation);
        }, function () {
            alert("Geolocation service failed. Please enable location.");
        });
    } else {
        alert("Your browser does not support Geolocation.");
    }
}

// Function to find nearby emergency services
function findNearbyServices(map, location) {
    var service = new google.maps.places.PlacesService(map);
    
    var request = {
        location: location,
        radius: 5000, // 5 km radius
        type: ["hospital", "police"] // Search for hospitals & police stations
    };

    service.nearbySearch(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                createMarker(map, results[i]);
            }
        }
    });
}

// Function to create markers for emergency services
function createMarker(map, place) {
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        title: place.name
    });

    var infoWindow = new google.maps.InfoWindow({
        content: `<strong>${place.name}</strong><br>
                  Address: ${place.vicinity}<br>
                  Rating: ${place.rating || "N/A"}`
    });

    marker.addListener("click", function () {
        infoWindow.open(map, marker);
    });
}

// Attach event listener to the emergency button
document.getElementById('emergencyButton').addEventListener('click', function () {
    alert("Emergency help requested! Nearest services are shown on the map.");
});
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
