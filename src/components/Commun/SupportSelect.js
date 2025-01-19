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
import './commun.css';
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
  const {supports, Filtersupports, setFiltersupports } = UseFiltersStore((state) => state);
  const [inputValue, setInputValue] = React.useState('');
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [previousSelection, setPreviousSelection] = React.useState([]);


  React.useEffect(() => {  
    setSelectedItems(Filtersupports.map((e)=>e.Support_Id));
    setPreviousSelection(Filtersupports);
  }, [Filtersupports]);
  console.log("prev supports",previousSelection,Filtersupports)
  const filteredElems = supports.filter((item) => {
    return item.Support_Lib.toLowerCase().startsWith(inputValue.toLowerCase());
  });

  const handleSelectAll = () => {
    if (selectedItems.length === filteredElems.length) {
      setSelectedItems([]);
      setFiltersupports && setFiltersupports([]);
    } else {
      setSelectedItems(filteredElems.map((item) => item.Support_Id));
      setFiltersupports && setFiltersupports(filteredElems.map((item) => item.Support_Id));
    }
  };

  const handleAutocompleteChange = (event, value) => {
    setSelectedItems([...value.map((item) => item.Support_Id)]);
    const listOfIdsSelected = value.map((e) => e.Support_Id);
    setFiltersupports && setFiltersupports(listOfIdsSelected);
  };

  const onInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };
  const isAllSelected = previousSelection.length === filteredElems.length;

  return (
    <FormControl sx={{ m: 1, width: "100%"}}>
      {/* Custom Select All option */}
      <div style={{ marginTop: 10 }}>
        <MenuItem onClick={handleSelectAll}>
          <Checkbox checked={isAllSelected} />
          <ListItemText primary="supports" />
        </MenuItem>
      </div>
      <InputLabel id="demo-multiple-checkbox-label"></InputLabel>
      <Autocomplete 
      sx={{
          height:"40px"
      }}    
        multiple
        freeSolo
        options={filteredElems}
        value={supports.filter((item) =>  previousSelection.includes(item.Support_Id))}
        onChange={handleAutocompleteChange}
        getOptionLabel={(option) => option.Support_Lib}
        inputValue={inputValue}
        onInputChange={onInputChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label={`supports (${previousSelection.length})`} 
            variant="outlined"
            sx={{top:"-10px"}}
          />
        )}
        renderOption={(props, option) => (
          <MenuItem {...props} key={option.Support_Lib} value={option.Support_Id}>
            <Checkbox   checked={previousSelection.includes(option.Support_Id)} />
            <ListItemText primary={option.Support_Lib} />
          </MenuItem>
        )}
        renderTags={(value, getTagProps) => null}
        disableCloseOnSelect
      />
    </FormControl>
  );
}