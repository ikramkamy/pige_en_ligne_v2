import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { UseFiltersStore } from '../../store/dashboardStore/FiltersStore';
import { Autocomplete } from '@mui/material';
import { TextField } from '@mui/material';
import Alert from '@mui/material/Alert';

export default function MultipleSelectMarques() {
  const { Filtermarques, annonceurs, produits,
     setFiltermarque, Filtermarquesids } = UseFiltersStore((state) => state);
  const [inputValue, setInputValue] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [previousSelection, setPreviousSelection] = useState([]);

  // Filter brands based on input value
  const filteredElems =Filtermarques.filter((item) => {
    return item.Marque_Lib.toLowerCase().startsWith(inputValue.toLowerCase());
  });

  useEffect(() => {
    setPreviousSelection(Filtermarquesids);
  }, [Filtermarquesids]);

  const handleSelectAll = () => {
    if (selectedItems.length === filteredElems.length) {
      setSelectedItems([]);
      setFiltermarque && setFiltermarque([], annonceurs, produits);
    } else {
      setSelectedItems(filteredElems.map((item) => item.Marque_id));
      const ids = filteredElems.map((item) => item.Marque_id);
      setFiltermarque && setFiltermarque(ids, annonceurs, produits);
    }
  };

  const handleAutocompleteChange = (event, value) => {
    setSelectedItems([...value.map((item) => item.Marque_id)]);
    const ids = value.map((item) => item.Marque_id);
    setFiltermarque && setFiltermarque(ids, annonceurs, produits);
  };

  const onInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  const isAllSelected = selectedItems.length === filteredElems.length;

  return (
    <FormControl sx={{ m: 1, width: "100%" }}>
      {/* Custom Select All option */}
      <div style={{ marginTop: 10 }}>
        <MenuItem onClick={handleSelectAll}>
          <Checkbox checked={isAllSelected} />
          <ListItemText primary="marques" />
        </MenuItem>
      </div>
      <InputLabel id="demo-multiple-checkbox-label"></InputLabel>
      {/* {Filtermarquesids.length === 0 && <Alert severity="error" width="5px"
        sx={{ fontSize: "10px", padding: '0px' }}>
        aucune marque n'est sélectionnée
      </Alert>} */}
      <Autocomplete
        multiple
        freeSolo
        options={filteredElems}
        value={Filtermarques.filter((item) => previousSelection.includes(item.Marque_id))}
        onChange={handleAutocompleteChange}
        getOptionLabel={(option) => option.Marque_Lib}
        inputValue={inputValue}
        onInputChange={onInputChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label={`Marques (${previousSelection.length})`} 
           
            variant="outlined"
          />
        )}
        renderOption={(props, option) => (
          <MenuItem {...props} key={option.Marque_id} value={option.Marque_id}>
            <Checkbox defaultChecked checked={previousSelection.includes(option.Marque_id)} />
            <ListItemText primary={option.Marque_Lib} />
          </MenuItem>
        )}
        renderTags={(value, getTagProps) => null}
        disableCloseOnSelect
      />
    </FormControl>
  );
}