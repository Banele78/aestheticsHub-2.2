import React, { useState } from 'react'
import {Formik, Form, Field, ErrorMessage, validateYupSchema} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
function AddContent() {
  const [errorMessage, setErrorMessage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

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
   
    artPic: Yup.mixed().required('art picture is required'),
  });

  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    setFieldValue('artPic', file);

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
    formData.append('Artname', data.Artname);
    formData.append('artistType', data.artistType);
   
    formData.append('artPic', data.artPic);


    console.log("BAnele")
    try {
      const response = await axios.post('http://localhost:8080/api/post', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Post updated successfully!');
      resetForm();
      setImagePreview(null);
    } catch (error) {
      setErrorMessage('Failed to update profile. Please try again.');
      console.log(error)
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
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, setFieldValue)}
                />
                <ErrorMessage name="artPic" component="span" className="error" />
              </div>
              {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}

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
                <button type="submit">post</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      
    </div>
  )
}

export default AddContent
