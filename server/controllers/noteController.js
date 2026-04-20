import Note from "../models/Note.js";
import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
import Download from "../models/download.js";
import Rating from "../models/Rating.js";
import mongoose from "mongoose";

export const uploadNotes = async (req, res) => {
  try {
    const {
      title,
      subject,
      college,
      university,
      branch,
      course,
      semester,
      description,
    } = req.body;

    const requiredFields = {
      title,
      subject,
      college,
      university,
      branch,
      course,
      semester,
      description,
    };
    const missingFields = Object.keys(requiredFields).filter(
      (key) => !requiredFields[key],
    );
    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `The following required fields are missing: ${missingFields.join(", ")}.`,
      });
    }
    if (!req.file) {
      return res.status(400).json({
        message: "No file was attached. Please upload a PDF file to proceed.",
      });
    }

    const baseName = req.file.originalname.includes(".") 
      ? req.file.originalname.split(".").slice(0, -1).join(".") 
      : req.file.originalname;
    const publicId = `notes/${Date.now()}-${baseName}`;
    const { fileUrl, filePublicId, resourceType } = await uploadOnCloudinary(
      req.file.buffer,
      publicId,
    );
    const note = await Note.create({
      title,
      subject,
      college,
      university,
      semester,
      branch,
      course,
      description,
      uploadedBy: req.user._id,
      fileSize: req.file.size,
      fileUrl: fileUrl,
      filePublicId: filePublicId,
      resourceType: resourceType,
      fileName: publicId,
    });
    res.status(201).json({ note });
  } catch (error) {
    console.error("[uploadNotes Error]", error);
    res
      .status(500)
      .json({ message: "Failed to upload note. Please try again later." });
  }
};

export const getNotes = async (req, res) => {
  try {
    const {
      subject,
      college,
      university,
      branch,
      semester,
      course,
      searchQuery,
    } = req.query;

    const filter = {};
    if (mongoose.Types.ObjectId.isValid(subject))
      filter.subject = new mongoose.Types.ObjectId(subject);
    if (mongoose.Types.ObjectId.isValid(college))
      filter.college = new mongoose.Types.ObjectId(college);
    if (university) filter.university = university;
    if (branch) filter.branch = branch;
    if (semester) filter.semester = semester;
    if (course) filter.course = course;
    if (searchQuery) {
      filter.title = { $regex: searchQuery, $options: "i" };
    }

    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * 10;

    const notes = await Note.find(filter)
      .sort({ downloads: -1 })
      .skip(skip)
      .limit(10);
    return res.status(200).json({ notes });
  } catch (error) {
    console.error("[getNotes Error]", error);
    res
      .status(500)
      .json({ message: "Failed to fetch notes. Please try again later." });
  }
};

export const downloadNotes = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note)
      return res
        .status(404)
        .json({ message: `Note with ID '${req.params.id}' was not found.` });
    if (note.uploadedBy.toString() === req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You cannot download your own uploaded notes." });
    }
    await Note.findByIdAndUpdate(req.params.id, { $inc: { downloads: 1 } });
    await Download.create({ note: req.params.id, user: req.user._id });
    let fileUrl = note.fileUrl;
    // Only apply fl_attachment to image/video resources (PDFs are treated as images)
    // and avoid applying it to raw resources which don't support transformations.
    if (fileUrl.includes("upload/") && !fileUrl.includes("fl_attachment") && !fileUrl.includes("/raw/")) {
      fileUrl = fileUrl.replace("upload/", "upload/fl_attachment/");
    }
    res.status(200).json({ fileUrl });
  } catch (error) {
    console.error("[downloadNotes Error]", error);
    res
      .status(500)
      .json({ message: "Failed to process download. Please try again later." });
  }
};

export const deleteNotes = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note)
      return res
        .status(404)
        .json({ message: `Note with ID '${req.params.id}' was not found.` });
    if (note.uploadedBy.toString() === req.user._id.toString()) {
      await deleteOnCloudinary(note.filePublicId, note.resourceType);
      await Note.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "Note deleted successfully." });
    }
    res.status(403).json({
      message:
        "Access denied. You can only delete notes that you have uploaded.",
    });
  } catch (error) {
    console.error("[deleteNotes Error]", error);
    res
      .status(500)
      .json({ message: "Failed to delete note. Please try again later." });
  }
};
export const rateNotes = async (req, res) => {
  try {
    const rating = req.body.rating;
    const note = await Note.findById(req.params.id);
    if (!note)
      return res
        .status(404)
        .json({ message: `Note with ID '${req.params.id}' was not found.` });
    if (note.uploadedBy.toString() === req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You cannot rate your own uploaded notes." });
    }
    await Rating.findOneAndUpdate(
      {
        note: req.params.id,
        user: req.user._id,
      },
      { rating },
      { upsert: true, new: true },
    );

    const allRatings = await Rating.find({ note: req.params.id });
    const avg =
      allRatings.reduce((sum, r) => sum + r.rating, 0) / allRatings.length;
    await Note.findByIdAndUpdate(req.params.id, {
      averageRating: avg,
      ratingCount: allRatings.length,
    });
    res.status(200).json({ message: "Rating submitted successfully." });
  } catch (error) {
    console.error("[rateNotes Error]", error);
    res
      .status(500)
      .json({ message: "Failed to submit rating. Please try again later." });
  }
};

export const getMyNotes = async (req, res) => {
  try {
    const notes = await Note.find({ uploadedBy: req.user._id });
    res.status(200).json({ notes });
  } catch (error) {
    console.error("[getMyNotes Error]", error);
    res
      .status(500)
      .json({ message: "Failed to fetch your notes. Please try again later." });
  }
};
