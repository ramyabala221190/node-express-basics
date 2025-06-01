import express from 'express';
import { createProductCntrl, deleteProductCntrl, getAllProductsCntrl, getProductByIdCntrl, updateProductCntrl } from '../controllers/productController.js';

const router=express.Router();

router.get('/',getAllProductsCntrl); //url will be /products

router.get('/:id',getProductByIdCntrl);//url will be /products/:id

router.delete('/:id',deleteProductCntrl); //url will be /products/:id

router.post('/',createProductCntrl); //url will be /products

router.put('/:id',updateProductCntrl) //url will be /products/:id

export default router;