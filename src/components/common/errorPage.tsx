import { Container, Link, Typography } from '@mui/material';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { AppRoutes } from 'types/routes';
import { useNavigate } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <Container>
      <Typography component="h1" variant="h3">
        Oops!
      </Typography>
      <Typography variant="h5">Sorry, an unexpected error has occurred.</Typography>
      {isRouteErrorResponse(error) && (
        <Typography variant="h5">{`Error ${error.status}: ${error.statusText}`}</Typography>
      )}
      <Link
        variant="h5"
        href={AppRoutes.Welcome}
        onClick={(e) => {
          e.preventDefault();
          navigate(AppRoutes.Welcome);
        }}
      >
        Go to Welcome page
      </Link>
    </Container>
  );
}
