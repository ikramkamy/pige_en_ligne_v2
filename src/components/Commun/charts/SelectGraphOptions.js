// import React, { useEffect, useState } from 'react';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import ListItemText from '@mui/material/ListItemText';
// import Select from '@mui/material/Select';
// import Checkbox from '@mui/material/Checkbox';
// import { UseGraphStore } from 'store/GraphStore';
// import { styled } from "@mui/system";
// import {
//     ListSubheader,
//     ClickAwayListener,
//     Grow,
//     Paper,
//     Popper,
//     MenuList,

//   } from "@mui/material";
//    import MoreVertIcon from "@mui/icons-material/MoreVert";
// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//     PaperProps: {
//         style: {
//             maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//             width: 250,
//         },
//     },
// };

// export function SelectGraphOptionsMarche({ options, UpdatedGraphDisplay,filter,SetOptionFunction }) {
//     const optionList = options.map((e) => e.name.split('-')[0]);
//     const [selectedItems, setSelectedItems] = useState([]);  
//     const [selectedList, setSelectedList] = useState(options.slice(0,5));
   
//     useEffect(() => {
//         setSelectedItems(optionList.slice(0,10));
//     }, [options]);
 
//     const handleChange = (event) => {
//         const selected = event.target.value;
//         setSelectedItems((prevSelectedItems) => {
//             if (prevSelectedItems.includes(selected)) {
//                 return prevSelectedItems.filter((item) => item !== selected);
//             } else {
//                 if (prevSelectedItems.length >= 10) {
//                     return [...prevSelectedItems.slice(1), selected];
//                 } else {
//                     return [...prevSelectedItems, selected];
//                 }
//             }
//         });

//     };
//     useEffect(() => {
//         const newSelectedList = options.filter((e) =>
//             selectedItems.includes(e.name.split("-")[0])
//         );
//         setSelectedList(newSelectedList);
//         SetOptionFunction && SetOptionFunction(newSelectedList);
//     }, [selectedItems, options, SetOptionFunction]);
//     useEffect(() => {
//         UpdatedGraphDisplay()
//     }, [selectedList])
//     const StyledSelect = styled(Select)(({ theme }) => ({
//         "& .MuiOutlinedInput-notchedOutline": {
//           border: "none", // Remove the default border
//         },
//         "& .MuiSvgIcon-root": {
//           display: "none", // Hide the dropdown arrow icon
//         },
//         "&:focus": {
//           outline: "none", // Remove focus outline
//           boxShadow: "none", // Remove focus shadow
//         },
//         backgroundColor: "#010A41E6", // Set background color
//         color: "white", // Set text color
//         height: "35px", // Set custom height
//       }));
//     return (
//             <FormControl
//                 sx={{
//                     m: 0,
//                     width: 10,
//                     marginTop: "0px",
//                     marginRight: { xs: 0, sm: "0px" },
//                     height:"15px"               
//                 }}>
//                 <StyledSelect
//                     labelId="demo-multiple-checkbox-label"
//                     value={selectedItems}
//                     onChange={handleChange}
//                     input={<OutlinedInput label="" />}
//                     renderValue={() => <div style={{ color: "white",
//                          transform: "rotate(90deg)", fontWeight:"900" }}>
//                             <span style={{ transform: "rotate(90deg)", 
//                                 fontWeight:"900"}}>...</span>
//                             </div>}
//                     MenuProps={MenuProps}
//                     sx={{ backgroundColor: "010A41E6", height: "" ,color:"white", }}
//                 >
//                     {optionList.map((elem) => (
//                         <MenuItem key={optionList.indexOf(elem)} value={elem}>
//                             <Checkbox checked={selectedItems.includes(elem)} />
//                             <ListItemText primary={elem} />
//                         </MenuItem>
//                     ))}
//                 </StyledSelect>
//             </FormControl>
          
