//we pass in 2 parameters for each filter. the Json object that're going to be using, and the filter itself to set as our condition.
//If filter matches, we insert that new element into a new object. then return that object
// First pass in. In take object return an array of filtered objects
function yearFilter(objectData, begin, end){
    objectData.filter(data=> data.somehting.something.year === filterNum)
    removeContents()
    renderMovie(objectData)
}
//we go down each filter until we're done with all the filter. Each function should be creating a new variable contain the filtered elements
//from the objectData parameter.
//2nd Pass In
//In takes array of objects
//returns an new array of objects that's been filtered
function genreFilter(objectData, genre){
    objectData.filter(data=> data.somehting.something.name === genre)
    // we need to remove previous content and show only below
    removeContents()
    renderMovie(objectData)

}
//3rd Pass In.
// this is the name filter function. Returns a filtered objectData.
//Lastly, intakes an array of objects and the string from the search bar. If empty return the origin array. 
//should call renderMovie once done. 
function nameFilter(objectData, nameFilter){
    let nameFinderArray = turnSearchIntoArray(nameFilter);
    let newObjectData = []
    objectData.forEach(element => {
      if(nameFinderArray.includes(element.toLowerCase().split(' '))){
        newObjectData.push(element);
      }
    })
    renderMovie(newObjectData);
}

function turnSearchIntoArray(nameFilter){
  let newArray = nameFilter.toLowerCase().split(' ')
  let cleanedUpSearchArray = [];
  newArray.forEach((element) => {
    if(element.length > 4){
      cleanedUpSearchArray.push(element);
    }
  })
  return cleanedUpSearchArray
}

//Finally once we're done filtering we call the render function to print it out to the HTML page.
function renderMovie(objectData){
    
}
//we should also have an initialization function that prints out the filter options
//in this function we should make all of the even listeners for each filter element
//Like dropdowns, sliderFilters, etc
function init(){
    fetch("URL")
    .then(resp => resp.json())
    .then(json => {
        json.split()
        json.forEach(
            // Send whatever datatype to wherever
        )
    })
}
//We'll call the init function once the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    init();
})

// Location can be changed if you want it happened before or after init()
// Meaning, do we want to show every movie on the page first?
// Add EventLister for Name Submit Event
SearchForm.addEventListener("submit", (e) => {
    const input = e.target.name.value
    // how can we filter the input?
    if(isInputValid(input)) { 
    catFilter(input)
    searchForm.reset()
    } else {
        alert("Your input is Invalid. Please try again!")
        searchForm.reset()
    }
})

// Add EventLister for Dropdown Event
DropdownForm.addEventListener("change", (e) => {
    yearFilter(e.target.name.value)
    dropdownForm.reset()
})

// Remove Element from RenderSection
const removeContents = () => {
    document.querySelector("PlaceForRender").innerHTML = ""
}

// Check input is Valid
function isInputValid(input) {
    (input.length > 4) ? true : false
}



let newObject = {
  "Title": "The Godfather",
    "Year": "1972",
    "Rated": "R",
    "Released": "24 Mar 1972",
    "Runtime": "175 min",
    "Genre": "Crime, Drama",
    "Director": "Francis Ford Coppola",
    "Writer": "Mario Puzo (screenplay by), Francis Ford Coppola (screenplay by), Mario Puzo (based on the novel by)",
    "Actors": "Marlon Brando, Al Pacino, James Caan, Richard S. Castellano",
    "Plot": "An organized crime dynasty's aging patriarch transfers control of his clandestine empire to his reluctant son.",
    "Language": "English, Italian, Latin",
    "Country": "USA",
    "Awards": "Won 3 Oscars. Another 29 wins & 30 nominations.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "9.2/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "97%"
      },
      {
        "Source": "Metacritic",
        "Value": "100/100"
      }
    ],
    "Metascore": "100",
    "imdbRating": "9.2",
    "imdbVotes": "1,666,752",
    "imdbID": "tt0068646",
    "Type": "movie",
    "DVD": "01 Aug 2013",
    "BoxOffice": "$134,966,411",
    "Production": "Paramount Pictures",
    "Website": "N/A",
    "Response": "True"
}
let someString  = "Action"
genreFilter(newObeject, someString)