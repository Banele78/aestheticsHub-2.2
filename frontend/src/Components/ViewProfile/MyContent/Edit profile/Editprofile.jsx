import React, { useContext, useEffect, useState } from 'react';
import './Editprofile.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {axiosInstance }from '../../../../helper/axiosConfig';
import ImageCropDialog from "../../../CropImage/ImageCropDialog";
import { UserProfileContext } from '../../../../helper/UserProfileContext';
import {getImageUrl} from '../../../../helper/axiosConfig';
import { Link } from 'react-router-dom';

function Editprofile() {
  const [errorMessage, setErrorMessage] = useState('');
   const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [submit, setSubmitted] = useState(false);
    const [croppedImage, setCroppedImage] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

    const { userProfile,loading, error } = useContext(UserProfileContext);

  const artistTypeOptions = [
    { value: '', label: 'Select Artist Type' },
    { value: 'painter', label: 'Painter' },
    { value: 'musician', label: 'Musician' },
    { value: 'Fashion', label: 'Fashion' },
    { value: 'author', label: 'Author/Writer' },
    { value: 'Photographer', label: 'Photographer' },
  ];

  const [formInitialValues, setFormInitialValues] = useState({
    nickName: '',
    artistType: '',
    bio: '',
    profilePic: null,
  });

  const validationSchema = Yup.object().shape({
    nickName: Yup.string().required('Nickname is required'),
    artistType: Yup.string().required('Please select an artist type'),
    bio: Yup.string() .max(250, 'Bio cannot be longer than 250 characters')
    .optional(), 
    profilePic: Yup.mixed().required('Profile picture is required'),
  });

  useEffect(() => {
    if (!loading && userProfile) {
      const profilePicUrl = `${getImageUrl}/userProfile/${userProfile.id}/ProfileImage`;
      setFormInitialValues({
        nickName: userProfile.nickName || '',
        artistType: userProfile.artistType || '',
        bio: userProfile.bio || '',
        profilePic: profilePicUrl || null,
      });
      setImagePreview(profilePicUrl);
     
    }
  }, [userProfile, loading]);

   // Handle image upload
   const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);  // Set the preview image
        setSelectedItem({ id: 1, imageUrl: reader.result ,aspect : { value: 1 / 1 , text: "Custom" } });
      };
      reader.readAsDataURL(file);
      setImageFile(file);  // Store the original image file for cropping
      setFieldValue('profilePic', file);  // Set the field value for Formik
      
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
    formData.append('nickName', data.nickName);
    formData.append('artistType', data.artistType);
    formData.append('bio', data.bio);
    formData.append('profilePic', imageFile);

    if (!imageFile && formInitialValues.profilePic) {
      const response = await fetch(formInitialValues.profilePic);
      const blob = await response.blob();
      const existingFile = new File([blob], 'profile.jpg', { type: blob.type });
      formData.append('profilePic', existingFile);
    }

    try {
      const response = await axiosInstance.post('/createProfile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Profile updated successfully!');
      //resetForm();
      //setImagePreview(null);
      //setSubmitted(true);
    } catch (error) {
      setErrorMessage('Failed to update profile. Please try again.');
      //setSubmitted(false);
    }
  };

  return (
    <div>
      <div className="nav">
       <Link to="/"> <img src="Group 20.png" className="logo" alt="Logo" /></Link>
      </div>

      <div className="addContent">
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <Formik  enableReinitialize initialValues={formInitialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          {({ setFieldValue }) => (
            <Form>
               <div className="">
                             <label htmlFor="file">
                               <div className="Setprofile">
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
                <Field type="text" name="nickName" placeholder="Name"  />
                <ErrorMessage name="nickName" component="span" className="error" />
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

              <div className="field">
              <ErrorMessage name="bio" component="span" className="error" />
                <Field type="text" name="bio" placeholder="Bio" />
               
              </div>

              <div className="field button-container">
                <button type="submit">Update</button>
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

export default Editprofile;
