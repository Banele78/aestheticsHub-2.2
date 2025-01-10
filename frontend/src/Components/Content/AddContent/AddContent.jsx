import React, { useContext, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { axiosInstance } from '../../../helper/axiosConfig';
import Cropper from 'react-easy-crop';
import './AddContent.css';
import ImageCropDialog from "../../CropImage/ImageCropDialog";
import { UserProfileContext } from '../../../helper/UserProfileContext';
import { Link } from 'react-router-dom';


function AddContent() {
  const [errorMessage, setErrorMessage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  
  const [croppedImage, setCroppedImage] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const { userProfile, loading, error } = useContext(UserProfileContext);
  

  const artistTypeOptions = [
    { value: '', label: 'Select Artist Type' },
    { value: 'painter', label: 'Painter' },
    { value: 'musician', label: 'Musician' },
    { value: 'Fashion', label: 'Fashion' },
    { value: 'author', label: 'Author/Writer' },
    { value: 'Photographer', label: 'Photographer' },
  ];

  const initialValues = {
    Artname: '',
    Caption: '',
    artistType: userProfile.artistType,
    artPic: null,
  };

  const validationSchema = Yup.object().shape({
    Artname: Yup.string().required('Artname is required'),
    Caption: Yup.string() .max(330, 'Caption cannot be longer than 300 characters')
    .optional(),  
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
    formData.append('Caption', data.Caption);
    formData.append('artistType', data.artistType);
    formData.append('artPic', imageFile);  // Send the original file (or cropped image) in the form data

    try {
      const response = await axiosInstance.post(`${userProfile.id}/post`, formData, {
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
      <div className="nav">
      <Link to="/"> <img src="Group 20.png" className="logo" alt="Logo" /></Link> 
      </div>
      <div className="addContent">
        <h3>Drop your picture here and tell us more!</h3>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          {({ setFieldValue }) => (
            <Form>
              <div className="">
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
              <ErrorMessage name="Artname" component="span" className="error" />
                <Field type="text" name="Artname" placeholder="Art Name" />
               
              </div>

              <div className="field">
              <ErrorMessage name="Caption" component="span" className="error" />
                <Field type="text" name="Caption" placeholder="Caption" />
               
              </div>

              {/* <div className="field">
              <ErrorMessage name="artistType" component="span" className="error" />
                <Field as="select" name="artistType">
               
                  {artistTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field>
                
              </div> */}

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
