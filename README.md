# leaflet-challenge
I visualized earthquakes using Leaflet, selecting the "Past 7 Days" dataset from the USGS GeoJSON Feed. I plotted markers by location, scaled their size by magnitude, and used color to show depth. Each marker includes a popup with details, and I added a legend for clarity.


Repository Structure

Root Directory:
Contains the index.html file, which serves as the entry point for the web application. This file links all necessary external libraries and internal resources.

static Folder:
Houses static assets such as custom CSS and JavaScript files.

static/css/style.css:
Custom CSS for styling the map, controls, and other elements in the web application.

static/js/logic.js:
Custom JavaScript logic for interacting with the map, processing data, and implementing features like marker clustering and category filtering.
External Resources:

Dependencies such as Leaflet, D3.js, and Marker Cluster libraries are loaded via external CDNs. These resources are not hosted within the repository but are critical for the application's functionality.
