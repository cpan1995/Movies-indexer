//Call the init function once the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const apiKey = [API_KEY]
  init(apiKey);
})

//Initionalization Function, Renders Selectors Container
//Plus adds eventlisteners for submit. 
function init(key){
    let genreSelector = document.querySelector('#genreID')
    let genreArray = ['Comedy', 'Sci-Fi', 'Horror', 'Romance', 'Action', 'Thriller','Drama', 'Mystery', 'Crime', 'Animation', 'Adventure', 'Fantasy', 'Documentary']
    let genreType
    genreArray.forEach(genre => {
      let newElement = document.createElement('option');
      newElement.setAttribute('value', genre);
      newElement.textContent = genre;
      genreSelector.append(newElement);
    })
    let movieName = document.querySelector('#queryForm');
    genreSelector.addEventListener('change', (e)=> {
      genreType = e.target.value
    })
    movieName.addEventListener('submit', (e)=> {
      e.preventDefault();
      removeContainer();
      console.log()
      const searchObject = {
        "begin": e.target.rangeBegin.value,
        "endYear": e.target.rangeEnd.value,
        "searchName": e.target.name.value,
        "genreType": genreType,
        "apiKey": key
      }
      getAllObjects(searchObject);
    })
    resetForm(movieName)
}

//Traversing Search API. Stores the total number of pages from the API call.
//Passes pageNumber infomation over to getRestOfPages()
function getAllObjects(searchObject){
  let searchValue = searchObject.searchName.replace(' ', '_')
  fetch(`https://www.omdbapi.com/?apikey=${searchObject['apiKey']}&s=${searchValue}&page=1`)
  .then(res => res.json())
  .then(data => {
    if (parseInt(data.totalResults, 10) > 10){
      let storePageNumber = Math.trunc((parseInt(data.totalResults, 10)/10) + 1);
      getRestOfPages(searchObject, storePageNumber, searchValue);
    }
  });
}
//Iterates through all the pages possible from search call. 
//Passes over data over to getEachMovie() function
function getRestOfPages(searchObject, storePageNumber,searchValue){
  for(let i = 1; i<=storePageNumber; i++){
    fetch(`https://www.omdbapi.com/?apikey=${searchObject['apiKey']}&s=${searchValue}&page=${i}`)
    .then(res => res.json())
    .then(data => {
      getEachMovie(data, searchObject);
    })
  }
}

//Pulls Each possible imdbID stores in fetch call for the searchByID api call
//Passes each movie pulled into filterFunction
function getEachMovie(titleObjects, searchObject){
  if(titleObjects.Response == "True"){
    titleObjects.Search.forEach(element => {
      fetch(`https://www.omdbapi.com/?apikey=${searchObject['apiKey']}&i=${element.imdbID}`)
      .then(res => res.json())
      .then(data => {
        filterFunction(data, searchObject)
      })
    })
  }
}

//Filters Out Function by year and genre
//This would have been better if we had a SQL db to search by
//Instead of doing multiple nested if else statements.
function filterFunction(movie, searchObject){
  if (movie.Poster == 'N/A' || movie.Plot == 'N/A' || movie.Title == 'N/A'){
  }
  else{
    console.log(movie)
    console.log(searchObject)
    if(parseInt(searchObject.begin) <= parseInt(movie.Year) && parseInt(searchObject.endYear) >= parseInt(movie.Year)){
      if(searchObject.genreType && searchObject.genreType!='All'){
        let genreChecker= movie.Genre.split(', ')
        console.log(genreChecker)
        if(genreChecker.includes(searchObject.genreType)){
          renderTitle(movie)
        }
      }
      else{
        renderTitle(movie)
      }
    }
  } 
}

// Renders each movie/title
function renderTitle(movie){
  let clickableLink = document.createElement('a')
  clickableLink.setAttribute('href', `https://www.imdb.com/title/${movie.imdbID}/`)
  clickableLink.setAttribute('target', '_blank')
  let containerFinder = document.querySelector('.moviesList')
  let movieContainer = document.createElement('div')
  movieContainer.id = 'movieBox'
  let imgPoster = document.createElement('img')
  let plot = document.createElement('p')
  plot.setAttribute('id', 'plotDiv');
  imgPoster.src = movie.Poster;
  imgPoster.className = "poster"
  plot.textContent = movie.Plot;
  let title = document.createElement('h2')
  title.textContent = `${movie.Title} (${movie.Year})`
  title.id = "titleID"
  let imgBox = document.createElement('div')
  let textBox = document.createElement('div')
  imgBox.append(imgPoster)
  textBox.append(title, plot)
  movieContainer.append(imgBox, textBox)
  clickableLink.append(movieContainer)
  containerFinder.append(clickableLink);
  movieContainer.className = "box"
  imgBox.className = "imgBox"
  textBox.className = "text"
}

//resets containers whenever needed
function removeContainer(){
  let containerFinder = document.querySelector('.moviesList')
  if(containerFinder){
    containerFinder.innerHTML = ''
  }
}
function resetForm(movieName) {
  document.querySelector('#resetButton').addEventListener('click', () => {
    let containerFinder = document.querySelector('.moviesList')
    movieName.reset()
    containerFinder.innerHTML = ""
  })
}
