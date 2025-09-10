

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
  Stepper,
  Step,
  StepLabel,
  Alert,
  CircularProgress,
  Divider,
  Link,
  Paper
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Security,
  Email,
  Lock,
  Smartphone,
  VpnKey,
  History
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import QRCode from 'qrcode';

interface LoginLog {
  id: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  status: 'success' | 'failed';
  step: string;
}

const Login = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authenticatorCode, setAuthenticatorCode] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginLogs, setLoginLogs] = useState<LoginLog[]>([]);
  const navigate = useNavigate();

  const steps = ['Credentials', 'Authenticator', 'OTP Verification'];

  useEffect(() => {
    // Load login logs from localStorage
    const savedLogs = localStorage.getItem('loginLogs');
    if (savedLogs) {
      setLoginLogs(JSON.parse(savedLogs));
    }

    // Generate QR code for authenticator setup
    generateQRCode();
  }, []);

  const generateQRCode = async () => {
    const secret = 'JBSWY3DPEHPK3PXP'; // In real app, this should be generated server-side
    const issuer = 'Secure Portal';
    const accountName = email || 'user@company.com';
    const otpAuthUrl = `otpauth://totp/${issuer}:${accountName}?secret=${secret}&issuer=${issuer}`;
    
    try {
      const qrCode = await QRCode.toDataURL(otpAuthUrl);
      setQrCodeUrl(qrCode);
    } catch (err) {
      console.error('Error generating QR code:', err);
    }
  };

  const addLoginLog = (step: string, status: 'success' | 'failed') => {
    const newLog: LoginLog = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ipAddress: '192.168.1.1', // Mock IP
      userAgent: navigator.userAgent,
      status,
      step
    };

    const updatedLogs = [newLog, ...loginLogs].slice(0, 10); // Keep only last 10 logs
    setLoginLogs(updatedLogs);
    localStorage.setItem('loginLogs', JSON.stringify(updatedLogs));
  };

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      if (email && password) {
        addLoginLog('Credentials', 'success');
        setActiveStep(1);
        generateQRCode();
      } else {
        addLoginLog('Credentials', 'failed');
        setError('Invalid credentials');
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleAuthenticatorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (authenticatorCode.length === 6) {
        addLoginLog('Authenticator', 'success');
        setActiveStep(2);
      } else {
        addLoginLog('Authenticator', 'failed');
        setError('Invalid authenticator code');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (otpCode.length === 6) {
        addLoginLog('OTP Verification', 'success');
        navigate('/Internal-Tool'); // Redirect to the business card analysis page
      } else {
        addLoginLog('OTP Verification', 'failed');
        setError('Invalid OTP code');
      }
      setIsLoading(false);
    }, 1000);
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #3b82f6 100%)',
        py: 4,
        fontFamily: '"Poppins", sans-serif'
      }}
    >
      <Container maxWidth="lg">
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
          {/* Main Login Form */}
          <Box flex={{ xs: 1, md: 2 }}>
            <Box display="flex" flexDirection="column" alignItems="center">
              {/* Logo */}
              <Box mb={4} textAlign="center">
                <Box
                  component="img"
                  src="/lovable-uploads/53420912-774b-4acd-8b64-48c2b13bdf00.png"
                  alt="Portal Logo"
                  sx={{
                    width: 120,
                    height: 120,
                    mb: 3,
                    p: 3,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid rgba(255, 255, 255, 0.2)'
                  }}
                />
                <Typography variant="subtitle1" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontFamily: '"Poppins", sans-serif' }}>
                  Secure Access Portal
                </Typography>
              </Box>

              <Card sx={{ 
                width: '100%', 
                maxWidth: 500, 
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                backdropFilter: 'blur(10px)',
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: 3
              }}>
                <CardContent sx={{ p: 4 }}>
                  {/* Stepper */}
                  <Stepper 
                    activeStep={activeStep} 
                    sx={{ 
                      mb: 4,
                      '& .MuiStepLabel-label': {
                        fontFamily: '"Poppins", sans-serif',
                        fontWeight: 500,
                        color: '#374151'
                      },
                      '& .MuiStepLabel-label.Mui-active': {
                        color: '#1e40af',
                        fontWeight: 600
                      }
                    }}
                  >
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>

                  {error && (
                    <Alert severity="error" sx={{ mb: 3, fontFamily: '"Poppins", sans-serif' }}>
                      {error}
                    </Alert>
                  )}

                  {/* Step 1: Credentials */}
                  {activeStep === 0 && (
                    <Box component="form" onSubmit={handleCredentialsSubmit}>
                      <Typography 
                        variant="h6" 
                        gutterBottom 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          fontFamily: '"Poppins", sans-serif',
                          fontWeight: 600,
                          color: '#1f2937'
                        }}
                      >
                        <Lock sx={{ mr: 1, color: '#1e40af' }} />
                        Sign In
                      </Typography>
                      
                      <TextField
                        fullWidth
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="demo@company.com"
                        sx={{ 
                          mb: 3,
                          '& .MuiInputLabel-root': {
                            fontFamily: '"Poppins", sans-serif',
                            color: '#6b7280'
                          },
                          '& .MuiOutlinedInput-root': {
                            fontFamily: '"Poppins", sans-serif',
                            '& fieldset': {
                              borderColor: '#d1d5db'
                            },
                            '&:hover fieldset': {
                              borderColor: '#1e40af'
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#1e40af'
                            }
                          }
                        }}
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
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="demo123"
                        sx={{ 
                          mb: 4,
                          '& .MuiInputLabel-root': {
                            fontFamily: '"Poppins", sans-serif',
                            color: '#6b7280'
                          },
                          '& .MuiOutlinedInput-root': {
                            fontFamily: '"Poppins", sans-serif',
                            '& fieldset': {
                              borderColor: '#d1d5db'
                            },
                            '&:hover fieldset': {
                              borderColor: '#1e40af'
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#1e40af'
                            }
                          }
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Lock sx={{ color: '#6b7280' }} />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <VisibilityOff sx={{ color: '#6b7280' }} /> : <Visibility sx={{ color: '#6b7280' }} />}
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
                          fontFamily: '"Poppins", sans-serif',
                          fontWeight: 600,
                          py: 1.5,
                          '&:hover': {
                            background: 'linear-gradient(45deg, #1e3a8a, #2563eb)'
                          }
                        }}
                      >
                        {isLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Continue'}
                      </Button>

                      {/* Demo Credentials */}
                      <Paper sx={{ p: 2, mb: 2, backgroundColor: '#f0f9ff', border: '1px solid #0ea5e9' }}>
                        <Typography variant="body2" sx={{ color: '#0c4a6e', fontFamily: '"Poppins", sans-serif', fontWeight: 500, textAlign: 'center' }}>
                          Demo Credentials
                        </Typography>
                        <Typography variant="caption" display="block" sx={{ color: '#64748b', fontFamily: '"Poppins", sans-serif', textAlign: 'center', mt: 1 }}>
                          Email: demo@company.com | Password: demo123
                        </Typography>
                      </Paper>
                    </Box>
                  )}

                  {/* Step 2: Authenticator */}
                  {activeStep === 1 && (
                    <Box component="form" onSubmit={handleAuthenticatorSubmit}>
                      <Typography 
                        variant="h6" 
                        gutterBottom 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          fontFamily: '"Poppins", sans-serif',
                          fontWeight: 600,
                          color: '#1f2937'
                        }}
                      >
                        <Security sx={{ mr: 1, color: '#1e40af' }} />
                        Authenticator Setup
                      </Typography>
                      
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          mb: 2, 
                          color: '#6b7280',
                          fontFamily: '"Poppins", sans-serif'
                        }}
                      >
                        Scan this QR code with your authenticator app or enter the code manually.
                      </Typography>

                      {qrCodeUrl && (
                        <Box textAlign="center" sx={{ mb: 3 }}>
                          <img src={qrCodeUrl} alt="QR Code" style={{ maxWidth: 200 }} />
                        </Box>
                      )}

                      <TextField
                        fullWidth
                        label="Authenticator Code"
                        value={authenticatorCode}
                        onChange={(e) => setAuthenticatorCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        required
                        placeholder="123456"
                        sx={{ 
                          mb: 4,
                          '& .MuiInputLabel-root': {
                            fontFamily: '"Poppins", sans-serif',
                            color: '#6b7280'
                          },
                          '& .MuiOutlinedInput-root': {
                            fontFamily: '"Poppins", sans-serif'
                          }
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Smartphone sx={{ color: '#6b7280' }} />
                            </InputAdornment>
                          ),
                        }}
                      />

                      <Box display="flex" gap={2}>
                        <Button
                          variant="outlined"
                          onClick={() => setActiveStep(0)}
                          fullWidth
                          sx={{
                            fontFamily: '"Poppins", sans-serif',
                            fontWeight: 500,
                            borderColor: '#d1d5db',
                            color: '#6b7280',
                            '&:hover': {
                              borderColor: '#9ca3af',
                              backgroundColor: '#f9fafb'
                            }
                          }}
                        >
                          Back
                        </Button>
                        <Button
                          type="submit"
                          variant="contained"
                          fullWidth
                          disabled={isLoading || authenticatorCode.length !== 6}
                          sx={{
                            background: 'linear-gradient(45deg, #1e40af, #3b82f6)',
                            fontFamily: '"Poppins", sans-serif',
                            fontWeight: 600,
                            '&:hover': {
                              background: 'linear-gradient(45deg, #1e3a8a, #2563eb)'
                            }
                          }}
                        >
                          {isLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Verify'}
                        </Button>
                      </Box>
                    </Box>
                  )}

                  {/* Step 3: OTP */}
                  {activeStep === 2 && (
                    <Box component="form" onSubmit={handleOtpSubmit}>
                      <Typography 
                        variant="h6" 
                        gutterBottom 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          fontFamily: '"Poppins", sans-serif',
                          fontWeight: 600,
                          color: '#1f2937'
                        }}
                      >
                        <VpnKey sx={{ mr: 1, color: '#1e40af' }} />
                        OTP Verification
                      </Typography>
                      
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          mb: 3, 
                          color: '#6b7280',
                          fontFamily: '"Poppins", sans-serif'
                        }}
                      >
                        Enter the 6-digit OTP code sent to {email}
                      </Typography>

                      <TextField
                        fullWidth
                        label="OTP Code"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        required
                        placeholder="123456"
                        sx={{ 
                          mb: 4,
                          '& .MuiInputLabel-root': {
                            fontFamily: '"Poppins", sans-serif',
                            color: '#6b7280'
                          },
                          '& .MuiOutlinedInput-root': {
                            fontFamily: '"Poppins", sans-serif'
                          }
                        }}
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
                          onClick={() => setActiveStep(1)}
                          fullWidth
                          sx={{
                            fontFamily: '"Poppins", sans-serif',
                            fontWeight: 500,
                            borderColor: '#d1d5db',
                            color: '#6b7280',
                            '&:hover': {
                              borderColor: '#9ca3af',
                              backgroundColor: '#f9fafb'
                            }
                          }}
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
                            fontFamily: '"Poppins", sans-serif',
                            fontWeight: 600,
                            '&:hover': {
                              background: 'linear-gradient(45deg, #1e3a8a, #2563eb)'
                            }
                          }}
                        >
                          {isLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Sign In'}
                        </Button>
                      </Box>
                    </Box>
                  )}
                </CardContent>
              </Card>

              {/* Footer */}
              <Box mt={4} textAlign="center">
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 2, 
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontFamily: '"Poppins", sans-serif'
                  }}
                >
                  <strong>INTERTOOL DISCLAIMER:</strong> This application is for authorized personnel only.
                  Unauthorized access is prohibited and may result in legal action.
                </Typography>
                <Box>
                  <Link href="#" sx={{ mx: 1, color: 'rgba(255, 255, 255, 0.7)', fontFamily: '"Poppins", sans-serif' }}>Privacy Policy</Link>
                  <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>•</span>
                  <Link href="#" sx={{ mx: 1, color: 'rgba(255, 255, 255, 0.7)', fontFamily: '"Poppins", sans-serif' }}>Terms of Service</Link>
                  <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>•</span>
                  <Link href="#" sx={{ mx: 1, color: 'rgba(255, 255, 255, 0.7)', fontFamily: '"Poppins", sans-serif' }}>Legal Notice</Link>
                  <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>•</span>
                  <Link href="#" sx={{ mx: 1, color: 'rgba(255, 255, 255, 0.7)', fontFamily: '"Poppins", sans-serif' }}>Compliance</Link>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Login Logs Sidebar */}
          <Box flex={{ xs: 1, md: 1 }}>
            <Paper sx={{ 
              p: 3, 
              height: 'fit-content',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: 3,
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}>
              <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  fontFamily: '"Poppins", sans-serif',
                  fontWeight: 600,
                  color: '#1f2937'
                }}
              >
                <History sx={{ mr: 1, color: '#1e40af' }} />
                Recent Access Logs
              </Typography>
              <Divider sx={{ mb: 2, borderColor: '#e5e7eb' }} />
              
              {loginLogs.length === 0 ? (
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#6b7280',
                    fontFamily: '"Poppins", sans-serif'
                  }}
                >
                  No recent activity
                </Typography>
              ) : (
                <Box>
                  {loginLogs.map((log) => (
                    <Box 
                      key={log.id} 
                      sx={{ 
                        mb: 2, 
                        p: 2, 
                        backgroundColor: log.status === 'success' ? '#f0fdf4' : '#fef2f2', 
                        borderRadius: 2,
                        border: `1px solid ${log.status === 'success' ? '#bbf7d0' : '#fecaca'}`
                      }}
                    >
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontWeight: 600,
                          color: '#1f2937',
                          fontFamily: '"Poppins", sans-serif'
                        }}
                      >
                        {log.step}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        display="block" 
                        sx={{ 
                          color: '#6b7280',
                          fontFamily: '"Poppins", sans-serif'
                        }}
                      >
                        {formatTimestamp(log.timestamp)}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        display="block" 
                        sx={{ 
                          color: log.status === 'success' ? '#059669' : '#dc2626',
                          fontWeight: 600,
                          fontFamily: '"Poppins", sans-serif'
                        }}
                      >
                        {log.status.toUpperCase()}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;

