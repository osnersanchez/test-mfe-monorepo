import { ReactNode } from 'react';
import Header from '../header/Header';
import { Box } from '@mui/material';

export interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'auto'
      }}
    >
      <Header />
      <Box
        component='main'
        sx={{
          display: 'flex',
          maxWidth: '1215px',
          flex: 1,
          marginTop: '20px',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
