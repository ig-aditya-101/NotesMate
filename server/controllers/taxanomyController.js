import Subject from "../models/Subject.js";

export const getUniversities = async (req, res) => {
  try {
    const universities = await Subject.distinct("university");
    res.status(200).json({ universities });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCourses = async (req, res) => {
  try {
    const uni = req.query.university;
    const courses = await Subject.distinct("course", { university: uni });
    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBranches = async (req, res) => {
  try {
    const branches = await Subject.distinct("branch", {
      university: req.query.university,
      course: req.query.course,
    });
    res.status(200).json({ branches });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getSemesters = async (req, res) => {
  try {
    const semesters = await Subject.distinct("semester", {
      university: req.query.university,
      course: req.query.course,
      branch: req.query.branch,
    });
    res.status(200).json({ semesters });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({
      university: req.query.university,
      course: req.query.course,
      branch: req.query.branch,
      semester: req.query.semester,
    }).select("_id name");
    res.status(200).json({ subjects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
