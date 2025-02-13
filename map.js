
// Initialisiere die Karte
var map = L.map('map').setView([51, 10], 4);

// OpenStreetMap als Hintergrundkarte
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Marker-Cluster-Gruppe hinzufügen
var markersCluster = L.markerClusterGroup();
map.addLayer(markersCluster);

// Arbeitsgruppen-Daten
var data = [
    { id: 1, name: "Arbeitsgruppe A", lat: 52.52, lng: 13.405, category: "Zuchtgruppe" },
    { id: 2, name: "Arbeitsgruppe B", lat: 48.137, lng: 11.576, category: "Basiszucht", website :"Hallo Welr...." },
    { id: 3, name: "Arbeitsgruppe C", lat: 50.1109, lng: 8.6821, category: "Zuchtgruppe" },
    { id: 4, name: "Belegstelle", lat: 50.109, lng: 8.6721, category: "Belegstelle" }
];

// Marker speichern
var markers = {};

function showDetails(group) {
    
    document.getElementById("details-content").innerHTML = `
        <h3>${group.name}</h3>
        <p><b>Kategorie:</b> ${group.category}</p>
        <p>${group.description || 'Keine Beschreibung verfügbar'}</p>
        <p><a href="${group.website || '#'}" target="_blank">Mehr erfahren</a></p>`;
}

// Marker zur Karte hinzufügen
function addMarkers() {

    markersCluster.clearLayers();
    markers = {};

    data.forEach(group => {
        var marker = L.marker([group.lat, group.lng])
            .bindPopup(`<h3>${group.category}</h3><b>${group.name}</b><br><button onMouseover="showDetails('JSON.stringify(group)')">Details anzeigen </button>`);
        marker.category = group.category;
        markers[group.name.toLowerCase()] = marker;
        markersCluster.addLayer(marker);
    });
}

//showDetails($JSON.stringify(group))})



// Filterfunktion für Kategorien
function filterMarkers() {
    var selectedCategory = document.getElementById("category").value;
    markersCluster.clearLayers();

    Object.values(markers).forEach(marker => {
        if (selectedCategory === "alle" || marker.category === selectedCategory) {
            markersCluster.addLayer(marker);
        }
    });
}

// Suchfunktion
function searchMarker() {
    var searchValue = document.getElementById("search").value.toLowerCase();
    if (markers[searchValue]) {
        map.setView(markers[searchValue].getLatLng(), 10);
        markers[searchValue].openPopup();
    }
}

// Initiale Marker setzen
addMarkers();
