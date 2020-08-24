var loc = confirm("¿Would you like to see your location?\n\t\tI'll NOT save any data");

var map;
var infobox;
// Define an HTML template for a custom infobox.
var infoboxTemplate = '<div class="customInfobox"><div class="title">{title}</div>{description}</div>';

// Load the map
function GetMap() {
    const uruguay = new Microsoft.Maps.Location(-32.522779, -55.76583);
    map = new Microsoft.Maps.Map('#map', {
        credentials: 'Ark3JbqkHsOnd8qjLelr7obBpFsfNMH0Hr81XW3_BqtsogvcRPEayxCvC7qoKZRq',
        center: uruguay,
        mapTypeId: Microsoft.Maps.MapTypeId.street,
        zoom: 7
    });

    // Available icons
    const adventure = 'https://img.icons8.com/android/24/ff0000/trekking.png';
    const gastronomy = 'https://img.icons8.com/metro/26/0062ff/meal.png';
    const history = 'https://img.icons8.com/android/24/000000/museum.png';
    const beach = 'https://img.icons8.com/android/24/f5a105/beach.png';
    const animal = 'https://img.icons8.com/material-rounded/24/1cd428/black-jaguar.png'

    // GENERATE PINS - lat, lon, title, subtitle, icon, desc
    addPin(-34.914706, -56.178849, 'Rambla', 'Montevideo', beach, '24km to enjoy a walk by the Río de la Plata coast.');
    addPin(-34.907933, -56.201114, 'Teatro Solís', 'Montevideo', history, 'Founded in 1856, is the main theater in Uruguay, with a capacity for 1500 spectators.');
    addPin(-34.905777, -56.211685, 'Mercado del Puerto', 'Montevideo', gastronomy, 'Here are numerous restaurants that serve, among other specialties, the Uruguayan roast beef.');
    addPin(-34.906566, -56.199653, 'Plaza Independencia', 'Montevideo', history, 'Here you can find the Monument to Artigas and you can access the underground mausoleum where the remains of the hero are kept.');
    addPin(-34.888403, -56.259783, 'Fortaleza del Cerro', 'Montevideo', history, 'Its function was to defend the population of Montevideo and its port, it is the last Spanish fortification built in Uruguay.');
    addPin(-34.886944, -56.183640, 'Mercado Agricola', 'Montevideo', gastronomy, 'In 1999, it was declared a National Historic Monument and is one of the largest agricultural markets in Montevideo.');
    addPin(-34.470188, -57.846690, 'Colonia del Sacramento', 'Colonia', history, 'Its old town was declared a World Heritage Site in 1995 for illustrating the successful fusion of Portuguese, Spanish and post-colonial styles.');
    addPin(-34.957941, -54.937287, 'Punta del Este', 'Maldonado', beach, 'One of the most exclusive coasts in Latin America and the most important in Uruguay.');
    addPin(-34.869540, -55.275217, 'Piriápolis', 'Maldonado', beach, 'Piriápolis is an important coastal city and was the first coastal city in the country.');
    addPin(-34.908635, -55.044726, 'Casapueblo', 'Maldonado', history, 'Casapueblo was built by the artist Carlos Páez Vilaró. It includes a museum, an art gallery, a cafe and a hotel.');
    addPin(-34.810719, -55.258433, 'Cerro Pan de Azúcar', 'Maldonado', adventure, 'It is possible to climb this hill on its southern slope, anyway you do not need any special equipment.');
    addPin(-34.815045, -55.249460, 'Reserva del Pan de Azúcar', 'Maldonado', animal, 'An area of ​​86 hectares, houses about 250 specimens of 53 species of Uruguayan fauna, surrounded by native trees and shrubs.');
    addPin(-34.044788, -53.537282, 'Punta del Diablo', 'Rocha', beach, 'Its beaches occupy around 10 kilometers of coastline, where Playa de los Pescadores is the most familiar and is characterized by artisanal fishing boats.');
    addPin(-34.001282, -53.554929, 'Parque Nacional Santa Teresa', 'Rocha', animal, 'The park has 3000 hectares of extension, in which there are innumerable species of native and exotic flora, including more than 2 million trees.');
    addPin(-34.387570, -53.800817, 'Cabo Polonio', 'Rocha', beach, 'Sea lions can be seen from the coast or from the lighthouse.');
    addPin(-34.655707, -54.166027, 'La Paloma', 'Rocha', beach, 'La Paloma is a coastal city and ocean port.');
    addPin(-31.457884, -57.909449, 'Termas del Dayman', 'Salto', beach, 'They are the busiest thermal complex in the region, born in 1957 after a failed attempt to find oil.');
    addPin(-31.456534, -57.911155, 'Acuamanía', 'Salto', beach, 'It is the first water park in Uruguay with hot springs.');
    addPin(-30.946669, -57.521280, 'Termas del Arapey', 'Salto', beach, 'It was developed around thermal water wells, currently exploited for tourism.');

    // Add Pin Function
    function addPin(lat, lon, title, subtitle, icon, desc) {
        let location = new Microsoft.Maps.Location(lat, lon);
        var pin = new Microsoft.Maps.Pushpin(location, {
            title: title,
            subTitle: subtitle,
            icon: icon
        });

        // Add metadata
        pin.metadata = {
            title: title,
            description: desc
        };

        // Hide the infobox
        infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
            visible: false
        });

        // Add the infobox to map
        infobox.setMap(map);

        // Add a click event handler to the map
        Microsoft.Maps.Events.addHandler(map, 'click', closeInfobox);

        //Add a click event handler to the pushpin.
        Microsoft.Maps.Events.addHandler(pin, 'click', pushpinClicked);
        // Add the pushpin to the map
        map.entities.push(pin);
    }

    // Return the center to uruguay Function
    function returnUruguay() {
        setTimeout(function () {
            var back = confirm('¿Want to see amazing sites in Uruguay now?');
            if (back) {
                map.setView({
                    center: uruguay,
                    zoom: 7
                })
            } else {
                alert("Ok, I'll ask again in exactly 10 seconds!");
                returnUruguay();
            }
        }, 10000);
    }

    // Check if geolocation is supported
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("Sorry, geolocation is not supported by this browser :(");
        }
    }

    // Set center on user location
    function showPosition(position) {
        let userPosition = new Microsoft.Maps.Location(position.coords.latitude, position.coords.longitude);
        addPin(position.coords.latitude, position.coords.longitude, 'Hello!', 'You are around here!', '', 'This may not be 100% accurate, but it works pretty fine!');
        map.setView({
            center: userPosition,
            zoom: 16
        });
    }

    // Return center to uruguay
    if (loc) {
        alert("\t\t\t\tThank you!\nOnce you accept, I'll show you where you are!");
        getLocation();
        returnUruguay();
    } else {
        alert("Alright, let's see some nice places then!");
    }
}

// Close infobox when map is clicked
function closeInfobox() {
    infobox.setOptions({
        visible: false
    });
}

// Open infobox when pin is clicked
function pushpinClicked(e) {
    //Set the infobox options with the metadata of the pushpin.
    infobox.setOptions({
        location: e.target.getLocation(),
        title: e.target.metadata.title,
        description: e.target.metadata.description,
        htmlContent: infoboxTemplate.replace('{title}', e.target.metadata.title).replace('{description}', e.target.metadata.description),
        visible: true
    });
}