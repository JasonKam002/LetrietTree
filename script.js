const form = document.querySelector(".form");
const containerLogs = document.querySelector(".logging");
const inputCategory = document.querySelector(".form__input--category");
const inputName = document.querySelector(".form__input--name");
const inputSpecies = document.querySelector(".form__input--species");
const inputAge = document.querySelector(".form__input--age");
const inputNumBird = document.querySelector(".form__input--numBird");
const inputSearch = document.getElementById("#searchID");

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

//map
navigator.geolocation.getCurrentPosition(
    function (position) {
      console.log(position);
      const latitude = position.coords.latitude;
      const longtitude = position.coords.longitude;
  
      map = L.map("map").setView([latitude, longtitude], 13);
  
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      

      map.on('click', function(mapE) {
        mapEvent = mapE
        }
      )
    }
  )


// form event listener

/*form.addEventListener('submit', function(e){
  e.preventDefault()

  if (inputCategory.type == 'tree') {
    inputNumBird.visibility = 'hidden'
  }
  }
)*/

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

  // const numBirdRow = inputNumBird.closest(".form_row")
  // const ageRow = inputAge.closest(".form_row")

  // if (inputCategory.value === 'tree') {
  //   ageRow.classList.remove("form__row--hidden")
  //   numBirdRow.classList.add("form__row--hidden")
  //   console.log("1")
  // }

  // if (inputCategory.value === 'bird') {
  //   ageRow.classList.add("form__row--hidden")
  //   numBirdRow.classList.remove("form__row--hidden")
  //   console.log("2")
  // }

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

  logs.push(log)

  console.log(logs)
})


inputSearch.addEventListener("input", function(e) {

  
})