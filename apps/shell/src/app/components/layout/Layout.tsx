import { ReactNode, Suspense } from 'react';
import { Box } from '@mui/material';
import React from 'react';

export interface LayoutProps {
  children: ReactNode;
}

const HeaderModule = React.lazy(() => import('header/Module'));

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Suspense fallback={<div>Loading Header...</div>}>
        <HeaderModule />
      </Suspense>

      <Box
        component="main"
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
