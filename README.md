npm init
npm install --save express

Very important to add   "type":"module", package.json to ensure you can add import
statements in the .js file. Otherwise you will get the error: "Cannot use import outside
a module". This ensures all .js files in the project are treatead as ES6 modules. 
We are using ES syntax and not CommonJS syntax.

Create a src folder with app.js
Create a src/public folder to store static files.

1. app.use(express.static(join(`${process.cwd()}`,'src','public')))

The above line is essential when sending static files.
Its possible that if the static file is an .html file and this file in turn
contains css and images, then those will not be rendered in the absence of the above line.

2. It is not necessary to set the header. Express can determine it based on the content you
are sending.

3. The src folder contains the entry point file and src/public folder contains all static files.

4. Use join() over `` with + to determine file path

5. Using ejs templating engine

A template engine dynamically generates content based on two primary inputs:

Template — Contains the static document structure, templating syntax, and static content
Data — Contents that the template engine uses to replace template syntax

Syntax	Description	Example
<% expression %>	Scriplet tag, produces no output and is used for the control flow	<% if(isLogin) { %>
<%_ expression %>	Scriplet tag that strips all previous whitespaces	<%_ if(isLogin) { %>
<%= expression %>	Outputs HTML-escaped data	<%= name %>
<%- expression %>	Outputs HTML-unscaped data	<%- htmlString %>
<%# comment %>	Commenting tag	<%# This is a comment %>
<%%	Outputs the <% literal	<%%


npm install --save ejs

app.set('view engine','ejs');
app.set('views', join(`${process.cwd()}`,'src','public','views'))

EJS (Embedded JavaScript Templating) is a popular template engine that we can use to send dynamically generated HTML documents from Node.js apps.

Node.js developers often have to dynamically generate HTML documents from the server side and send them to connected web app users. For example, a generic MVC web app displays the logged user’s name within the header section by dynamically constructing the header section HTML within the Node.js server.

app.get('/render/1',(req,res)=>{
    res.status(200).render('heading',{head:{heading1:"Hello world",heading2:"Good Morning"}})
})

render() will ensure it will render the heading.ejs file located within the src/public/views folder
and replace the <%= %> with the required the data passed in the 2nd argument.

It will consider the .ejs file only because we have set the view engine to ejs
and we have also set the path where the .ejs files should be looked for.

6. Observe the path of the <img> in the .html and .ejs files. They are absolute path.
Absolute path ensures that the file is searched for from the root.

<img src="/img/flower.jfif">

7. Dynamic route params

app.get('/render/dynamic/:productId',(req,res)=>{
    //render html based on dynamic product id in the route params
    const productDetail=products.products.find(x=>x.id == req.params.productId);
    res.status(200).render('product',{product:productDetail})
})

http://localhost:3000/render/dynamic/10 should have req.params.productId as 10.
We get the product detail from the json based on this id.
We pass this object as the 2nd argument to be used in the product.ejs file.

We will be rendering the product.ejs file within the src/public/views folder.

sendFile() vs render()

sendFile() is used to serve the static files.
render() is used to render the dynamic HTML views using templates(here ejs)

8. In the below route, we have shown how to use if and forEach statements inside ejs file.
We are displaying an array of products in the table.

app.get('/render/products',(req,res)=>{
    res.status(200).render('products',{productList:products.products})
})

9. Ways to persist data in a database

=>Filesystem
=>sql or nosql  DB
=> cookies

10. Using cookies to store data

npm install --save cookie-parser

const cookieParser= require('cookie-parser');
app.use(cookieParser())

11.  Middleware is adding functionality in a predictable way to the req-response cycle.

Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.

Middleware functions can perform the following tasks:

Execute any code.
Make changes to the request and the response objects.
End the request-response cycle.
Call the next middleware function in the stack.
If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.

An Express application can use the following types of middleware:

Application-level middleware
Router-level middleware
Error-handling middleware
Built-in middleware
Third-party middleware

Bind application-level middleware to an instance of the app object by using the app.use()

The middleware functions execute in the same order in which they are defined.

app.use(express.static(join(`${process.cwd()}`,'src','public')))
app.use(cookieParser())
app.use(logAll)

After this they move to the routes.

![Alt text](image-2.png)

![Alt text](image.png)


11. Error handling in every route.

You need to add try-catch blocks in every route to ensure that errors are handled correctly
and appropriate response is sent back to the browser.

app.get('/render/hardcoded/1',(req,res)=>{
    //render html based on hardcoded route params
    try{
      res.status(200).rende('heading',{head:{heading1:"Hello world",heading2:"Good Morning"}})
    }
    catch(error){
      console.error(error.stack);
      res.status(500).send("Internal Server error")
    }
})

12. Error handling middleware

You have to add error handling middleware at the end to ensure that any unhandled errors are taken care.
We have an additional argument error as the first argument. We do not call next() because
this is the last middleware in the stack and we are ending the req-response cycle here.


app.use(function(error,req,res,next){
  console.error(error.stack);
  res.status(500).send("Internal server error")
})

13. Use winston npm package for logging

npm install --save winston

import {createLogger,transports,format} from 'winston';

const logger=createLogger({
  level:'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports:[
    new transports.Console(),
    new transports.File({filename:'app-express.log'})
  ]
})
We are going to log all messages into the console and also into a file app-express.log.
This file will be created automatically if non-existent. Logs will keep getting 
appended in the log.

14. Debugging node js applications using chrome dev tools.

Add an additional --inspect to the "start" command in the package.json.
So it changes FROM 

 "start": "node --watch-path ./src src/app.js"

 TO 

  "start": "node --inspect --watch-path ./src src/app.js"

  Now run "npm run start".

  Now go to chrome://inspect in the browser.

  You will find your target in the page as below:

  ![Alt text](image-1.png)

  Click on the inspect link in the page. It will open the chrome developer tools for the app.js.

  Go to source tab, click on file:// and open the app.js. Add debugger to any statement you want.

  Now you can run the application localhost:3000 in the browser and test the debugger.

  This is exactly like debugging angular applications using chrome. But to get to the chrome dev
  tools and add the debugger, you need to follow the above steps.

  15. Whenever you are importing a Js file into another JS file, make sure you have the .js
  extension in the imported file.

  Ex: import productRoutes from './routes/productRoutes.js'

  Not 

  import productRoutes from './routes/productRoutes'

Otherwise you will get "no module found" error.

  ------------------------------------------------------------------------------------------------

  Application structure

  src/
     public/
     services/
     routes/
     controllers/
     app.js
package.json

We will abstract all the business logic into the services/
In app.js, we will be mapping the uri to the appropriate route file.
In the route file, the correct controller function will be called for sending response and handling
errors.
In the controller function, the service function will be called to perform the task. eg: interacting
with the DB or the filesystem or any task.


app.js --->  routes----> controller <---->service
Controller will send the response from the service back to the client.
In case of any error thrown by the service, it will be caught in the catch block
of the controller function. It will be then passed to the global error handler
middleware using next(). The global error handler will send the error response
back to the client


app.js(Original)

app.get('/products',async(req,res)=>{
  try{
  const products= await readJSON();
  res.status(200).json(products);
  }
  catch(error){
     next(error);
  }
})

app.js (Modified)

All routes related to products has been put inside the productRouter.js.
We want all URI's starrting with '/products' to be redirected to the productRouter.js

app.use('/products',productRoutes)

We have imported the router exported from productRouter.js as below:
import productRoutes from './routes/productRoutes.js'

In the productRouter.js,  we have defined the routes as below:

router.get('/',getAllProductsCntrl);

router.get('/:id',getProductByIdCntrl);

router.delete('/:id',deleteProductCntrl);

router.post('/',createProductCntrl);

router.put('/:id',updateProductCntrl)

In each route, we have called the controller function to handle the request.

For instance, lets take the getAllProductsCntrl function defined in the productController.js.
The controller will simply call the service to perform the task and get the response from the
service to be sent back to the client.

export const getAllProductsCntrl= async(req,res,next)=>{
        try{
            const products = await getAllProductsSvcs(); //business logic moved to service
            res.status(200).json(products);
            }
            catch(error){
               next(error); //pass the error to global error handling middleware to send the response
            } 
    }

Now lets see the service getAllProductsSvcs function defined in the productService.js.
The service will handle quering the DB or doing any DB action. Since there is no DB here,
we have a simple products.json which we are retrieving or updating.

export async function getAllProductsSvcs(){
    const products=await readJSON();
    return products;
}

