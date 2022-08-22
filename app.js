const express = require("express");
const errorHandlerMiddleware = require("../final/middleware/error-handler");
const notFound = require("../final/middleware/not-found");
const app = express();
const connectDB = require('./db/connect')
const port = process.env.PORT || 3000;
const tasks = require('./routes/tasks')

require('dotenv').config();

app.use(express.static('./public'))
app.use(express.json());
app.use('/api/v1/tasks',tasks);
app.use(notFound)
app.use(errorHandlerMiddleware)

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port,()=>
            console.log(`Server is listening on port ${port}...`)
        )
    }catch(error){
        console.log(error);
    }
}

start()