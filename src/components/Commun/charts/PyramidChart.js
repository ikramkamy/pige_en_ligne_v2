import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { UsePigeDashboardStore } from 'store/dashboardStore/PigeDashboardStore';
import { UseFiltersStore } from 'store/dashboardStore/FiltersStore';




export const ApexChart = () => {
  const { Top20famillesSectorielles,getTop20famillesSectoriellesPresse }=UsePigeDashboardStore((state)=>state)
   const {base,Filtersupports,familles,classes,secteurs,varieties,annonceurs,
    marques,produits,media}=UseFiltersStore((state)=>state);
     const [data,setData]=useState([]);
     const [names,setNames]=useState([]);
     const [average, setAverage]=useState(0);
     console.log('Top20famillesSectorielles in pyramid',Top20famillesSectorielles)
    useEffect(()=>{
      if(Top20famillesSectorielles && Top20famillesSectorielles.length!==0){
          if(base ==='budget'  ){

              switch(media){
                 case 'presse':
                  setNames(Top20famillesSectorielles.map((elem)=>elem.Famille + " " + " " + Number(elem.percentage).toFixed(2) + "%"))
                    var list=Top20famillesSectorielles.map((elem)=>Number(elem.total_tarif).toFixed(2))  
                    setData(list)
                    break;
                  case 'radio' :
                      setNames(Top20famillesSectorielles.map((elem)=>elem.Famille + " " + " " + Number(elem.proportion).toFixed(2) + "%"))
                      var list = Top20famillesSectorielles.map((elem)=>Number(elem.famille_tarif).toFixed(2)) 
  
                       setData(list)
                       setAverage (Number(Top20famillesSectorielles[0].average_tarif_per_famille).toFixed(2))
                  break;
                  case 'television' :
                      setNames(Top20famillesSectorielles.map((elem)=>elem.Famille + " " + " " + Number(elem.proportion).toFixed(2) + "%"))
                      var list = Top20famillesSectorielles.map((elem)=>Number(elem.famille_tarif).toFixed(2)) 
  
                       setData(list)
                       setAverage (Number(Top20famillesSectorielles[0].average_tarif_per_famille).toFixed(2))
                  break;
                  
                      }
          
          
          }else if (base==='volume') {
                    switch(media){
                      case 'presse':
                          setNames(Top20famillesSectorielles.map((elem)=>elem.Famille + " " + " " + Number(elem.percentage).toFixed(2) + "%"))   
                          var  list=Top20famillesSectorielles.map((elem)=>Number(elem.appearance_count) )
                          setData(list)
                        
                          break;
                      case 'radio' : 
                      setNames(Top20famillesSectorielles.map((elem)=>elem.Famille + " " + " " + Number(elem.proportion).toFixed(2) + "%"))
                      var list = Top20famillesSectorielles.map((elem)=>elem.famille_count) 
                      setData(list)
                      console.log("list familles volum radio", list)
                      setAverage (Number(Top20famillesSectorielles[0].average_diffusion_per_famille).toFixed(2))
                         break;
                      case 'television' : 
                         setNames(Top20famillesSectorielles.map((elem)=>elem.Famille + " " + " " + Number(elem.proportion).toFixed(2) + "%"))
                         var list = Top20famillesSectorielles.map((elem)=>elem.famille_count) 
                         setData(list)
                         console.log("list familles volum television", list)
                         setAverage (Number(Top20famillesSectorielles[0].average_diffusion_per_famille).toFixed(2))
                            break;
                      }}
          else if (base==='duree'){
             switch(media){
              case 'radio' : 
               
                      setNames(Top20famillesSectorielles.map((elem)=>elem.Famille + " " + " " + Number(elem.proportion).toFixed(2) + "%"))
                      var list = Top20famillesSectorielles.map((elem)=>elem.total_duree) 
                      setData(list)
                      console.log("list familles volum radio", list)
                      setAverage (Number(Top20famillesSectorielles[0].average_duree_per_famille).toFixed(2))
                         break;
              case 'television' : 
               
                         setNames(Top20famillesSectorielles.map((elem)=>elem.Famille + " " + " " + Number(elem.proportion).toFixed(2) + "%"))
                         var list = Top20famillesSectorielles.map((elem)=>elem.total_duree) 
                         setData(list)
                         console.log("list familles volum radio", list)
                         setAverage (Number(Top20famillesSectorielles[0].average_duree_per_famille).toFixed(2))
                            break;
             }
  
  
  
  
  
          }
      }

      
    

},[])
  console.log('data in pyramid chart', data)
  console.log('names in pyramid chart', names)
  const [series, setSeries] = useState([
    {
      name: "",
      data: [1380, 1100, 990, 880, 740, 548, 330, 200],
      // data: [114, 86, 65, 42, 23, 22, 17, 15, 15, 14, 12, 4, 4],
      //data: data,
    },
  ]);

  const [options, setOptions] = useState({
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 0,
        horizontal: true,
        distributed: true,
        barHeight: '80%',
        isFunnel: true,
      },
    },
    colors: [
      '#FF69B4', 
      '#FFC107', 
      '#9C27B0', 
      '#7A288A', 
      '#4CAF50',
      '#2196F3',
      '#03A9F4', 
      '#00BCD4', 
      '#00BCD4', 
      '#00BCD4', 
      '#00BCD4', 
      '#00BCD4', 

      '#00BCD4', 
      '#00BCD4', 
      '#00BCD4', 
      '#00BCD4', 
    ],
    dataLabels: {
      enabled: true,
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex];
      },
      dropShadow: {
        enabled: true,
      },
    },
    title: {
      text: 'Top 20 familles ',
      align: 'middle',
    },
    xaxis: {
      // categories: ['Sweets', 'Processed Foods', 
      //   'Healthy Fats', 'Meat', 'Beans & Legumes', 
      //   'Dairy', 'Fruits & Vegetables', 
      //   'Grains'],
      //  categories:names
      categories: [
        "BTP & Construction  26.33%",
        "Banques - Finances & Assurance  19.86%",
        "Evenementiel  15.01%",
        "TÃ©lÃ©communications  9.70%",
        "Alimentation  5.31%",
        "Energie  5.08%",
        "Pharmacie-MÃ©decine  3.93%",
        "Medias & Communication  3.46%",
        "Enseignement & Formation  3.46%",
        "Transport  3.23%",
        "Informatique & bureautique    2.77%",
        "Equipement ElectromÃ©nager  0.92%",
        "Institutions  0.92%"
    ]
    },
    legend: {
      show: false,
    },
  });
  
  
  // useEffect(()=>{
  //   console.log("base for calling topfamille", base)
  //   console.log('Filtersupports',Filtersupports)
  //   getTop20famillesSectoriellesPresse && getTop20famillesSectoriellesPresse(
  //       Filtersupports,
  //       familles,
  //       classes,
  //       secteurs,
  //       varieties,
  //       annonceurs,
  //       marques,
  //       produits,
  //       base)
  //       console.log("Top20famillesSectoriellesPresse in chart",Top20famillesSectoriellesPresse);

  // },[base])
  
  
  
const getTopfamille=()=>{
  console.log("base in function calling",base)
    getTop20famillesSectoriellesPresse && getTop20famillesSectoriellesPresse(
        Filtersupports,
        familles,
        classes,
        secteurs,
        varieties,
        annonceurs,
        marques,
        produits,
        base
      ) 
}

  return (
    <div style={{marginTop:"35px"}}>
        {/* <button onClick={()=>getTopfamille()}>Get Top familles</button> */}
      <div id="chart">
        <ReactApexChart options={options} series={series} type="bar" height={400} />
      </div>
      {/* <div id="html-dist"></div> */}
    </div>
  );
};




