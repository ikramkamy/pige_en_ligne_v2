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
import "./commun.css";
export default function MultipleSelectMarques() {
  const { Filtermarques, annonceurs, produits,
     setFiltermarque, Filtermarquesids } = UseFiltersStore((state) => state);
     //console.log("Filtermarques",Filtermarques[3],"Filtermarquesids",Filtermarquesids)
  const [inputValue, setInputValue] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [previousSelection, setPreviousSelection] = useState([]);

  // Filter brands based on input value
  const filteredElems =Filtermarques.filter((item) => {
    return item.Marque_Lib.toLowerCase().startsWith(inputValue.toLowerCase());
  });

  useEffect(() => {
    setPreviousSelection(Filtermarquesids);
    setSelectedItems(Filtermarquesids)
  }, [Filtermarquesids]);

  const handleSelectAll = () => {
    if (selectedItems.length === filteredElems.length) {
      setSelectedItems([]);
      setFiltermarque && setFiltermarque([], annonceurs, produits);
    } else {
      setSelectedItems(filteredElems.map((item) => item.Marque_Id));
      const ids = filteredElems.map((item) => item.Marque_Id);
      setFiltermarque && setFiltermarque(ids, annonceurs, produits);
    }
  };

  const handleAutocompleteChange = (event, value) => {
    setSelectedItems([...value.map((item) => item.Marque_Id)]);
    const ids = value.map((item) => item.Marque_Id);
    setFiltermarque && setFiltermarque(ids, annonceurs, produits);
  };

  const onInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  const isAllSelected = previousSelection.length === Filtermarquesids.length;

  return (
    <FormControl sx={{ m: 1, width: "100%" }}>
        <MenuItem onClick={handleSelectAll}>
          <Checkbox checked={isAllSelected} />
          <ListItemText primary="marques" />
        </MenuItem>
    
      <InputLabel id="demo-multiple-checkbox-label"></InputLabel>
      <Autocomplete
      sx={{height:"40px"}}
        multiple
        freeSolo
        options={filteredElems}
        value={Filtermarques.filter((item) => previousSelection.includes(item.Marque_Id))}
        onChange={handleAutocompleteChange}
        getOptionLabel={(option) => option.Marque_Lib}
        inputValue={inputValue}
        onInputChange={onInputChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label={`marques (${previousSelection.length})`} 
           
            variant="outlined"
          />
        )}
        renderOption={(props, option) => (
          <MenuItem {...props} key={option.Marque_Id} value={option.Marque_Id}>
            <Checkbox checked={previousSelection.includes(option.Marque_Id)} />
            <ListItemText primary={option.Marque_Lib} />
          </MenuItem>
        )}
        renderTags={(value, getTagProps) => null}
        disableCloseOnSelect
      />
    </FormControl>
  );
}