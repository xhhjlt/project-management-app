import Box from '@mui/material/Box';
import { DeleteConfirmationModal } from 'components/common/DeleteConfirmationModal';
import { ErrorBoundary } from 'components/common/errorBoundary';
import Footer from 'components/footer/footer';
import Header from 'components/header/header';
import { Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <ErrorBoundary>
        <DeleteConfirmationModal />
        <Header />
        <Outlet />
        <Footer />
      </ErrorBoundary>
    </Box>
  );
}
