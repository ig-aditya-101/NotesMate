import { UploadCloud } from "lucide-react";
import React, { useRef, useState, useContext } from "react";
import Input from "../utils/Input";
import Button from "../utils/Button";
import axiosInstance from "../apis/axios";
import { useNavigate } from "react-router-dom";
import Modal from "../utils/Modal";
import { AuthContext } from "../context/AuthContext";

const UploadPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef(null);
  const [title, setTitle] = useState("");
  const [subject, setsubject] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async () => {
    setIsLoading(true);
    const uploadBox = new FormData();
    uploadBox.append("title", title);
    uploadBox.append("subject", subject);
    uploadBox.append("college", user?.college);
    uploadBox.append("file", file);
    try {
      await axiosInstance.post("/notes/upload", uploadBox, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setShowModal(true);
    } catch (error) {
      alert(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" flex flex-col py-2.5 gap-4 px-4 pt-4  overflow-hidden">
      <div className="text-h1">Upload Notes</div>
      <div className="text-body text-text-secondary">
        Share your notes with your college
      </div>

      {file ? (
        <p>{file.name}</p>
      ) : (
        <div
          onClick={() => fileInputRef.current.click()}
          className="border-2 border-dashed border-border-main rounded-xl p-10 text-center cursor-pointer flex flex-col items-center gap-2"
        >
          <UploadCloud />
          <p>Tap to select PDF</p>
          <p className="text-text-muted text-small">
            {"Max 15MB  ·  PDF only"}
          </p>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          ></input>
        </div>
      )}
      <div className="flex flex-col gap-2 ">
        <Input
          placeholder={"Note Title"}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <Input
          placeholder={"Subject Title"}
          value={subject}
          onChange={(e) => {
            setsubject(e.target.value);
          }}
        />
      </div>
      <Button
        variant={isLoading ? "secondary" : "primary"}
        size="lg"
        onClick={handleUpload}
        disabled={isLoading}
      >
        {isLoading ? "Uploading..." : "Upload Notes"}
      </Button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        {/* Everything inside here is the "children" */}
        <div className="flex flex-col items-center gap-4 p-4 text-center">
          <h2 className="text-h2 text-success-main">Upload Successful!</h2>
          <p className="text-body text-text-secondary">
            Your notes are now live.
          </p>

          <Button variant="primary" onClick={() => navigate("/dashboard")}>
            View Dashboard
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default UploadPage;
