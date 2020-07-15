const express = require('express')
app = express();

app.get('/', function(req, res){

    res.status(200).send('Sometext')
}),
app.get('/teachersName', function(res, res){
    
   
    let mana =  res.status(200).json({thomas: "Thomas Jamais", alban: "Alban Meurice"})
    console.log(typeof mana)
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
  });
  