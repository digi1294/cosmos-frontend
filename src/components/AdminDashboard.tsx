
import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Chip,
  Avatar,
  Container,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  InputAdornment
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  PersonAdd,
  Dashboard,
  People,
  Settings,
  Security,
  VpnKey
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'Admin' | 'User';
  status: 'Active' | 'Inactive';
  lastLogin: string;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1234567890', role: 'Admin', status: 'Active', lastLogin: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1987654321', role: 'User', status: 'Active', lastLogin: '2024-01-14' },
  ]);
  
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'User' as 'Admin' | 'User'
  });
  
  // OTP related state
  const [showOtpStep, setShowOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    console.log(`Generated OTP for admin verification: ${otp}`);
    return otp;
  };

  const hasExistingAdmin = () => {
    return users.some(user => user.role === 'Admin' && user.status === 'Active');
  };

  const handleSubmit = () => {
    setError('');
    
    // If editing user, proceed normally
    if (editingUser) {
      setUsers(users.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...formData, id: editingUser.id, status: editingUser.status, lastLogin: editingUser.lastLogin }
          : user
      ));
      handleClose();
      return;
    }

    // For new users, check if trying to add admin
    if (formData.role === 'Admin') {
      if (hasExistingAdmin()) {
        setError('Only one admin can exist in the system. Cannot add another admin.');
        return;
      }
      // Generate OTP for admin verification
      generateOTP();
      setShowOtpStep(true);
    } else {
      // For regular users, add directly
      const newUser: User = {
        id: Date.now(),
        ...formData,
        status: 'Active',
        lastLogin: new Date().toISOString().split('T')[0]
      };
      setUsers([...users, newUser]);
      handleClose();
    }
  };

  const handleOtpSubmit = async () => {
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (otpCode === generatedOtp) {
        const newUser: User = {
          id: Date.now(),
          ...formData,
          status: 'Active',
          lastLogin: new Date().toISOString().split('T')[0]
        };
        setUsers([...users, newUser]);
        handleClose();
      } else {
        setError('Invalid OTP code. Please try again.');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role
    });
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    const userToDelete = users.find(user => user.id === id);
    if (userToDelete?.role === 'Admin') {
      setError('Cannot delete admin user');
      return;
    }
    setUsers(users.filter(user => user.id !== id));
  };

  const handleClose = () => {
    setOpen(false);
    setEditingUser(null);
    setFormData({ name: '', email: '', phone: '', role: 'User' });
    setShowOtpStep(false);
    setOtpCode('');
    setGeneratedOtp('');
    setError('');
  };

  const handleLogout = () => {
    navigate('/secure-mgmt-portal-auth');
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#1f2937', mb: 1 }}>
            Management Dashboard
          </Typography>
          <Typography variant="body1" sx={{ color: '#6b7280' }}>
            Internal Tool Administration
          </Typography>
        </Box>
        <Button
          variant="outlined"
          onClick={handleLogout}
          sx={{ fontWeight: 600 }}
        >
          Logout
        </Button>
      </Box>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center">
              <Avatar sx={{ bgcolor: '#1e40af', mr: 2 }}>
                <People />
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {users.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Users
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center">
              <Avatar sx={{ bgcolor: '#059669', mr: 2 }}>
                <Security />
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {users.filter(u => u.status === 'Active').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Active Users
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center">
              <Avatar sx={{ bgcolor: '#d97706', mr: 2 }}>
                <Settings />
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {users.filter(u => u.role === 'Admin').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Administrators
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center">
              <Avatar sx={{ bgcolor: '#0284c7', mr: 2 }}>
                <Dashboard />
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  System
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Online
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </div>

      {/* User Management */}
      <Paper sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            User Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
            sx={{ 
              background: 'linear-gradient(45deg, #1e40af, #3b82f6)',
              fontWeight: 600
            }}
          >
            Add User
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Last Login</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <Chip 
                      label={user.role} 
                      color={user.role === 'Admin' ? 'primary' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={user.status} 
                      color={user.status === 'Active' ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell>
                    <IconButton 
                      onClick={() => handleEdit(user)}
                      sx={{ color: '#1e40af' }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      onClick={() => handleDelete(user.id)}
                      sx={{ color: '#dc2626' }}
                      disabled={user.role === 'Admin'}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add/Edit User Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 600 }}>
          {editingUser ? 'Edit User' : showOtpStep ? 'Admin Verification Required' : 'Add New User'}
        </DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {!showOtpStep ? (
            <>
              <TextField
                fullWidth
                label="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Role"
                select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as 'Admin' | 'User' })}
                margin="normal"
                SelectProps={{ native: true }}
                disabled={editingUser?.role === 'Admin' || (hasExistingAdmin() && !editingUser)}
              >
                <option value="User">User</option>
                <option value="Admin" disabled={hasExistingAdmin() && !editingUser}>
                  Admin {hasExistingAdmin() && !editingUser ? '(Only one admin allowed)' : ''}
                </option>
              </TextField>
            </>
          ) : (
            <>
              <Alert severity="info" sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Admin Verification Code: <strong style={{ fontSize: '1.1em' }}>{generatedOtp}</strong>
                </Typography>
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  Enter this 6-digit code to confirm admin creation
                </Typography>
              </Alert>

              <TextField
                fullWidth
                label="Enter Verification Code"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                required
                placeholder="Enter 6-digit code"
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VpnKey sx={{ color: '#6b7280' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {!showOtpStep ? (
            <Button 
              onClick={handleSubmit} 
              variant="contained"
              sx={{ 
                background: 'linear-gradient(45deg, #1e40af, #3b82f6)',
                fontWeight: 600
              }}
            >
              {editingUser ? 'Update' : formData.role === 'Admin' ? 'Verify Admin' : 'Add'} User
            </Button>
          ) : (
            <Button
              onClick={handleOtpSubmit}
              variant="contained"
              disabled={isLoading || otpCode.length !== 6}
              sx={{
                background: 'linear-gradient(45deg, #1e40af, #3b82f6)',
                fontWeight: 600
              }}
            >
              {isLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Create Admin'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard;
