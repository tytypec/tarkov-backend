import fs from "fs" 

export default class ImageRepository{
    
    testFolder = __basedir + '/images/items/';

    readImageFileNames(){
        return fs.readdirSync(this.testFolder);  
    }
}