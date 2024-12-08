// Santa's tracking functionality
let map;
let santaMarker;
let sleighIcon;

// Initialize the map
function initMap() {
    map = L.map('map').setView([90, 0], 2); // Start at North Pole
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Custom Santa sleigh icon
    sleighIcon = L.icon({
        iconUrl: 'assets/sleigh.png',
        iconSize: [50, 50],
        iconAnchor: [25, 25]
    });

    // Add Santa marker at North Pole
    santaMarker = L.marker([90, 0], { icon: sleighIcon }).addTo(map);
}

// Update countdown timer
function updateCountdown() {
    const christmas = new Date(new Date().getFullYear(), 11, 25); // December 25th
    const now = new Date();
    
    if (now.getMonth() === 11 && now.getDate() > 25) {
        christmas.setFullYear(christmas.getFullYear() + 1);
    }
    
    const diff = christmas - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('countdown-timer').innerHTML = 
        `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Simulate Santa's movement
function updateSantaLocation() {
    const christmas = new Date(new Date().getFullYear(), 11, 25);
    const now = new Date();
    
    // Only move Santa on Christmas Eve
    if (now.getMonth() === 11 && now.getDate() === 24) {
        // Calculate position based on time
        const hour = now.getHours();
        const minute = now.getMinutes();
        
        // Simple path calculation (can be made more complex)
        const latitude = 90 - (hour * 7.5); // Move from North to South
        const longitude = (hour * 15) - 180; // Move West to East
        
        santaMarker.setLatLng([latitude, longitude]);
        
        // Update location info
        const locations = [
            "North Pole", "Russia", "China", "India", "Middle East",
            "Europe", "Africa", "Atlantic Ocean", "South America",
            "Central America", "North America", "Pacific Ocean"
        ];
        
        const currentLocation = locations[Math.floor(hour / 2)];
        const nextLocation = locations[Math.floor(hour / 2) + 1] || "Home (North Pole)";
        
        document.getElementById('current-location').textContent = currentLocation;
        document.getElementById('next-stop').textContent = nextLocation;
    } else {
        document.getElementById('current-location').textContent = "North Pole";
        document.getElementById('next-stop').textContent = "Preparing for Christmas Eve!";
    }
}

// Initialize tracking features
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    updateCountdown();
    setInterval(updateCountdown, 1000);
    setInterval(updateSantaLocation, 60000); // Update every minute
});
