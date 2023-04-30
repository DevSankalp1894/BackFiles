
const jwt = require("jsonwebtoken");

const authorization = (req , res, next) => {
        const token = req.headers.authorization;
        var decoded = jwt.verify(token, 'masai');
        if(decoded){
              req.body.authorID =decoded.authorID;
              next();
        }

        else {
            res.send("wrong credential");
        }
}

  module.exports={authorization}