const express = require('express') //import express module, used for web development
const path = require('path') //import path module, pre built node js module, for working with directory and path
const app = express() //creating an instance of express called app
const PORT = process.env.PORT || 3000 // port
const axios = require('axios') // for api handling
require('dotenv').config(); // to access .env variable



app.use(express.static(path.join(__dirname, 'public')));    

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'public','index.html'))
})

const axios = require('axios')

export default async function handler(req, res) {
  try {
    const apiUrl = `https://hadithapi.com/api/hadiths?apiKey=${process.env.API_KEY}&paginate=50`;
    const response = await axios.get(apiUrl);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching hadith:", error.message);
    res.status(500).send("Error fetching Hadith data");
  }
}



app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})