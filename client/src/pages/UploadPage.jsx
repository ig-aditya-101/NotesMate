import { UploadCloud } from "lucide-react";
import React, { useRef, useState, useContext, useEffect } from "react";
import Input from "../utils/Input";
import Button from "../utils/Button";
import axiosInstance from "../apis/axios";
import { useNavigate } from "react-router-dom";
import Modal from "../utils/Modal";
import { AuthContext } from "../context/AuthContext";
import Select from "../utils/Select";

const UploadPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [university, setUniversity] = useState("");
  const [course, setCourse] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");

  const [subject, setSubject] = useState("");

  const [universitiesList, setUniversitiesList] = useState([]);
  const [coursesList, setCoursesList] = useState([]);
  const [branchesList, setBranchesList] = useState([]);
  const [semestersList, setSemestersList] = useState([]);
  const [subjectsList, setSubjectsList] = useState([]);

  useEffect(() => {
    const fetchUniversities = async () => {
      const res = await axiosInstance.get("/taxonomy/universities");
      setUniversitiesList(res.data.universities);
    };
    fetchUniversities();
  }, []);
  useEffect(() => {
    const fetchCourses = async () => {
      if (!university) return;
      const res = await axiosInstance.get(
        `/taxonomy/courses?university=${university}`,
      );
      setCoursesList(res.data.courses);
    };
    fetchCourses();
  }, [university]);
  useEffect(() => {
    const fetchBranches = async () => {
      if (!course) return;
      const res = await axiosInstance.get(
        `/taxonomy/branches?university=${university}&course=${course}`,
      );
      setBranchesList(res.data.branches);
    };
    fetchBranches();
  }, [course]);
  useEffect(() => {
    if (!branch) return;
    const fetchSemesters = async () => {
      const res = await axiosInstance.get(
        `/taxonomy/semesters?university=${university}&course=${course}&branch=${branch}`,
      );
      setSemestersList(res.data.semesters);
    };
    fetchSemesters();
  }, [branch]);
  useEffect(() => {
    const fetchSubjects = async () => {
      if (!semester) return;
      const res = await axiosInstance.get(
        `/taxonomy/subject?university=${university}&course=${course}&branch=${branch}&semester=${semester}`,
      );
      setSubjectsList(res.data.subjects);
    };
    fetchSubjects();
  }, [semester]);
  const handleUpload = async () => {
    setIsLoading(true);
    const uploadBox = new FormData();
    uploadBox.append("title", title);
    uploadBox.append("subject", subject);
    uploadBox.append("description", description);
    uploadBox.append("college", user?.college);
    uploadBox.append("university", university);
    uploadBox.append("course", course);
    uploadBox.append("branch", branch);
    uploadBox.append("semester", semester);
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

        <textarea
          placeholder="Note Description (Keep it informative and catchy!)"
          value={description}
          rows="4"
          className="border-border-main border-3 bg-bg-primary text-text-primary placeholder:text-text-muted rounded-xl text-body px-4 py-3 outline-none w-full resize-none transition-all hover:border-primary-main focus:border-primary-main"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

        <div className="flex flex-col gap-4 p-4 rounded-2xl bg-bg-secondary border border-border-main mt-2">
          <p className="text-body-lg font-bold text-text-primary mb-1">
            Academic Details
          </p>

          <Select
            placeholder={"Select University"}
            options={universitiesList}
            value={university}
            onChange={(e) => {
              setUniversity(e.target.value);
              setCourse("");
              setBranch("");
              setSemester("");
              setSubject("");
            }}
          ></Select>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              placeholder={"Select Course"}
              options={coursesList}
              value={course}
              disabled={!university || coursesList.length === 0}
              onChange={(e) => {
                setCourse(e.target.value);
                setBranch("");
                setSemester("");
                setSubject("");
              }}
            ></Select>
            <Select
              placeholder={"Select Branch"}
              options={branchesList}
              value={branch}
              disabled={!course || branchesList?.length === 0}
              onChange={(e) => {
                setBranch(e.target.value);
                setSemester("");
                setSubject("");
              }}
            ></Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              placeholder={"Select Semester"}
              options={semestersList}
              value={semester}
              disabled={!branch || semestersList.length === 0}
              onChange={(e) => {
                setSemester(e.target.value);
                setSubject("");
              }}
            ></Select>
            <Select
              placeholder={"Select Subject"}
              options={subjectsList}
              value={subject}
              disabled={!semester || subjectsList.length === 0}
              onChange={(e) => setSubject(e.target.value)}
            ></Select>
          </div>
        </div>
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
