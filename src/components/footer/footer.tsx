import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { GitHub } from '@mui/icons-material';
import { useMediaQuery, useTheme } from '@mui/material';

export default function Footer() {
  const theme = useTheme();
  const matches = useMediaQuery('(max-width:400px)');
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 1,
        mt: 'auto',
        backgroundColor:
          theme.palette.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[900],
      }}
    >
      <CssBaseline />
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            display: 'flex',
            gap: 1,
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
            <GitHub />
            Eldar
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
            <GitHub />
            Milena
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
            <GitHub />
            Alexander
          </Link>
        </Typography>
        <Link href="https://rs.school/react/" sx={{ order: matches ? 0 : -1 }}>
          <img
            src={
              process.env.PUBLIC_URL + theme.palette.mode === 'light'
                ? '/rs_school_js.svg'
                : 'rs_school_js_white.svg'
            }
            height="20px"
          />
        </Link>
        <Typography variant="body1">© 2022</Typography>
      </Container>
    </Box>
  );
}
