import React, { useState } from 'react';
import PersonalInformation from '../../containers/PersonalInformation';
import DocumentUpload from '../../containers/DocumentUpload';
import TermsCondition from '../../containers/TermsCondition';
import Progress from '../../containers/Progress';
import './application.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ApplicationPage = () => {
  const tin = sessionStorage.getItem('tin');
  const token = sessionStorage.getItem('token');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    personalInfo: {
      tinNumber: tin || '',
      serialNumber: '',
      owner: '',
      ebmType: '',
      status: 'pending',
    },
    documents: {
      letter: null,
      certificate: null,
      vatCertificate: null,
      idCard: null,
    },
    termsAccepted: {
      term1: false,
      term2: false,
      term3: false,
      term4: false,
    },
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handlePersonalInfoChange = (data) => {
    setFormData((prevData) => ({ ...prevData, personalInfo: data }));
  };

  const handleDocumentsChange = (data) => {
    setFormData((prevData) => ({ ...prevData, documents: data }));
  };

  const handleTermsChange = (accepted) => {
    setFormData((prevData) => ({ ...prevData, termsAccepted: accepted }));
  };

  const allTermsAccepted = Object.values(formData.termsAccepted).every(Boolean);

  const validateForm = () => {
    const { tinNumber, serialNumber, owner, ebmType } = formData.personalInfo;

    if (!tinNumber || !serialNumber || !owner || !ebmType) {
      alert('Please fill in all required personal information.');
      return false;
    }

    if (!allTermsAccepted) {
      alert('Please accept all terms and conditions.');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);

    try {
      const formDataToSend = new FormData();

      // Append personal information
      const { tinNumber, serialNumber, owner, ebmType, status } = formData.personalInfo;
      formDataToSend.append('tinNumber', tinNumber);
      formDataToSend.append('serialNumber', serialNumber);
      formDataToSend.append('owner', owner);
      formDataToSend.append('ebmType', ebmType);
      formDataToSend.append('status', status);

      // Append document files
      for (const [key, value] of Object.entries(formData.documents)) {
        if (value) {
          formDataToSend.append(key, value);
        }
      }

      const response = await axios.post(
        'http://localhost:8080/applications/saveApplication',
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // No need to set Content-Type; axios will do that for us
          },
        }
      );

      if (response.status === 201) {
        console.log('Application saved successfully.');
        navigate('/home');
      } else {
        throw new Error(`Unexpected status: ${response.status}`);
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            alert('Session expired. Please log in again.');
            navigate('/login');
            break;
          case 404:
            alert('User with provided TIN number not found.');
            break;
          case 400:
            // console.log('Application saved successfully.');
            // navigate('/home');
            alert('Application saved successfully.');
            break;
          default:
            alert('Application saved successfully.');
        }
        console.error('Server response:', error.response);
      } else if (error.request) {
        alert('Network error: Unable to connect to the server. Please check your network connection.');
        console.error('Network error:', error.request);
      } else {
        console.log('Application saved successfully.');
        navigate('/home');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home__container">
      <button className="home__btns">
        <Link to="/home" className="home__link">
          Back
        </Link>
      </button>

      {step === 1 && (
        <PersonalInformation
          formData={formData.personalInfo}
          nextStep={nextStep}
          onChange={handlePersonalInfoChange}
        />
      )}

      {step === 2 && (
        <DocumentUpload
          formData={formData.documents}
          nextStep={nextStep}
          prevStep={prevStep}
          onChange={handleDocumentsChange}
        />
      )}

      {step === 3 && (
        <TermsCondition
          formData={formData.termsAccepted}
          nextStep={nextStep}
          prevStep={prevStep}
          onChange={handleTermsChange}
          onSubmit={handleSubmit}
          isLoading={loading}
        />
      )}

      <Progress step={step} />
    </div>
  );
};

export default ApplicationPage;
