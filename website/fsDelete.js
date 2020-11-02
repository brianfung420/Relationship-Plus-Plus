const fs = require('fs');

fs.rmdir("./game/userData/1fMwwAX2xXxG49zc",{recursive:true},function(err){
    if(err){
        throw err;
    }
    console.log("Deleted")
});