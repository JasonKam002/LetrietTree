const form = document.querySelector(".form");
const containerLogs = document.querySelector(".logging");
const inputCategory = document.querySelector(".form__input--category");
const inputName = document.querySelector(".form__input--name");
const inputSpecies = document.querySelector(".form__input--species");
const inputAge = document.querySelector(".form__input--age");
const inputNumBird = document.querySelector(".form__input--numBird");
const inputSearch = document.getElementById("searchID");
const imageInput = document.getElementById('image');

let map
let mapEvent
let logs = []

//Leaflet marker icon
var LeafIcon = L.Icon.extend({
  options: {
      iconSize:     [38, 50],
      shadowSize:   [50, 64],
      iconAnchor:   [22, 94],
      shadowAnchor: [4, 62],
      popupAnchor:  [-3, -76]
  }
});

var birdIcon = new LeafIcon({iconUrl: "bird.png"}),
    treeIcon = new LeafIcon({iconUrl: "tree.png"});


//objects
class log {
  date = new Date();
  id = (Date.now() + "").slice(-10);
  category =  ''
  image = []
  constructor(coords, name, species) {}
}

class bird extends log{
  category = "bird"
  
  constructor(coords, name, species, numBird) {
    super();
    this.coords = coords;
    this.name = name;
    this.species = species;
    this.numBird = numBird;
  }

} 

class tree extends log {
  category = "tree"
  
  constructor(coords, name, species, age) {
    super();
    this.coords = coords;
    this.name = name;
    this.species = species;
    this.age = age;
  }
}

// 46.258903,-63.1474395
// const latitude = position.coords.latitude;
//       const longtitude = position.coords.longitude;

//map
navigator.geolocation.getCurrentPosition(
    function (position) {
      console.log(position);
      const latitude = 46.258903;
      const longtitude = -63.1474395;
  
      map = L.map("map").setView([latitude, longtitude], 100);
  
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);


      //differrent map tile
//       var googleSat = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
//     maxZoom: 20,
//     subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
//     attribution: '&copy; <a href="https://maps.google.com">Google Maps</a>'
// }).addTo(map);

      const data = JSON.parse(localStorage.getItem("logs"))

        if (data) {
            logs = data
            console.log(logs)
        }

        for (const log of logs) {
          let lat = log.coords[0]
          let lng = log.coords[1]
          
          
          
          if (log.category === 'tree') {
            L.marker([lat, lng], {icon: treeIcon}).addTo(map)
                .bindPopup(L.popup({
                    maxWidth:250,
                    minWidth:100,
                    autoClose:false,
                    closeOnClick:false,
                    className: "log-popup",
                }))
                .setPopupContent(`Log by ${log.name} of ${log.category}`)
                .openPopup();
          } else if (log.category ==='bird') {
            L.marker([lat, lng], {icon: birdIcon}).addTo(map)
                .bindPopup(L.popup({
                    maxWidth:250,
                    minWidth:100,
                    autoClose:false,
                    closeOnClick:false,
                    className: "log-popup",
                }))
                .setPopupContent(`Log by ${log.name} of ${log.category}`)
                .openPopup();
          }
        }
      

      map.on('click', function(mapE) {
        mapEvent = mapE
        }
      )
    }
  )

// top bar

document.querySelector('#record').addEventListener('click', function() {
  document.querySelector('.searchBar').style.display = 'none'
  document.querySelector('.form').style.display = 'block'
})

document.querySelector('#search').addEventListener('click', function() {
  document.querySelector('.searchBar').style.display = 'block'
  document.querySelector('.form').style.display = 'none'
})

// change type

inputCategory.addEventListener('change', function(){

  if (inputCategory.value === 'tree') {
    inputNumBird.style.display = 'none'
    document.querySelector('.numBird').style.display = 'none'
    inputAge.style.display = 'block'
    document.querySelector('.age').style.display = 'block'
  }

  if (inputCategory.value === 'bird') {
    inputNumBird.style.display = 'block'
    document.querySelector('.numBird').style.display = 'block'
    inputAge.style.display = 'none'
    document.querySelector('.age').style.display = 'none'
  }
}) 

