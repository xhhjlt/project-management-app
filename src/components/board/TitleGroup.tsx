import { Stack, Typography, useTheme } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { useParams } from 'react-router-dom';
import { useBoardByIdQuery } from 'services/api/boards';

export const TitleGroup = () => {
  const theme = useTheme();
  const { id } = useParams();
  const { data } = useBoardByIdQuery(id as string);

  return (
    <Stack direction="row" alignItems={'center'}>
      <Typography
        variant="h4"
        sx={{
          color:
            theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.grey[900],
          p: '0.5rem 1rem',
          '&:focus': {
            outline: `2px solid #bdbdbd`,
            borderRadius: '4px',
          },
        }}
      >
        {data?.title}
      </Typography>
      <div>
        <Checkbox
          icon={<StarBorderIcon />}
          checkedIcon={<StarIcon />}
          sx={{
            '&.Mui-checked': {
              color: '#faaf00',
            },
          }}
        />
      </div>
    </Stack>
  );
};
