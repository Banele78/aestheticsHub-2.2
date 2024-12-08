import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function Editprofile() {
  const [errorMessage, setErrorMessage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const artistTypeOptions = [
    { value: '', label: 'Select Artist Type' },
    { value: 'painter', label: 'Painter' },
    { value: 'musician', label: 'Musician' },
    { value: 'sculptor', label: 'Sculptor' },
  ];

  const initialValues = {
    nickName: '',
    artistType: '',
    bio: '',
    profilePic: null,
  };

  const validationSchema = Yup.object().shape({
    nickName: Yup.string().required('Nickname is required'),
    artistType: Yup.string().required('Please select an artist type'),
    bio: Yup.string().required('Bio is required'),
    profilePic: Yup.mixed().required('Profile picture is required'),
  });

  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    setFieldValue('profilePic', file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data, { resetForm }) => {
    const formData = new FormData();
    formData.append('nickName', data.nickName);
    formData.append('artistType', data.artistType);
    formData.append('bio', data.bio);
    formData.append('profilePic', data.profilePic);

    try {
      const response = await axios.post('http://localhost:8080/api/createProfile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Profile updated successfully!');
      resetForm();
      setImagePreview(null);
    } catch (error) {
      setErrorMessage('Failed to update profile. Please try again.');
    }
  };

  return (
    <div>
      <div className="nav">
        <img src="Group 20.png" className="logo" alt="Logo" />
      </div>

      <div className="bd sign">
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          {({ setFieldValue }) => (
            <Form>
              <div className="field">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, setFieldValue)}
                />
                <ErrorMessage name="profilePic" component="span" className="error" />
              </div>
              {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}

              <div className="field">
                <Field type="text" name="nickName" placeholder="Name" />
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
                <Field type="text" name="bio" placeholder="Bio" />
                <ErrorMessage name="bio" component="span" className="error" />
              </div>

              <div className="field button-container">
                <button type="submit">Update Profile</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Editprofile;
