"use strict";
var secret = "bitchlasagnaisapewdslang";
function checkjwt(req, res, next) {
    console.log("hi" + req.user);
    if (req.user)
        if (!req.user.id)
            return res.send(401);
    next();
}
module.exports = checkjwt;