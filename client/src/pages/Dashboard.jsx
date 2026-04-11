import React, { useEffect, useState } from "react";
import Avatar from "../utils/Avatar";

import NotesCard from "../components/NotesCard";
import axiosInstance from "../apis/axios";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axiosInstance.get("/notes");
        setNotes(res.data.notes);
      } catch (error) {
        alert(error);
      }
    };
    fetchNotes();
  }, []);
  return (
    <div className=" flex flex-col py-2.5 gap-6 px-4 pt-4  overflow-hidden">
      <div className="header flex justify-between items-center">
        <div>
          <div className="text-display">Hey Adi 👋</div>
          <div className="text-h3 text-text-secondary p-1">MAIT</div>
        </div>
        <div>
          <Avatar seed="aditya" />
        </div>
      </div>
      <h1 className="text-h1">My Saved Notes</h1>
      <div className="notesrow flex flex-col items-center   gap-3">
        {notes.map((note) => (
          <div className="w-full">
            <NotesCard
              title={note.title}
              subject={note.subject}
              uploader={note.uploader}
              downloads={note.downloads}
            />
          </div>
        ))}
      </div>
      <div></div>
    </div>
  );
};

export default Dashboard;
