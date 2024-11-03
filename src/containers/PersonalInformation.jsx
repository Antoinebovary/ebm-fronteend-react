import React, { useEffect, useState } from 'react';
import './global.css';
import axios from 'axios';

const PersonalInformation = ({ nextStep, onChange, formData }) => {
  const [formError, setFormError] = useState(false);

  useEffect(() => {
    const fetchTaxPayer = async () => {
      if (formData.tinNumber.trim().length !== 9 || formData.tinNumber.startsWith('0')) {
        onChange({ ...formData, email: '', names: '', phone: '' });
        return;
      }
      try {
        const response = await axios.get(`http://localhost:8080/taxPayer/findPayer/${formData.tinNumber}`);

        if (response.status === 200) {
          const data = response.data;
          onChange({
            ...formData,
            email: data.email,
            names: `${data.firstName} ${data.lastName}`,
            phone: data.phoneNumber,
          });
        } else {
          console.log('Something went wrong');
        }
      } catch (error) {
        console.error('Error fetching taxpayer:', error);
      }
    };
    fetchTaxPayer();
  }, [formData.tinNumber, onChange]);

  const validateForm = () => {
    const { owner, serialNumber, ebmType } = formData;
    if (!owner || !serialNumber || !ebmType) {
      setFormError(true);
      return false;
    }
    setFormError(false);
    return true;
  };

  const handleChange = (e) => {
    if (e.target.name === 'tinNumber' && isNaN(Number(e.target.value))) {
      return;
    }
    const { name, value } = e.target;
    onChange({ ...formData, [name]: value });
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    nextStep();
  };

  return (
    <div className="container">
      <h2 className="headers">TaxPayer Information</h2>

      <form className="form__data">
        {formError && <p>Please fill in all required fields.</p>}

        <label className="form__label">TIN Number:</label>
        <input
          type="number"
          name="tinNumber"
          value={formData.tinNumber}
          onChange={handleChange}
          className="form__input"
        />

        <label className="form__label">Company Name/Taxpayer:</label>
        <input
          type="text"
          name="names"
          value={formData.names}
          onChange={handleChange}
          className="form__input"
        />

        <label className="form__label">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form__input"
        />

        <label className="form__label">Phone Number:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="form__input"
        />

        <label className="form__label">EBM Type:</label>
        <select
          name="ebmType"
          value={formData.ebmType}
          onChange={handleChange}
          className="form__input"
        >
          <option value="">Select EBM Type</option>
          <option value="laptop">Laptop</option>
          <option value="desktop">Desktop</option>
          <option value="tablet">Tablet</option>
        </select>

        <label className="form__label">Owner:</label>
        <input
          type="text"
          name="owner"
          value={formData.owner}
          onChange={handleChange}
          className="form__input"
        />

        <label className="form__label">Serial Number:</label>
        <input
          type="text"
          name="serialNumber"
          value={formData.serialNumber}
          onChange={handleChange}
          className="form__input"
        />

        <button onClick={handleContinue} className="next__btn">
          Next
        </button>
      </form>
    </div>
  );
};

export default PersonalInformation;
