import Note from "../models/Note.js";
import { aiQualityCheck } from "../utils/aiQualityCheck.js";
import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
import { extractText } from "../utils/parser.js";
import { plagiarismCheck } from "../utils/plagiarismCheck.js";
import Download from "../models/Download.js";
import Rating from "../models/Rating.js";

export const uploadNotes = async (req, res) => {
  try {
    let aiQualityScore;
    let contentHash;
    const { title, subject, college } = req.body;
    const buffer = req.file.buffer;
    const text = await extractText(buffer);
    if (text.length > 100) {
      const { score, reason, passed } = await aiQualityCheck(text);

      if (!passed) {
        return res.status(400).json({ message: reason });
      }

      aiQualityScore = score;

      const { hash, isDuplicate } = await plagiarismCheck(text, college);
      if (isDuplicate) {
        return res.status(400).json({ message: "Found Duplicate" });
      }
      contentHash = hash;
    }
    const fileName = `notes/${Date.now()}-${req.file.originalname}`;
    const { fileUrl, filePublicId } = await uploadOnCloudinary(
      buffer,
      fileName,
    );
    const note = await Note.create({
      title: title,
      subject: subject,
      college: college,
      uploadedBy: req.user._id,
      fileSize: req.file.size,
      fileUrl: fileUrl,
      filePublicId: filePublicId,
      fileName: fileName,
      aiQualityScore: aiQualityScore,
      contentHash: contentHash,
    });
    res.status(201).json({ note });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNotes = async (req, res) => {
  try {
    const subject = req.query.subject;
    const college = req.user.college;

    const filter = { college: college };
    if (subject) {
      filter.subject = subject;
    }
    const page = req.query.page || 1;
    const skip = (page - 1) * 10;

    const notes = await Note.find(filter).skip(skip).limit(10);
    return res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const trendingNotes = async (req, res) => {
  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const notes = await Note.find({ createdAt: { $gte: sevenDaysAgo } })
      .sort({ downloads: -1 })
      .limit(10);
    return res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const downloadNotes = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    if (note.uploadedBy.toString() === req.user._id.toString()) {
      return res
        .status(400)
        .json({ message: "Cannot download your own notes" });
    }
    await Note.findByIdAndUpdate(req.params.id, { $inc: { downloads: 1 } });
    await Download.create({ note: req.params.id, user: req.user._id });
    res.status(200).json({ fileUrl: note.fileUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteNotes = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    if (note.uploadedBy.toString() === req.user._id.toString()) {
      await deleteOnCloudinary(note.filePublicId);
      await Note.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: " notes Deleted " });
    }
    res.status(403).json({ message: "can't delete " });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const rateNotes = async (req, res) => {
  try {
    const rating = req.body.rating;
    const note = await Note.findById(req.params.id);
    if (note.uploadedBy.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: "Cannot rate your own notes" });
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
    res.status(200).json({ message: "Ratings Saved" });
    //if rating change rating else log rating
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyNotes = async (req, res) => {
  try {
    const notes =await Note.find({ uploadedBy: req.user._id });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
