import "./AddContent.css";
import { useState } from "react";
import ImageCropDialog from "./ImageCropDialog";

function CropApp() {
  const [imagePreview, setImagePreview] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  // Handle image upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);  // Set the preview image
        setSelectedItem({ id: 1, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
      setImageFile(file);  // Store the original image file for cropping
      setFieldValue('artPic', file);  // Set the field value for Formik
      setCropping(true);  // Enable cropping mode
    }
  };

  // Update image after cropping
  const setCroppedImageFor = (id, crop, zoom, aspect, croppedImageUrl) => {
    setCroppedImage(croppedImageUrl);
    setSelectedItem(null);  // Close cropping dialog after applying
  };

  const onCancel = () => {
    setSelectedItem(null);  // Close crop dialog without saving
  };

  return (
    <div className="crop-app">
      <h1>Upload and Crop Image</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        id="file-upload"
      />

      {imagePreview && (
        <div className="image-preview-container">
          <img
            src={croppedImage || imagePreview}
            alt="Uploaded"
            className="uploaded-image"
            onClick={() => setSelectedItem({ id: 1, imageUrl: imagePreview })}
          />
        </div>
      )}

      {selectedItem && (
        <ImageCropDialog
          id={selectedItem.id}
          imageUrl={selectedItem.imageUrl}
          cropInit={selectedItem.crop}
          zoomInit={selectedItem.zoom}
          aspectInit={selectedItem.aspect}
          onCancel={onCancel}
          setCroppedImageFor={setCroppedImageFor}
        />
      )}
    </div>
  );
}

export default CropApp;
