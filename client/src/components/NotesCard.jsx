import React from "react";
import { Download } from "lucide-react";
import Badge from "./Badge";

const NotesCard = ({title,subject,name,downloads,onDownload}) => {
  return (
    <div className="w-90 p-3 bg-bg-secondary rounded-xl">
      <div className="headerAndIcon flex justify-between">
        <div className="header text-h3">{title}</div>
        <button className="icon cursor-pointer " onClick={onDownload}>
            <Download/>
            </button>
      </div>
      <div className="flex justify-between p-2.5 items-center">
        <div className="badges flex justify-around gap-2 items-center">
          <div>
            <Badge variant="default">{subject}</Badge>
          </div>
          <div className="">
            <h3 className="text-text-muted text-small">{name}</h3>
          </div>
        </div>
        <div className="downloadsCount ">
          <h3 className="text-text-muted text-small">{downloads} downloads</h3>
        </div>
      </div>
    </div>
  );
};

export default NotesCard;
