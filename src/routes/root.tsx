import Box from '@mui/material/Box';
import Footer from 'components/footer/footer';
import Header from 'components/header/header';
import { Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Header />
      <Outlet />
      <Footer />
    </Box>
  );
}
