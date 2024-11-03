import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Container, Alert } from '@mui/material';

const ResetPassword = () => {
  const { token } = useParams(); // token from URL
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate(); // use useNavigate instead of useHistory

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords don't match");
      setIsError(true);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/auth/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      setMessage(data.message || 'Password reset successfully');
      setIsError(false);
      navigate('/login'); // redirect to login after reset
    } catch (error) {
      setMessage('An error occurred, please try again.');
      setIsError(true);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: 'white',
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Reset Password
        </Typography>
        <TextField
          type="password"
          label="New Password"
          variant="outlined"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          type="password"
          label="Confirm New Password"
          variant="outlined"
          fullWidth
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Reset Password
        </Button>
        {message && (
          <Alert severity={isError ? 'error' : 'success'} sx={{ mt: 2 }}>
            {message}
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default ResetPassword;
