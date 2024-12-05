import React, { useState } from 'react';
import './signup.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();
  const [tinNumber, setTinNumber] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [taxPayer, setTaxPayer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const roles = 'taxpayer';
    const { firstName, lastName, email, phoneNumber } = taxPayer; // Destructure values for clarity
    const tin = tinNumber;

    if (tin.trim().length !== 9 || tin.startsWith('0')) {
      setError('Invalid TIN number');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("https://ebm-backend-08f7bcc35417.herokuapp.com/users/register", {
        tin,
        email,
        firstName,
        lastName,
        roles,
        phoneNumber, // Include phoneNumber in registration
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Handle response
      if (response.status === 200) {
        setSuccess('Account Created Successfully');
        resetTaxPayer();
        navigate('/'); // Redirect after successful signup
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError("User already exists");
      } else {
        setError(error.message);
      }
      setLoading(false);
      resetTaxPayer();
    }
  };

  const resetTaxPayer = () => {
    setTaxPayer({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
    });
    setTinNumber(''); // Reset TIN number as well
  };

  return (
    <div className='signup__container'>
      <div className='signup__content'>
        <h2 className='signup__header'>Create Account</h2>
        {error && <p className='signup__error'>{error}</p>}
        {success && <p className='signup__success'>{success}</p>}
        <form className='signup__form' onSubmit={handleSubmit}>
          <label className='signup__label'>TIN Number</label>
          <input
            type='number'
            placeholder='Enter your TIN Number'
            className='signup__input'
            value={tinNumber}
            onChange={e => setTinNumber(e.target.value)}
          />
          <label className='signup__label'>First Name</label>
          <input
            type='text'
            className='signup__input'
            value={taxPayer.firstName}
            onChange={e => setTaxPayer({ ...taxPayer, firstName: e.target.value })}
            required
          />
          <label className='signup__label'>Last Name</label>
          <input
            type='text'
            className='signup__input'
            value={taxPayer.lastName}
            onChange={e => setTaxPayer({ ...taxPayer, lastName: e.target.value })}
            required
          />
          <label className='signup__label'>Email</label>
          <input
            type='email'
            className='signup__input'
            value={taxPayer.email}
            onChange={e => setTaxPayer({ ...taxPayer, email: e.target.value })}
            required
          />
          <label className='signup__label'>Phone Number</label>
          <input
            type='text'
            className='signup__input'
            value={taxPayer.phoneNumber}
            onChange={e => setTaxPayer({ ...taxPayer, phoneNumber: e.target.value })}
          />
          <button className='signup__btn' disabled={loading}>
            {loading ? 'Please wait...' : 'Sign Up'}
          </button>
          <Link to='/' className='signup__link'>Already Have an Account? Login</Link>
        </form>
      </div>
      <div className='signup__message'>
        <h1>EBM Application Portal</h1>
        <p>Let's Build Our Country Together</p>
      </div>
    </div>
  );
};

export default SignUp;
