import express from 'express'; // import express to run locally
import path from 'path'; // to navigate thru directory
import axios from 'axios'; // fro API
import dotenv from 'dotenv'; // to hide API
import { fileURLToPath } from 'url'; //convert file url to regular file path
import { dirname } from 'path'; // to get the directory name of a path

dotenv.config();

const __filename = fileURLToPath(import.meta.url); //import.meta.url is the url of the current module , run console.log to make sure
const __dirname = dirname(__filename);

const app = express(); // making an instance of the express called app
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/hadith', async (req, res) => {
  try {
    

    const apiUrl = `https://hadithapi.com/api/hadiths?apiKey=${process.env.API_KEY}&paginate=100`;
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching Hadith data:', error.message); // show actual error
    res.status(500).send('Error fetching Hadith data');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
