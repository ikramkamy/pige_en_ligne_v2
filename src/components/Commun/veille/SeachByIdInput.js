import React from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { UseVeilleStore } from 'store/dashboardStore/VeilleMediaStore';
export default function SimpleTextInput({ value }) {
  const { getIDFromInput, ID_message } = UseVeilleStore((state) => state)
  const handelchange = (event) => {
    //console.log(event.target.value)
    getIDFromInput && getIDFromInput(event.target.value)
  }
 
  return (
    <FormControl sx={{ m: 1, width: "100%", }}>
      <MenuItem >
        <Checkbox defaultChecked />
        <ListItemText primary="Message ID" />
      </MenuItem>
      <TextField
        variant="outlined"
        value={ID_message}
        onChange={(e) => handelchange(e)}
        sx={{
          height: "30px", padding: "-10px",

          '& css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
            padding: "7.5px 14px"
          }
        }}
        label="Message ID"
      />
    </FormControl>
  );
}