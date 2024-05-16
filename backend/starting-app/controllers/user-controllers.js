import bcryptjs from "bcryptjs";
import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  console.log("....................getAllUsers...........");
  let users;
  try {
    users = await User.find();
    console.log("users", users);
  } catch (error) {
    console.log("error", error);
    return console.error(error);
  }

  if (!users) {
    console.log("No user found");
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }
  

  return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log("req.body", req.body);

  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.length < 6
  ) {
    res.status(422).json({ message: "Invalid data" });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  let user;
  try {
    user = new User({ name, email, password: hashedPassword });
    await user.save();
  } catch (error) {
    console.log("error", error);
    return console.error(error);
  }

  if (!user) {
    return res.status(500).json({ message: "Enexpected error occured" });
  }

  return res.status(201).json({ user });
};

export const login = async(req, res, next) => {
  const {email, password } = req.body;
  console.log("req.body", req.body);

  if (
    !email &&
    email.trim() === "" &&
    !password &&
    password.length < 6
  ) {
    res.status(422).json({ message: "Invalid data" });
    }
    try {
        let existingUser;
        existingUser = await User.findOne({email })

        if(!existingUser){
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordCorrect = bcryptjs.compareSync(password, existingUser.password);
        if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect Password" });
        }
        
        return res.status(200).json({id: existingUser._id, message: "Login successful" });
        
    } catch (error) {
        console.log("error", error);
        return console.error(error);
    }
};
