import Download from "../models/download.js";

export const leaderBoard = async (req, res) => {
  try {
    const leaderBoard = await Download.aggregate([
      {
        $lookup: {
          from: "notes",
          localField: "note",
          foreignField: "_id",
          as: "noteData",
        },
      },
      { $unwind: "$noteData" },
      {
        $group: { _id: "$noteData.uploadedBy", totalDownloads: { $sum: 1 } },
      },
      { $sort: { totalDownloads: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userData",
        },
      },
      { $unwind: "$userData" },
    ]);
    res.status(200).json(leaderBoard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
