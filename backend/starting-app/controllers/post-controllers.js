import mongoose from "mongoose";
import Post from "../models/Post.js";
import User from "../models/User.js";

export const getAllPosts = async (req, res, next) => {
    
    try {
        let posts;
        
        posts = await Post.find();  
        if (!posts) {
            return res.status(500).json({ message: "Unexpected Error Occurred" });
        }
        return res.status(200).json({ posts });
    } catch (error) {
        console.log(error)
        return console.log(error)
    }
}

export const addPost = async (req, res, next) => { 
    const { title, description, location, date, image, user } = req.body;

    if (
      !title &&
      title.trim() === "" &&
      !description &&
      description.trim() === "" &&
      !location &&
      location.trim() === "" &&
      !date &&
      !user &&
      !image &&
      image.trim() === ""
    ) {
      return res.status(422).json({ message: "Invalid Data" });
    }

  let existingUser;
  try {
    existingUser = await User.findById(user)
  } catch (error) {
    return console.log(error); 
  }
  if (!existingUser) {
    res.status(404).json({ message: "User not found" })
  }
    let post;
  try {
    post = new Post({
      title,
      description,
      image,
      location,
      date: new Date(`${date}`),
      user,
    }); 
    // Before saving the post inside the post collection, we need to store that post inside the 
    // user's post array
    const session = await mongoose.startSession();
    session.startTransaction();
    existingUser.posts.push(post);
    await existingUser.save({ session });
    post = await post.save({session});
    session.commitTransaction();
  } catch (err) {
      console.log(err);
    return console.log(err);
  }

    if (!post) {
      return res.status(500).json({ message: "Unexpected Error Occurred" });
    }
    return res.status(201).json({ post });
}

export const getPostById = async(req, res) => {
  const id = req.params.id;
  let post
  try {
    
    post = await Post.findById(id);

  } catch (error) {
    return console.log(error); 
  }
  if (!post) {
    res.status(404).json({ message: "No post found" });
  }

  return res.status(200).json({ post });
}

export const updatePost = async (req, res) => { 
  const id = req.params.id;
  const { title, description, location, date, image} = req.body;
  if (
    !title &&
    title.trim() === "" &&
    !description &&
    description.trim() === "" &&
    !location &&
    location.trim() === "" &&
    !date &&
    !image &&
    image.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Data" });
  }

  let post;
  try {
    post = await Post.findByIdAndUpdate(id, {
      title,
      description,
      image,
      location,
      date: new Date(`${date}`),
    });
    
  } catch (error) {
    return console.log(error)
  }

  if (!post) {
    res.status(500).json({message: "Unable to update"})
  }

  return res.status(200).json({ message: "Updated Successfully", post});
}

export const deletePost = async (req, res) => {
  const id = req.params.id;

  let post;
  try {

    const session = await mongoose.startSession();
    session.startTransaction();
    post = await Post.findById(id).populate("user");
    post.user.posts.pull(post);
    await post.user.save({ session });
    post = await Post.findByIdAndRemove(id);
    session.commitTransaction();
    // console.log(post)
  } catch (error) {
    return console.log(error);
  }

  
  if (!post) {
    res.status(404).json({ message: "No post found" });
  }
  return res.status(200).json({ message: "Deleted Successfully", post });
}
