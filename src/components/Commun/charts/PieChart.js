import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { UsePigeDashboardStore } from '../../../store/dashboardStore/PigeDashboardStore';
import { Card, Col, Row } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import ReactEcharts from "echarts-for-react";
import { UseFiltersStore } from 'store/dashboardStore/FiltersStore';
import { useEffect, useState } from "react";
import BaseDialog from '../DialogueBox';
import WatingChart from 'assets/img/loading3.gif';
import SelectGraphOptions from './SelectGraphOptions';
import { UseGraphStore } from 'store/GraphStore';
export function PieActiveArc() {
  const { PartMarche } = UsePigeDashboardStore((state) => state)
  const array = [];
  const dataset = PartMarche.forEach((elem) => {
    const item = {
      id: elem.Titre_Lib,
      value: Number(elem.appearance_count),
      label: elem.Titre_Lib,
    }
    array.push(item)
    return array;
  })

  return (
    <PieChart
      colors={['#8B0A1A', '#45B3FA', '#F7DC6F', '#9B59B6', '#2ECC71']} // move it here
      series={[
        {
          data,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          colors: ['#8B0A1A', '#45B3FA', '#F7DC6F', '#9B59B6', '#2ECC71'], // add this line
        },
      ]}
      height={200}
    />
  );
}

