const express = require('express');
const cors = require('cors');

const app = express();

const synonymRouter = require('./routes/synonyms');

app.use(express.json());
app.use(cors());

app.use('/api/synonyms', synonymRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Yoo we live on port ${PORT}`);
});