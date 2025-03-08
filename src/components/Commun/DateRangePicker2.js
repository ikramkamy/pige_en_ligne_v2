import React, { useState, forwardRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import dayjs from "dayjs";
import { fr } from "date-fns/locale";

// Assuming these stores are correctly implemented
import { UseFiltersStore } from "store/dashboardStore/FiltersStore";
import { UsePigeDashboardStore } from "store/dashboardStore/PigeDashboardStore";
import { UseMediaDashboardStore } from "store/dashboardStore/MediaDashboardStore";
import { UseLoginStore } from "store/dashboardStore/useLoginStore";

export default function DateRange2() {
  const {
    setShowDataGridIfNotEmpty,
    setShowDataGrid,
    setDataTableShow,
    setLoadingshow,
    setDateRangLast,
    date1,
    date2,
    date3,
    date4,
    date1fomated,
    date2fomated
  } = UseFiltersStore((state) => state);

  const { ResetBasedeCalucule, ResetDataArrays } = UsePigeDashboardStore((state) => state);
  const { RestRadioTvData } = UseMediaDashboardStore((state) => state);
  const { date_debut, date_fin } = UseLoginStore((state) => state);

  const start_date = "2024-01-01";
  const today = "2024-12-31";

  const [dateRange, setDateRange] = useState([date3, date4]);
  const [startDate, endDate] = dateRange;

  // Custom Input Component
  const CustomInput = forwardRef(({ value, onClick }, ref) => {
    const formattedValue = value
      ? value.split(" - ").map((date) => moment(date).format("DD/MM/YYYY")).join(" - ")
      : "";

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

  // Handle Date Change
  const handleDateChange = (update) => {
   // console.log("update", update)
    const newStartDate = update[0];
    const newEndDate = update[1];
    const formattedStart = newStartDate ? moment(newStartDate).format("YYYY-MM-DD") : "";
    const formattedEnd = newEndDate ? moment(newEndDate).format("YYYY-MM-DD") : "";
    // Update the date range state
    setDateRange([newStartDate, newEndDate]);
    // Update the last date range in the store
    setDateRangLast(formattedStart, formattedEnd);
  };

  // Initialize Last Date Range on Mount
  useEffect(() => {
    setDateRangLast(
      dayjs(date1).subtract(1, "year").format("YYYY-MM-DD"),
      dayjs(date2).subtract(1, "year").format("YYYY-MM-DD")
    );
    const lastyeardate=new Date(date1fomated).getFullYear()-1
    console.log("lastyeardate",dayjs(date1).subtract(1, "year").format("ddd MMM DD YYYY HH:mm:ss [GMT]Z"))
    if (date1 && date2){
        setDateRange([dayjs(date1).subtract(1, "year").format("ddd MMM DD YYYY HH:mm:ss [GMT]Z"), 
            dayjs(date2).subtract(1, "year").format("ddd MMM DD YYYY HH:mm:ss [GMT]Z")]);
    }
   
  }, [date1, date2]); // Ensure this runs only when date1 or date2 changes
useEffect(()=>{
    setDateRangLast(
        dayjs(date1).subtract(1, "year").format("YYYY-MM-DD"),
        dayjs(date2).subtract(1, "year").format("YYYY-MM-DD")
      );
},[])
  return (
    <div className="date-picker-container" style={{ width: "100%" }}>
      <DatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={handleDateChange}
        locale={fr}
        monthsShown={2}
        maxDate={today}
        minDate={start_date}
        customInput={<CustomInput />}
      />
    </div>
  );
}