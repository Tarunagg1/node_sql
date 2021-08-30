const express = require('express');
const app = express();
const db = require('./config/db')
const userctrl = require('./controllers/userControler')
const postctrl = require('./controllers/post')
const transsactionController = require('./controllers/transsactionController')


app.use(express.json());

const PORT = 4000;

app.get('/add',userctrl.adduser);
app.get('/crud',userctrl.crudController);
app.get('/finder',userctrl.finderController);
app.get('/rawQuery',userctrl.rawQueryController);


app.get('/addpost',postctrl.addpost);
app.get('/onetoone',postctrl.onetoone);
app.get('/onetomany',postctrl.onetomany);
app.get('/paranoid',postctrl.paranoid);

app.get('/transsaction',transsactionController.transsaction);
app.get('/hooks',transsactionController.hooks);
app.get('/queryinterface',transsactionController.queryinterface);



app.listen(PORT,() => {
    console.log('Server listning at: ',PORT);
})



