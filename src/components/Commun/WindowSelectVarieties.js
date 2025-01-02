import React, { useEffect, useState } from 'react';
import WindowedSelect from 'react-windowed-select';
import Checkbox from '@mui/material/Checkbox';
import { UseFiltersStore } from '../../store/dashboardStore/FiltersStore';
import './commun.css';

export default function MultipleSelectVarietiesWindow() {
  const { Filtervarieties, produits, setFiltervariete, annonceurs, marques, Filtervarietiesids } = UseFiltersStore((state) => state);
  const [inputValue, setInputValue] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [previousSelection, setPreviousSelection] = useState([]);

  useEffect(() => {
    setPreviousSelection(Filtervarietiesids);
  }, [Filtervarietiesids]);

  // Ensure inputValue is always a string before calling .toLowerCase()
  const filteredElems = Filtervarieties.filter((item) => {
    const input = inputValue || '';  
    return item.Variete_Lib.toLowerCase().startsWith(input.toLowerCase());
  }); 
  const handleSelectAll = () => {
    if (selectedItems.length === filteredElems.length) {
      setSelectedItems([]);
      setFiltervariete && setFiltervariete([], produits, annonceurs, marques);
    } else {
      const allIds = filteredElems.map((item) => item.Variete_id);
      setSelectedItems(allIds);
      setFiltervariete && setFiltervariete(allIds, produits, annonceurs, marques);
    }
  };

  const handleChange = (selectedOptions) => {
    const ids = selectedOptions.map((item) => item.Variete_id);
    setSelectedItems(ids);
    setFiltervariete && setFiltervariete(ids, produits, annonceurs, marques);
  };

  const onInputChange = (event) => {
    setInputValue(event);
    //console.log('newInputValue',event)

  };

  const formatOptionLabel = (option) => {
    const isChecked = previousSelection.includes(option.Variete_id);
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Checkbox checked={isChecked} readOnly />
        {option.Variete_Lib}
      </div>
    );
  };

  const isAllSelected = selectedItems.length === filteredElems.length;

  return (
    <div style={{ width: '100%', margin: '1rem 0' }}>
      <div style={{ marginBottom: 10 }}>
        <div onClick={handleSelectAll} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <Checkbox checked={isAllSelected} />
          <span>Variétés</span>
        </div>
      </div>

      <WindowedSelect
        options={filteredElems}
        onChange={handleChange}
        value={filteredElems.filter((item) => previousSelection.includes(item.Variete_id))}
        formatOptionLabel={formatOptionLabel}
        isMulti
        closeMenuOnSelect={false}
        inputValue={inputValue}
        onInputChange={(e)=>onInputChange(e)}
        placeholder={`variétés (${selectedItems.length})`} 
        getOptionValue={(option) => option.Variete_id}
        
        renderInput={(props) => (
          <div {...props} style={{ display: 'flex', alignItems: 'center', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <span>{selectedItems.length} selected</span>
          </div>
        )}
        noOptionsMessage={() => 'No options available'}
      />
    </div>
  );
}
