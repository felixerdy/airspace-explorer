var map = L.map('map').setView([51.8, 7.8], 10);
var Esri_WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
var Stamen_Watercolor = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    minZoom: 1,
    maxZoom: 16,
    ext: 'png'
});
var Stamen_Terrain = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 18,
    ext: 'png'
});

var baseMaps = {
    "ESRI": Esri_WorldImagery,
    "Watercolor": Stamen_Watercolor,
    "Terrain": Stamen_Terrain
};

Esri_WorldImagery.addTo(map);
L.control.layers(baseMaps).addTo(map);
$.getJSON('Germany_Week22_2016-airspaces.json', (response) => {
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
