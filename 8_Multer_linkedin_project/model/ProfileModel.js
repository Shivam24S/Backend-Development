import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  fullName: {
    type: String,
    trim: true,
    required: true,
  },
  bio: String,
  headline: String,
});

const Profile = mongoose.model("Profile");

export default Profile;
