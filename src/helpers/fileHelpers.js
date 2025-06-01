import fs from 'node:fs/promises';
import { join } from 'path';
import { logger } from './customLogger.js';

export async function readJSON(){
    try{
       const filePath=join(`${process.cwd()}`,'src','products.json'); //can be passed as arg if to be re-used for different data sets
       const data=await fs.readFile(filePath,{encoding:'utf-8'});
       return JSON.parse(data)
    }
    catch(error){
      logger.error("Error reading data file",error);
      throw new Error("Error reading data file")
    }
}

/**
 * async function always returns an implicit promise.
 * This means, even if you dont explicitly return a promise, it will wrap whatever you are returning
 * inside a promise
 * @param data 
 * @returns 
 */
export async function writeJSON(data){
    try{
        const filePath=join(`${process.cwd()}`,'src','products.json');//can be passed as arg if to be re-used for different data sets
        await fs.writeFile(filePath,JSON.stringify(data,null,2));
        return "Records updated successfully";
    }
    catch{
        logger.error("Error writing into data file",error.message);
        throw new Error("Error writing into data file");
    }
}
