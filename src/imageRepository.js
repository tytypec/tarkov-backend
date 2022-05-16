import fs from "fs" 

export default class ImageRepository{
    
    testFolder = __basedir + '/images/items/';
    folderPath(){
        return this.testFolder
    }
    
    readImageFileNames(){
        return fs.readdirSync(this.testFolder);  
    }
}