export const PieChartVelson = () => {

  const chartDatalabelsBarColors = [
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
  const { PartMarche, getPrtMarchet } = UsePigeDashboardStore((state) => state);

  const { base, media, baseGraphe, Filtersupports, Filterfamilles, 
    Filterclassesids, Filtersecteursids, Filtervarietiesids, 
    Filterannonceursids, Filtermarquesids, Filterproduitsids, rangs, date1, date2 } = UseFiltersStore((state) => state)
  const [average, setAverage] = useState(0);
  const [array, setArray] = useState([]);

  useEffect(() => {

    if (PartMarche && PartMarche.length !== 0) {
      //console.log('PartMarche', PartMarche)
      //2797
      if (base === "volume" || baseGraphe === 'volume') {
        switch (media) {
          case 'presse':
            var list = [];
            var dataset = PartMarche.forEach((elem) => {
              const item = {
                value: Number(elem.appearance_count),
                name: `${elem.Titre_Lib}  ${Number(elem.proportion).toFixed(2) + "%"}`,
              }
              list.push(item)
              return array;
            })
            setArray(list)

            var list2 = list.map((e) => e.value)
            // setAverage(Number(PartMarche[0].average_ratio).toFixed(2));
            var sum = list2.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
            var average20 = sum / list.length;
            //console.log("average 20", average20)
            setAverage(average20.toFixed(2))
            break
          case 'radio':
            var list = [];
            var dataset = PartMarche.forEach((elem) => {
              const item = {
                //  x:elem.Chaine_Lib + elem.proportion,
                //  y:Number(elem.chaine_count)
                value: Number(elem.chaine_count),
                name: `${elem.Chaine_Lib}  ${Number(elem.proportion).toFixed(2) + "%"}`,
              }

              list.push(item)
              return array;
            })

            setArray(list)
            var list2 = list.map((e) => e.value)
            // setAverage(Number(PartMarche[0].average_diffusion_per_chaine).toFixed(2));

            var sum = list2.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
            var average20 = sum / list2.length;
            //console.log("average 20", average20)
            setAverage(average20.toFixed(2))

            break;
          case 'television':
            var list = [];
            var dataset = PartMarche.forEach((elem) => {

              const item = {
                //  x:elem.Chaine_Lib + elem.proportion,
                //  y:Number(elem.chaine_count)
                value: Number(elem.chaine_count),
                name: `${elem.Chaine_Lib}  ${Number(elem.proportion).toFixed(2) + "%"}`,
              }

              list.push(item)
              return array;
            })
            setArray(list)
            var list2 = list.map((e) => e.value)
            // if(PartMarche && PartMarche.length!==0){
            //     //console.log(Number(PartMarche[0].average_diffusion_per_chaine).toFixed(2))
            //     setAverage(Number(PartMarche[0].average_diffusion_per_chaine).toFixed(2));
            // }
            //console.log("liste2",list2)
            var sum = list2.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
            var average20 = sum / list.length;
            //console.log("average 20", average20)
            setAverage(average20.toFixed(2))

            break;
        }

      } else if (base === "budget" || baseGraphe === 'budget') {
        switch (media) {
          case 'presse':
            var list = [];
            var dataset = PartMarche.forEach((elem) => {

              const item = {
                value: Number(elem.total_tarif).toFixed(2),
                name: `${elem.Titre_Lib}  ${Number(elem.proportion).toFixed(2) + "%"}`,
              }

              list.push(item)
              return array;
            })
            setArray(list);
            var list2 = list.map((e) => e.value)
            // setAverage(Number(PartMarche[0].average_tarif_per_titre).toFixed(2));
            var sum = list2.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
            var average20 = sum / list2.length;
            //console.log("average 20", average20)
            setAverage(average20.toFixed(2))
            break;
          case 'radio':
            var list = [];
            var dataset = PartMarche.forEach((elem) => {
              const item = {
                //    x:elem.Chaine_Lib + elem.proportion,
                //    y:Number(elem.total_tarif)
                value: Number(elem.total_tarif).toFixed(2),
                name: `${elem.Chaine_Lib}  ${Number(elem.proportion).toFixed(2) + "%"}`,

              }

              list.push(item)
              return array;
            })
            setArray(list);
            var list2 = list.map((e) => e.value)
            //console.log('liste2', list2)
            // setAverage(Number(PartMarche[0].average_tarif_per_chaine).toFixed(2));
            var sum = list2.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
            var average20 = sum / list2.length;
            //console.log("average 20", average20)
            setAverage(average20.toFixed(2))
            break;
          case 'television':
            var list = [];
            var dataset = PartMarche.forEach((elem) => {
              const item = {

                value: Number(elem.total_tarif).toFixed(2),
                name: `${elem.support}  ${Number(elem.proportion).toFixed(2) + "%"}`,

              }

              list.push(item)
              return array;
            })
            setArray(list)
            var list2 = list.map((e) => e.value)
            // setAverage(Number(PartMarche[0].average_tarif_per_chaine).toFixed(2));

            var sum = list.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
            var average20 = sum / list2.length;
            //console.log("average 20", average20)
            setAverage(average20.toFixed(2))
            break;
        }

      } else if (base === 'duree' || baseGraphe === 'duree') {
        switch (media) {
          case 'radio':
            var list = [];
            var dataset = PartMarche.forEach((elem) => {
              const item = {
                value: Number(elem.total_duree).toFixed(2),
                name: `${elem.Chaine_Lib}  ${Number(elem.proportion).toFixed(2) + "%"}`,
              }
              list.push(item)
              return array;
            })
            setArray(list)
            var list2 = list.map((e) => e.total_duree)
            // setAverage(Number(PartMarche[0].average_duree_per_chaine).toFixed(2));
            var sum = list2.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
            var average20 = sum / list.length;
            //console.log("average 20", average20)
            setAverage(average20.toFixed(2))
            break;
          case 'television':
            var list = [];
            var dataset = PartMarche.forEach((elem) => {
              const item = {
                //    x:elem.Chaine_Lib + elem.proportion,
                //    y:Number(elem.total_duree)

                value: Number(elem.total_duree).toFixed(2),
                name: `${elem.Chaine_Lib}  ${Number(elem.proportion).toFixed(2) + "%"}`,

              }

              list.push(item)
              return array;
            })
            setArray(list)
            var list2 = list.map((e) => e.value)
            //setAverage(Number(PartMarche[0].average_duree_per_chaine).toFixed(2));
            var sum = list2.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
            var average20 = sum / list.length;
            //console.log("average 20", average20)
            setAverage(average20.toFixed(2))
            break;

        }

      }

    }


  }, [PartMarche])

  var option = {
    tooltip: {
      trigger: 'item',

    },
    color: chartDatalabelsBarColors,
    series:
      [{
        name: `Part Marché base ${base} `,
        type: 'pie',
        radius: '50%',
        title: "Part de Marché",
        data: array,

        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }],

    textStyle: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: 16,
      color: 'red',
      fontWeight: 500,
    },
  };
  const [codeColor, setCodeColor] = useState('#F7F7F7')
  const getData = () => {
    if (base === "budget") {
      setCodeColor('#ff9966')

    } else if (base === "volume") {
      setCodeColor('#d1edd3')

    } else if (base === 'duree') {
      setCodeColor('#d1ebed')
    }
    getPrtMarchet && getPrtMarchet(Filtersupports, Filterfamilles, 
      Filterclassesids, Filtersecteursids, Filtervarietiesids, 
      Filterannonceursids, Filtermarquesids, Filterproduitsids, base, media, rangs, date1, date2)

  }

  return (
    <div  >
      <Card style={{ borderRadius: 10, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <CardHeader style={{ backgroundColor: codeColor, padding: 20, borderBottom: '1px solid #ddd' }}>
          <Row>
            <Col>
              <h4 className="card-title mb-0" style={{ fontSize: 14, fontWeight: 500, color: '#333' }}>
                Part de Marché
              </h4>
            </Col>
            <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <h4 className="card-title mb-0" style={{ fontSize: 14, fontWeight: 500, color: '#333' }}>
                La moyenne = {average}
                <BaseDialog getData={getData} title="Part de Marché" />
              </h4>

            </Col>

          </Row>
        </CardHeader>

        <div className="card-body" style={{ padding: 0 }} id="charts-container5">
          <ReactEcharts 
         
          style={{ height: '450px' }}          
          option={option} />
        </div>
      </Card>

    </div>
  )
}
export const PieChartRepartitionFormat = () => {

  const {AnnonceursOptions,setAnnonceursOptions}=UseGraphStore((state)=>state)
  const chartDatalabelsBarColors = [
    // "#C7E6F6",
    // "#B9D9E4",
    // "#ACCBE2",
    // "#9BC4D0",
    // "#8AA9C9",
    // "#7797BE",
    // "#6885B3",
    // "#5974A8",
    // "#49679D",
    // "#3B638F",
    // "#2F5992",
    // "#245F85",
    // "#1B5678",
    // "#145A6B",
    // "#0F4F5E",
    // "#094753",
    // "#043C48",
    // "#00333D",
    // "#002B34",
    // "#00222B"
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
  const { FormatRepartition, getRepartitionFormat } = UsePigeDashboardStore((state) => state);

  const { base, media, baseGraphe, Filtersupports, 
    Filterfamilles, Filterclassesids, Filtersecteursids, Filtervarietiesids, Filterannonceursids, Filtermarquesids, Filterproduitsids, rangs, date1, date2 } = UseFiltersStore((state) => state)
  const [average, setAverage] = useState(0);
  const [array, setArray] = useState([]);

  useEffect(() => {
    if (FormatRepartition && FormatRepartition.length !== 0) {
      //console.log("FormatRepartition", FormatRepartition)
      if (base === "volume" || baseGraphe === 'volume') {
        switch (media) {
          case 'presse':
            var list = [];
            var dataset = FormatRepartition.forEach((elem) => {
              const item = {
                value: Number(elem.appearance_count),
                name: `${elem.format}  ${Number(elem.proportion).toFixed(2) + "%"}`,
              }
              list.push(item)
              //array.push(item)
              return array;
            })
            //console.log('array presse volume', array)
            setArray(list)
            var list2 = list.map((e) => e.value)
            //setAverage(Number(PartMarche[0].average_duree_per_chaine).toFixed(2));
            var sum = list2.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
            var average20 = sum / list.length;
            //console.log("average 20", average20)
            setAverage(average20.toFixed(2))
            //setAverage(Number(FormatRepartition[0].average_ratio).toFixed(2));
            break
          case 'radio':
            var list = [];
            var dataset = FormatRepartition.forEach((elem) => {
              const item = {
                //  x:elem.Chaine_Lib + elem.proportion,
                //  y:Number(elem.chaine_count)
                value: Number(elem.format_count),
                name: `${elem.RadioPub_Format + "s "}   ${Number(elem.proportion).toFixed(2) + "%"}`,
              }

              list.push(item)
              return array;
            })
            setArray(list)
            //
            //                 setAverage(Number(FormatRepartition[0].
            //  average_diffusion_per_format
            //                             ).toFixed(2));

            var list2 = list.map((e) => e.value)
            //setAverage(Number(PartMarche[0].average_duree_per_chaine).toFixed(2));
            var sum = list2.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
            var average20 = sum / list.length;
            //console.log("average 20", average20)
            setAverage(average20.toFixed(2))

            break;
          case 'television':
            var list = [];
            var dataset = FormatRepartition.forEach((elem) => {

              const item = {
                //  x:elem.Chaine_Lib + elem.proportion,
                //  y:Number(elem.chaine_count)
                value: Number(elem.format_count),
                name: `${elem.TelePub_Format + "s "}  ${Number(elem.proportion).toFixed(2) + "%"}`,
              }

              list.push(item)
              return array;
            })
            setArray(list)
            // if (FormatRepartition && FormatRepartition.length !== 0) {

            //   setAverage(Number(FormatRepartition[0].average_diffusion_per_format).toFixed(2));
            // }
            var list2=list.map((e)=>e.value)
            //setAverage(Number(PartMarche[0].average_duree_per_chaine).toFixed(2));
            var sum = list2.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
            var average20 = sum / list.length;
            //console.log("average 20", average20)
            setAverage(average20.toFixed(2))


            break;
        }

      } else if (base === "budget" || baseGraphe === 'budget') {
        switch (media) {
          case 'presse':
            var list = [];
            var dataset = FormatRepartition.forEach((elem) => {

              const item = {
                value: Number(elem.total_tarif).toFixed(2),
                name: `${elem.format}  ${Number(elem.proportion).toFixed(2) + "%"}`,
              }

              list.push(item)
              return array;
            })
            setArray(list);
            //setAverage(Number(FormatRepartition[0].average_tarif_per_format).toFixed(2));
            var list2=list.map((e)=>e.value)
            //setAverage(Number(PartMarche[0].average_duree_per_chaine).toFixed(2));
            var sum = list2.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
            var average20 = sum / list.length;
            //console.log("average 20", average20)
            setAverage(average20.toFixed(2))
            break;
          case 'radio':
            var list = [];
            var dataset = FormatRepartition.forEach((elem) => {
              const item = {
                //    x:elem.Chaine_Lib + elem.proportion,
                //    y:Number(elem.total_tarif)
                value: Number(elem.total_tarif).toFixed(2),
                name: `${elem.RadioPub_Format}  ${Number(elem.proportion).toFixed(2) + "%"}`,

              }

              list.push(item)
              return array;
            })
            setArray(list);
            //setAverage(Number(FormatRepartition[0].average_tarif_per_chaine).toFixed(2));
            var list2=list.map((e)=>e.value)
            //setAverage(Number(PartMarche[0].average_duree_per_chaine).toFixed(2));
            var sum = list2.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
            var average20 = sum / list.length;
            //console.log("average 20", average20)
            setAverage(average20.toFixed(2))
            break;
          case 'television':
            var list = [];
            var dataset = FormatRepartition.forEach((elem) => {
              const item = {
                //    x:elem.Chaine_Lib + elem.proportion,
                //    y:Number(elem.total_tarif)
                value: Number(elem.total_tarif).toFixed(2),
                name: `${elem.Pub_Format}  ${Number(elem.proportion).toFixed(2) + "%"}`,

              }

              list.push(item)
              return array;
            })
            setArray(list)
            //setAverage(Number(FormatRepartition[0].average_tarif_per_format).toFixed(2));
            var list2=list.map((e)=>e.value)
            //setAverage(Number(PartMarche[0].average_duree_per_chaine).toFixed(2));
            var sum = list2.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
            var average20 = sum / list.length;
            //console.log("average 20", average20)
            setAverage(average20.toFixed(2))
            break;
        }

      } else if (base === 'duree' || baseGraphe === 'duree') {
        switch (media) {
          case 'radio':
            var list = [];
            var dataset = FormatRepartition.forEach((elem) => {
              const item = {
                value: Number(elem.total_duree).toFixed(2),
                name: `${elem.RadioPub_Format}  ${Number(elem.proportion).toFixed(2) + "%"}`,
              }
              list.push(item)
              return array;
            })
            setArray(list)
            setAverage(Number(FormatRepartition[0].average_duree_per_format).toFixed(2));

            break;
          case 'television':
            var list = [];
            var dataset = FormatRepartition.forEach((elem) => {
              const item = {
                //    x:elem.Chaine_Lib + elem.proportion,
                //    y:Number(elem.total_duree)

                value: Number(elem.total_duree).toFixed(2),
                name: `${elem.TelePub_Format + "s"}  ${Number(elem.proportion).toFixed(2) + "%"}`,

              }

              list.push(item)
              return array;
            })
            setArray(list)
            setAverage(Number(FormatRepartition[0].average_duree_per_format).toFixed(2));
            break;

        }

      }

    }


  }, [FormatRepartition])

console.log("Annonceurs options",AnnonceursOptions)
console.log("Annonceurs options array",array)
useEffect(()=>{
var autresList=array.filter((e)=> !AnnonceursOptions.includes(e))

var valueAutre=autresList.map((e)=> Number(e.value))
var PourcentageAutre=autresList.map((e)=> Number(e.name.split(" ")[2].split('%')[0]))
const totalSum = valueAutre.reduce((accumulator, currentValue) => accumulator + currentValue, 0); 
const totalSumPourcentage = PourcentageAutre.reduce((accumulator, currentValue) => accumulator + currentValue, 0); 

var autre={value:totalSum,name:`autres ${totalSumPourcentage}%` }
// console.log("autres",autre,autresList[0].name.split(" ")[2])
setAnnonceursOptions && setAnnonceursOptions([...AnnonceursOptions,autre])
},[array, AnnonceursOptions])
  var option = {
    tooltip: {
      trigger: 'item',

    },
    color: chartDatalabelsBarColors,
    series:
      [{
        name: `Part Marché base ${base} `,
        type: 'pie',
        radius: '50%',
        title: "Part de Marché",
        //data: array,
        data:AnnonceursOptions,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }],

    textStyle: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: 16,
    },
  };
  const [codeColor, setCodeColor] = useState('#F7F7F7')
  const getData = () => {
    if (base === "budget") {
      setCodeColor('#ff9966')
    } else if (base === "volume") {
      setCodeColor('#d1edd3')
    } else if (base === 'duree') {
      setCodeColor('#d1ebed')
    }
    getRepartitionFormat && 
    getRepartitionFormat(Filtersupports, Filterfamilles, 
      Filterclassesids, Filtersecteursids, Filtervarietiesids, 
      Filterannonceursids, Filtermarquesids, Filterproduitsids, base, media, rangs, date1, date2)
  }

  return (
    <div  >
      <Card style={{ borderRadius: 10, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <CardHeader style={{ backgroundColor: codeColor, padding: 20, borderBottom: '1px solid #ddd' }}>
          <Row>
            <Col>
              <h4 className="card-title mb-0" style={{ fontSize: 14, fontWeight: 500, color: '#333' }}>
                Répartition par Format
              </h4>
            </Col>
            <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <h4 className="card-title mb-0" style={{ fontSize: 14, fontWeight: 500, color: '#333' }}>
                La moyenne = {average}
                <BaseDialog getData={getData} title="Répartition par Format" />
              </h4>

            </Col>

          </Row>
       
       <SelectGraphOptions options={array}/>
        </CardHeader>

        {(FormatRepartition) ? (
          <div className="card-body" style={{ padding: 0 }} id="charts-container6">
            <ReactEcharts 
           
            style={{ height: '450px' }} 
            
            option={option} />
          </div>

        ) : (
          <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <img src={WatingChart} alt="immar" />
          </div>


        )}
      </Card>

    </div>
  )
}


