import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { GitHub } from '@mui/icons-material';

export default function Footer() {
  return (
    <>
      <CssBaseline />
      <Box
        component="footer"
        sx={{
          py: 2,
          px: 1,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
        }}
      >
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
          }}
        >
          <img src={process.env.PUBLIC_URL + '/rs_school_js.svg'} height="20px" />
          <Typography
            variant="body1"
            sx={{
              display: 'flex',
              gap: 2,
            }}
          >
            <Link
              color="inherit"
              href="https://github.com/pdlmn"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
              }}
            >
              <GitHub sx={{ mt: '-5px' }} />
              <Box>Eldar</Box>
            </Link>
            <Link
              color="inherit"
              href="https://github.com/Milena-Belianova"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
              }}
            >
              <GitHub sx={{ mt: '-5px' }} />
              <Box>Milena</Box>
            </Link>
            <Link
              color="inherit"
              href="https://github.com/xhhjlt"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
              }}
            >
              <GitHub sx={{ mt: '-5px' }} />
              <Box>Alexander</Box>
            </Link>
          </Typography>
          <Typography variant="body1">© 2022</Typography>
        </Container>
      </Box>
    </>
  );
}
