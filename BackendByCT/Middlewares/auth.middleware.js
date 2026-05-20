import jwt from "jsonwebtoken"
import "dotenv/config"
import User from "../Modal/user.model.js"

const auth = async (req, res, next) => {
    const token = req.cookies.Token;
    console.log(token);
    if (!token) {
        res.status(404).send({
            res: null,
            error: `user token not found`
        })
    }

    try {
        const data = await jwt.verify(token, process.env.SECRET_KEY)
        if (data) {
            const { _id, email } = data.data;
            const user = await User.findById(_id);
            req.user = user;
            next();
        } else {
            res.status(404).send({
                res: null,
                error: `user not verified`
            })
        }
    } catch (err) {
        res.status(501).send({
            res: null,
            error: `user not verified ${err}`,
        });

    }
}


export default auth;
