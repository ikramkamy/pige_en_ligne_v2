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
import "./commun.css"
export default function MultipleSelectSecteurs() {
  const { secteurs, Filtersecteurs, setFiltersecteur, varieties,
     produits, marques, annonceurs, Filtersecteursids } = UseFiltersStore((state) => state);
  const [inputValue, setInputValue] = React.useState('');
  const [selectedItems, setSelectedItems] = React.useState(Filtersecteursids);
  const [previousSelection, setPreviousSelection] = useState([]);
  //Secteur_Lib est devenue 
  const filteredElems = Filtersecteurs.filter((item) => {
    return item.Secteur_Lib.toLowerCase().startsWith(inputValue.toLowerCase());
  });

  useEffect(() => {
    setPreviousSelection(Filtersecteursids);
  }, [Filtersecteursids]);

  const handleSelectAll = () => {
    if (selectedItems.length === filteredElems.length) {
      setSelectedItems([]);
      setFiltersecteur && setFiltersecteur([], varieties, produits, marques, annonceurs);
    } else {
      setSelectedItems(filteredElems.map((item) => item.Secteur_Id));
      var ids = filteredElems.map((item) => item.Secteur_Id);
      setFiltersecteur && setFiltersecteur(ids, varieties, produits, marques, annonceurs);
    }
  };

  const handleAutocompleteChange = (event, value) => {
    setSelectedItems([...value.map((item) => item.Secteur_Id)]);
    var ids = value.map((item) => item.Secteur_Id);
    setFiltersecteur && setFiltersecteur(ids, varieties, produits, marques, annonceurs);
  };

  const onInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };
  console.log('filteredElems',filteredElems)
  const isAllSelected = previousSelection.length === filteredElems.length;

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
      sx={{height:"40px"}}
        multiple
        freeSolo
        options={filteredElems}
        value={Filtersecteurs.filter((item) => previousSelection.includes(item.Secteur_Id))}
        onChange={handleAutocompleteChange}
        getOptionLabel={(option) => option.Secteur_Lib}
        inputValue={inputValue}
        onInputChange={onInputChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label={`secteurs (${previousSelection.length})`} // Display the count of selected items
            variant="outlined"
          />
        )}
        renderOption={(props, option) => (
          <MenuItem {...props} key={option.Secteur_Lib} value={option.Secteur_Id}>
            <Checkbox defaultChecked checked={previousSelection.includes(option.Secteur_Id)} />
            <ListItemText primary={option.Secteur_Lib} />
          </MenuItem>
        )}
        renderTags={(value, getTagProps) => null}
        disableCloseOnSelect
      />
    </FormControl>
  );
}