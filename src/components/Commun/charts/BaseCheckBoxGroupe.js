import * as React from 'react';
import { pink ,green, blue, orange} from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';

// Define labels and their corresponding names
const checkboxes = [
    { label: 'Volume', name: 'volume', color: green[600], checkedColor: green[600] },
    { label: 'Budget', name: 'budget', color: blue[500], checkedColor: blue[500] },
    { label: 'Durée', name: 'durée', color: pink[800], checkedColor: pink[600] }, 
];

export default function ColorCheckboxes() {
  return (
    <div>
      {checkboxes.map((item, index) => (
        <React.Fragment key={index}>
          <Checkbox
            {...{
              ...label,
              inputProps: { 
                ...label.inputProps, 
                name: item.name, 
              },
            }}
            color={item.color ? 'default' : item.color} // Use 'default' for custom colors
            sx={{
              color: item.color || 'inherit', // Set custom color if provided
              '&.Mui-checked': {
                color: item.checkedColor || item.color, // Set checked color if provided
              },
            }}
          />
          <span style={{ marginLeft: 8 }}>{item.label}</span> {/* Display label */}
        </React.Fragment>
      ))}
    </div>
  );
}

// Shared label configuration
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };