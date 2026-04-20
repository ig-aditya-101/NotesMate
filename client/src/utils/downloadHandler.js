import axiosInstance from "../apis/axios";

export const handleDownload = async (noteId, fileName) => {
  try {
    const res = await axiosInstance.get(`/notes/${noteId}/download`);
    const { fileUrl } = res.data;

    // Create a temporary link and trigger download
    const link = document.createElement("a");
    link.href = fileUrl;
    // Set download attribute. For Cloudinary, fl_attachment handles it on the server side,
    // but the download attribute is a good fallback for local naming.
    link.setAttribute("download", fileName || "note.pdf");
    link.setAttribute("target", "_blank");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Download failed:", error);
    const message = error.response?.data?.message || "Download failed. Please check if you are logged in.";
    alert(message);
  }
};
