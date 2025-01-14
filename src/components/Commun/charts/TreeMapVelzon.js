import getChartColorsArray from "./ChartsDynamicColor";
import { UsePigeDashboardStore } from '../../../store/dashboardStore/PigeDashboardStore';
import { UseFiltersStore } from 'store/dashboardStore/FiltersStore';
import ReactApexChart from "react-apexcharts";
import { useEffect, useState } from "react";
import WatingChart from 'assets/img/1KED.gif';


export const DiffColorTreemap = () => {
    const chartDatalabelsBarColors = [
        "#FFC107", // Warm orange
        "#8BC34A", // Muted green
        "#45B3FA", // Soft blue
        "#E67E73", // Pastel pink
        "#F7DC6F", // Soft yellow
        "#2196F3", // Deep blue
        "#9C27B0", // Rich purple
        "#66D9EF", // Soft blue-green
        "#FF69B4", // Bright pink
        "#34C759", // Lime green
        "#1A1D23", // Dark gray
        "#8E76A8", // Muted purple
        "#2F4F7F", // Dark blue
        "#9B59B6", // Rich pink
        "#33B5E5", // Soft blue
        "#F2C464", // Softer yellow
        "#4CAF50", // Deep green
        "#03A9F4", // Bright blue
        "#E5E5EA", // Light gray
        "#8F9E45", // Earthy brown
        "#FF9900" // Warm red
      ]
    const {PartMarche}=UsePigeDashboardStore((state)=>state);
    const {base, media}=UseFiltersStore((state)=>state);
    const [average, setAverage]=useState(0);
    const [array, setArray]=useState([{
        data:[]
    }]);
    
     useEffect(()=>{
      
        if(PartMarche && PartMarche.length !==0){
            if(base==="volume"){
                switch(media){
                    case 'presse':
                        var dataset=PartMarche.forEach((elem)=>{
                          const item={
                               x:elem.Titre_Lib +" "+ elem.proportion,
                               y:Number(elem.appearance_count)}
                              
                            array[0].data.push(item)
                            return array;
                       })
                      //to avoid the error of tofixed
                     
                        setAverage(Number(PartMarche[0].average_ratio).toFixed(2));
                    
                       break
                    case 'radio':
                        var dataset=PartMarche.forEach((elem)=>{
                            const item={
                                 x:elem.Chaine_Lib + elem.proportion,
                                 y:Number(elem.chaine_count)}
                                
                              array[0].data.push(item)
                              return array;
                         })
                        if(PartMarche && PartMarche.length!==0){
                            console.log(Number(PartMarche[0].average_diffusion_per_chaine).toFixed(2))
                            setAverage(Number(PartMarche[0].average_diffusion_per_chaine).toFixed(2));
                        }
                         
                       
                       break;
                       case 'television':
                        var dataset=PartMarche.forEach((elem)=>{
                            const item={
                                 x:elem.Chaine_Lib + elem.proportion,
                                 y:Number(elem.chaine_count)}
                                
                              array[0].data.push(item)
                              return array;
                         })
                        if(PartMarche && PartMarche.length!==0){
                            console.log(Number(PartMarche[0].average_diffusion_per_chaine).toFixed(2))
                            setAverage(Number(PartMarche[0].average_diffusion_per_chaine).toFixed(2));
                        }
                         
                       
                       break;
                }
            
                 }else if(base ==="budget"){
                 switch(media){
                    case 'presse':
                        var dataset=PartMarche.forEach((elem)=>{
                            const item={
                                 x:elem.Titre_Lib +" "+ elem.proportion,
                                 y:Number(elem.total_tarif)}
                                
                              array[0].data.push(item)
                              return array;
                         })
                        //to avoid the error of tofixed
                       
                          setAverage(Number(PartMarche[0].average_tarif_per_titre).toFixed(2));
                          break;
                    case 'radio':
                        var dataset=PartMarche.forEach((elem)=>{
                            const item={
                                 x:elem.Chaine_Lib + elem.proportion,
                                 y:Number(elem.total_tarif)}
                                
                              array[0].data.push(item)
                              return array;
                         })
                        console.log(array)
                    setAverage(Number(PartMarche[0].average_tarif_per_chaine).toFixed(2));
                       
                       break;
                case 'television':
                        var dataset=PartMarche.forEach((elem)=>{
                            const item={
                                 x:elem.Chaine_Lib + elem.proportion,
                                 y:Number(elem.total_tarif)}
                                
                              array[0].data.push(item)
                              return array;
                         })
                        console.log(array)
                    setAverage(Number(PartMarche[0].average_tarif_per_chaine).toFixed(2));
                       
                       break;       
                 }
            
                 }else if(base==='duree'){
                    switch(media){
                        case 'radio':
                            var dataset=PartMarche.forEach((elem)=>{
                                const item={
                                     x:elem.Chaine_Lib + elem.proportion,
                                     y:Number(elem.total_duree)}
                                    
                                  array[0].data.push(item)
                                  return array;
                             })
                            console.log(array)
                        setAverage(Number(PartMarche[0].average_duree_per_chaine).toFixed(2));
                           
                           break;
                        case 'television':
                            var dataset=PartMarche.forEach((elem)=>{
                                const item={
                                     x:elem.Chaine_Lib + elem.proportion,
                                     y:Number(elem.total_duree)}
                                    
                                  array[0].data.push(item)
                                  return array;
                             })
                            console.log(array)
                        setAverage(Number(PartMarche[0].average_duree_per_chaine).toFixed(2));
                        break;
            
                    }
                       
                 }

        }
      

     },[])


    const series = [{
        data: [{
            x: 'New Delhi',
            y: 218
        },
        {
            x: 'Kolkata',
            y: 149
        },
        {
            x: 'Mumbai',
            y: 184
        },
        {
            x: 'Ahmedabad',
            y: 55
        },
        {
            x: 'Bangaluru',
            y: 84
        },
        {
            x: 'Pune',
            y: 31
        },
        {
            x: 'Chennai',
            y: 70
        },
        {
            x: 'Jaipur',
            y: 30
        },
        {
            x: 'Surat',
            y: 44
        },
        {
            x: 'Hyderabad',
            y: 68
        },
        {
            x: 'Lucknow',
            y: 28
        },
        {
            x: 'Indore',
            y: 19
        },
        {
            x: 'Kanpur',
            y: 29
        }
        ]
    }]
    var options = {
        legend: {
            show: false
        },
        chart: {
            height: 350,
            type: 'treemap',
            toolbar: {
                show: false
            }
        },
        title: {
            text: `Part Marché ${average}` ,
            align: 'center',
            style: {
                fontWeight: 600,
            }
        },
        subtitle: {
            text: `Base ${base} pour ${media}` ,
            align: 'center',
            style: {
                fontWeight: 300,
            }
        },
        colors: chartDatalabelsBarColors ,
        plotOptions: {
            treemap: {
                distributed: true,
                enableShades: false
            }
        }
    };

    return (
        <>

        {(!PartMarche.length)? (

<        img src={WatingChart} alt="immar"/>
            ):(<ReactApexChart
                dir="ltr"
                className="apex-charts"
                series={array}
                options={options}
                type="treemap"
                height={365}
            />)}
        
        
        
        </>
       
    )
}

