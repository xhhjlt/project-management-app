import { Stack, Typography, Button } from '@mui/material';
import { useState, useRef } from 'react';

const titleStyles = {
  fontWeight: 600,
  color: '#212121',
  cursor: 'pointer',
  wordBreak: 'break-word',
  '&:focus': {
    outline: `2px solid #bdbdbd`,
    backgroundColor: '#fff',
    borderRadius: '4px',
    p: '0 0.5rem',
  },
};

type ColumnTitleProps = {
  value: string | undefined;
  onChange: (s: string | undefined) => void;
};

export const ColumnTitle = ({ value, onChange }: ColumnTitleProps) => {
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const handleTitleInput = () => {
    setIsTitleEditing(true);
  };

  const handleFocusLoose = () => {
    setIsTitleEditing(false);
    ref.current!.textContent = value || null;
  };

  const handleSave = () => {
    onChange(ref?.current?.textContent === null ? undefined : ref?.current?.textContent);
    setIsTitleEditing(false);
    ref?.current?.blur();
  };

  return (
    <Stack>
      <Typography
        variant="h6"
        sx={titleStyles}
        suppressContentEditableWarning={true}
        contentEditable={true}
        onInput={handleTitleInput}
        onBlur={handleFocusLoose}
        ref={ref}
      >
        {value}
      </Typography>
      {isTitleEditing && (
        <Stack direction="row">
          <Button
            size="small"
            color="success"
            variant="contained"
            onClick={handleSave}
            onMouseDown={(event) => event.preventDefault()}
          >
            Save
          </Button>
          <Button size="small" color="neutral" variant="contained" onClick={handleFocusLoose}>
            Cancel
          </Button>
        </Stack>
      )}
    </Stack>
  );
};
