const express = require('./node_modules/express');

const app = express();

app.use(express.static('public'));

app.listen(3001, () => console.warn('The Topic app listening on port 3001!'));
