import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { UseFiltersStore, setFiltersupports } from '../../store/dashboardStore/FiltersStore';
import { Autocomplete } from '@mui/material';
import { TextField } from '@mui/material';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelectSupports() {
  const { supports, Filtersupports, setFiltersupports } = UseFiltersStore((state) => state);
  const [inputValue, setInputValue] = React.useState('');
  const [selectedItems, setSelectedItems] = React.useState(supports.map((item) => item.support_id));
  const filteredElems = supports.filter((item) => {
    return item.support_name.toLowerCase().startsWith(inputValue.toLowerCase());
  });

  const handleSelectAll = () => {
    if (selectedItems.length === filteredElems.length) {
      setSelectedItems([]);
      setFiltersupports && setFiltersupports([]);
    } else {
      setSelectedItems(filteredElems.map((item) => item.support_id));
      setFiltersupports && setFiltersupports(filteredElems.map((item) => item.support_id));
    }
  };

  const handleAutocompleteChange = (event, value) => {
    setSelectedItems([...value.map((item) => item.support_id)]);
    const listOfIdsSelected = value.map((e) => e.support_id);
    setFiltersupports && setFiltersupports(listOfIdsSelected);
  };

  const onInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  const isAllSelected = selectedItems.length === filteredElems.length;

  return (
    <FormControl sx={{ m: 1, width: "100%", }}>
      {/* Custom Select All option */}
      <div style={{ marginTop: 10 }}>
        <MenuItem onClick={handleSelectAll}>
          <Checkbox checked={isAllSelected} />
          <ListItemText primary="supports" />
        </MenuItem>
      </div>
      <InputLabel id="demo-multiple-checkbox-label"></InputLabel>

      <Autocomplete
     
        multiple
        freeSolo
        options={filteredElems}
        value={supports.filter((item) =>  selectedItems.includes(item.support_id))}
        onChange={handleAutocompleteChange}
        getOptionLabel={(option) => option.support_name}
        inputValue={inputValue}
        onInputChange={onInputChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label={`supports (${Filtersupports.length})`} 
            variant="outlined"
          />
        )}
        renderOption={(props, option) => (
          <MenuItem {...props} key={option.support_name} value={option.support_id}>
            <Checkbox  defaultChecked checked={selectedItems.includes(option.support_id)} />
            <ListItemText primary={option.support_name} />
          </MenuItem>
        )}
        renderTags={(value, getTagProps) => null}
        disableCloseOnSelect
      />
    </FormControl>
  );
}