import * as React from 'react';
import { pink, green, blue, } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import { Radio } from '@mui/material';
import { useState,useEffect } from 'react';
import { UseFiltersStore } from 'store/dashboardStore/FiltersStore';
import { UseLoginStore } from 'store/dashboardStore/useLoginStore';
import { UseGraphStore } from 'store/GraphStore';
import NetworkErrorPopup from 'components/Commun/popups/NetworkErrorPopup'
// Define labels and their corresponding names


export default function ColorCheckboxes({ ChangeBaseFunction, baseKey, parametre, base }) {
  const { email } = UseLoginStore((state) => state)
  const { seCodeColor, setBaseGraphs, baseGraphs } = UseGraphStore((state) => state)
  const [b, setB] = useState((''))
  const [checkboxes,setCheckboxes]=useState([])
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
  const [open, setOpen] = useState(false)

  function isDateInRange(date1, startDate, endDate) {
    // Helper function to parse a date string (YYYY-MM-DD) into a Date object
    const parseDate = (dateStr) => {
      const [year, month, day] = dateStr.split('-').map(Number);
      return new Date(year, month - 1, day); // Month is 0-indexed in JavaScript
    };
 // Parse all dates
    const d1 = parseDate(date1);
    const start = parseDate(startDate);
    const end = parseDate(endDate);

    // Check if date1 is within the range [startDate, endDate]
    return d1 >= start && d1 <= end;
  }

  const isdate1inRamdan = isDateInRange(date1, "2025-03-01", "2025-03-31")
  const isdate2inRamdan = isDateInRange(date2, "2025-03-01", "2025-03-31")


  // const checkboxes = [
  //   { label: 'Volume', name: 'volume', value: 'volume', color: green[600], checkedColor: green[600], codeColor: "#43a047" },
  //   { label: 'Budget', name: 'budget', value: 'budget', color: blue[500], checkedColor: blue[500], codeColor: "#2196f3" },
  //   { label: 'Durée', name: 'durée', value: 'duree', color: pink[800], checkedColor: pink[600], codeColor: "#d81b60" },
  // ];
  useEffect(()=>{
if(media==="presse"){
  setCheckboxes([
    { label: 'Volume', name: 'volume', value: 'volume', color: green[600], checkedColor: green[600], codeColor: "#43a047" },
    { label: 'Budget', name: 'budget', value: 'budget', color: blue[500], checkedColor: blue[500], codeColor: "#2196f3" },
   
  ]);

}else{
  setCheckboxes([
    { label: 'Volume', name: 'volume', value: 'volume', color: green[600], checkedColor: green[600], codeColor: "#43a047" },
    { label: 'Budget', name: 'budget', value: 'budget', color: blue[500], checkedColor: blue[500], codeColor: "#2196f3" },
    { label: 'Durée', name: 'durée', value: 'duree', color: pink[800], checkedColor: pink[600], codeColor: "#d81b60" },
  ]);
}
  },[date1,date2,media])

  const LoacalBaseGraph = baseGraphs[parametre] == "" ? base : baseGraphs[parametre]
  const handelBaseGraphChange = (item, value) => {

    seCodeColor(checkboxes[value].value)
    // alert(`êtes-vous sûr de vouloir changer 
    //   de base en ${checkboxes[value].value} ${parametre}`)
    if(checkboxes[value].value =="budget" && (isdate1inRamdan || isdate2inRamdan)){
      setOpen(true)
    }else{
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
    setB(base)
    if (parametre == "annonceurparsupport" || parametre == "creationparannonceur") {
      setDisable(true)
    } else {
      setDisable(false)
    }

  }, [])

const HandeErrorFetchFiletrs = () => {
  setOpen(false)

}
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
           {!disable && (
          <span
           className="mx-2 px-2 border border-light rounded py-2 hover-effect"
            style={{
              //marginLeft: 8,
              width: "fit-content",
              backgroundColor: b==item.value ? item.checkedColor:"",
              border: "1px solid lightgrey",
              borderRadius: "5px",
              padding: "5px",
              fontSize:"12px",
              cursor:"pointer",
              
              
            }}>
              {item.label}
          </span>
           )}
        </div>




      ))}
 <NetworkErrorPopup
        OpenNetworkPopup={open}
        handleCloseNetworkPopup={HandeErrorFetchFiletrs}
        message="Les tarifs du mois de Ramadan 2025 ne sont pas encore appliqués"
      />
    </div>
  );
}

// Shared label configuration
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

