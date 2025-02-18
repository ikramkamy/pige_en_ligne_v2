import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { UseFiltersStore } from '../../store/dashboardStore/FiltersStore';
import { Autocomplete } from '@mui/material';
import { TextField } from '@mui/material';
import "./commun.css"

export default function MultipleSelectAnnonceurs() {
  const { Filterannonceurs, marques, produits, setFilterannonceur, Filterannonceursids ,annonceurs} = UseFiltersStore((state) => state);
  const [inputValue, setInputValue] = useState('');
  const [previousSelection, setPreviousSelection] = useState(Filterannonceursids);
  const [selectedItems, setSelectedItems] = useState(Filterannonceursids);
  // console.log('selectedItems source',Filterannonceursids)
  
  useEffect(() => {
    // console.log('selectedItems 1',selectedItems)
  }, [selectedItems]);


 const filteredElems =Filterannonceurs.filter((item) => {
    return item.Annonceur_Lib.toLowerCase().startsWith(inputValue.toLowerCase());
  });

  useEffect(() => {
    setPreviousSelection(Filterannonceursids);
    setSelectedItems(Filterannonceursids);
  },[Filterannonceursids]);

  const handleSelectAll = () => {
    if (selectedItems.length === filteredElems.length) {
      setSelectedItems([]);
      setFilterannonceur && setFilterannonceur([], marques, produits);
    } else {
      setSelectedItems(filteredElems.map((item) => item.Annonceur_Id));
      const ids = filteredElems.map((item) => item.Annonceur_Id);
      setFilterannonceur && setFilterannonceur(ids, marques, produits);
    }
  };
  
  const handleAutocompleteChange = (event, value) => {
    setSelectedItems([...value.map((item) => item.Annonceur_Id)]);
    const ids = value.map((item) => item.Annonceur_Id);
    setFilterannonceur && setFilterannonceur(ids, marques, produits);
  };

  const onInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };
  const isAllSelected = previousSelection.length == filteredElems.length;
  return (
    <FormControl sx={{ m: 1, width: "100%" }}>
      
        <MenuItem onClick={handleSelectAll}>
          <Checkbox checked={isAllSelected} />
          <ListItemText primary="annonceurs" />
        </MenuItem>
     
      <InputLabel id="demo-multiple-checkbox-label"></InputLabel>
      <Autocomplete
      sx={{height:"40px"}}
        multiple
        freeSolo
        options={filteredElems}
        value={Filterannonceurs.filter((item) =>previousSelection.includes(item.Annonceur_Id))}
        onChange={handleAutocompleteChange}
        getOptionLabel={(option) => option.Annonceur_Lib}
        inputValue={inputValue}
        onInputChange={onInputChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label={`annonceurs (${previousSelection.length})`}
            variant="outlined"
          />
        )}
        renderOption={(props, option) => (
          <MenuItem {...props} key={option.Annonceur_Id} value={option.Annonceur_Id}>
            <Checkbox defaultChecked checked={previousSelection.includes(option.Annonceur_Id)} />
            <ListItemText primary={option.Annonceur_Lib} />
          </MenuItem>
        )}
        renderTags={(value, getTagProps) => null}
        disableCloseOnSelect
      />
    </FormControl>
  );
}