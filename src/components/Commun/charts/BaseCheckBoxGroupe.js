import * as React from 'react';
import { pink ,green, blue, orange} from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import { UseFiltersStore } from 'store/dashboardStore/FiltersStore';
import { UseLoginStore } from 'store/dashboardStore/useLoginStore';
import { UseGraphStore } from 'store/GraphStore';
// Define labels and their corresponding names
const checkboxes = [
    { label: 'Volume', name: 'volume',value:'volume', color: green[600], checkedColor: green[600],codeColor:"#43a047"},
    { label: 'Budget', name: 'budget',value:'budget', color: blue[500], checkedColor: blue[500],codeColor:"#2196f3"},
    { label: 'Durée', name: 'durée',value:'duree', color: pink[800], checkedColor: pink[600],codeColor:"#d81b60"}, 
];

export default function ColorCheckboxes({ChangeBaseFunction, parametre}) {

  const [baseGraph,setBaseGraph]=React.useState('')
  const {email}=UseLoginStore((state)=>state)
  const {seCodeColor}=UseGraphStore((state)=>state)
  const { 
    Filtersupports,
    Filterfamilles,
    Filterclassesids,
    Filtersecteursids,
    Filtervarietiesids,
    Filterannonceursids,
    Filtermarquesids,
    Filterproduitsids,
    date1,
    date2,
    media,

  }=UseFiltersStore((state)=>state)
  const handelBaseGraphChange=(item,value)=>{
    setBaseGraph(checkboxes[value].value)
    seCodeColor(checkboxes[value].value)
    
    ChangeBaseFunction(
      Filtersupports,
      Filterfamilles,
      Filterclassesids,
      Filtersecteursids,
      Filtervarietiesids,
      Filterannonceursids,
      Filtermarquesids,
      Filterproduitsids,
      date1,
      date2,
      media,
      email,
      parametre,
      baseGraph)
  }

  return (
    <div>
      {checkboxes.map((item, index) => (
        <React.Fragment key={index}>
          <Checkbox
           checked={baseGraph===item.value}
           onClick={()=>handelBaseGraphChange(item,index)}
            {...{
              ...label,
              inputProps: { 
                ...label.inputProps, 
                name: item.name, 
              },
            }}
            color={item.color ? 'default' : item.color} // Use 'default' for custom colors
            sx={{
              color: item.color || 'inherit', // Set custom color if provided
              '&.Mui-checked': {
                color: item.checkedColor || item.color, // Set checked color if provided
              },
            }}
          />
          <span style={{ marginLeft: 8 }}>{item.label}</span> {/* Display label */}
        </React.Fragment>
      ))}
    </div>
  );
}

// Shared label configuration
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };