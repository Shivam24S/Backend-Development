import HttpError from "../middleware/HttpError.js";
import User from "../model/UserModel.js";

const add = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const newUser = {
      name,
      email,
      password,
    };

    const user = new User(newUser);

    const token = await user.generateAuthToken();

    await user.save();

    res.status(201).json({ success: true, user, token });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByCredentials(email, password);

    if (!user) {
      next(new HttpError("unable to login"));
    }

    const token = await user.generateAuthToken();

    res.status(200).json({ success: true, user, token });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find({});

    if (users.length === 0) {
      return next(new HttpError("no user data found", 404));
    }

    res.status(200).json({ success: true, users });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const authLogin = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return next(new HttpError("unable to login", 401));
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const logOut = async (req, res, next) => {
  try {
    req.user.tokens = req.user.tokens.filter((t) => t.token != req.token);

    req.user.save();

    res.status(200).json({ message: "user log out successfully" });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const logOutAll = async (req, res, next) => {
  try {
    req.user.tokens = [];

    req.user.save();

    res
      .status(200)
      .json({ message: "user logout from all device successfully" });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const update = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return next(new HttpError("user not found", 404));
    }

    const updates = Object.keys(req.body);

    const allowedUpdates = ["name", "password"];

    const isValidUpdate = updates.every((fields) =>
      allowedUpdates.includes(fields),
    );

    if (!isValidUpdate) {
      return next(new HttpError("only allowed field can be updated", 400));
    }

    updates.forEach((update) => {
      return (user[update] = req.body[update]);
    });

    await user.save();

    res.status(200).json({ message: "user data updated successfully", user });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.user._id;

    console.log("id", id);

    await User.findByIdAndDelete(id);

    res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default { add, login, getAllUser, authLogin, logOut, logOutAll, update,deleteUser };
