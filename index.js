//we should also have an initialization function that prints out the filter options
//in this function we should make all of the even listeners for each filter element
//Like dropdowns, sliderFilters, etc
function init(){
    fetch("http://localhost:3000/movies")
    .then(resp => resp.json())
    .then(json => {
      console.log(json)
    })
}
//We'll call the init function once the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    init();
})

// we pass in 2 parameters for each filter. the Json object that're going to be using, and the filter itself to set as our condition.
// If filter matches, we insert that new element into a new object. then return that object
// First pass in. In take object return an array of filtered objects



function yearFilter(objectData, begin, end, genre, nameFilter) {
    let newObjData = [];
    for ( const obj in objectData) {
        console.log(objectData[obj].Year)
       
      const year = parseInt(objectData[obj].Year, 10)
      if (year >= begin && year <= end) {
         newObjData.push(objectData[obj])
  
    }
    genreFilter(newObjData, genre, nameFilter)
  }
}


// we go down each filter until we're done with all the filter. Each function should be creating a new variable contain the filtered elements
// from the objectData parameter.
// 2nd Pass In
// In takes array of objects
// returns an new array of objects that's been filtered
function genreFilter(objectData, genre){
    console.log(objectData)
    console.log(genre)
    let newDataObj = []
    for (let i = 0; i < objectData.length; i++){
        let newObjGenre = objectData[i].Genre.split(', ')
        if (newObjGenre.includes(genre)) {
            newDataObj.push(objectData[i])
        }
    }
    removeContents()
    renderMovie(newDataObj)
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
