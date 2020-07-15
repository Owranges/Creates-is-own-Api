const express = require("express")
const fs = require("fs");
// const { rawListeners } = require("process");

let app = express();
let rawdata = fs.readFileSync('country.json');
let rawdataParse = JSON.parse(rawdata);
let paysName = [];
let regioni = [];
let subRegion = [];
let monnaie = []
// let testdeux = []
// let find = false;
app.use(express.urlencoded({ extended: true }));


app.get('/names/all', function(req, res ){
    res.status(200);
    for(let i = 0; i< rawdataParse.length; i++){
        paysName.push(rawdataParse[i].name)
    }
    res.status(200).json(paysName)
})

app.get("/country/:name" , function(req, res) {
    res.status(200);
    for(let i = 0 ; i<rawdataParse.length; i++){
        if(req.params.name.toUpperCase() == rawdataParse[i].name.toUpperCase()){
            res.json(rawdataParse[i])
        }
    }
    res.status(404).send("This country doesn't exist");
});

app.get("/region/:regionName", function(req, res){
    res.status(200);
    regioni = []
    for(let i = 0 ; i< rawdataParse.length; i++){
        if(req.params.regionName.toUpperCase() == rawdataParse[i].region.toUpperCase()){
            regioni.push(rawdataParse[i].name)
        } 
    }
    if(regioni.length != 0){
        res.json(regioni)
    }
    else{
        res.status(404).send("This region doesn't exist");
    }
})



app.get("/subregion/:subregionName", function(req, res){
    res.status(200);
    for(let i = 0 ; i< rawdataParse.length; i++){
        if(req.params.subregionName.toUpperCase() == rawdataParse[i].subregion.toUpperCase()){
            subRegion.push(rawdataParse[i].name)
          
        }
    }
    if(subRegion.length != 0){
        res.json(subRegion)
    }
    else{
        res.status(404).send("This subregion doesn't exist")
    }
    
})

app.get("/currencies/:currency", function(req, res){
    monnaie = []
    res.status(200);
    for(let i = 0 ; i< rawdataParse.length; i++){
        if(req.params.currency.toUpperCase() == rawdataParse[i].currencies[0].name.toUpperCase()){
            monnaie.push(rawdataParse[i].name)
          
        }
    }
    if(monnaie.length != 0){
        res.json(monnaie)
    }
    else{
        res.status(404).send("This currency doesn't exist")
    }
});


// app.put("/countries/:countryName", function(req, res){
//     res.status(200)
//     let id = req.params.countryName;
//     let data = req.body;

//     rawdataParse[id] = Object.assign(rawdataParse[id], data);
//     res.json({
//         data : rawdataParse[id]
//     })

// })

app.put("/countries/:countryName", function(req, res){
//   relire le fichier 
  let keys = []
    for(let i = 0; i < rawdataParse.length ; i++)
   if( req.params.countryName.toUpperCase() == rawdataParse[i].name.toUpperCase()){
        let keys = Object.keys(req.body);
        let paysFind = rawdataParse[i]
        // console.log(keys)
    for(let e = 0; e < keys.length ; e++){
        // console.log(paysFind[keys[e]])
        paysFind[keys[e]] = req.body[keys[e]]
        // console.log(paysFind[keys[e]])
        
        }
        // ADD ERROR 
    let stringy = JSON.stringify(rawdataParse);
    fs.writeFileSync("country.json", stringy);
    res.json(rawdataParse[i]);
    }
})

app.delete('/countries/:countryName', function(req, res){
    
    
    for (let i = 0 ; i<rawdataParse.length ; i++){
        
        if(req.params.countryName.toUpperCase() === rawdataParse[i].name.toUpperCase()){
            rawdataParse.splice(i,1 );  
            let stringy = JSON.stringify(rawdataParse);
            fs.writeFileSync("country.json", stringy);
            return res.send("The country has been deleted")
        }
            
    }
    res.status(404).send("This country already has been deleted")
})

app.post('/countries/:countryName', function(req, res){
    

    let panda = {
        name: req.params.countryName , 
        alpha2code: req.body.alpha2code , 
        alpha3code: req.body.alpha3code ,
        capital: req.body.capital ,
        region: req.body.region,
        subregion: req.body.subregion,
        population: req.body.population,
        denonym: req.body.denonym,
        nativeName: req.body.nativeName,
        flag: req.body.flag
    }
    console.log(req.body)
    rawdataParse.push(panda);
    // rawdataParse.sort(function(a, b){
    //     if(a.name > b.name) {
    //         return 1 ;
    //     }
    //     if (a.name < b.name) {
    //         return -1 ;
    //     }
    //     return 0;
    // });

    let stringy = JSON.stringify(rawdataParse);
    fs.writeFileSync("country.json", stringy);
    res.json(panda)
})

app.listen(3000, function(){
    console.log("welcome");
});



