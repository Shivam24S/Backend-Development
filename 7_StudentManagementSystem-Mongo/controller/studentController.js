import StudentModel from "../model/StudentModel.js";
import HttpError from "../middleware/HttpError.js";

const add = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phoneNumber, course, isActive } =
      req.body;

    const newStudent = {
      firstName,
      lastName,
      email,
      phoneNumber,
      course,
      isActive,
    };

    const studentDetail = new StudentModel(newStudent);

    await studentDetail.save();

    res.status(201).json({ message: "student detail saved", studentDetail });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const allStudent = async (req, res, next) => {
  try {
    const studentList = await StudentModel.find({});

    if (!studentList.length) {
       return next(new HttpError("no student data found", 404));
    }

    res
      .status(200)
      .json({ message: "student data received successfully", studentList });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const studentById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const student = await StudentModel.findById(id);

    if (!student) {
      return next(new HttpError("student not found with this id", 404));
    }

    res.status(200).json({ message: "student found", student });
  } catch (error) {
   next(new HttpError("invalid student id", 400));
  }
};

// delete

const deleteStudent = async (req, res, next) => {
  try {
    const id = req.params.id;

    const deletedStudent = await StudentModel.findByIdAndDelete(id);

    if (!deletedStudent) {
   return next(new HttpError("student not found", 404));
    }

    res.status(200).json({ message: "student data deleted successfully" });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

// update

// const updateStudent = async (req, res, next) => {
//   try {
//     const id = req.params.id;

//     const updateStudentData = await StudentModel.findByIdAndUpdate(
//       id,
//       req.body,
//       {
//         new: true,
//       },
//     );

//     if (!updateStudentData) {
//       return next(new HttpError("failed to update student data", 404));
//     }

    

//     res.status(200).json({
//       message: "student data updated successfully",
//       updateStudentData,
//     });
//   } catch (error) {
//     next(new HttpError(error.message, 500));
//   }
// };

// manually update you have to do this always

const updateStudentData = async (req, res, next) => {
  try {
    const id = req.params.id;

    const existingStudent = await StudentModel.findById(id);

    if (!existingStudent) {
      return next(new HttpError("student id not found", 404));
    }

    const updates = Object.keys(req.body);

    const allowedUpdates = ["firstName", "lastName", "phoneNumber", "course"];

    const isValidUpdates = updates.every((field) => {
      return allowedUpdates.includes(field);
    });

    if (!isValidUpdates) {
      return next(new HttpError("only allowed field can be updated", 400));
    }

    updates.forEach((update) => {
      existingStudent[update] = req.body[update];
    });

    await existingStudent.save();

    res
      .status(200)
      .json({ message: "student data updated successfully", existingStudent });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default { add, allStudent, studentById, deleteStudent, updateStudent ,updateStudentData};
