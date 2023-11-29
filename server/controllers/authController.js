const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const Listing = require("../models/listingModel");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  const newUser = await User.create({
    username,
    email,
    password,
  });

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  // 2) Check if user exists
  const user = await User.findOne({ email });
  if (!user) return next(new AppError("User not found", 404));

  // 3) Check if password is correct
  const correct = await user.correctPassword(password, user.password);
  if (!correct) {
    return next(new AppError("Incorrect password", 401));
  }

  // 4) If everything ok, send token to client
  createSendToken(user, 200, res);
});

exports.getUser = catchAsync(async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  const user = await User.findById(listing.user);
  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }

  user.password = undefined;

  res.status(200).json({
    status: "success",
    data: user,
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const { username, email, password, avatar } = req.body.payload;

  // 1) Check if user exists
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }

  // 2) hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // 3) Update user
  const newUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      username,
      email,
      password: hashedPassword,
      avatar,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  // 4) If everything ok, send token to client
  createSendToken(newUser, 200, res);
});

exports.delete = catchAsync(async (req, res, next) => {
  // 1) Find User
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }
  // 2) Delete User
  await User.findByIdAndDelete(req.params.id);

  // 3) If everything ok, send token to client
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.google = catchAsync(async (req, res, next) => {
  const { name, email, photo } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    // just return the user
    createSendToken(user, 200, res);
  } else {
    const password = await bcrypt.hash(Math.random().toString(), 12);

    const newUser = await User.create({
      username: name,
      email,
      password,
      avatar: photo,
    });

    createSendToken(newUser, 201, res);
  }
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // 2) Verification token
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const freshUser = await User.findById(decode.id);
  if (!freshUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = freshUser;
  next();
});
