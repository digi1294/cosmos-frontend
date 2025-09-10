
import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  Paper,
  Divider
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Security,
  Email,
  Lock,
  VpnKey,
  Shield
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [showOtpStep, setShowOtpStep] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    return otp;
  };

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (email && password) {
        const otp = generateOTP();
        setShowOtpStep(true);
        setError('');
        console.log(`Generated OTP: ${otp}`); // In real app, this would be sent via SMS/email
      } else {
        setError('Invalid credentials');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (otpCode === generatedOtp) {
        navigate('/mgmt-dashboard-x7k9');
      } else {
        setError('Invalid OTP code');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        py: 4,
        fontFamily: '"Poppins", sans-serif'
      }}
    >
      <Container maxWidth="sm">
        <Box display="flex" flexDirection="column" alignItems="center">
          {/* Logo */}
          <Box mb={4} textAlign="center">
            <Box
              sx={{
                width: 80,
                height: 80,
                mb: 3,
                p: 2,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto'
              }}
            >
              <Shield sx={{ fontSize: 40, color: 'rgba(255, 255, 255, 0.9)' }} />
            </Box>
            <Typography variant="h5" sx={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 700, mb: 1 }}>
              Management Portal
            </Typography>
            <Typography variant="subtitle2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Authorized Access Only
            </Typography>
          </Box>

          <Card sx={{ 
            width: '100%', 
            maxWidth: 450, 
            boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
            backdropFilter: 'blur(10px)',
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: 3
          }}>
            <CardContent sx={{ p: 4 }}>
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              {!showOtpStep ? (
                <Box component="form" onSubmit={handleCredentialsSubmit}>
                  <Typography 
                    variant="h6" 
                    gutterBottom 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      fontWeight: 600,
                      color: '#1f2937',
                      mb: 3
                    }}
                  >
                    <Lock sx={{ mr: 1, color: '#1e40af' }} />
                    Administrator Access
                  </Typography>
                  
                  <TextField
                    fullWidth
                    label="Admin Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="admin@company.com"
                    sx={{ mb: 3 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email sx={{ color: '#6b7280' }} />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Admin Password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="admin123"
                    sx={{ mb: 4 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: '#6b7280' }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={isLoading}
                    sx={{ 
                      mb: 2,
                      background: 'linear-gradient(45deg, #1e40af, #3b82f6)',
                      fontWeight: 600,
                      py: 1.5
                    }}
                  >
                    {isLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Generate OTP'}
                  </Button>

                  {/* Demo Credentials */}
                  <Paper sx={{ p: 2, mb: 2, backgroundColor: '#f0f9ff', border: '1px solid #0ea5e9' }}>
                    <Typography variant="body2" sx={{ color: '#0c4a6e', fontWeight: 500, textAlign: 'center' }}>
                      Demo Admin Credentials
                    </Typography>
                    <Typography variant="caption" display="block" sx={{ color: '#64748b', textAlign: 'center', mt: 1 }}>
                      Email: admin@company.com | Password: admin123
                    </Typography>
                  </Paper>
                </Box>
              ) : (
                <Box component="form" onSubmit={handleOtpSubmit}>
                  <Typography 
                    variant="h6" 
                    gutterBottom 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      fontWeight: 600,
                      color: '#1f2937',
                      mb: 2
                    }}
                  >
                    <VpnKey sx={{ mr: 1, color: '#1e40af' }} />
                    OTP Verification
                  </Typography>
                  
                  <Paper sx={{ p: 3, mb: 3, backgroundColor: '#f0f9ff', border: '1px solid #0ea5e9' }}>
                    <Typography variant="body2" sx={{ color: '#0c4a6e', textAlign: 'center', fontWeight: 500 }}>
                      Generated OTP Number: <strong style={{ fontSize: '1.2em', color: '#1e40af' }}>{generatedOtp}</strong>
                    </Typography>
                    <Typography variant="caption" display="block" sx={{ color: '#64748b', textAlign: 'center', mt: 1 }}>
                      Use this 6-digit code for access verification
                    </Typography>
                  </Paper>

                  <TextField
                    fullWidth
                    label="Enter OTP Code"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    required
                    placeholder="Enter 6-digit OTP"
                    sx={{ mb: 4 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <VpnKey sx={{ color: '#6b7280' }} />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Box display="flex" gap={2}>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setShowOtpStep(false);
                        setOtpCode('');
                        setGeneratedOtp('');
                      }}
                      fullWidth
                      sx={{ fontWeight: 500 }}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      disabled={isLoading || otpCode.length !== 6}
                      sx={{
                        background: 'linear-gradient(45deg, #1e40af, #3b82f6)',
                        fontWeight: 600
                      }}
                    >
                      {isLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Verify & Access'}
                    </Button>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Security Notice */}
          <Box mt={4} textAlign="center">
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                fontWeight: 500
              }}
            >
              <strong>SECURITY NOTICE:</strong> This is a restricted management interface.
              All access attempts are logged and monitored.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AdminLogin;
