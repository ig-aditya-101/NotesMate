import React from "react";
import Avatar from "../utils/Avatar";
import Badge from "../utils/Badge";
import StatBox from "../components/StatBox";
import Button from "../utils/Button";

const ProfilePage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="">
        <h1 className="">Profile</h1>
      </div>
      <div>
        <Avatar />
      </div>
      <div className=" flex justify-center items-center">
        <Badge>College</Badge>

        <Badge>Student</Badge>
      </div>
      <div className=" flex justify-center items-center">
        <StatBox label={"Download"} number={"number"} />
        <StatBox label={"Download"} number={"number"} />
        <StatBox label={"Download"} number={"number"} />
      </div>
      <div>
        <div>My Uploads</div>
        <div></div>
      </div>
      <div>
        <Button size="lg">Sign Out</Button>
      </div>
    </div>
  );
};

export default ProfilePage;
