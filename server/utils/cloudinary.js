import { v2 as cloudinary } from "cloudinary";

export const uploadOnCloudinary = async (buffer, fileName) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  const options = {
    resource_type: "auto",
    public_id: fileName,
    type: "upload",
  };
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (err, res) => {
      if (err) reject(err);
      else resolve({ 
        fileUrl: res.secure_url, 
        filePublicId: res.public_id,
        resourceType: res.resource_type 
      });
    });
    stream.end(buffer);
  });
};
export const deleteOnCloudinary= async(filePublicId, resourceType = "auto")=>{
   cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
   // If resourceType is "auto", Cloudinary doesn't support it in destroy, 
   // but we can try "image" as default or handle specific cases.
   // For now, we'll pass it through or default to "image" if not provided.
   const res = await cloudinary.uploader.destroy(filePublicId, { 
     resource_type: resourceType === "auto" ? "image" : resourceType 
   });
   return res;
}
