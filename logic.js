function createMap(quakeMap) {

    // Create the tile layer that will be the background of our map
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.dark",
      accessToken: API_KEY
    });
  
    
    //Placeholder Basemap for testing
    var baseMaps = {
      "Light Map": lightmap
    };

    // Create an overlayMaps object to hold the bikeStations layer
    var overlayMaps = {
      "Earthquakes": quakeMap
    };
  
    // Create the map object with options
    var map = L.map("map-id", {
      center: [40.73, -74.0059],
      zoom: 2,
      layers: [lightmap, quakeMap]
    });
  
    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
  }
  
  function createMarkers(response) {
  
    // Pull the "locations" property off of response.data
    var location = response.features;
  
    // Initialize an array to hold earthquake markers
    var quakeMarkers = [];
    var geo = [];
    // Loop through the stations array
    for (var index = 0; index < location.length; index++) {
      var earthquakes = location[index].geometry.coordinates;
      var magnitude = location[index].properties.mag;

      // For each station, create a marker and bind a popup with the station's name
      var quakeMarker = L.marker([earthquakes[1], earthquakes[0]])
        .bindPopup("<h3>Coordinates: " + earthquakes[1] + ", " + earthquakes[0] + "<h3>");
  
      // Add the marker to the bikeMarkers array
      quakeMarkers.push(quakeMarker);

    };
      
    
    // Create a layer group made from the bike markers array, pass it into the createMap function
    createMap(L.layerGroup(quakeMarkers));
  }
  
  
  // Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson", createMarkers);
 
  
  //   // Styling
    //   var geojsonMarkerOptions = {
    //     radius: magnitude,
    //     fillColor: "#ff7800",
    //     color: "#000",
    //     weight: 1,
    //     opacity: 1,
    //     fillOpacity: 0.8
    //   }
    
    //   L.geoJSON(earthquakes, {
    //       pointToLayer: function (feature, quakeMarker) {
    //           return L.circleMarker(quakeMarker, geojsonMarkerOptions);
    //       }
    //   }).addTo(map);
      
    // }
  //   function onEachFeature(feature, layer) {
  //     // does this feature have a property named popupContent?
  //     if (feature.properties && feature.properties.popupContent) {
  //         layer.bindPopup(feature.properties.popupContent);
  //         }
  //     }
      
  //     var geojsonFeature = response;
      
  //     L.geoJSON(geojsonFeature, {
  //         onEachFeature: onEachFeature,
  //         pointToLayer: 
  //     }).addTo(map);

// function createMap(bikeStations) {

//     // Create the tile layer that will be the background of our map
//     var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
//       attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
//       maxZoom: 18,
//       id: "mapbox.light",
//       accessToken: API_KEY
//     });
   
//     var layers = {
//       COMING_SOON: new L.LayerGroup(),
//       EMPTY: new L.LayerGroup(),
//       LOW: new L.LayerGroup(),
//       NORMAL: new L.LayerGroup(),
//       OUT_OF_ORDER: new L.LayerGroup()
//     };
//     // Create a baseMaps object to hold the lightmap layer
//     var baseMaps = {
//       "Light Map": lightmap
//     };
   
//     // Create an overlayMaps object to hold the bikeStations layer
//     var overlayMaps = {
//       "Bike Stations": bikeStations
//     };
   
//     // Create the map object with options
//     var map = L.map("map-id", {
//       center: [40.73, -74.0059],
//       zoom: 12,
//       // layers: [lightmap, bikeStations]
//       layers: [
//         layers.COMING_SOON,
//         layers.EMPTY,
//         layers.LOW,
//         layers.NORMAL,
//         layers.OUT_OF_ORDER
//       ]
//     });
   
//     // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
//     L.control.layers(baseMaps, overlayMaps, {
//       collapsed: false
//     }).addTo(map);
//    }
   
//    function createMarkers(response) {
   
//     // Pull the "stations" property off of response.data
//     var stations = response.data.stations;
   
//     // Initialize an array to hold bike markers
//     var bikeMarkers = [];
   
//     // Loop through the stations array
//     for (var index = 0; index < stations.length; index++) {
//       var station = stations[index];
   
//       // For each station, create a marker and bind a popup with the station's name
//       var bikeMarker = L.marker([station.lat, station.lon])
//         .bindPopup("<h3>" + station.name + "<h3><h3>Capacity: " + station.capacity + "<h3>");
   
//       // Add the marker to the bikeMarkers array
//       bikeMarkers.push(bikeMarker);
//     }
   
//     // Create a layer group made from the bike markers array, pass it into the createMap function
//     createMap(L.layerGroup(bikeMarkers));
//    }
   
   
//    // Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
//   //  d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json", createMarkers);
  
//   // Advanced:
//    d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json", function(infoRes) {
//      d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_status.json", function(statusRes){
//       var updatedAt = infoRes.last_updated;
//       var stationStatus = statusRed.data.stations;
//       var stationInfo = infoRes.data.stations;
  
//       //Create an object to keep the number of markers in each layer
//       var stationCount = {
//         COMING_SOON: 0,
//         EMPTY: 0,
//         LOW: 0,
//         NORMAL: 0,
//         OUT_OF_ORDER: 0
//       };
  
//       //Initialize the stationStatusCode, which will be used as a key to access the appropriate layers, icons, andstation count 
//      var stationStatusCode;
  
//      for (var i = o; i < stationInfo.length; i++) {
//        var station = Onject.assign({}, stationInfo[i], stationStatus[i]);
//       // If a station is listed but no installed, it's coming soon
//        if (!station.is_installed) {
//          stationStatusCode = "COMING_SOON";
//        }
//        // If a station has no bikes available, it's empty
//        else if (!station.num_bikes_available) {
//          stationStatusCode = "EMPTY"; 
//        }
//        // If a station is installed but isn't renting, it's out of order
//        else if (!station.is_installed && !station.is_renting) {
//          stationStatusCode = "OUT_OF_ORDER";
//        }
//        // If a station has less than 5 bikes, it's status is low
//        else if (station.num_bikes_available < 5) {
//          stationStatusCode = "LOW";
//        }
//        // Otherwise the station is normal
//        else {
//          stationStatusCode = "NORMAL";
//        }
  
//        // Update the Station Count
//        stationCount(stationStatusCode)++;
//        //Create a new marker with the appropriate icon and coordinates
//        var newMarker = L.marker([station.lat, station.lon], {
//          incon: IntersectionObserver[stationStatusCode]
//        });
  
//        newMarker.addTo(layers[stationStatusCode]);
  
//        newMarker.bindPopup(station.name + "<br> Capacity: " + station.capacity + "<br>" + station.num_bike_available + "Bikes Available");
//       }
  
//      })
//    });