// upload image

let temporaryImage = []

  imageInput.addEventListener('change', function() {
    const file = this.files[0]
  
    if (file) {
      temporaryImage.push(URL.createObjectURL(file))
    }
  })

//submit btn

form.addEventListener("submit", function(e){
  e.preventDefault()

  const category = inputCategory.value
  const name = inputName.value
  const species = inputSpecies.value
  const lng = mapEvent.latlng.lng
  const lat = mapEvent.latlng.lat
  let log 

  if (inputCategory.value === 'tree') {
    const age = Number(inputAge.value)
    log = new tree([lat, lng],name,species,age)

    L.marker([lat, lng], {icon: treeIcon})
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: "log-popup",
      })
    )
    .setPopupContent(`Log by ${name} of ${category}`)
    .openPopup();
  }

  if (inputCategory.value === 'bird') {
    const numBird = Number(inputNumBird.value)
    log = new bird([lat,lng],name,species,numBird)

    L.marker([lat, lng], {icon: birdIcon})
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: "log-popup",
      })
    )
    .setPopupContent(`Log by ${name} of ${category}`)
    .openPopup();
  }

  if (log && log.image) {
    log.image = [...temporaryImage]; 
  }

  logs.push(log)
  localStorage.setItem("logs", JSON.stringify(logs))
  form.reset()
  temporaryImage = []

  console.log(logs)
})

document.querySelector("#searchBtn").addEventListener("click", function(e) {
  e.preventDefault()
  const search = inputSearch.value.toLowerCase()
  const matches = []
    for (log of logs) {
      if (log.name.toLowerCase().includes(search) || log.species.toLowerCase().includes(search)) {
        matches.push(log)
      }
    }
  console.log(matches)



  const resultDiv = document.querySelector("#results")

  resultDiv.innerHTML = ""

  if (matches.length === 0) {
    resultDiv.innerHTML = `No matches found`
  }

  for (const log of matches) {
    if (log.category === 'tree') {
        resultDiv.innerHTML +=

    `<div class="details">

        <h2 class="tree__title">
            🌳 ${log.name}
        </h2>

        <div class="tree__details">
            <span class="tree__label">
                Species:
            </span>

            <span class="tree__value">
                ${log.species}
            </span>
        </div>

        <div class="tree__details">
            <span class="tree__label">
                Date planted:
            </span>

            <span class="tree__value">
                ${log.age}
            </span>
        </div>

        <div class="tree__details">
            <span class="tree__label">
                Latitude:
            </span>

            <span class="tree__value">
                ${log.coords[0]}
            </span>
        </div>

        <div class="tree__details">
            <span class="tree__label">
                Longitude:
            </span>

            <span class="tree__value">
                ${log.coords[1]}
            </span>
        </div>

        <img class="treeImg" src="${log.image[0]}">

    </div>
    `
  } else if (log.category === 'bird') {
    resultDiv.innerHTML += `<div class="details">

        <h2 class="tree__title">
          🐦 ${log.name}
        </h2>

        <div class="tree__details">
            <span class="tree__label">
                Species:
            </span>

            <span class="tree__value">
                ${log.species}
            </span>
        </div>

        <div class="tree__details">
            <span class="tree__label">
                Age:
            </span>

            <span class="tree__value">
                ${log.numBird}
            </span>
        </div>

        <div class="tree__details">
            <span class="tree__label">
                Latitude:
            </span>

            <span class="tree__value">
                ${log.coords[0]}
            </span>
        </div>

        <div class="tree__details">
            <span class="tree__label">
                Longitude:
            </span>

            <span class="tree__value">
                ${log.coords[1]}
            </span>
        </div>

        <img class="treeImg" src="${log.image[0]}">

    </div>
    `
  }
  }
})