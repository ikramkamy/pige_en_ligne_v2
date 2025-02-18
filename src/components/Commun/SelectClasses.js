import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Checkbox, ListItemText, TextField, Autocomplete } from '@mui/material';
import { UseFiltersStore } from '../../store/dashboardStore/FiltersStore';
import Alert from '@mui/material/Alert';
import InputAdornment from '@mui/material/InputAdornment';
import { Chip } from '@mui/material';

const MultipleSelectClasses = () => {
  const { Filterclasses, setFilterclasses, classes, secteurs, varieties, produits, marques, annonceurs, Filterclassesids } = UseFiltersStore((state) => state);
  const [inputValue, setInputValue] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [previousSelection, setPreviousSelection] = useState(Filterclasses.map((e) => e.Classe_Id));
//Classe_Lib est devenu Classe_Lib
const filteredClasses = Filterclasses.filter((item) =>
    item.Classe_Lib.toLowerCase().startsWith(inputValue.toLowerCase())
  );

  // Set all options as selected by default
  useEffect(() => {
    const allIds = filteredClasses.map((item) => item.Classe_Id);
    setSelectedItems(allIds);
    setFilterclasses && setFilterclasses(allIds, classes, 
      secteurs, varieties, produits, marques, annonceurs);
  }, [Filterclasses]); // Run this effect when Filterclasses changes

  const handleSelectAll = (event) => {
    if (!event.target.checked) {
      setSelectedItems([]);
      setFilterclasses && setFilterclasses([], classes, secteurs, 
        varieties, produits, marques, annonceurs);
    } else {
      const ids = filteredClasses.map((item) => item.Classe_Id);
      setSelectedItems(ids);
      setFilterclasses && setFilterclasses(ids, classes, secteurs, varieties, 
        produits, marques, annonceurs);
    }
  };

  const isAllSelected = selectedItems.length === filteredClasses.length;

  const handleAutocompleteChange = (event, value) => {
    setSelectedItems([...value.map((item) => item.Classe_Id)]);
    const ids = value.map((e) => e.Classe_Id);
    setFilterclasses && setFilterclasses(ids, classes, secteurs, varieties,
       produits, marques, annonceurs);
  };

  useEffect(() => {
    setPreviousSelection(Filterclassesids);
  }, [Filterclassesids]);

  const onInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  return (
    <FormControl sx={{ m: 1, width: "100%" }}>
        <MenuItem onClick={handleSelectAll}>
          <Checkbox checked={isAllSelected} />
          <ListItemText primary="classes" />
        </MenuItem>
     
      <InputLabel id="demo-multiple-checkbox-label"></InputLabel>

      <Autocomplete
      sx={{height:"40px"}}
        multiple
        freeSolo
        options={filteredClasses}
        value={Filterclasses.filter((item) => selectedItems.includes(item.Classe_Id))}
        onChange={handleAutocompleteChange}
        getOptionLabel={(option) => option.Classe_Lib}
        inputValue={inputValue}
        onInputChange={onInputChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label={`classes (${selectedItems.length})`} 
            variant="outlined"
          />
        )}
        renderOption={(props, option) => (
          <MenuItem {...props} key={option.Classe_Id} value={option.Classe_Id}>
            <Checkbox checked={selectedItems.includes(option.Classe_Id)} />
            <ListItemText primary={option.Classe_Lib} />
          </MenuItem>
        )}
        renderTags={(value, getTagProps) => null} 
        onClose={() => {}}
        disableCloseOnSelect
      />
    </FormControl>
  );
};

export default MultipleSelectClasses;