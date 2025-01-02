import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { UseFiltersStore } from '../../store/dashboardStore/FiltersStore';
import { Autocomplete } from '@mui/material';
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { Chip } from '@mui/material';
import './commun.css';

export default function MultipleSelectFamilles() {
  const { familles,Filterclasses,setFilterfamilles, Filterfamilles, classes, secteurs, varieties, annonceurs, produits, marques } = UseFiltersStore((state) => state);
  const [inputValue, setInputValue] = React.useState('');
  const [selectedItems, setSelectedItems] = React.useState(familles.map((item) => item.CodeFamille));
  const [previousSelection, setPreviousSelection] = React.useState([]);

  const filteredElems = familles.filter((item) => {
    return item.Famille.toLowerCase().startsWith(inputValue.toLowerCase());
  });
  console.log("famille ms",familles);
  const handleAutocompleteChange = (event, value) => {
    setSelectedItems([...value.map((item) => item.CodeFamille)]);
    const listOfIdsSelected = value.map((e) => e.CodeFamille);
    setFilterfamilles && setFilterfamilles(listOfIdsSelected, classes, secteurs, varieties, produits, annonceurs, marques);
  };
  
  const handleSelectAll = (event) => {
    if (!event.target.checked) {
      setSelectedItems([]);
      var ids = filteredElems.map((item) => item.CodeFamille);
      setFilterfamilles && setFilterfamilles([], classes, secteurs, varieties, 
        produits, annonceurs, marques);
    } else {
      setSelectedItems(filteredElems.map((item) => item.CodeFamille));
      var ids = filteredElems.map((item) => item.CodeFamille);
      setFilterfamilles && setFilterfamilles(ids, classes, secteurs, 
        varieties, produits, annonceurs, marques);
    }
  };

  const onInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  const isAllSelected = selectedItems.length === filteredElems.length;
console.log("isAllSelected",selectedItems)
  React.useEffect(() => {
    setPreviousSelection(Filterfamilles);
  }, [Filterfamilles]);

  return (
    <FormControl sx={{ m: 1, width: "100%" }}>
      {/* Custom Select All option */}
      <div style={{ marginTop: 10 }}>
        <MenuItem onClick={(event) => handleSelectAll(event)}>
          <Checkbox checked={isAllSelected}/>
          <ListItemText primary="familles" />
        </MenuItem>
      </div>
      <InputLabel id="demo-multiple-checkbox-label"></InputLabel>

      <Autocomplete
        multiple
        freeSolo
        options={filteredElems}
        value={familles.filter((item) => previousSelection.includes(item.CodeFamille))}
        onChange={handleAutocompleteChange}
        getOptionLabel={(option) => option.Famille}
        inputValue={inputValue}
        onInputChange={onInputChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label={`Familles (${previousSelection.length})`} // Display the count of selected items
            variant="outlined"
            // InputProps={{
            //   ...params.InputProps,
            //   endAdornment: (
            //     <React.Fragment>
            //       {selectedItems.length > 0 ? (
            //         <InputAdornment position="end">
            //           <Chip label={`${selectedItems.length} items selected`} size="small" />
            //         </InputAdornment>
            //       ) : null}
            //       {params.InputProps.endAdornment}
            //     </React.Fragment>
            //   ),
            // }}
          />
        )}
        renderOption={(props, option) => (
          <MenuItem {...props} key={option.Famille} value={option.CodeFamille}>
            <Checkbox checked={previousSelection.includes(option.CodeFamille)} />
            <ListItemText primary={option.Famille} />
          </MenuItem>
        )}
        renderTags={(value, getTagProps) => null}
        disableCloseOnSelect
      />
    </FormControl>
  );
}