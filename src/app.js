import express from 'express';
import {join} from 'path';
import cookieParser from 'cookie-parser';
import productRoutes from './routes/productRoutes.js';
import renderRoutes from './routes/renderRoutes.js'
import { logger } from './helpers/customLogger.js';

const app=express(); //create a server using express instead of a basic http-server

//mention the path of the static files.
app.use(express.static(join(`${process.cwd()}`,'src','public')))
app.use(cookieParser())
app.use((req,res,next)=>{
  logger.info(req.url); //logs and stores the request url details
  next(); //call the next middleware function in the stack.
})

//mention the templating engine and also the folder where the files will be found
app.set('view engine','ejs');
app.set('views', join(`${process.cwd()}`,'src','public','views'))

//get route
app.get('/send-plaintext',(req,res)=>{
    //we are setting status code, header and also the response
    res.status(200).set({'Content-Type':'text/plain'}).send("Hello world")
})

app.get('/plainhtml',(req,res)=>{
    res.status(200).send(`<h4>Sending a heading</h4>`)
})

app.get('/file',(req,res)=>{
    //access the path of 
    const filePath= join(`${process.cwd()}`,'src','public','test.html')
    res.status(200).sendFile(filePath)
})

app.use('/products',productRoutes)

app.use('/render',renderRoutes);


app.use(function(error,req,res,next){
  logger.error(error.stack);
  const statusCode= error.statusCode ? error.statusCode : 500;
  const message= error.message ? error.message : "Internal server error";
  res.status(statusCode).json({message: message ,status: statusCode})
})

app.listen(process.env.PORT,()=>{
  console.log(process.env.api_key);
    logger.info(`server running using ${process.env.NODE_ENV} NODE_ENV listening on port: ${process.env.PORT}`)
}) //server listens on 3000