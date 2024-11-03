import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Container, Alert } from '@mui/material';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            // Parse response based on status
            if (response.ok) { // status is 200-299
                const data = await response.json();
                console.log("Response data:", data); // Debugging to see the exact response

                if (data.message) {
                    setMessage(data.message); // Success message from backend
                    setIsError(false);
                } else {
                    setMessage('Check your email for reset instructions.');
                    setIsError(false);
                }
            } else {
                const errorData = await response.json();
                console.log("Error data:", errorData); // Debugging to see the exact error response

                setMessage(errorData.message || 'An error occurred, please try again.');
                setIsError(true);
            }
        } catch (error) {
            setMessage('Check your email for reset instructions.');
                    setIsError(false);
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
                    Forgot Password
                </Typography>
                <TextField
                    type="email"
                    label="Email Address"
                    variant="outlined"
                    fullWidth
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" color="primary" type="submit" fullWidth>
                    Send Reset Link
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

export default ForgotPassword;
