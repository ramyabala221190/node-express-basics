import express from 'express';
import { dynamicAllContentCntrl, dynamicSingleContentCntrl, hardCodedContentCntrl } from '../controllers/renderController.js';

const router=express.Router();

router.get('/hardcoded',hardCodedContentCntrl) //url will be /render/hardcoded

router.get('/dynamic/:id',dynamicSingleContentCntrl) //url will be /render/dynamic/:id

router.get('/dynamic',dynamicAllContentCntrl);  //url will be /render/dynamic


export default router;