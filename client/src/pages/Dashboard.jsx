import React, { useContext, useEffect, useState } from "react";
import Avatar from "../utils/Avatar";

import NotesCard from "../components/NotesCard";
import axiosInstance from "../apis/axios";
import { AuthContext } from "../context/AuthContext";
import { handleDownload } from "../utils/downloadHandler";
import { useToast } from "../context/ToastContext";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const { user } = useContext(AuthContext);
  const { showToast } = useToast();
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axiosInstance.get("/notes/my");
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
          <div className="text-display">
            Hey {user?.name?.split(" ")[0]}! 👋
          </div>
          <div className="text-h3 text-text-secondary p-1">
            {user?.college?.name}
          </div>
        </div>
        <div>
          <Avatar seed="aditya" />
        </div>
      </div>
      <h1 className="text-h1">My Saved Notes</h1>
      <div className="notesrow grid grid-cols-1 md:grid-cols-2  gap-3">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div className="w-full" key={note._id}>
              <NotesCard
                title={note.title}
                subject={note.subject}
                uploader={note.uploader}
                downloads={note.downloads}
                onDownload={() => handleDownload(note._id, note.title, !!user, showToast)}
              />
            </div>
          ))
        ) : (
          <div className="text-text-secondary mt-10">
            No notes found! Be the first to upload. 🚀
          </div>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default Dashboard;
