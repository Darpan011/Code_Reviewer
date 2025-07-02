require('dotenv').config();  //for fetching api key from .env file
const app = require('./src/app');


app.listen(3000, () => {
    console.log('Server is running on port 3000');
})