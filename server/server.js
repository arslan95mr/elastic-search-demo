const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const db = require('./models');
const router = require('./router');

const PORT = 4000;
db.CONNECT_DB();

app.use(cookieParser());
app.use('/static', express.static('public', {
    setHeaders: (res, path) => {
        res.set('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:3000'
}));

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
app.use('/api', router);

app.listen(PORT, '127.0.0.1', () => {
    db.REFRESH_DB();
    console.log(`Server is running at port ${PORT}`);
});