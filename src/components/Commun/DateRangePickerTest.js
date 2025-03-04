import React, { useState, forwardRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import './commun.css';
import { fr } from "date-fns/locale";
import { UseFiltersStore } from "store/dashboardStore/FiltersStore";
import { UsePigeDashboardStore } from "store/dashboardStore/PigeDashboardStore";
import { UseMediaDashboardStore } from "store/dashboardStore/MediaDashboardStore";
import { UseLoginStore } from "store/dashboardStore/useLoginStore";


export default function DateRangeTest() {
  const { setDateRang, setShowDataGridIfNotEmpty, setShowDataGrid, setDataTableShow, setLoadingshow } = UseFiltersStore((state) => state);
  const { ResetBasedeCalucule, ResetDataArrays } = UsePigeDashboardStore((state) => state);
  const { RestRadioTvData } = UseMediaDashboardStore((state) => state);
  // const date_debut = window.localStorage.getItem('date_debut');
  // const date_fin = window.localStorage.getItem('date_fin');
  const {date_debut,date_fin}=UseLoginStore((state)=>state)
  
  let today =moment().utc().subtract(1, 'days').startOf("day").toDate();
  const [dateRange, setDateRange] = useState([today, today]);
  const [startDate, endDate] = dateRange;

  const CustomInput = forwardRef(({ value, onClick }, ref) => {
  const formattedValue = value ? value.split(" - ").map(date => moment(date).format("DD/MM/YYYY")).join(" - ") : ""; 
   
 // console.log(new Date(today) < new Date(date_fin))
  return (
      <input
        id="pickInput"
        className="date-picker-input"
        onClick={onClick}
        ref={ref}
        value={formattedValue}
        readOnly
      />
    );
  });
  const handleDateChange = (update) => {
    setDateRange(update);
    const newStartDate = update[0];
    const newEndDate = update[1];
    // Reset and update logic
    RestRadioTvData && RestRadioTvData();
    ResetDataArrays && ResetDataArrays();
    setShowDataGridIfNotEmpty && setShowDataGridIfNotEmpty(true);
    setShowDataGrid && setShowDataGrid(false);
    setDataTableShow && setDataTableShow(false);
    setLoadingshow && setLoadingshow(false);
    ResetBasedeCalucule && ResetBasedeCalucule();
    const formattedStart = newStartDate ? moment(newStartDate).format("YYYY-MM-DD") : "";
    const formattedEnd = newEndDate ? moment(newEndDate).format("YYYY-MM-DD") : "";
    setDateRang(formattedStart, formattedEnd);
  };
  console.log('date debut',date_debut)
  useEffect(() => {
    RestRadioTvData && RestRadioTvData();
    ResetDataArrays && ResetDataArrays();
    setShowDataGridIfNotEmpty && setShowDataGridIfNotEmpty(true);
    setShowDataGrid && setShowDataGrid(false);
    setDataTableShow && setDataTableShow(false);
    setLoadingshow && setLoadingshow(false);
    ResetBasedeCalucule && ResetBasedeCalucule();

    const formattedStart = dateRange[0] ? moment(dateRange[0]).format("YYYY-MM-DD") : "";
    const formattedEnd = dateRange[1] ? moment(dateRange[1]).format("YYYY-MM-DD") : "";

    setDateRang(formattedStart, formattedEnd);
  }, [dateRange]);
  return (
    <div className="date-picker-container" style={{width:"100%"}}>
      <DatePicker     
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={handleDateChange}
        locale={fr}
        monthsShown={2}
        maxDate={new Date(today) < new Date(date_fin) ? today: date_fin} 
        minDate={date_debut}
        customInput={<CustomInput />}
      />
    </div>
  );
}
