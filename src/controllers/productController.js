import { createProductSvcs, deleteProductSvcs, getAllProductsSvcs, getProductByIdSvcs, updateProductSvcs } from "../services/productService.js";

export const getAllProductsCntrl= async(req,res,next)=>{
        try{
            const products = await getAllProductsSvcs(); //business logic moved to service
            res.status(200).json(products);
            }
            catch(error){
               next(error); //pass the error to global error handling middleware to send the response
            } 
    }

export const getProductByIdCntrl= async(req,res,next)=>{
    try{
       let product=await getProductByIdSvcs(req.params.id);
       res.status(200).json(product);
      }
      catch(error){
         next(error);
      }
}

export const deleteProductCntrl = async(req,res,next)=>{
    try{
        let deletedProduct = await deleteProductSvcs(req.params.id);
        res.status(200).json(deletedProduct);
      }
      catch(error){
      next(error);
      }
}

export const createProductCntrl = async(req,res,next)=>{
    try{
        const newProduct=   {
         "id": 105,
         "title": "New Product",
        }
       let createdProduct=await createProductSvcs(newProduct);
       res.status(200).json(createdProduct)
     }
     catch(error){
      next(error);
     }
}

export const updateProductCntrl= async(req,res,next)=>{
    try{
        const updatedProduct=   {
            "id": 1,
            "title": "New Product",
           }
          await updateProductSvcs(updatedProduct,req.params.id);
          res.status(200).json(updatedProduct)
    }
    catch(err){
        next(err);
    }
}