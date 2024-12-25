import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { axiosInstance } from '../../../helper/axiosConfig';
import Cropper from 'react-easy-crop';
import './AddContent.css';
import ImageCropDialog from "../../CropImage/ImageCropDialog";

function AddContent() {
  const [errorMessage, setErrorMessage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  
  const [croppedImage, setCroppedImage] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  

  const artistTypeOptions = [
    { value: '', label: 'Select Artist Type' },
    { value: 'painter', label: 'Painter' },
    { value: 'musician', label: 'Musician' },
    { value: 'sculptor', label: 'Sculptor' },
  ];

  const initialValues = {
    Artname: '',
    artistType: '',
    artPic: null,
  };

  const validationSchema = Yup.object().shape({
    Artname: Yup.string().required('Artname is required'),
    artistType: Yup.string().required('Please select an artist type'),
    artPic: Yup.mixed().required('Art picture is required'),
  });

  // Handle image upload
  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);  // Set the preview image
        setSelectedItem({ id: 1, imageUrl: reader.result ,aspect : { value: 280 / 280 , text: "Custom" } });
      };
      reader.readAsDataURL(file);
      setImageFile(file);  // Store the original image file for cropping
      setFieldValue('artPic', file);  // Set the field value for Formik
      
    }
  };

  // Update image after cropping
  const setCroppedImageFor = (id, crop, zoom, aspect, croppedImageUrl) => {
    setCroppedImage(croppedImageUrl);
    fetch(croppedImageUrl)
    .then(res => res.blob())
    .then(blob => {
      const croppedFile = new File([blob], imageFile.name, { type: imageFile.type });
      setImageFile(croppedFile);  // Update with cropped image
    });
    setSelectedItem(null);  // Close cropping dialog after applying
  };

  const onCancel = () => {
    setSelectedItem(null);  // Close crop dialog without saving
  };

  const onSubmit = async (data, { resetForm }) => {
    const formData = new FormData();
    formData.append('Artname', data.Artname);
    formData.append('artistType', data.artistType);
    formData.append('artPic', imageFile);  // Send the original file (or cropped image) in the form data

    try {
      const response = await axiosInstance.post('/post', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Post updated successfully!');
      resetForm();
      setImagePreview(null);
      setImageFile(null);
    } catch (error) {
      setErrorMessage('Failed to update profile. Please try again.');
    }
  };

  return (
    <div>
      AddContent
      <div className="bd sign">
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          {({ setFieldValue }) => (
            <Form>
              <div className="field">
                <label htmlFor="file">
                  <div className="Setcontent">
                    <div className="image">
                    {imagePreview && (
       
          <img
            src={croppedImage || imagePreview}
            alt="Uploaded"
            className="uploaded-image"
            onClick={() => setSelectedItem({ id: 1, imageUrl: imagePreview })}
          />
       
      )}
                    </div>
                  </div>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, setFieldValue)}
                  id="file"
                  style={{ display: 'none' }}
                />
                <ErrorMessage name="artPic" component="span" className="error" />
              </div>

              <div className="field">
                <Field type="text" name="Artname" placeholder="Art name" />
                <ErrorMessage name="Artname" component="span" className="error" />
              </div>

              <div className="field">
                <Field as="select" name="artistType">
                  {artistTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="artistType" component="span" className="error" />
              </div>

              <div className="field button-container">
                <button type="submit">Post</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
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

export default AddContent;
