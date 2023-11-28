const express = require('express');
const app = express();
const dotenv = require('dotenv');
const dbConnect = require('./model/db');
const userRoute = require('./routes/userRoute');
const blogRoute = require('./routes/blogRoute');
const cors = require('cors');
const path = require('path');

dotenv.config();

dbConnect();

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '')));

app.use('/api/v1/user', userRoute);

app.use('/api/v1/blogs', blogRoute);

app.use('/api/v1/category', require('./routes/cateRoute'));

// app.use('/', (req, res)=>{
//     res.send({
//         message: "ksjdfljskldfj"
//     })
// })

app.listen(process.env.PORT, (req, res)=> {
    console.log('port is running');
})