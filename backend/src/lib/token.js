import jwt from 'jsonwebtoken';

const generatetoken = async (userid, res) => {
    const token = jwt.sign({ userid }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
    if (!res) {
        throw new Error("Response object is undefined. Ensure 'res' is passed correctly.");
    }

    res.cookie("jwt", token, {
        maxAge: 7*24*60* 60 * 1000,
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== "development",
    });

    return token;
};

export default generatetoken;
