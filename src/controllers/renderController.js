import { getAllProductsSvcs, getProductByIdSvcs } from "../services/productService.js";

export const hardCodedContentCntrl=(req,res,next)=>{
  //we are not calling service here because data is hardcoded
    try{
        res.status(200).rende('heading',{head:{heading1:"Hello world",heading2:"Good Morning"}})
                //render the heading.ejs file and the 2nd argument contains the data to be used
      }
      catch(error){
        next(error);
      }
}

export const dynamicSingleContentCntrl=async(req,res,next)=>{
  try{
    const productDetail=await getProductByIdSvcs(req.params.id); //call service to get data
    res.status(200).render('product',{product:productDetail})
        //render the product.ejs file and the productList contains the data to be used
  }
  catch(error){
    next(error);
  }
}

export const dynamicAllContentCntrl=async(req,res,next)=>{
  try{
    const productList=await getAllProductsSvcs();
    res.status(200).render('products',{productList:productList})
    //render the products.ejs file and the productList contains the data to be used
  }
  catch(error){
    next(error);
  }
}