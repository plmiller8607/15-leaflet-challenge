//Define map
let basmap = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    } );


//Initialize map
let map = L.map("map", {
    center: [40.7, -94.5],
    zoom: 3
  })

  basmap.addTo(map)
  
// Use colors to visualize different earthquake depths
  function getColor(depth) {
    if(depth>90) {
        return "#ea2c2c"
    } else if(depth>70) {
        return "#ea822c"
    } else if(depth>50) {
        return "#ee9c00"
    } else if(depth>30) {
        return "#eecc00"
    } else if(depth>10) {
        return "#d4ee00"
    }
    else{
        return "#98ee00"
    }
  }

//Allows visualization to show greater magnitudes by a larger circle radius
  function getRadius(magnitude) {
    if(magnitude==0) {
        return 1
    }
    return magnitude*4
  }

// Data source: USGS GeoJSON Feed-All earthquakes in the last 7 days 
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
        console.log(data);

//Create an opaque object with a boarder that calls the color and radius function       
        function styleInfo(feature) {
            return{
                opacity:1,
                fillOpacity: 1,
                fillColor: getColor(feature.geometry.coordinates[2]),
                color: "#000000",
                radius: getRadius(feature.properties.mag),
                stroke: true,
                weight: 0.6
              

            }
        }
//Create a circle on the map to visualize the defined earthquake data
        L.geoJson(data,{
            pointToLayer: function(feature, latlng) {
                return L.circleMarker(latlng);
            },
            style: styleInfo,
            onEachFeature: function(feature,layer) {
                layer.bindPopup(`
                    Magnitude: ${feature.properties.mag} <br>
                    Depth: ${feature.geometry.coordinates[2]} <br>
                    Location:${feature.properties.place} <br>
                `);
            }
            
    }).addTo(map);

})



    