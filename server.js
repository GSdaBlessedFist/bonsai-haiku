const express = require('express');
const app = express();
const port = process.env.PORT || 3400;

app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname+"/public/index");
  
});

app.listen(port, () => {
  console.log(`Red to go on port !`)
});


