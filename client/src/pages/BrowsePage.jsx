import React, { useEffect, useState } from "react";
import Button from "../utils/Button";
import SearchBar from "../components/SearchBar";

import NotesCard from "../components/NotesCard";
import axiosInstance from "../apis/axios";
import { useNavigate } from "react-router-dom";
import FilterBar from "../components/FilterBar";

const BrowsePage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    university: "",
    course: "",
    branch: "",
  });

  const [lists, setLists] = useState({
    universities: [],
    courses: [],
    branches: [],
  });
  const handleFilterChange = (name, value) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [name]: value };

      if (name === "university") {
        newFilters.course = "";
        newFilters.branch = "";
      }

      if (name === "course") {
        newFilters.branch = "";
      }

      return newFilters;
    });
  };

  const [notes, setNotes] = useState([]);
  const fetchNotes = async (searchWord = "") => {
    const res = await axiosInstance.get("/notes?searchQuery=" + searchWord);
    setNotes(res.data.notes);
  };
  const fetchUniversities = async () => {
    const res = await axiosInstance.get("/taxonomy/universities");
    setLists((prev) => ({ ...prev, universities: res.data.universities }));
  };
  useEffect(() => {
    fetchNotes();
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
      </div>
      <div className=" border-2 border-accent-green flex flex-col gap-4 p-4 rounded-2xl">
        <div className="searchBar">
          <SearchBar
            placeholder="Search Notes......"
            onSearch={(query) => fetchNotes(query)}
            results={notes}
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
              onDownload={() => window.open(note.fileUrl, "_blank")}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowsePage;
