import jwt from 'jsonwebtoken';

const generatetoken = async (userid, res) => {
    const token = jwt.sign({ userid }, process.env.JWT_SECRET, {
        expiresIn: '7M'
    });

    if (!res) {
        throw new Error("Response object is undefined. Ensure 'res' is passed correctly.");
    }

    res.cookie("jwt", token, {
        maxAge: 7* 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: 'strict'
    });

    return token;
};

export default generatetoken;
