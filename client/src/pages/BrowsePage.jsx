import React, { useEffect, useState } from "react";
import Button from "../utils/Button";
import SearchBar from "../components/SearchBar";

import NotesCard from "../components/NotesCard";
import axiosInstance from "../apis/axios";

const BrowsePage = () => {
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState([]);
  const fetchNotes = async (searchWord = "") => {
    const res = await axiosInstance.get("/notes?searchQuery=" + searchWord);
    setNotes(res.data.notes);
  };
  useEffect(() => {
    fetchNotes();
  }, []);

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
          <Button variant="secondary" size={"md"}>
            Login
          </Button>
          <Button variant="primary" size={"md"}>
            Sign Up
          </Button>
        </div>
      </div>
      <div className="searchBar">
        <SearchBar
          placeholder="Search Notes......"
          onSearch={(query) => fetchNotes(query)}
          results={notes}
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
