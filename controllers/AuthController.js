import UserModel from "../models/userModels.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const registerUser = async(req, res) => {
    

    const hashedPass = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPass;
    const newUser = new UserModel(req.body);
    const { username } = req.body;

    try {
        const oldUser = await UserModel.findOne({username});

        if(oldUser){
            return res.status(400).json({message:"username is already registered!"})
        }
        const user = await newUser.save();
        const token = jwt.sign({ username: user.username, id: user._id}, process.env.JWT_KEY , {expiresIn: '1h'});
        res.status(200).json({user, token});
    } catch(error) {
        res.status(500).json({message: error.message})
    }
}

export const loginUser = async (req, res) => {
    const {username, password} = req.body

    try {
        const user = await UserModel.findOne({username: username})

        if(user){
            const validity = await bcrypt.compare(password, user.password)

            if(!validity){
                res.status(400).json("Wrong password")
            } else{
                const token = jwt.sign({ username: user.username, id: user._id}, process.env.JWT_KEY , {expiresIn: '1h'});
                res.status(200).json({user, token});
            }

        } else{
            res.status(404).json("User does not exists")
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }

}