export const TreemapRepartitionFormat = () => {
    const chartDatalabelsBarColors = [
        // "#FF99CC", // Pastel pink
        // "#33CC33", // Lime green
        // "#0066CC", // Deep blue
        // "#FFCC00", // Bright orange
        // "#6600CC", // Rich purple
        // "#CCFFCC", // Soft green
        // "#0099CC", // Sky blue
        // "#FF6600", // Warm red
        // "#CC0099", // Fuchsia
        // "#0033CC", // Navy blue
        // "#99CC00", // Chartreuse
        // "#660066", // Eggplant
        // "#CCCCFF", // Pastel blue
        // "#FF0033", // Bright red
        // "#33CCCC", // Teal
        // "#006600", // Forest green
        // "#CC6600", // Burnt orange
        // "#9900CC", // Plum
        // "#33FFCC", // Aquamarine
        // "#006633", // Sage green
        // "#FFCCCC", // Soft peach
        // "#660033", // Burgundy
        // "#CCFF99", // Mint green
        // "#009933", // Olive green
        // "#FF66CC", // Hot pink
        // "#33CC99", // Seafoam green
        // "#006699", // Steel blue
        // "#CC0033", // Cranberry
        // "#99FFCC", // Pale green
        // "#660099", // Violet
        "#00a6e0",
        "#0099d5",
        "#008ac9",
        "#007ebd",
        "#0072b1",
        "#0066a5",
        "#005d99",
        "#00538d",
        "#004c81",
        "#00446f",
        "#003d5d",
        "#003a4b",
        "#00334a",
        "#002f3a",
        "#002a39",
        "#002435",
        "#001f31",
        "#001b2d",
        "#00171a",
        "#001415"
      ];
    const {FormatRepartition}=UsePigeDashboardStore((state)=>state);
    const {base, media}=UseFiltersStore((state)=>state);
    const [average, setAverage]=useState(0);
    const [array, setArray]=useState([{
        data:[]
    }]);
    
     useEffect(()=>{
      
        if(FormatRepartition && FormatRepartition.length !==0){
            if(base==="volume"){
                switch(media){
                    case 'presse':
                        var dataset=FormatRepartition.forEach((elem)=>{
                          const item={
                               x:elem.format +" "+ Number(elem.proportion).toFixed(2),
                               y:Number(elem.appearance_count)}
                              
                            array[0].data.push(item)
                            return array;
                       })
                      //to avoid the error of tofixed
                     
                        setAverage(Number(FormatRepartition[0].average_ratio).toFixed(2));
                    
                       break
                    case 'radio':
                        var dataset=FormatRepartition.forEach((elem)=>{
                            const item={
                                 x:elem.RadioPub_Format +"S"+" " + Number(elem.proportion).toFixed(2)+"%",
                                 y:Number(elem.format_count)}
                                
                              array[0].data.push(item)
                              return array;
                         })
                        if(FormatRepartition && FormatRepartition.length!==0){

                            
                           
                            setAverage(Number(FormatRepartition[0].average_diffusion_per_format).toFixed(2));
                        }
                         
                       
                       break;
                       case 'television':
                        var dataset=FormatRepartition.forEach((elem)=>{
                            const item={
                                 x:elem.RadioPub_Format +"S"+" " + Number(elem.proportion).toFixed(2)+"%",
                                 y:Number(elem.format_count)}
                                
                              array[0].data.push(item)
                              return array;
                         })
                        if(FormatRepartition && FormatRepartition.length!==0){

                            
                           
                            setAverage(Number(FormatRepartition[0].average_diffusion_per_format).toFixed(2));
                        }
                         
                       
                       break;
                }
            
                 }else if(base ==="budget"){
                 switch(media){
                    case 'presse':
                        var dataset=FormatRepartition.forEach((elem)=>{
                            const item={
                                 x:elem.format +" "+ Number(elem.proportion).toFixed(2),
                                 y:Number(elem.total_tarif)}
                                
                              array[0].data.push(item)
                              return array;
                         })
                        //to avoid the error of tofixed
                       
                          setAverage(Number(FormatRepartition[0].average_tarif_per_format).toFixed(2));
                          break;
                    case 'radio':
                        var dataset=FormatRepartition.forEach((elem)=>{
                            const item={
                                 x:elem.RadioPub_Format+ Number(elem.proportion).toFixed(2),
                                 y:Number(elem.total_tarif)}
                                
                              array[0].data.push(item)
                              return array;
                         })
                       
                    setAverage(Number(FormatRepartition[0].average_tarif_per_format).toFixed(2));
                       
                       break;
                       case 'television':
                        var dataset=FormatRepartition.forEach((elem)=>{
                            const item={
                                 x:elem.RadioPub_Format+ Number(elem.proportion).toFixed(2),
                                 y:Number(elem.total_tarif)}
                                
                              array[0].data.push(item)
                              return array;
                         })
                       
                    setAverage(Number(FormatRepartition[0].average_tarif_per_format).toFixed(2));
                       
                       break;      
                 }
            
                 }else if(base==='duree'){
                  switch(media){
                        case 'radio':
                            var dataset=FormatRepartition.forEach((elem)=>{
                                const item={
                                     x:elem.RadioPub_Format + Number(elem.proportion).toFixed(2),
                                     y:Number(elem.total_duree)}
                                    
                                  array[0].data.push(item)
                                  return array;
                             })
                            console.log(array)
                        setAverage(Number(FormatRepartition[0].average_duree_per_format).toFixed(2));
                           
                           break;
                        case 'television':
                            
                        var dataset=FormatRepartition.forEach((elem)=>{
                            const item={
                                 x:elem.RadioPub_Format + Number(elem.proportion).toFixed(2),
                                 y:Number(elem.total_duree)}
                                
                              array[0].data.push(item)
                              return array;
                         })
                        console.log(array)
                    setAverage(Number(FormatRepartition[0].average_duree_per_format).toFixed(2));
                    
                    break;
            
                    }
                       
                 }

        }
      

     },[])


    const series = [{
        data: [{
            x: 'New Delhi',
            y: 218
        },
        {
            x: 'Kolkata',
            y: 149
        },
        {
            x: 'Mumbai',
            y: 184
        },
        {
            x: 'Ahmedabad',
            y: 55
        },
        {
            x: 'Bangaluru',
            y: 84
        },
        {
            x: 'Pune',
            y: 31
        },
        {
            x: 'Chennai',
            y: 70
        },
        {
            x: 'Jaipur',
            y: 30
        },
        {
            x: 'Surat',
            y: 44
        },
        {
            x: 'Hyderabad',
            y: 68
        },
        {
            x: 'Lucknow',
            y: 28
        },
        {
            x: 'Indore',
            y: 19
        },
        {
            x: 'Kanpur',
            y: 29
        }
        ]
    }]
    var options = {
        legend: {
            show: false
        },
        chart: {
            height: 350,
            type: 'treemap',
            toolbar: {
                show: false
            }
        },
        title: {
            text: `Répartition par format ${average}` ,
            align: 'center',
            style: {
                fontWeight: 600,
            }
        },
        subtitle: {
            text: `Base ${base} pour ${media}` ,
            align: 'center',
            style: {
                fontWeight: 300,
            }
        },
        colors: chartDatalabelsBarColors ,
        plotOptions: {
            treemap: {
                distributed: true,
                enableShades: false
            }
        }
    };

    return (
        <>

        {(!FormatRepartition.length)? (

<        img src={WatingChart} alt="immar"/>
            ):(<ReactApexChart
                dir="ltr"
                className="apex-charts"
                series={array}
                options={options}
                type="treemap"
                height={365}
            />)}
        
        
        
        </>
       
    )
}


