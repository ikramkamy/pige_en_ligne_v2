import * as React from 'react';
import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Alert from '@mui/material/Alert';
import Checkbox from '@mui/material/Checkbox';
import { UseFiltersStore } from '../../store/dashboardStore/FiltersStore';
import { Autocomplete } from '@mui/material';
import { TextField } from '@mui/material';

export default function MultipleSelectSecteurs() {
  const { secteurs, Filtersecteurs, setFiltersecteur, varieties,
     produits, marques, annonceurs, Filtersecteursids } = UseFiltersStore((state) => state);
  const [inputValue, setInputValue] = React.useState('');
  const [selectedItems, setSelectedItems] = React.useState(Filtersecteursids);
  const [previousSelection, setPreviousSelection] = useState([]);
  
  const filteredElems = Filtersecteurs.filter((item) => {
    return item.Categorie_Lib.toLowerCase().startsWith(inputValue.toLowerCase());
  });

  useEffect(() => {
    setPreviousSelection(Filtersecteursids);
  }, [Filtersecteursids]);

  const handleSelectAll = () => {
    if (selectedItems.length === filteredElems.length) {
      setSelectedItems([]);
      setFiltersecteur && setFiltersecteur([], varieties, produits, marques, annonceurs);
    } else {
      setSelectedItems(filteredElems.map((item) => item.Categorie_Id));
      var ids = filteredElems.map((item) => item.Categorie_Id);
      setFiltersecteur && setFiltersecteur(ids, varieties, produits, marques, annonceurs);
    }
  };

  const handleAutocompleteChange = (event, value) => {
    setSelectedItems([...value.map((item) => item.Categorie_Id)]);
    var ids = value.map((item) => item.Categorie_Id);
    setFiltersecteur && setFiltersecteur(ids, varieties, produits, marques, annonceurs);
  };

  const onInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };
  console.log('filteredElems',filteredElems)
  const isAllSelected = selectedItems.length === filteredElems.length;

  return (
    <FormControl sx={{ m: 1, width: "100%" }}>
      {/* Custom Select All option */}
      <div style={{ marginTop: 10 }}>
        <MenuItem onClick={handleSelectAll}>
          <Checkbox checked={isAllSelected} />
          <ListItemText primary="secteurs" />
        </MenuItem>
      </div>
      <InputLabel id="demo-multiple-checkbox-label"></InputLabel>
      {/* {Filtersecteursids.length === 0 && 
        <Alert severity="error" width="5px"
          sx={{ fontSize: "10px", padding: '0px' }}>
          aucun secteur n'est sélectionné
        </Alert>
      } */}
      <Autocomplete
        multiple
        freeSolo
        options={filteredElems}
        value={Filtersecteurs.filter((item) => previousSelection.includes(item.Categorie_Id))}
        onChange={handleAutocompleteChange}
        getOptionLabel={(option) => option.Categorie_Lib}
        inputValue={inputValue}
        onInputChange={onInputChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label={`Secteurs (${previousSelection.length})`} // Display the count of selected items
            variant="outlined"
          />
        )}
        renderOption={(props, option) => (
          <MenuItem {...props} key={option.Categorie_Lib} value={option.Categorie_Id}>
            <Checkbox defaultChecked checked={previousSelection.includes(option.Categorie_Id)} />
            <ListItemText primary={option.Categorie_Lib} />
          </MenuItem>
        )}
        renderTags={(value, getTagProps) => null}
        disableCloseOnSelect
      />
    </FormControl>
  );
}