const express = require('express');
const app = express();
const path = require('path');

//PORT Number
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname , '../public');
console.log(publicPath);

//Set MiddileWare
app.use(express.static(publicPath));

app.listen(port , () => {
    console.log(`Server running on port ${port}`);
});