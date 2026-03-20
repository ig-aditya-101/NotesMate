import { UploadCloud } from "lucide-react";
import React, { useRef, useState } from "react";
import Input from "../utils/Input";
import Button from "../utils/Button";

const UploadPage = () => {
  const fileInputRef = useRef(null);
  const [title,setTitle]=useState("")
  const [subject,setsubject]=useState("")

  return (
    <div className=" flex flex-col py-2.5 gap-4 px-4 pt-4  overflow-hidden">
     
        <div className="text-h1">Upload Notes</div>
        <div className="text-body text-text-secondary">Share your notes with your college</div>
      
      <div
        onClick={() => fileInputRef.current.click()}
        className="border-2 border-dashed border-border-main rounded-xl p-10 text-center cursor-pointer flex flex-col items-center gap-2"
      >
        <UploadCloud />
        <p>Tap to select PDF</p>
        <p className="text-text-muted text-small">{"Max 15MB  ·  PDF only"}</p>
        <input type="file" ref={fileInputRef} className="hidden"></input>
      </div>
      <div className="flex flex-col gap-2 ">
        <Input placeholder={'Note Title'} value={title} onChange={(e)=>{setTitle(e.target.value)}} />
        <Input placeholder={'Subject Title'} value={subject} onChange={(e)=>{setsubject(e.target.value)}} />
        
        
      </div>
      <Button variant="primary" size="lg">Upload Notes</Button>
    </div>
  );
};

export default UploadPage; 
