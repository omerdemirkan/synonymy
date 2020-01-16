const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

const synonymRouter = require('./routes/synonyms');

app.use(express.json());
app.use(cors());

app.use('/api/synonyms', synonymRouter);

// To allow for express rate limiter
app.set('trust proxy', 1);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static( path.join(__dirname, 'front-end', 'build') ));

    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'front-end', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Yoo we live on port ${PORT}`);
});