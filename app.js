const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Ensure static files are served from the correct directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Ensure the views directory is correctly set

// Function to read and parse a CSV file
const readCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};

// Read the consolidated CSV file
const getConsolidatedData = async () => {
  try {
    const consolidatedData = await readCSV(path.join(__dirname, 'data', 'The Edge - Receiving - Consolidated.csv'));
    console.log('Consolidated Data:', consolidatedData); // Log the data for debugging
    return consolidatedData;
  } catch (error) {
    console.error('Error reading CSV file:', error);
    return [];
  }
};

app.get('/', async (req, res) => {
  const consolidatedData = await getConsolidatedData();
  console.log('Data passed to EJS:', consolidatedData); // Log the data being passed to EJS
  res.render('index', { players: consolidatedData });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
