import { Stack, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { ChangeEvent, useState } from 'react';

export const TitleGroup = () => {
  const [value, setValue] = useState('Board Title');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

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
        onChange={handleChange}
      >
        {value}
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
