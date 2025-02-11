import * as React from 'react';
import { pink, green, blue, orange } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import { Radio } from '@mui/material';
import { useState } from 'react';
import { UseFiltersStore } from 'store/dashboardStore/FiltersStore';
import { UseLoginStore } from 'store/dashboardStore/useLoginStore';
import { UseGraphStore } from 'store/GraphStore';
// Define labels and their corresponding names
const checkboxes = [
  { label: 'Volume', name: 'volume', value: 'volume', color: green[600], checkedColor: green[600], codeColor: "#43a047" },
  { label: 'Budget', name: 'budget', value: 'budget', color: blue[500], checkedColor: blue[500], codeColor: "#2196f3" },
  { label: 'Durée', name: 'durée', value: 'duree', color: pink[800], checkedColor: pink[600], codeColor: "#d81b60" },
];

export default function ColorCheckboxes({ ChangeBaseFunction, baseKey, parametre, base }) {
  const { email } = UseLoginStore((state) => state)
  const { seCodeColor, setBaseGraphs, baseGraphs } = UseGraphStore((state) => state)
  const [b, setB] = useState((''))
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

  } = UseFiltersStore((state) => state)
  const LoacalBaseGraph = baseGraphs[parametre] == "" ? base : baseGraphs[parametre]
  const handelBaseGraphChange = (item, value) => {

    seCodeColor(checkboxes[value].value)
    // alert(`êtes-vous sûr de vouloir changer 
    //   de base en ${checkboxes[value].value} ${parametre}`)
    setBaseGraphs && setBaseGraphs(parametre, checkboxes[value].value)
    //console.log('LoacalBaseGraph',parametre, checkboxes[value].value, ChangeBaseFunction)
    setB(checkboxes[value].value)
    // alert(``)
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
      checkboxes[value].value)
  }
  // React.useEffect(()=>{
  //   ChangeBaseFunction(
  //     Filtersupports,
  //     Filterfamilles,
  //     Filterclassesids,
  //     Filtersecteursids,
  //     Filtervarietiesids,
  //     Filterannonceursids,
  //     Filtermarquesids,
  //     Filterproduitsids,
  //     date1,
  //     date2,
  //     media,
  //     email,
  //     parametre,
  //     b)
  // },[baseGraphs])
  const [disable, setDisable] = useState(false)
  React.useEffect(() => {
    if (parametre == "annonceurparsupport" || parametre == "creationparannonceur") {
      setDisable(true)
    } else {
      setDisable(false)
    }
    console.log('LoacalBaseGraph', LoacalBaseGraph)
  }, [])
console.log('b',b)
  return (
    <div style={{ display: "flex", width:"" }}>

      {checkboxes.map((item, index) => (
        <div onClick={() => handelBaseGraphChange(item, index)}


        // color={item.color ? 'default' : item.color} // Use 'default' for custom colors
        // sx={{
        //   color: item.color || 'inherit', // Set custom color if provided
        //   '&.Mui-checked': {
        //     color: item.checkedColor || item.color, // Set checked color if provided
        //   },
        // }}

        >
          
          <span
           className="mx-2 px-2 border border-light rounded py-2 hover-effect"
            style={{
              //marginLeft: 8,
              width: "fit-content",
              backgroundColor:b==item.value? item.checkedColor:"",
              border: "1px solid lightgrey",
              borderRadius: "5px",
              padding: "5px",
              fontSize:"12px",
              cursor:"pointer",
              
              
            }}>
              {item.label}
          </span>
        </div>




      ))}

    </div>
  );
}

// Shared label configuration
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

