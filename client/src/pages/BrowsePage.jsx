import React, { useContext, useEffect, useState } from "react";
import Button from "../utils/Button";
import SearchBar from "../components/SearchBar";

import NotesCard from "../components/NotesCard";
import axiosInstance from "../apis/axios";
import { useNavigate } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import { AuthContext } from "../context/AuthContext";
import { handleDownload } from "../utils/downloadHandler";

const BrowsePage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);

  const [filters, setFilters] = useState({
    subject: "",
    university: "",
    course: "",
    branch: "",
  });

  const [lists, setLists] = useState({
    universities: [],
    courses: [],
    branches: [],
  });

  const [subjectsList, setSubjectsList] = useState([]);
  const handleSubjectSelect = (selectedSubject) => {
    setFilters((prev) => ({ ...prev, subject: selectedSubject._id }));
  };
  const handleFilterChange = (name, value) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [name]: value };

      if (name === "university") {
        newFilters.course = "";
        newFilters.branch = "";
        newFilters.subject = "";
      }

      if (name === "course") {
        newFilters.branch = "";
        newFilters.subject = "";
      }
      if (name === "branch") {
        newFilters.subject = "";
      }

      return newFilters;
    });
  };

  const fetchSubjects = async (query) => {
    try {
      const res = await axiosInstance.get(
        `/taxonomy/subject?university=${filters.university}&course=${filters.course}&branch=${filters.branch}&name=${query}`,
      );
      setSubjectsList(res.data.subjects);
    } catch (error) {
      alert("unable to fetch subjects");
    }
  };
  const fetchNotes = async () => {
    // 1. Collect all "stamps" from your filters
    const { university, course, branch, subject } = filters;

    // 2. Build the URL (Send EVERYTHING at once!)
    const url = `/notes?university=${university}&course=${course}&branch=${branch}&subject=${subject}`;

    const res = await axiosInstance.get(url);
    setNotes(res.data.notes);
  };

  const fetchUniversities = async () => {
    const res = await axiosInstance.get("/taxonomy/universities");
    setLists((prev) => ({ ...prev, universities: res.data.universities }));
  };
  useEffect(() => {
    fetchNotes();
  }, [filters]);
  useEffect(() => {
    fetchUniversities();
  }, []);

  useEffect(() => {
    if (!filters.university) return;
    const fetchCourses = async () => {
      const res = await axiosInstance.get(
        `/taxonomy/courses?university=${filters.university}`,
      );
      setLists((prev) => ({ ...prev, courses: res.data.courses }));
    };
    fetchCourses();
  }, [filters.university]);
  useEffect(() => {
    if (!filters.course) return;
    const fetchBranches = async () => {
      const res = await axiosInstance.get(
        `/taxonomy/branches?university=${filters.university}&course=${filters.course}`,
      );
      setLists((prev) => ({ ...prev, branches: res.data.branches }));
    };
    fetchBranches();
  }, [filters.course]);

  return (
    <div className=" flex flex-col py-2.5 gap-4 px-4 pt-4  overflow-hidden">
      <div className="header h-15  w-full flex items-center  justify-between px-2">
        <div>
          <span style={{ fontWeight: 800 }} className="text-display">
            NOTES
          </span>
          <span style={{ fontWeight: 400 }} className="text-display">
            MATE
          </span>
        </div>
        {user ? (
          <div></div>
        ) : (
          <div className="flex items-center gap-1.5 ">
            <Button
              variant="secondary"
              size={"md"}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
            <Button
              variant="primary"
              size={"md"}
              onClick={() => {
                navigate("/register");
              }}
            >
              Sign Up
            </Button>
          </div>
        )}
      </div>
      <div className=" border-2 border-accent-green flex flex-col gap-4 p-4 rounded-2xl">
        <div className="searchBar">
          <SearchBar
            key={filters.university + filters.course + filters.branch}
            placeholder="Search Subjects......"
            onSearch={(query) => fetchSubjects(query)}
            results={subjectsList}
            onSelect={handleSubjectSelect}
          />
          {/* <FilterBar /> */}
        </div>
        <FilterBar
          onFilterChange={handleFilterChange}
          filters={filters}
          lists={lists}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2   gap-3">
        {notes.map((note) => (
          <div className="w-full">
            <NotesCard
              title={note.title}
              subject={note.subject}
              uploader={note.uploader}
              downloads={note.downloads}
              onDownload={() => handleDownload(note._id, note.title)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowsePage;
