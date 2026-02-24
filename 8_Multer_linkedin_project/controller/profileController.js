import HttpError from "../middleware/HttpError.js";
import Profile from "../model/ProfileModel.js";

const createProfile = async (req, res, next) => {
  try {
    const { fullName, bio, headline } = req.body;

    const profileImage = req.files.profileImage?.[0];
    const resume = req.files.resume?.[0];
    const introVideo = req.files.introVideo?.[0];
    const projectImages = req.files.projectImages || [];

    const newProfile = new Profile({
      fullName,
      bio,
      headline,
      profileImage: profileImage?.path || null,
      resume: resume?.path || null,
      introVideo: introVideo?.path || null,
      projectImages: projectImages.map((file) => file.path) || null,
    });

    await newProfile.save();

    res.status(201).json({ success: true, newProfile });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default createProfile;
