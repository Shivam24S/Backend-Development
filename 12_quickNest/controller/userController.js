import HttpError from "../middleware/HttpError.js";
import User from "../model/User.js";

const add = async (req, res, next) => {
  try {
    const { name, email, password, role, phone } = req.body;

    const newUser = {
      name,
      email,
      password,
      role,
      phone,
    };

    const user = new User(newUser);

    await user.save();

    res.status(201).json({ success: true, user });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByCredentials(email, password);

    const token = await user.generateAuthToken();

    if (!user) {
      return next(new HttpError("unable to login"));
    }

    res.status(200).json({ success: true, user, token });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const authLogin = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return next(new HttpError("user not found", 404));
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default { add, login,authLogin };
