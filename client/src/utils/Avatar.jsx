import React from "react";

const Avatar = ({ seed = "Adi", size = "w-10 h-10" }) => {
  // Using 'adventurer' for a friendly human look, or 'bottts' for robotic
  const avatarUrl = `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}`;

  return (
    <div
      className={`
      ${size} relative rounded-full p-0.5 bg-white/20 backdrop-blur-md border border-white/30 

      shadow-lg bg-linear-to-br from-accent-green/40 to-green-600/20

      hover:scale-110 hover:rotate-3 transition-all duration-300 cursor-pointer
    `}
    >
      <div className="w-full h-full rounded-full overflow-hidden bg-bg-secondary/80">
        <img
          src={avatarUrl}
          alt="User Avatar"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Optional: Online Status Indicator */}
      <div className="absolute bottom-0 right-0 w-3 h-3 bg-accent-green border-2 border-white rounded-full shadow-sm" />
    </div>
  );
};

export default Avatar;
