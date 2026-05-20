import User from "../Modal/user.model.js";



const signup = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(409).send({ res: null, error: `User ${!name ? "name" : ""} ${!email ? "email" : ""} ${!password ? "password" : ""} not found` })
        return;
    }
    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(403).send({ res: null, error: `User already exist` })
        return;
    }
    const newUser = User({ name, email, password });
    const userData = await newUser.save();
    const token = await userData.generateToken();
    res.status(201).cookie("Token", token).send({ res: userData, error: null })
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email })
    if (!userExist) {
        res.status(404).send({ res: null, error: `User not exist` })
        return;
    }
    const isPasswordCorrect = await userExist.comparePassword(password);
    if (isPasswordCorrect) {
        const token = await userExist.generateToken();
        res.status(200).cookie("Token", token).send({ res: userExist, error: null })
    } else {
        res.status(409).send({ res: null, error: "Email/password is wrong" })
    }
};

const getUser = (req, res) => {
    res.send({
        res: req.user,
        erorr: "null ",
    });
};
const updateUser = async (req, res) => {
    const userId = req.user._id;
    const data = req.body;
    const updateUser = await User.findByIdAndUpdate(userId, data, { new: true });
    res.send({
        res: updateUser,
        erorr: "null ",
    });
};
const deleteUser = async (req, res) => {
    const userId = req.user._id;
    const data = req.body;
    const deletedUser = await User.findByIdAndDelete(userId);
    res.send({
        res: deletedUser,
        erorr: "null ",
    });
};

export { signup, login, updateUser, getUser, deleteUser };