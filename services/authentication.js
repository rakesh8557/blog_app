const JWT = require('jsonwebtoken');

const JWT_SECRET = "gettingHandsOnJWT";

const createToken = (user) => {
    if(!user) return res.status(404).send("Invalid data to craete a token");

    const payload = {
        id : user._id,
        email : user.email,
        profileImage : user.profileImageUrl,
        role : user.role
    }

    const token = JWT.sign(payload, JWT_SECRET);

    return token;
}

const verifyToken = (token) => {
    if(!token) return res.status(404).send("Invalid data");

    const verify = JWT.verify(token, JWT_SECRET);

    return verify;
}


module.exports = {createToken, verifyToken};