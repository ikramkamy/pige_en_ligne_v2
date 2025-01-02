import { debounce } from 'lodash';
import { useCache } from 'react-use';
import { UseFiltersStore } from '../../store/dashboardStore/FiltersStore';
import { Virtualize } from '@mui/utils';


const MultipleSelectProducts2 = () => {
  const { produits, Filterproduits } = UseFiltersStore((state) => state);
  const [inputValue, setInputValue] = React.useState('');
  const [selectedItems, setSelectedItems] = React.useState([]);
  const cache = useCache('filteredElems', []);

  const debouncedOnInputChange = debounce((newInputValue) => {
    
    const filteredElems = Filterproduits.filter((item) =>
      item.Produit_Lib.toLowerCase().startsWith(newInputValue.toLowerCase())
    );
    cache.set(filteredElems);
    setInputValue(newInputValue);
  }, 200);

  const handleAutocompleteChange = (event, value) => {
    setSelectedItems([...value.map((item) => item.Produit_Id)]);
  };

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="demo-multiple-checkbox-label" />
      <Autocomplete
        multiple
        freeSolo
        options={cache.get()}
        value={Filterproduits.filter((item) => selectedItems.includes(item.Produit_Id))}
        onChange={handleAutocompleteChange}
        getOptionLabel={(option) => option.Produit_Lib}
        inputValue={inputValue}
        onInputChange={debouncedOnInputChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Produits"
            variant="outlined"
          />
        )}
        renderOption={(props, option) => (
          <Virtualize>
          <MenuItem {...props} key={option.Produit_Id} value={option.Produit_Id}>
            <Checkbox checked={selectedItems.includes(option.Produit_Id)} />
            <ListItemText primary={option.Produit_Lib} />
          </MenuItem>
          </Virtualize>
        )}
      />
    </FormControl>
  );
};
export default MultipleSelectProducts2;