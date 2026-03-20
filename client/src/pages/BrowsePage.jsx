import React from "react";
import Button from "../utils/Button";
import SearchBar from "../components/SearchBar";
import Badge from "../utils/Badge";
import { mockNotes } from "../mock/data";
import NotesCard from "../components/NotesCard";

const BrowsePage = () => {
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
          <Button variant="secondary" size={"md"} >Login</Button>
          <Button variant="primary" size={"md"}>Sign Up</Button>
        </div>
      </div>
      <div className="searchBar">
        <SearchBar placeholder="Search Notes......" />
      </div>
      
      {/* Filter Pills will add later */}
      {/* <div className="flex gap-2">
        <Badge variant="active">Maths</Badge>
        <Badge>Maths</Badge>
        <Badge>Maths</Badge>
      </div> */}
      <div className="flex flex-col items-center   gap-3">
        {mockNotes.map((note) => (
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
    </div>
  );
};

export default BrowsePage;
