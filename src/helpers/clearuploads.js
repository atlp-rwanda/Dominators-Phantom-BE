import fs from "fs";
import path from "path";

export const clear = () => fs.readdir("uploads", (err, files) => {
    if(err)  throw err;
    for(const files of files){
        fs.unlink(path.join("uploads", files), (err) =>{
            if(err) throw err;
        })
    }
})

