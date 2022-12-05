import { Stack, Typography, Button, useTheme } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { currentLanguage } from 'components/header/langSlice';
import { useState, useRef } from 'react';

const titleStyles = {
  fontWeight: 600,
  cursor: 'pointer',
  wordBreak: 'break-word',
};

type ColumnTitleProps = {
  value: string | undefined;
  onChange: (s: string | undefined) => void;
};

export const ColumnTitle = ({ value, onChange }: ColumnTitleProps) => {
  const theme = useTheme();
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const language = useAppSelector(currentLanguage);

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
        sx={{
          ...titleStyles,
          color: theme.palette.mode === 'dark' ? theme.palette.grey[400] : theme.palette.grey[900],
          '&:focus': {
            outline: `2px solid #bdbdbd`,
            borderRadius: '4px',
            p: '0 0.5rem',
            backgroundColor:
              theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.common.white,
          },
        }}
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
            {language === 'EN' ? 'Save' : 'Сохранить'}
          </Button>
          <Button size="small" color="neutral" variant="contained" onClick={handleFocusLoose}>
            {language === 'EN' ? 'Cancel' : 'Отмена'}
          </Button>
        </Stack>
      )}
    </Stack>
  );
};
