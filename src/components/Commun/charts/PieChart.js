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
import { SelectGraphOptions, SelectGraphOptionsMarche } from './SelectGraphOptions';
import { UseGraphStore } from 'store/GraphStore';
import ColorCheckboxes from './BaseCheckBoxGroupe';
import { BarChartIcon, PieChartIcon } from "lucide-react";
import html2canvas from "html2canvas";
import CircularProgress from '@mui/material/CircularProgress';
// export function PieActiveArc() {
//   const { PartMarche ,formatDateToFrench} = UsePigeDashboardStore((state) => state)
//   const array = [];
//   const dataset = PartMarche.forEach((elem) => {
//     const item = {
//       id: elem.Titre_Lib,
//       value: Number(elem.appearance_count),
//       label: elem.Titre_Lib,
//     }
//     array.push(item)
//     return array;
//   })

//   return (
//     <PieChart
//       colors={['#8B0A1A', '#45B3FA', '#F7DC6F', '#9B59B6', '#2ECC71']} // move it here
//       series={[
//         {
//           data,
//           highlightScope: { faded: 'global', highlighted: 'item' },
//           faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
//           colors: ['#8B0A1A', '#45B3FA', '#F7DC6F', '#9B59B6', '#2ECC71'], // add this line
//         },
//       ]}
//       height={200}
//     />
//   );
// }

