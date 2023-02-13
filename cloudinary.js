require("dotenv").config();
const cloudinary = require("cloudinary").v2;

console.log(cloudinary.config().cloud_name);


cloudinary.uploader
  .upload("./public/image/headerImg.jpg", {
    
    resource_type: "image"
  })
  .then((result) => {
    console.log("success", JSON.stringify(result, null, 2));
    console.log(result.url)
  })
  .catch((error) => {
    console.log("error", JSON.stringify(error, null, 2));
  });