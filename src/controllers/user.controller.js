import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import {User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { apiResponse } from "../utils/apiResponse.js";
import { response } from "express";

const registerUser = asyncHandler( async (req , res) => {
    // get user details from frontend
    //validation  - not empty
    //Check if user already exists
    //check for images
    //check for avatar
    //upload them to cloudinary
    //create user object - create entry in db
    //remove password and refreshtoken field from response
    //check for user creation
    //return res

    const {Fullname, email , username, password} = req.body
    console.log("email : ", email);

    if(
      [Fullname, email , password , username].some((field) => 
      field?.trim() === "")
    ) {
          throw new ApiError(400, "All fields are required ")
    }

    const existingUser = await User.findOne({
      $or: [{ username }, { email }]
    })

    if(existingUser){
      throw new ApiError(409, "This Username or email already exists");
    }
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.cover-image[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is compulsory ")
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
      throw new ApiError(409, "Avatar file is required")
    }

   const user = await User.create({
      Fullname,
      avatar: avatar.url,
      coverImage: coverImage?.url || "",
      email,
      password,
      username : username.toLowerCase()
    })

    const createdUSer = await User.findById(user._id).select(
      "-password -refreshToken"
    )
    
    if(!createdUSer){
      throw new ApiError(500, "Something went wrong while registering")
    }

    return res.status(201).json(
      new apiResponse(200, data, createdUSer , "User registered successfully ")
      
    )
})

export {registerUser}