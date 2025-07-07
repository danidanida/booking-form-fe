import React from 'react';
import { Box, Typography, Button } from '@mui/material';

export default function SubmissionSuccess({ bookingId, onReset }) {
    return (
        <Box
            component="div"
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.paper',
                zIndex: theme => theme.zIndex.modal,
            }}
        >
            <Box textAlign="center" px={2}>
                <Typography variant="h5" gutterBottom>
                    🎉 Form was submitted successfully!
                </Typography>
                <Typography variant="body1" mb={2}>
                    Your booking ID is <strong>#{bookingId}</strong>.
                </Typography>
                <Button variant="contained" onClick={onReset}>
                    Add More
                </Button>
            </Box>
        </Box>
    );
}
