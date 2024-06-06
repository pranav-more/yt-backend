import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
i;
const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation
  // check if user already exist
  // check for images, avatar
  // upload to cloudinary, avatar
  // create user object - create entry in db
  // remove password, refresh token field from response
  // check for user creation
  // if yes return response or err

  const { username, email, fullName } = req.body;
  console.log(email, "email");

  res.status(200).json({
    message: "ok",
  });
  // vaildation
  if (
    [username, email, fullName, avatar].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // check if user exist
  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with email or name already exists  ");
  }

  const avatarLocalPath = req?.files.avatar[0]?.path;
  const coverImageLocalPath = req?.files.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  // upload images
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Avatar is required");
  }

  // push to db
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  // check if user is successfully created
  const createdUser = User.find(user._id).select("-password -refreshToken");

  if (!createdUser) {
    throw new ApiError(5000, "Something went wrong while creating a user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "user registered successfully "));
});

export { registerUser };
