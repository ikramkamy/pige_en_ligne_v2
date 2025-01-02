import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function ColorButtons({getData}) {
  return (
    <Stack direction="row" spacing={2}>
     
      <Button variant="contained" color="success" onClick={getData}>
       Apply
      </Button>
      <Button variant="outlined" color="error">
        Reset
      </Button>
    </Stack>
  );
}
