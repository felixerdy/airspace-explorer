var map = L.map('map').setView([51.8, 7.8], 10);
var Esri_WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
Esri_WorldImagery.addTo(map);
$.getJSON("Germany_Week22_2016-airspaces.json", (response) =>  {
  geojsonLayer = L.geoJson(response).addTo(map);
  map.fitBounds(geojsonLayer.getBounds());
})
