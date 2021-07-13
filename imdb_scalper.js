const fetch = require("node-fetch");
const getRawData = (URL) => {
    return fetch(URL)
        .then((response) => response.text())
        .then((data) => {
            return data;
        })
}
const URL = 'http://www.imdb.com/chart/top/'

const getImdb = async () => {
    const getRawDataFromImdb = await getRawData(URL);
    let newLine = getRawDataFromImdb.split("\n")
    let regex = /(\/title\/.*\/)/g
    newArray = []
    ids = []
    newLine.forEach(line => {
        if(line.includes('<a href="/title/')){
            newArray.push(line.trim());
        }
    })
    newArray.forEach(element => {
        let newString = element.match(regex).toString();
        newString = newString.replace('/title/', '');
        newString = newString.replace('/','');
        ids.push(newString);
    })
    
    unquieId = ids.filter(function(item, pos){
        return ids.indexOf(item) == pos;
    })

    checkerFunction(unquieId)

}
function checkerFunction(parameter){
    let newArray = parameter.map(element => {
        return `http://www.omdbapi.com/?i=${element}&apikey=799cdd3c`
    })
    fetchAllData(newArray);
}

function fetchAllData(urls){
    let newObject = [];
    let fetches = [];
    urls.forEach((element, index) => {
        fetches.push(
            fetch(element)
            .then(res => res.json())
            .then(data =>{
                newObject.push(data);
            })
        )
    })
    Promise.all(fetches).then(function(){
        writeOutJsonFile(newObject);
    })
}

function writeOutJsonFile(object){
    let newObject = {}

    for (let i = 0; i<object.length; i++){
        newObject[i] = object[i];
    }
    let json = JSON.stringify(newObject)
    let fs = require('fs')
    fs.writeFile('db.json', json, 'utf8', (err) => {
        if (err){
            console.log(error);
        }else{
            console.log("File written successfully\n");
            console.log("The written has the following contents:");
            console.log(fs.readFileSync("db.json", "utf8"));
        }
    });
}

getImdb();


