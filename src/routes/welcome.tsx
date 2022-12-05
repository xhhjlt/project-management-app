import { Build, Done, FavoriteBorder, MoneyOff } from '@mui/icons-material';
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import Sasha from './sasha.jpg';
import React from 'react';

const WelcomeSection = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={{
      py: 8,
    }}
  >
    {children}
  </Box>
);

const HeroListItem = ({
  primary,
  secondary,
  icon,
}: {
  primary: string;
  secondary: string;
  icon: React.ReactNode;
}) => (
  <ListItem>
    <ListItemAvatar>{icon}</ListItemAvatar>
    <ListItemText
      primary={primary}
      secondary={secondary}
      primaryTypographyProps={{ fontSize: 20 }}
    />
  </ListItem>
);

const Hero = () => {
  return (
    <WelcomeSection>
      <Stack direction="row" spacing={1}>
        <Stack justifyContent="center">
          <Typography variant="h2" sx={{ fontSize: 50 }}>
            I&apos;ll do it tomorrow! is a better way to organize teams.
          </Typography>
          <List
            sx={{
              py: 3,
            }}
          >
            <HeroListItem
              primary="Organisation powerhouse"
              secondary="All the tools necessary for the modern team organisation."
              icon={<Build />}
            />
            <HeroListItem
              primary="Free and open source"
              secondary="No payment needed. Just sign up and enjoy!"
              icon={<MoneyOff />}
            />
            <HeroListItem
              primary="Made with love"
              secondary="This app was made for amazing community driven programming school RSSchool."
              icon={<FavoriteBorder />}
            />
          </List>
        </Stack>
        <Box
          sx={{
            width: 600,
            px: 3,
            borderRadius: 3,
          }}
        >
          <Box
            component="img"
            sx={{
              my: 2,
              width: '100%',
            }}
            src={`${process.env.PUBLIC_URL}/sloth.png`}
          ></Box>
        </Box>
      </Stack>
    </WelcomeSection>
  );
};

export default function Welcome() {
  return (
    <Container>
      <Hero />
    </Container>
  );
}
