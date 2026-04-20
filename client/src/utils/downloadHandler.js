import axiosInstance from "../apis/axios";

export const handleDownload = async (noteId, fileName, isLoggedIn, showToast) => {
  if (!isLoggedIn) {
    showToast("Please login to download notes!", "error");
    return;
  }

  try {
    const res = await axiosInstance.get(`/notes/${noteId}/download`);
    const { fileUrl } = res.data;

    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", fileName || "note.pdf");
    link.setAttribute("target", "_blank");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast("Download started!", "success");
  } catch (error) {
    console.error("Download failed:", error);
    const message = error.response?.data?.message || "Download failed. Please try again later.";
    showToast(message, "error");
  }
};
