import axios from 'axios';

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
