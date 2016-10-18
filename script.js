var map = L.map('map').setView([51.8, 7.8], 10);
var Esri_WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
Esri_WorldImagery.addTo(map);
$.getJSON('Germany_Week22_2016-airspaces.json', (response) => {
    console.log(response);
    var airspaces = L.geoJSON(response, {
        style: function(feature) {
            switch (feature.properties.CLASS) {
                case 'R':
                    return {
                        color: 'red'
                    };
                case 'TMZ':
                    return {
                        color: 'black'
                    };
                case 'RMZ':
                    return {
                        color: '#ff2a2a'
                    };
                case 'W':
                    return {
                        color: 'yellow'
                    };
                case 'CTR':
                    return {
                        color: '#ff4e4e'
                    };
                case 'Q':
                    return {
                        color: 'red'
                    };
            }
        },
        onEachFeature: onEachFeature
    }).addTo(map);
    map.fitBounds(airspaces.getBounds());
})

function onEachFeature(feature, layer) {
    layer.bindPopup(
        `NAME: ${feature.properties.NAME}<br>` +
        `CLASS: ${feature.properties.CLASS}<br>` +
        `CEILING: ${feature.properties.CEILING}<br>` +
        `FLOOR: ${feature.properties.FLOOR}`
    );
}
