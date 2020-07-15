const express = require("express")
const fs = require("fs")
let app = express();
let rawdata = fs.readFileSync('country.json');
let rawdataParse = JSON.parse(rawdata);
console.log(typeof rawdataParse)

app.get('/all', function(req, res){
    
    res.status(200).json(rawdataParse);
});

// app.get('/names/all', function(req, res ){
//     let paysName = [];
//     for(let i = 0; i< rawdataParse.length; i++){
//         paysName.push(rawdataParse[i].name)
//     }
//     res.status(200).json(paysName)
// })

app.get('/names/all', function(req, res){
    const paysNameMap = rawdataParse.map(pays =>{
        return pays.name
    })
    res.status(200).json(paysNameMap)
    
})

// app.get('/capitals/all', function(req, res ){
//     let capitalsName = [];
//     for(let i =0; i< rawdataParse.length; i++){
//         capitalsName.push(rawdataParse[i].capital)
//     }
//     res.status(200).json(capitalsName)
// });

app.get('/capitals/all', function(req, res){
    const capitalNameMap = rawdataParse.map(capital =>{
        return capital.capital
    })
    res.status(200).json(capitalNameMap)
    
})

app.listen(3000, function(){
    console.log("welcome");
});