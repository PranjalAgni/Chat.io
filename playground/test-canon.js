const express = require('express');
const app = express();

app.get('/', (req , res) => {
    console.log('sending...');
    setTimeout(function() {
        res.send('sent');
    },3000);
});
app.listen(5000 , () => {
    console.log('Server running on port 5000');
})