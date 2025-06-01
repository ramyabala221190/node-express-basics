import { CustomError } from "../helpers/customError.js";
import { logger } from "../helpers/customLogger.js";
import { readJSON, writeJSON } from "../helpers/fileHelpers.js";

/**
 * 
 * Instead of quering the DB, we are doing it with filesystem
 */

export async function getAllProductsSvcs(){
    const products=await readJSON();
    return products;
}

export async function getProductByIdSvcs(id){
    logger.info(`Id of product to be retrieved: ${id}`)
    const products=await readJSON();
    const product=products.find(product=>product.id == id);
    if(!product){
        throw new CustomError("Product Not Found",404);
    }
    return product;
}

export async function createProductSvcs(newProduct){
    const currentProductsList=await readJSON();
    let newProductsList=currentProductsList.concat(newProduct);
    await writeJSON(newProductsList);
    return newProduct;
}

export async function updateProductSvcs(product,productId){
    logger.info(`Id of product to be updated: ${productId}`)
    const currentProductsList=await readJSON();
    const productIndex =currentProductsList.findIndex(product=>product.id == productId);
    if(productIndex == -1){
        throw new CustomError("Update Failed ! Product Not Found",404); 
    }
    currentProductsList.splice(productIndex,1,product);
    await writeJSON(currentProductsList);
    return product;
}

export async function deleteProductSvcs(productId){
    logger.info(`Id of product to be deleted: ${productId}`)
    const currentProductsList=await readJSON();
    const doesProductExist =currentProductsList.find(product=>product.id == productId);
    if(!doesProductExist){
        throw new CustomError("Delete Failed ! Product Not Found",404); 
    }
    logger.info(`Product to be deleted: ${JSON.stringify(doesProductExist)}`)
    let newProductsList = currentProductsList.filter(product=>parseInt(product.id) !== parseInt(productId));
    await writeJSON(newProductsList);
    return doesProductExist;

}
