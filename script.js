const form = document.querySelector(".form");
const containerLogs = document.querySelector(".logging");
const inputCategory = document.querySelector(".form__input--category");
const inputName = document.querySelector(".form__input--name");
const inputSpecies = document.querySelector(".form__input--species");
const inputAge = document.querySelector(".form__input--age");
const inputNumBird = document.querySelector(".form__input--numBird");

let map
let mapEvent

//objects
class log {
  date = new Date();
  id = (Date.now() + "").slice(-10);
  category =  ''
  constructor(coords, name, species, age) {}
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
        form.style.display = 'block'
        mapEvent = mapE
        }
      )
    }
  )


// form event listener

form.addEventListener('submit', function(e){
  e.preventDefault()

  if (inputCategory.type == 'tree') {
    inputNumBird.visibility = 'hidden'
  }
  }
)

// change type

inputCategory.addEventListener('change', function(){

  /*if (inputCategory.value == 'tree') {
    inputNumBird.style.display = 'none'
    document.querySelector('.numBird').style.display = 'none'
    inputAge.style.display = 'block'
    document.querySelector('.age').style.display = 'block'
  }

  if (inputCategory.value == 'bird') {
    inputNumBird.style.display = 'block'
    document.querySelector('.numBird').style.display = 'block'
    inputAge.style.display = 'none'
    document.querySelector('.age').style.display = 'none'
    console.log("1")
  }*/

  const numBirdRow = inputNumBird.closest(".form_row")
  const ageRow = inputAge.closest(".form_row")

  if (inputCategory.value === 'tree') {
    ageRow.classList.remove("form__row--hidden")
    numBirdRow.classList.add("form__row--hidden")
    console.log("1")
  }

  if (inputCategory.value === 'bird') {
    ageRow.classList.add("form__row--hidden")
    numBirdRow.classList.remove("form__row--hidden")
    console.log("2")
  }

}) 