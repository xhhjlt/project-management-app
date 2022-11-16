import Box from '@mui/material/Box';
import Footer from 'components/footer/footer';
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
      <header>header</header>
      <Outlet />
      <Footer />
    </Box>
  );
}
