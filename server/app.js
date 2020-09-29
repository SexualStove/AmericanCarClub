
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const {sequelize} = require('./models');
const config = require('./config/config');
const exphbs = require('express-handlebars');
//!!!CHANGE!!!
const Local = false;

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());
app.use('/uploads', express.static('uploads'));
//View Engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
require('./routes')(app);


if(!Local) {
    const https = require("https"),
        fs = require("fs");
    const options = {
        key: fs.readFileSync("/etc/letsencrypt/live/inhousewebtest.site/privkey.pem"),
        cert: fs.readFileSync("/etc/letsencrypt/live/inhousewebtest.site/fullchain.pem")
    };
    sequelize.sync()
        .then(() => {

            https.createServer(options,app).listen(process.env.PORT || 8081);
            console.log(`Server started on port ${config.port}`)
            //app.listen(process.env.PORT || 8081);
        });

} else {
    sequelize.sync()
        .then(() => {
            app.listen(process.env.PORT || 8081);
        });
}





console.log("Listening");










console.log("Listening");

