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

export default function MultipleSelectAnnonceurs() {
  const { Filterannonceurs, marques, produits, setFilterannonceur, Filterannonceursids ,annonceurs} = UseFiltersStore((state) => state);
  const [inputValue, setInputValue] = useState('');
  const [selectedItems, setSelectedItems] = useState(Filterannonceursids);
  const [previousSelection, setPreviousSelection] = useState(Filterannonceursids);

  // Filter annonceurs based on input value
  // const filteredElems = inputValue.length > 0 ? Filterannonceurs.filter((item) => {
  //   return item.Annonceur_Nom.toLowerCase().startsWith(inputValue.toLowerCase());
  // }) : [];
    const filteredElems =Filterannonceurs.filter((item) => {
    return item.Annonceur_Nom.toLowerCase().startsWith(inputValue.toLowerCase());
  });
console.log('annoncerus',Filterannonceursids)
  useEffect(() => {
    setPreviousSelection(Filterannonceursids);
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

  const isAllSelected = selectedItems.length === filteredElems.length;
// console.log("selectedItems ann",annonceurs)  
console.log("selectedItems ids",Filterannonceursids) 
console.log("selectedItems filtred",Filterannonceurs) 
// console.log("selectedItems",Filterannonceurs.map((e)=>e.Annonceur_Id))

  return (
    <FormControl sx={{ m: 1, width: "100%" }}>
      {/* Custom Select All option */}
      <div style={{ marginTop: 10 }}>
        <MenuItem onClick={handleSelectAll}>
          <Checkbox checked={isAllSelected} />
          <ListItemText primary="annonceurs" />
        </MenuItem>
      </div>
      <InputLabel id="demo-multiple-checkbox-label"></InputLabel>
      {/* {Filterannonceursids.length === 0 && <Alert severity="error" width="5px"
        sx={{ fontSize: "10px", padding: '0px' }}>
        aucun annonceur n'est sélectionné
      </Alert>} */}
      <Autocomplete
        multiple
        freeSolo
        options={filteredElems}
        value={Filterannonceurs.filter((item) =>previousSelection.includes(item.Annonceur_Id))}
        onChange={handleAutocompleteChange}
        getOptionLabel={(option) => option.Annonceur_Nom}
        inputValue={inputValue}
        onInputChange={onInputChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label={`Annonceurs (${previousSelection.length})`}
            variant="outlined"
          />
        )}
        renderOption={(props, option) => (
          <MenuItem {...props} key={option.Annonceur_Id} value={option.Annonceur_Id}>
            <Checkbox defaultChecked checked={previousSelection.includes(option.Annonceur_Id)} />
            <ListItemText primary={option.Annonceur_Nom} />
          </MenuItem>
        )}
        renderTags={(value, getTagProps) => null}
        disableCloseOnSelect
      />
    </FormControl>
  );
}