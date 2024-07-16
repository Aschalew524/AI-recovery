'use client'
import React, { useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  Avatar,
  Alert,
} from '@mui/material';
import { green } from '@mui/material/colors';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MoodIcon from '@mui/icons-material/Mood';
import NaturePeopleIcon from '@mui/icons-material/NaturePeople';

const DailyCheckIn = () => {
  const [progress, setProgress] = useState('');
  const [feeling, setFeeling] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckIn = async () => {
    if (!progress || !feeling) {
      setError('Both fields are required.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post('http://localhost:8000/api/checkin', {
        user_id: '6690b520c3501fb2363cf995', // Replace with dynamic user ID if necessary
        message: `Progress: ${progress}, Feeling: ${feeling}`,
      });
      setResponse(data.response);
    } catch (error) {
      console.error('Error during check-in:', error);
      setError('Failed to send check-in data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #a8e6cf 0%, #dcedc1 100%)',
        p: 2,
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 600,
          p: 3,
          backgroundColor: green[50],
          boxShadow: 5,
          borderRadius: 3,
          textAlign: 'center',
        }}
      >
        <CardContent>
          <Avatar
            sx={{
              bgcolor: green[700],
              width: 56,
              height: 56,
              margin: '0 auto',
              mb: 2,
            }}
          >
            <NaturePeopleIcon sx={{ color: 'white', fontSize: 32 }} />
          </Avatar>
          <Typography variant="h5" component="div" gutterBottom>
            Daily Check-in
          </Typography>
          <TextField
            label="Progress"
            value={progress}
            onChange={(e) => setProgress(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: <CheckCircleIcon sx={{ mr: 1, color: green[700] }} />,
            }}
            error={!!error && !progress}
            helperText={!!error && !progress ? 'Progress is required' : ''}
          />
          <TextField
            label="Feeling"
            value={feeling}
            onChange={(e) => setFeeling(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: <MoodIcon sx={{ mr: 1, color: green[700] }} />,
            }}
            error={!!error && !feeling}
            helperText={!!error && !feeling ? 'Feeling is required' : ''}
          />
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCheckIn}
              sx={{
                backgroundColor: green[700],
                '&:hover': {
                  backgroundColor: green[800],
                },
                width: '100%',
              }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Check In'}
            </Button>
          </Box>
          {response && (
            <Box sx={{ mt: 2, p: 2, backgroundColor: green[100], borderRadius: 2 }}>
              <Typography variant="body1" component="p">
                {response}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default DailyCheckIn;