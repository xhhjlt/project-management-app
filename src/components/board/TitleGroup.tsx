import { Stack, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

export const TitleGroup = () => {
  return (
    <Stack direction="row" alignItems={'center'}>
      <Typography
        variant="h4"
        sx={{
          color: '#212121',
          cursor: 'pointer',
          p: '0.5rem 1rem',
          '&:focus': {
            outline: `2px solid #bdbdbd`,
            borderRadius: '4px',
          },
        }}
        suppressContentEditableWarning={true}
        contentEditable={true}
        onInput={(e) => console.log('e: ', e.currentTarget.textContent)}
      >
        Board Title
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
