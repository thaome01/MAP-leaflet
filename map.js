//#1 Set up my Project
//My file is name index.html
//My file is name map.js
//I will connect my file using external/links/src
//I know that my file are connected properly and loading expecting when I do not have a error on map

//The event that I will use on my application click eventlistener and windowload
//Api 


// process foursquare array
//My Map Object
const myMap = [
    ["Restaurant",43.04892,-87.90608],
    ["Coffee",43.04429,-87.90003],
    ["hotel",43.04212,-87.90118],
    ["market",43.04502,-87.90418],
    ["I am here",43.04041, -87.89725,]
    ];

    
    let map = L.map('map').setView([43.0477, -87.9046], 8);
    mapLink = 
        '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 20,
        }).addTo(map);

        
    for (let i = 0; i < myMap.length; i++) {
        marker = new L.marker([myMap[i][1],myMap[i][2]])
            .bindPopup(myMap[i][0])
            .addTo(map);
    }

	

// get coordinates via geolocation api
async function getCoords(){
	const pos = await new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject)
	});
	return [pos.coords.latitude, pos.coords.longitude]
}

// get foursquare businesses
const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: 'fsq3EhW/3+H9wwltOA1tS268+Hi5deXTS9avechWfkeTR9Y='
    }
  };
  
 async function getResponse() {
    fetch(`https://cors-anywhere.herokuapp.com/https://api.foursquare.com/v3/places/search?&query=coffee&limit=5&ll=41.8781%2C-87.6298`, options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

}



// event handlers
// window load
window.onload = async () => {
	const coords = await getCoords()
	console.log(coords)
	myMap.coordinates = coords
	
}

//This is the submit button to pick which location//

document.getElementById('submit').addEventListener('click', async (event) => {
	event.preventDefault()
	let business = document.getElementById('business').value
	console.log(business)
})

pathCoords = connectTheDots(window.geojson);
var pathLine = L.polyline(pathCoords).addTo(map)

