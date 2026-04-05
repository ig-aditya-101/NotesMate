import CryptoJS from "crypto-js";
import Note from "../models/Note.js";

export const plagiarismCheck = async (text, collegeId) => {
  let isDuplicate = false;

  const hash = CryptoJS.MD5(text).toString();
  const duplicate = await Note.findOne({
    contentHash: hash,
    college: collegeId,
  });
  if (duplicate) {
    isDuplicate = true;
  }
  return { hash, isDuplicate };
};

