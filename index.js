const express = require('./node_modules/express');

const app = express();


app.use('/', express.static('landing'));
app.use('/app', express.static('public'));
app.use('/app/:category', express.static('public'));


app.use('*', express.static('landing/404'));

app.listen(3001, () => console.warn('The Topic app listening on port 3001!'));
