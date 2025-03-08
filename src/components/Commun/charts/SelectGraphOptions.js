import React, { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import {
    Input,
} from "@mui/material";
export function SelectGraphOptionsMarche({ options, UpdatedGraphDisplay,
    SetOptionFunction,}) {
    const optionList = options.map((e) => e.name.split('-')[0]);
    const [selectedItems, setSelectedItems] = useState(optionList.slice(0, 10));
    const [selectedList, setSelectedList] = useState(options.slice(0, 10));
    const[ autre,setAutre]=useState({})
 const [optionNumber, setOptionNumber] = useState(10)
    useEffect(() => {
        
        var autresList = optionList.filter((e) => !selectedItems.includes(e))
        var autreListFull = options.filter((e) => autresList.includes(e.name))
        var valueAutre = autreListFull.map((e) => Number(e.value))
        var PourcentageAutre = autreListFull.map((e) => Number(e.proportion))
        const totalSum = valueAutre.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        const totalSumPourcentage = PourcentageAutre.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        
        var autre = {
            value: totalSum.toFixed(2),
            namelegend: `autre ${totalSumPourcentage.toFixed(2)}%`,
            name: `autre`,
            proportion:totalSumPourcentage.toFixed(2)
        }
        setAutre(autre)
        setSelectedItems(optionList.slice(0, 10));      
        console.log("autre",autre,fulllist)
        var newSelectedList = options.filter((e) =>
            selectedItems.includes(e.name.split("-")[0])
        );
        var fulllist=[...newSelectedList,autre]
       
        //console.log("autre",autre,fulllist)
        SetOptionFunction && SetOptionFunction(fulllist);
    }, [options]);

     useEffect(() => {
        var newSelectedList = options.filter((e) =>
            selectedItems.includes(e.name.split("-")[0])
        );
        //newSelectedList.push(autre);
        SetOptionFunction && SetOptionFunction(newSelectedList)
        // setSelectedList(newSelectedList);
        //if(autre.name){
            var fulllist=[...newSelectedList,autre]
            console.log("autre",autre,fulllist)
            SetOptionFunction && SetOptionFunction(fulllist);
        //}
       
    }, [selectedItems, options, SetOptionFunction,autre]);

    useEffect(() => {
        UpdatedGraphDisplay();
    }, [selectedList]);
    const handelchangeoptionsNumber = (e) => {
        //   console.log("e pie",e.target.value) 
        var optionsNum = e.target.value;
        setOptionNumber(optionsNum)
        setSelectedItems(optionList.slice(0,optionsNum))
        var autresList = optionList.filter((e) => !selectedItems.includes(e))
        var autreListFull = options.filter((e) => autresList.includes(e.name))

        var valueAutre = autreListFull.map((e) => Number(e.value))
        var PourcentageAutre = autreListFull.map((e) => Number(e.proportion))
        const totalSum = valueAutre.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        const totalSumPourcentage = PourcentageAutre.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        
        var autre = {
            value: totalSum.toFixed(2),
            namelegend: `autre ${totalSumPourcentage.toFixed(2)}%`,
            name: `autre`,
            proportion:totalSumPourcentage.toFixed(2)
        }
        setAutre(autre)

        let listWithAutre =options.filter((e)=>selectedItems.includes(e));
        listWithAutre.push('autre')
        console.log("autre list",options,selectedItems,listWithAutre)
       // setSelectedItems(listWithAutre);
        //SetOptionFunction && SetOptionFunction(options.slice(0,optionsNum));
        
    }
      return (
        <FormControl sx={{
            m: 0,
            width: "50",
            marginTop: "-5px",
            margin: "0px",
            marginRight: "0px",
            visibility: ""

        }}>
            <Input
                type='number'
                value={optionNumber}
                inputProps={{ min: 1, max: 25 }}
                onChange={handelchangeoptionsNumber}
                sx={{
                    color: "white",
                    width: "50px",
                    border: "1px solid white",
                    borderRadius: "5px",
                    paddingLeft: "5px"
                  }}
            />
        </FormControl>
    );
}


