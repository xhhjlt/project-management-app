import { Stack, Box } from '@mui/material';

import { BackButtonGroup } from 'components/board/BackButtonGroup';
import { TasksGrid } from 'components/board/TasksGrid';
import { TitleGroup } from 'components/board/TitleGroup';

export const Board = () => {
  return (
    <Box component="main" sx={{ height: 'calc(100% - 125px)', overflow: 'hidden' }}>
      <Stack spacing={3} padding={2} sx={{ height: '100%' }}>
        <BackButtonGroup />
        <TitleGroup />
        <TasksGrid />
      </Stack>
    </Box>
  );
};
