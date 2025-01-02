import React ,{useState,Component }from "react";
import dayjs from "dayjs";
import "dayjs/locale/fr"; // Import French locale
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDateRangePicker } from "@mui/x-date-pickers-pro/DesktopDateRangePicker";
import DateRangeTest from './DateRangePickerTest'
// import DateRangePicker from 'react-daterange-picker';
// import { DateRangePicker } from "@mui/x-date-pickers/DateRangePicker";
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

// import { DateRangePicker } from 'react-dates';
// import { DateRangePicker } from 'rsuite';
// import { DateRangePicker, Calendar } from 'react-date-range';
// import { addYears } from 'date-fns';


// import "react-datepicker/dist/react-datepicker.css";

import { UseFiltersStore } from "store/dashboardStore/FiltersStore";
import { UsePresseDashboardStore } from "store/dashboardStore/PresseDashboardStore";
import TextField from "@mui/material/TextField";
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { UseMediaDashboardStore } from "store/dashboardStore/MediaDashboardStore";

dayjs.locale("fr"); // Set French locale globally for dayjs


export default function SingleInputDateRangePicker() {
  const date_debut=window.localStorage.getItem('date_debut')
  const date_fin=window.localStorage.getItem('date_fin')
  console.log('date debut', date_debut)
  const { setDateRang ,
    setShowDataGridIfNotEmpty,
    setShowDataGrid,
   setDataTableShow,
   setLoadingshow,
  } = UseFiltersStore((state) => state);
  const { ResetBasedeCalucule ,ResetDataArrays} = UsePresseDashboardStore((state) => state);
  const {RestRadioTvData}=UseMediaDashboardStore((state)=>state);
  const MAX_MONTHS = 12;
  const isValidRange = (start, end) => {
    if (!start || !end) return true;
    const duration = end.diff(start, "month", true);
    return duration <= MAX_MONTHS;
  };

    const handeldate = (value) => {
    
    const [start, end] = value;
    RestRadioTvData && RestRadioTvData();
    ResetDataArrays && ResetDataArrays();
    setShowDataGridIfNotEmpty &&  setShowDataGridIfNotEmpty(true)
    setShowDataGrid &&  setShowDataGrid(false)
    setDataTableShow && setDataTableShow(false)
    setLoadingshow && setLoadingshow(false)


    if (isValidRange(start, end)) {
      console.log("date selected", value);
//le format de date envoyé doit être identique à celui dans la base de données
      const formattedStart = start ? start.format("YYYY-MM-DD") : "";
      const formattedEnd = end ? end.format("YYYY-MM-DD") : "";
      console.log("start date format",formattedStart)
      setDateRang(formattedStart, formattedEnd);
      ResetBasedeCalucule && ResetBasedeCalucule();

    } else {
      alert(`L'interval ne devrait pas dépasser ${MAX_MONTHS} mois.`);
    }
  };

  const today = dayjs();
  console.log('today',dayjs().format('DD/MM/YYYY'))


 
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
    
      adapterLocale="fr" 
      sx={{
        paddingTop:"0px",
       
      }}
        
    >
{/* basic librrary  */}
{/* <DateRangeTest/> */}
       <DemoContainer components={['SingleInputDateRangeField']} sx={{
        paddingTop:"0px",
        width:"100%",
        fontSize:"5px",
        
      }}>
        <DateRangePicker
          slots={{ field: SingleInputDateRangeField }}
          defaultValue={[dayjs(), dayjs()]}
          name="allowedRange"
          onChange={handeldate}
          inputFormat="jj mm aaaa" 
          minDate={dayjs(date_debut)}
          maxDate={dayjs(date_fin)}  
          sx={{
           width:130,
           fontSize:"5px",
            "& .MuiCalendarPicker-root": {
              backgroundColor: "lightblue",
            },
            "& .css-jef1b6-MuiDateRangeCalendar-container":{
             
          
          }
          }}
          slotProps={{
            calendar: {
              sx: {
                backgroundColor: "lightblue", 
                color: "black",              
              }}}}
             className="custom-date-range-picker" 
        />
      
      </DemoContainer>
 
      {/* <DesktopDateRangePicker
        componentsProps={{
          textField: {
            label: "Sélectionnez une période", // Label in French
          },
        }}
       
        inputFormat="DD MM YYYY" // Adjust display format for French dates
        defaultValue={[
          // Uncomment and adjust default dates if needed
          dayjs(today),
          dayjs(today),
        ]}
        localeText={{
          start: "Date de début", 
          end: "Date de fin", 
        }}
        onChange={handeldate}
        renderInput={(startProps, endProps) => (
          <TextField
            {...startProps}
            onClick={startProps.inputProps.onClick}
            value={`${startProps.inputProps.value} - ${endProps.inputProps.value}`}
            // fullWidth
            sx={{
              width: "60px", 
              marginRight: "10px", 
            }}
          />
        )}
      /> */}
    {/* <Calendar
        date={new Date()}
        onChange={this.handleSelect}
      /> */}
    </LocalizationProvider>
  );
}