export const PieChartVelson = ({ date1, date2, data, title, isloading,
  ChangeBaseFunction, parametre, SetOptionFunction, filter, initialOptions }) => {
    const { PartMarche, FormatRepartition } = UsePigeDashboardStore((state) => state);
    const { MarcheOptions, setBaseGraphs,baseGraphs } = UseGraphStore((state) => state)
  //const chartDatalabelsBarColors = ['#bc1854', '#a01542', '#851230', '#6a0f1e', '#4f0c0c']
  const [chartDatalabelsBarColors, setChartDatalabelsBarColors] = useState([])
  const chartDatalabelsBarColorsVolume = ['#C8E6C9', '#81C784', '#43A047', '#2E7D32', '#1B5E20'];
  const chartDatalabelsBarColorsBudget = ['#BBDEFB', '#64B5F6', '#2196F3', '#1976D2', '#0D47A1'];
  const chartDatalabelsBarColorsDuree = ['#bc1854', '#a01542', '#851230', '#6a0f1e', '#4f0c0c'];
  const colorMapping = [
    { value: 'volume', codeColor: chartDatalabelsBarColorsVolume },
    { value: 'budget', codeColor: chartDatalabelsBarColorsBudget },
    { value: 'duree', codeColor: chartDatalabelsBarColorsDuree}
  ];
  const LocalBaseGraph = baseGraphs[parametre] == "" ? base : baseGraphs[parametre]
  const getColorByValue = (value) => {
    const item = colorMapping.find(item => item.value === value);
    return item ? item.codeColor : '#2196f3';
  }

  //   "#d81b60",
  //   "#2196f3",
  //   "#43a047",
 

  const { base } = UseFiltersStore((state) => state)
  const [average, setAverage] = useState(0);
  const [dynamicList, setDynamicList] = useState([])
  const [array, setArray] = useState([])

  useEffect(() => {
    setBaseGraphs && setBaseGraphs(parametre, base)
  }, [])

  useEffect(()=>{
    let array=getColorByValue(LocalBaseGraph)
     console.log('array',array)
     setChartDatalabelsBarColors(array)
  },[baseGraphs])
  const display = data?.map((elem) => {
    return {
      value: Number(elem.total),
      name: `${elem.name}-${Number(elem.proportion).toFixed(2) + "%"}`,
    }
  })
  useEffect(() => {
    if (data && data.length !== 0) {
      const list = data.map((elem) => ({
        value: Number(elem.total),
        name: `${elem.name}-${Number(elem.proportion).toFixed(2)}%`,
      }));
      setArray(list);

      const list2 = list.map((e) => e.value);
      const sum = list2.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
      const average20 = sum / list.length;
      setAverage(average20.toFixed(2));
    }
  }, [PartMarche, FormatRepartition]);


  const ModifyList = () => {
    var autresList = array.filter((e) => !data.includes(e))

    var valueAutre = autresList.map((e) => Number(e.value))
    var PourcentageAutre = autresList.map((e) => Number(e.name.split('-')[1].split('%')[0]))

    const totalSum = valueAutre.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const totalSumPourcentage = PourcentageAutre.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    var listWithAutre = initialOptions;
    // var autre = {
    //   value: totalSum.toFixed(2).toString(),
    //   name: `autres ${totalSumPourcentage.toFixed(2)}%`
    // }
    // listWithAutre.push(autre)
    setDynamicList([...listWithAutre])
  }
  //console.log("array repartition format all",data,array,dynamicList)
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
        data: dynamicList,

        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
          }
        },
        label: {
          normal: {
            show: true,
            fontSize: 14,
            fontWeight: 'normal',
            color: 'white',
            fontFamily: 'Arial, sans-serif',
          },
        },
        labelLine: {
          normal: {
            show: true, // Hide the lines connecting the labels to the slices
          },
        },
      }],

    textStyle: {
      fontFamily: '',
      fontSize: 16,
      color: 'red',
      fontWeight: 100,
    },

  };


  const handleDownloadChart = () => {
    console.log('download')
    const chartContainer = document.querySelector(".bar-chart-container");
    if (!chartContainer) return;

    html2canvas(chartContainer, {
      onclone: (clonedDoc) => {
        // Find the cloned container and set its background to black
        const clonedContainer = clonedDoc.querySelector(".bar-chart-container");
        if (clonedContainer) {
          clonedContainer.style.backgroundColor = "black"; // Set black background for the cloned element
        }
      },
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png"); // Convert canvas to PNG
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "chart.png"; // Set the filename
      link.click(); // Trigger the download
    });

  };
  return (
    <div className='mt-4' style={{ color: "white" }}>
      <Card style={{
        borderRadius: 10,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: "transparent",
        color: "white",
        border: "1px solid lightgrey",
        position: "relative",
      }}>

        {isloading && (
          <div style={{
            position: "absolute", height: "100%", width: "100%",
            backgroundColor: "#FFFFFF4D", zIndex: 3, top: "0px", left: "0px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"

          }}>
            <CircularProgress />
          </div>
        )}
        <div className="card-body p-4" style={{
          padding: 0,
          display: "flex", flexDirection: "column"
        }} id="charts-container5">
          <div style={{
            width: "100%", display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
            paddingTop: "5px"
          }}>
            <div>{title}</div>
            <div>La moyenne ={Number(average).toFixed(2)}</div>
            <SelectGraphOptionsMarche
              UpdatedGraphDisplay={ModifyList}
              options={array}
              filter={filter}
              SetOptionFunction={SetOptionFunction}
            />
          </div>
          {/* {formatDateToFrench(date1)} - {formatDateToFrench(date2)} */}
          <ReactEcharts
            style={{
              height: '350px',
              display: "flex",
              justifyContent: "center"
            }}
            option={option} />
          <div className=""
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
            <ColorCheckboxes ChangeBaseFunction={ChangeBaseFunction} parametre={parametre} />
            <PieChartIcon onClick={handleDownloadChart} style={{ cursor: "pointer" }} />
          </div>
        </div>
      </Card>
    </div>
  )
}
export const PieChartRepartitionFormat = () => {

  const { AnnonceursOptions, setAnnonceursOptions } = UseGraphStore((state) => state)
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
  const { FormatRepartition, getRepartitionFormat, formatDateToFrench } = UsePigeDashboardStore((state) => state);
  const { base, media, baseGraphe, Filtersupports,
    Filterfamilles, Filterclassesids, Filtersecteursids,
    Filtervarietiesids, Filterannonceursids,
    Filtermarquesids, Filterproduitsids, rangs, date1, date2 } = UseFiltersStore((state) => state)
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
                name: `${elem.RadioPub_Format + "s"}  ${Number(elem.proportion).toFixed(2) + "%"}`,
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
          case 'television':
            var list = [];
            var dataset = FormatRepartition.forEach((elem) => {

              const item = {
                //  x:elem.Chaine_Lib + elem.proportion,
                //  y:Number(elem.chaine_count)
                value: Number(elem.format_count),
                name: `${elem.TelePub_Format + "s"}  ${Number(elem.proportion).toFixed(2) + "%"}`,
              }

              list.push(item)
              return array;
            })
            setArray(list)
            // if (FormatRepartition && FormatRepartition.length !== 0) {

            //   setAverage(Number(FormatRepartition[0].average_diffusion_per_format).toFixed(2));
            // }
            var list2 = list.map((e) => e.value)
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
            var list2 = list.map((e) => e.value)
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
            var list2 = list.map((e) => e.value)
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
  const [dynamicList, setDynamicList] = useState(AnnonceursOptions)
  const ModifyList = () => {
    var autresList = array.filter((e) => !AnnonceursOptions.includes(e))
    var valueAutre = autresList.map((e) => Number(e.value))
    if (media === "presse") {
      setDynamicList(AnnonceursOptions)
    } else {
      var PourcentageAutre = autresList.map((e) => Number(e.name.split(" ")[2].split('%')[0]))
      const totalSum = valueAutre.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      const totalSumPourcentage = PourcentageAutre.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      var listWithAutre = AnnonceursOptions;
      var autre = {
        value: totalSum.toFixed(2).toString(),
        name: `autres ${totalSumPourcentage.toFixed(2)}%`
      }
      listWithAutre.push(autre)
      setDynamicList([...listWithAutre])

    }

  }

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
        data: dynamicList,
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
        Filterannonceursids, Filtermarquesids,
        Filterproduitsids, base, media, rangs, date1, date2)
  }

  return (
    <div  >
      <Card style={{ borderRadius: 10, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <CardHeader style={{ backgroundColor: codeColor, padding: 20, borderBottom: '1px solid #ddd' }}>
          <Row>
            <Col>
              <h4 className="card-title mb-0"
                style={{ fontSize: 14, fontWeight: 500, color: '#333' }}>
                Répartition par Format
              </h4>
            </Col>
            <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <h4 className="card-title mb-0"
                style={{ fontSize: 14, fontWeight: 500, color: '#333' }}>
                La moyenne = {average}

              </h4>

            </Col>

          </Row>
          <Row style={{ display: "flex", justifyContent: "space-between" }}>
            <Col>
              <BaseDialog getData={getData} title="Répartition par Format" />
            </Col>
            <Col style={{ display: 'flex', justifyContent: 'flex-end', padding: "0px" }}>
              <SelectGraphOptions options={array} UpdatedGraphDisplay={ModifyList}

              />
            </Col>
          </Row>
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


