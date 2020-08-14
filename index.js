const express = require('express');

const app = express();

app.use(express.static('public'));

app.listen(3001, () => console.warn('The Topic app listening on port 3001!'));