//     );
// }
import React, { useEffect, useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { UseGraphStore } from 'store/GraphStore';
import { styled } from "@mui/system";
import {
    ListSubheader,
    ClickAwayListener,
    Grow,
    Paper,
    Popper,
    MenuList,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export function SelectGraphOptionsMarche({ options, UpdatedGraphDisplay, filter, SetOptionFunction }) {
    const optionList = options.map((e) => e.name.split('-')[0]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedList, setSelectedList] = useState(options.slice(0, 5));

    useEffect(() => {
        setSelectedItems(optionList.slice(0, 10));
    }, [options]);

    const handleChange = (event) => {
        const selected = event.target.value;
        setSelectedItems((prevSelectedItems) => {
            if (prevSelectedItems.includes(selected)) {
                return prevSelectedItems.filter((item) => item !== selected);
            } else {
                if (prevSelectedItems.length >= 10) {
                    return [...prevSelectedItems.slice(1), selected];
                } else {
                    return [...prevSelectedItems, selected];
                }
            }
        });
    };

    // Handle "Select All" functionality
    const handleSelectAll = () => {
        if (selectedItems.length === optionList.length) {
            setSelectedItems([]); // Deselect all if all are already selected
        } else {
            setSelectedItems(optionList); // Select all options
        }
    };

    useEffect(() => {
        const newSelectedList = options.filter((e) =>
            selectedItems.includes(e.name.split("-")[0])
        );
        setSelectedList(newSelectedList);
        SetOptionFunction && SetOptionFunction(newSelectedList);
    }, [selectedItems, options, SetOptionFunction]);

    useEffect(() => {
        UpdatedGraphDisplay();
    }, [selectedList]);

    const StyledSelect = styled(Select)(({ theme }) => ({
        "& .MuiOutlinedInput-notchedOutline": {
            border: "none", // Remove the default border
        },
        "& .MuiSvgIcon-root": {
            display: "none", // Hide the dropdown arrow icon
        },
        "&:focus": {
            outline: "none", // Remove focus outline
            boxShadow: "none", // Remove focus shadow
        },
        backgroundColor: "#010A41E6", // Set background color
        color: "white", // Set text color
        height: "35px", // Set custom height
    }));

    return (
        <FormControl
            sx={{
                m: 0,
                width: 10,
                marginTop: "0px",
                marginRight: { xs: 0, sm: "0px" },
                height: "15px",
            }}
        >
            <StyledSelect
                labelId="demo-multiple-checkbox-label"
                value={selectedItems}
                onChange={handleChange}
                input={<OutlinedInput label="" />}
                renderValue={() => (
                    <div style={{ color: "white", transform: "rotate(90deg)", fontWeight: "900" }}>
                        <span style={{ transform: "rotate(90deg)", fontWeight: "900" }}>...</span>
                    </div>
                )}
                MenuProps={MenuProps}
                sx={{ backgroundColor: "010A41E6", height: "", color: "white" }}
            >
                {/* Add "Select All" option */}
                <MenuItem key="select-all" onClick={handleSelectAll}>
                    <Checkbox
                        checked={selectedItems.length === optionList.length}
                        indeterminate={
                            selectedItems.length > 0 && selectedItems.length < optionList.length
                        }
                    />
                    <ListItemText primary="Select All" />
                </MenuItem>

                {/* Render individual options */}
                {optionList.map((elem) => (
                    <MenuItem key={optionList.indexOf(elem)} value={elem}>
                        <Checkbox checked={selectedItems.includes(elem)} />
                        <ListItemText primary={elem} />
                    </MenuItem>
                ))}
            </StyledSelect>
        </FormControl>
    );
}
// import React, { useEffect, useState } from 'react';
// import WindowedSelect from 'react-windowed-select';
// import Checkbox from '@mui/material/Checkbox';
// import FormControl from '@mui/material/FormControl';
// import styled from '@emotion/styled';
// //import { MDBSelect } from 'mdb-react-ui-kit';
// export function SelectGraphOptionsMarche({ options, UpdatedGraphDisplay, filter, SetOptionFunction }) {
//     const optionList = options.map((e) => e.name.split('-')[0]);
//     const [selectedItems, setSelectedItems] = useState([]);
//     const [selectedList, setSelectedList] = useState(options.slice(0, 5));

//     // Initialize with the first 10 options pre-selected
//     useEffect(() => {
//         setSelectedItems(optionList.slice(0, 10));
//     }, [options]);

//     // Handle "Select All" functionality
//     const handleSelectAll = () => {
//         if (selectedItems.length === optionList.length) {
//             setSelectedItems([]); // Deselect all if all are already selected
//         } else {
//             setSelectedItems(optionList); // Select all options
//         }
//     };

//     // Update the selected list based on selected items
//     useEffect(() => {
//         const newSelectedList = options.filter((e) =>
//             selectedItems.includes(e.name.split("-")[0])
//         );
//         setSelectedList(newSelectedList);
//         SetOptionFunction && SetOptionFunction(newSelectedList);
//     }, [selectedItems, options, SetOptionFunction]);

//     // Trigger graph update when selectedList changes
//     useEffect(() => {
//         UpdatedGraphDisplay();
//     }, [selectedList]);

//     // Custom styles for the dropdown
//     const StyledWindowedSelect = styled(WindowedSelect)(({ theme }) => ({
//         '& .react-windowed-select__control': {
//             backgroundColor: '#010A41E6',
//             color: 'white',
//             border: 'none',
//             height: '35px',
//             cursor: 'pointer',
//             padding: '0 10px',
//             borderRadius: '4px',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//         },
//         '& .react-windowed-select__placeholder': {
//             color: 'white',
//         },
//         '& .react-windowed-select__indicator-separator': {
//             display: 'none',
//         },
//         '& .react-windowed-select__dropdown-indicator': {
//             color: 'white',
//         },
//         '& .react-windowed-select__menu': {
//             maxHeight: '200px',
//             overflowY: 'auto',
//             backgroundColor: '#010A41E6',
//             color: 'white',
//             border: '1px solid #ffffff4d',
//         },
//         '& .react-windowed-select__option': {
//             padding: '8px 16px',
//             color: 'white',
//             '&:hover': {
//                 backgroundColor: '#ffffff24',
//             },
//         },
//         '& .react-windowed-select__option--is-selected': {
//             backgroundColor: '#ffffff4d',
//         },
//     }));

//     return (
//         <>
//            {/* <MDBSelect
//       data={[
//         { text: 'One' },
//         { text: 'Two' },
//         { text: 'Three' },
//         { text: 'Four' },
//         { text: 'Five' },
//         { text: 'Six' },
//         { text: 'Seven' },
//         { text: 'Eight' },
//       ]}
//       multiple
//     /> */}
//           <FormControl
//             sx={{
//                 m: 0,
//                 width: 500,
//                 marginTop: '0px',
//                 marginRight: { xs: 0, sm: '0px' },
//                 height: '15px',
//             }}
//         >
//             {/* Custom WindowedSelect Component */}
//             <StyledWindowedSelect
//                 value={selectedItems}
//                 onChange={(values) => setSelectedItems(values)}
//                 options={optionList.map((name) => ({ value: name, label: name }))}
//                 isMulti
//                 placeholder={`${selectedItems.length} Selected`}
//                 components={{
//                     DropdownIndicator: (props) => (
//                         <div {...props.innerProps} style={{ color: 'white', cursor: 'pointer' }}>
//                             <MoreVertIcon />
//                         </div>
//                     ),
//                     Option: (props) => {
//                         const { innerProps, isFocused, isSelected, innerRef, label } = props;
//                         return (
//                             <div
//                                 {...innerProps}
//                                 ref={innerRef}
//                                 style={{
//                                     padding: '8px 16px',
//                                     backgroundColor: isFocused ? '#ffffff24' : 'transparent',
//                                     color: 'white',
//                                 }}
//                             >
//                                 <Checkbox
//                                     checked={isSelected}
//                                     style={{ color: 'white', marginRight: '8px' }}
//                                 />
//                                 {label}
//                             </div>
//                         );
//                     },
//                 }}
//                 styles={{
//                     control: (base) => ({
//                         ...base,
//                         border: 'none',
//                         boxShadow: 'none',
//                         '&:hover': {
//                             borderColor: 'transparent',
//                         },
//                     }),
//                 }}
//                 menuIsOpen={false} // Disable automatic opening of the menu
//                 closeMenuOnSelect={false} // Keep the menu open after selecting an item
//                 hideSelectedOptions={false} // Show selected options in the dropdown
//             />

//             {/* Add "Select All" button outside the dropdown */}
//             <button
//                 style={{
//                     marginTop: '8px',
//                     backgroundColor: '#010A41E6',
//                     color: 'white',
//                     border: 'none',
//                     padding: '8px 16px',
//                     cursor: 'pointer',
//                     borderRadius: '4px',
//                 }}
//                 onClick={handleSelectAll}
//             >
//                 {selectedItems.length === optionList.length
//                     ? 'Deselect All'
//                     : 'Select All'}
//             </button>
//         </FormControl>
//         </>
      
//     );
// }

