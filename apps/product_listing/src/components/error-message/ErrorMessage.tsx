import { Typography, Box } from '@mui/material';

export interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <Box sx={{ textAlign: 'center', marginTop: 4 }}>
      <Typography variant='h6'>{message}</Typography>
    </Box>
  );
};

export default ErrorMessage;
