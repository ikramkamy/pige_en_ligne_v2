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
  const [previousSelection, setPreviousSelection] = useState(Filterclasses.map((e) => e.Groupe_Id));

  const filteredClasses = Filterclasses.filter((item) =>
    item.Groupe_Lib.toLowerCase().startsWith(inputValue.toLowerCase())
  );

  // Set all options as selected by default
  useEffect(() => {
    const allIds = filteredClasses.map((item) => item.Groupe_Id);
    setSelectedItems(allIds);
    setFilterclasses && setFilterclasses(allIds, classes, secteurs, varieties, produits, marques, annonceurs);
  }, [Filterclasses]); // Run this effect when Filterclasses changes

  const handleSelectAll = (event) => {
    if (!event.target.checked) {
      setSelectedItems([]);
      setFilterclasses && setFilterclasses([], classes, secteurs, varieties, produits, marques, annonceurs);
    } else {
      const ids = filteredClasses.map((item) => item.Groupe_Id);
      setSelectedItems(ids);
      setFilterclasses && setFilterclasses(ids, classes, secteurs, varieties, produits, marques, annonceurs);
    }
  };

  const isAllSelected = selectedItems.length === filteredClasses.length;

  const handleAutocompleteChange = (event, value) => {
    setSelectedItems([...value.map((item) => item.Groupe_Id)]);
    const ids = value.map((e) => e.Groupe_Id);
    setFilterclasses && setFilterclasses(ids, classes, secteurs, varieties, produits, marques, annonceurs);
  };

  useEffect(() => {
    setPreviousSelection(Filterclassesids);
  }, [Filterclassesids]);

  const onInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  return (
    <FormControl sx={{ m: 1, width: "100%" }}>
      <div style={{ marginTop: 10 }}>
        <MenuItem onClick={handleSelectAll}>
          <Checkbox checked={isAllSelected} />
          <ListItemText primary="classes" />
        </MenuItem>
      </div>
      <InputLabel id="demo-multiple-checkbox-label"></InputLabel>

      <Autocomplete
        multiple
        freeSolo
        options={filteredClasses}
        value={Filterclasses.filter((item) => selectedItems.includes(item.Groupe_Id))}
        onChange={handleAutocompleteChange}
        getOptionLabel={(option) => option.Groupe_Lib}
        inputValue={inputValue}
        onInputChange={onInputChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label={`Classes (${selectedItems.length})`} 
            variant="outlined"
          />
        )}
        renderOption={(props, option) => (
          <MenuItem {...props} key={option.Groupe_Id} value={option.Groupe_Id}>
            <Checkbox checked={selectedItems.includes(option.Groupe_Id)} />
            <ListItemText primary={option.Groupe_Lib} />
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