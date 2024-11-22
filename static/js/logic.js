// Define the URL for the USGS GeoJSON feed
const queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Create the map object and set its initial view to center on a location
const map = L.map("map").setView([37.7749, -122.4194], 5); // Centered on San Francisco

// Add a tile layer (base map)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
  maxZoom: 18,
}).addTo(map);

// Function to determine marker size based on earthquake magnitude
function markerSize(magnitude) {
  return magnitude * 3; // Adjust size multiplier as needed
}

// Function to determine marker color based on earthquake depth
function markerColor(depth) {
  if (depth > 80) return "#ff0000"; // Deep earthquakes (red)
  if (depth > 50) return "#ff6600"; // Moderately deep (orange)
  if (depth > 30) return "#ffcc00"; // Shallow to moderate (yellow)
  if (depth > 10) return "#ccff33"; // Shallower (light green)
  return "#33cc33"; // Very shallow (green)
}

// Fetch the GeoJSON data
d3.json(queryUrl).then((data) => {
  // Add a GeoJSON layer to the map
  L.geoJSON(data, {
    // Create a circle marker for each earthquake
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, {
        radius: markerSize(feature.properties.mag),
        fillColor: markerColor(feature.geometry.coordinates[2]), // Depth is the third coordinate
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8,
      });
    },
    // Bind popups to each marker
    onEachFeature: function (feature, layer) {
      layer.bindPopup(
        `<h3>${feature.properties.place}</h3>
         <hr>
         <p><strong>Magnitude:</strong> ${feature.properties.mag}</p>
         <p><strong>Depth:</strong> ${feature.geometry.coordinates[2]} km</p>
         <p><strong>Time:</strong> ${new Date(feature.properties.time).toLocaleString()}</p>`
      );
    },
  }).addTo(map);

 // Create a legend control
 let legend = L.control({ position: "bottomright" });

 // Create the legend's content
 legend.onAdd = function() {
   let div = L.DomUtil.create("div", "info legend");
   let grades = [0, 10, 30, 50, 80]; // Depth ranges
   let labels = [];

   // Loop through depth ranges and create a label for each
   for (let i = 0; i < grades.length; i++) {
     div.innerHTML +=
       '<i style="background:' + markerColor(grades[i] + 1) + '"></i> ' + // Use markerColor to get the color
       grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + ' km<br>' : '+ km');
   }
   return div;
 };

 // Add the legend to the map
 legend.addTo(map);
});