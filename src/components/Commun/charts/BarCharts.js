import React, { useEffect, useState } from 'react';
import ReactApexChart from "react-apexcharts";
import user from "assets/img/new_logo.png";
import { UsePigeDashboardStore } from 'store/dashboardStore/PigeDashboardStore';
import { UseFiltersStore } from 'store/dashboardStore/FiltersStore';
import getChartColorsArray from "./ChartsDynamicColor";
import WatingChart from 'assets/img/loading3.gif';
import { Card, Col, Row } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import BaseDialog from '../../Commun/DialogueBox';
import { SelectGraphOptionsAnnonceurParsupport, SelectGraphOptionsCreationParAnnonceur } from './SelectGraphOptions'
import { UseGraphStore } from 'store/GraphStore';
const Basic = ({ dataColors }) => {
    var BasicColors = getChartColorsArray(dataColors);
    const series = [{
        data: [380, 430, 450, 475, 550, 584, 780, 1100, 1220, 1365]
    }];

    const options = {
        chart: {
            toolbar: {
                show: !1,
            }
        },
        plotOptions: {
            bar: {
                horizontal: !0,
            }
        },
        dataLabels: {
            enabled: !1
        },
        colors: BasicColors,
        grid: {
            borderColor: "#f1f1f1",
        },
        xaxis: {
            categories: ["South Korea", "Canada", "United Kingdom", "Netherlands", "Italy", "France", "Japan", "United States", "China", "Germany"],
        }
    };

    return (
        <React.Fragment>
            <ReactApexChart
                dir="ltr"
                className="apex-charts"
                options={options}
                series={series}
                type="bar"
                height={350}
            />
        </React.Fragment>
    );
};
const CustomDataLabelFamilles = () => {
    //var chartDatalabelsBarColors = getChartColorsArray(dataColors);
    const { Top20famillesSectorielles, getTop20famillesSectorielles } = UsePigeDashboardStore((state) => state)
    const { base, media, Filtersupports, Filterfamilles,
        Filterclassesids, Filtersecteursids,
        Filtervarietiesids, Filterannonceursids,
        Filtermarquesids,
        Filterproduitsids, rangs, date1, date2 } = UseFiltersStore((state) => state)
    const [names, setNames] = useState([])

    const [data, setData] = useState([])
    const [average, setAverage] = useState(0)

    const [codeColor, setCodeColor] = useState('#F7F7F7')
    const getData = () => {
        setData([])

        if (base === "budget") {
            setCodeColor('#ff9966')

        } else if (base === "volume") {
            setCodeColor('#d1edd3')

        } else if (base === 'duree') {
            setCodeColor('#d1ebed')
        }
        getTop20famillesSectorielles && getTop20famillesSectorielles
            (Filtersupports, Filterfamilles, Filterclassesids, Filtersecteursids,
                Filtervarietiesids, Filterannonceursids, Filtermarquesids, Filterproduitsids, base, media, rangs, date1, date2)

    }
    useEffect(() => {
        if (Top20famillesSectorielles && Top20famillesSectorielles.length !== 0) {
            if (base === 'budget') {

                switch (media) {
                    case 'presse':
                        setNames(Top20famillesSectorielles.map((elem) => elem.famille + " " + " " + " (" + Number(elem.percentage).toFixed(2) + "%" + ")"))
                        var list = Top20famillesSectorielles.map((elem) => Number(elem.total_tarif).toFixed(2))
                        setData(list)
                        setAverage(Number(Top20famillesSectorielles[0].average_tarif_per_famille).toFixed(2))
                        break;
                    case 'radio':
                        setNames(Top20famillesSectorielles.map((elem) => elem.Famille + " " + " " + " (" + Number(elem.proportion).toFixed(2) + "%" + ")"))
                        var list = Top20famillesSectorielles.map((elem) => Number(elem.famille_tarif).toFixed(2))

                        setData(list)
                        setAverage(Number(Top20famillesSectorielles[0].average_tarif_per_famille).toFixed(2))
                        break;
                    case 'television':
                        setNames(Top20famillesSectorielles.map((elem) => elem.famille + " " + " " + " (" + Number(elem.proportion).toFixed(2) + "%" + ")"))
                        var list = Top20famillesSectorielles.map((elem) => Number(elem.famille_tarif).toFixed(2))

                        setData(list)
                        ////console.log('list,familletv', names)
                        setAverage(Number(Top20famillesSectorielles[0].average_tarif_per_famille).toFixed(2))
                        break;

                }


            } else if (base === 'volume') {
                switch (media) {
                    case 'presse':
                        setNames(Top20famillesSectorielles.map((elem) => elem.Famille + " " + " " + " (" + Number(elem.percentage).toFixed(2) + "%" + ")"))
                        var list = Top20famillesSectorielles.map((elem) => Number(elem.appearance_count))
                        setData(list)
                        setAverage(Number(Top20famillesSectorielles[0].average_insertions_per_famille).toFixed(2))


                        break;
                    case 'radio':
                        setNames(Top20famillesSectorielles.map((elem) => elem.Famille + " " + " " + " (" + Number(elem.proportion).toFixed(2) + "%" + ")"))
                        var list = Top20famillesSectorielles.map((elem) => elem.famille_count)
                        setData(list)
                        ////console.log("list familles volum radio", list)
                        setAverage(Number(Top20famillesSectorielles[0].average_diffusion_per_famille).toFixed(2))
                        break;
                    case 'television':
                        setNames(Top20famillesSectorielles.map((elem) => elem.Famille + " " + " " + " (" + Number(elem.proportion).toFixed(2) + "%" + ")"))
                        var list = Top20famillesSectorielles.map((elem) => elem.famille_count)
                        setData(list)
                        ////console.log("list familles volum television", list)
                        setAverage(Number(Top20famillesSectorielles[0].average_diffusion_per_famille).toFixed(2))
                        break;
                }
            }
            else if (base === 'duree') {
                switch (media) {
                    case 'radio':

                        setNames(Top20famillesSectorielles.map((elem) => elem.Famille + " " + " " + " (" + Number(elem.proportion).toFixed(2) + "%" + ")"))
                        var list = Top20famillesSectorielles.map((elem) => elem.total_duree)
                        setData(list)
                        ////console.log("list familles volum radio", list)
                        setAverage(Number(Top20famillesSectorielles[0].average_duree_per_famille).toFixed(2))
                        break;
                    case 'television':

                        setNames(Top20famillesSectorielles.map((elem) => elem.Famille + " " + " " + " (" + Number(elem.proportion).toFixed(2) + "%" + ")"))
                        var list = Top20famillesSectorielles.map((elem) => elem.total_duree)
                        setData(list)
                        ////console.log("list familles volum radio", list)
                        setAverage(Number(Top20famillesSectorielles[0].average_duree_per_famille).toFixed(2))
                        break;
                }





            }
        }




    }, [Top20famillesSectorielles])

    const chartDatalabelsBarColors = [
        // "#FFC107", // Warm orange
        // "#8BC34A", // Muted green
        // "#45B3FA", // Soft blue
        // "#E67E73", // Pastel pink
        // "#F7DC6F", // Soft yellow
        // "#2196F3", // Deep blue
        // "#9C27B0", // Rich purple
        // "#66D9EF", // Soft blue-green
        // "#FF69B4", // Bright pink
        // "#34C759", // Lime green
        // "#1A1D23", // Dark gray
        // "#8E76A8", // Muted purple
        // "#2F4F7F", // Dark blue
        // "#9B59B6", // Rich pink
        // "#33B5E5", // Soft blue
        // "#F2C464", // Softer yellow
        // "#4CAF50", // Deep green
        // "#03A9F4", // Bright blue
        // "#E5E5EA", // Light gray
        // "#8F9E45", // Earthy brown
        // "#FF9900" // Warm red

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
    ]

    const series = [{
        data: data,

    }];

    var options = {
        chart: {
            type: 'bar',
            height: 350,
            toolbar: {
                show: false,
            }
        },
        plotOptions: {
            bar: {
                barHeight: '100%',
                distributed: true,
                horizontal: true,
                borderRadius: 5,
                dataLabels: {
                    position: 'bottom'
                },
            }
        },
        colors: chartDatalabelsBarColors,
        dataLabels: {
            enabled: true,
            textAnchor: 'start',
            style: {
                //colors: ['#2F4F7F'],
                colors: ['#000000'],

            },
            formatter: function (val, opt) {
                const categoryLabel = opt.config.xaxis.categories_labels[opt.dataPointIndex];
                const startIndex = categoryLabel.indexOf('(');
                const substring = categoryLabel.substring(startIndex, categoryLabel.length);

                return substring + val;
            },
            offsetX: 0,
            dropShadow: {
                enabled: false
            }
        },
        stroke: {
            width: 1,
            colors: ['#fff']
        },
        xaxis: {
            categories: names.map((el) => {
                return el.split('(')[0]
            }),
            categories_labels: names,

            grid: {
                show: false, // hide the horizontal grid lines
                lines: {
                    show: false, // hide the horizontal grid lines
                    lineWidth: 0,
                },
            },
            lines: {
                show: false,
                lineWidth: 0,
            }
        },
        yaxis: {
            labels: {
                show: true
            },
            style: {
                colors: ['red']
            },
            lines: {
                show: false, // hide the horizontal grid lines
                lineWidth: 0,
            },
            grid: {
                show: false, // hide the horizontal grid lines
                lines: {
                    show: false, // hide the horizontal grid lines
                    lineWidth: 0,
                    strokeWidth: 0,
                },
            },
            border: {
                bottom: {
                    show: false,
                },
            },
        },
        lines: {
            show: false,
            strokeWidth: 0,
        },
        title: {
            //text: 'Top 20 des familles sectorielle',
            align: 'center',
            floating: true,
            margin: 25,
            style: {
                fontWeight: 800,
            },
        },
        subtitle: {
            //text: `Base ${base} pour ${media} Moyenne ${Number(average).toFixed(2)}`,
            align: 'center',
            margin: 25,
        },
        tooltip: {
            theme: 'light',
            x: {
                show: false
            },
            y: {
                title: {
                    formatter: function () {
                        return '';
                    }
                }
            }
        },
        legend: {
            show: false
        },

    };

    return (
        <div >
            <Card style={{ borderRadius: 10, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <CardHeader style={{ backgroundColor: codeColor, padding: 20, borderBottom: '1px solid #ddd' }}>
                    <Row>
                        <Col>
                            <h4 className="card-title mb-0" style={{ fontSize: 18, fontWeight: 500, color: '#333' }}>
                                Top 20 des familles sectorielles
                            </h4>
                        </Col>
                        <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <h4 className="card-title mb-0" style={{ fontSize: 18, fontWeight: 500, color: '#333' }}>
                                La moyenne = {average}
                                {/* <DropDownBaseRepartitionFormat getData={getData} /> */}
                                <BaseDialog getData={getData} title="Top 20 familles Sectorielles" />
                            </h4>

                        </Col>

                    </Row>


                </CardHeader>



                {(data.length !== 0 || Top20famillesSectorielles) ? (

                    <ReactApexChart
                        id='charts-container1'
                        dir="ltr"
                        className="apex-charts"
                        options={options}
                        series={series}
                        type="bar"
                        style={{ margin: "5px" }}
                        height={350}
                    />) : (

                    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <img src={WatingChart} alt="immar" />
                    </div>



                )}
            </Card>
        </div>



    );
};
const CustomDataLabelAnnonceurs = () => {
    //var chartDatalabelsBarColors = getChartColorsArray(dataColors);
    const { Top20Annonceurs, getTop20Annonceurs } = UsePigeDashboardStore((state) => state)
    const { base, media, Filtersupports, Filterfamilles, Filterclassesids, Filtersecteursids, Filtervarietiesids, Filterannonceursids, Filtermarquesids, Filterproduitsids, rangs, date1, date2 } = UseFiltersStore((state) => state)

    const [data, setData] = useState([])
    const [average, setAverage] = useState(0)
    const [names, setNames] = useState()
    const [codeColor, setCodeColor] = useState('#F7F7F7')
    const getData = () => {
        if (base === "budget") {
            setCodeColor('#ff9966')

        } else if (base === "volume") {
            setCodeColor('#d1edd3')

        } else if (base === 'duree') {
            setCodeColor('#d1ebed')
        }
        getTop20Annonceurs && getTop20Annonceurs(Filtersupports, Filterfamilles,
            Filterclassesids, Filtersecteursids, Filtervarietiesids,
            Filterannonceursids, Filtermarquesids, Filterproduitsids, base, media, rangs, date1, date2)

    }
    useEffect(() => {
        if (Top20Annonceurs && Top20Annonceurs.length > 0) {
            if (base === 'budget') {
                switch (media) {
                    case 'presse':
                        setNames(Top20Annonceurs.map((elem) => elem.Annonceur_Nom + " " + " " + " " + "( " + Number(elem.percentage).toFixed(2) + "%" + ")"))
                        var list = Top20Annonceurs.map((elem) => Number(elem.total_tarif).toFixed(2))
                        setData(list)
                        ////console.log("list bdget", list)
                        var sum = list.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
                        ////console.log("sum budget", sum)
                        var average20 = sum / list.length;
                        ////console.log("average 20", average20)
                        setAverage(Number(average20).toFixed(2))



                        break;
                    case 'radio':
                        setNames(Top20Annonceurs.map((elem) => elem.Annonceur_Nom + " " + " " + " (" + Number(elem.proportion).toFixed(2) + "%" + ")"))
                        var list = Top20Annonceurs.map((elem) => Number(elem.annonceur_tarif).toFixed(2))
                        setData(list)
                        var sum = list.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
                        var average20 = sum / list.length;
                        ////console.log("average 20", average20)
                        setAverage(average20.toFixed(2))
                        break;
                    case 'television':
                        setNames(Top20Annonceurs.map((elem) => elem.annonceur + " " + " (" + Number(elem.proportion).toFixed(2) + "%" + ")"))
                        var list = Top20Annonceurs.map((elem) => Number(elem.annonceur_tarif).toFixed(2))
                        setData(list)
                        //console.log('an', Top20Annonceurs)
                        var sum = list.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
                        var average20 = sum / list.length;
                        //console.log("average 20", average20)
                        setAverage(average20.toFixed(2))
                        break;
                }
                //setAverage(Number(Top20Annonceurs[0].average_tarif_per_annonceur).toFixed(2))

            } else if (base == 'volume') {
                switch (media) {
                    case 'presse':
                        //the average value from back-end take in consideration all not only top 20
                        //setAverage(Number(Top20Annonceurs[0].average_insertions_per_annonceur).toFixed(2))
                        setNames(Top20Annonceurs.map((elem) => elem.Annonceur_Nom + " " + " " + "( " + Number(elem.percentage).toFixed(2) + "%" + ")"))
                        var list = Top20Annonceurs.map((elem) => Number(elem.appearance_count))
                        setData(list)
                        //console.log("list vol", list)
                        var sum = list.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
                        var average20 = sum / list.length;
                        //console.log("average 20", average20)
                        setAverage(average20.toFixed(2))

                        break;
                    case 'radio':

                        setNames(Top20Annonceurs.map((elem) => elem.Annonceur_Nom + " " + " " + "( " + Number(elem.proportion).toFixed(2) + "%" + ")"))
                        var list = Top20Annonceurs.map((elem) => Number(elem.annonceur_count))
                        setData(list)
                        //setAverage(Number(Top20Annonceurs[0].average_diffusion_per_annonceur).toFixed(2))
                        var sum = list.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
                        var average20 = sum / list.length;
                        //console.log("average 20", average20)
                        setAverage(average20.toFixed(2))


                        break;
                    case 'television':

                        setNames(Top20Annonceurs.map((elem) => elem.Annonceur_Nom + " "
                            + " " + "( " + Number(elem.proportion).toFixed(2) + "%" + ")"))
                        var list = Top20Annonceurs.map((elem) => Number(elem.annonceur_count))
                        setData(list)
                        //setAverage(Number(Top20Annonceurs[0].average_diffusion_per_annonceur).toFixed(2))
                        var sum = list.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
                        var average20 = sum / list.length;
                        //console.log("average 20", average20)
                        setAverage(average20.toFixed(2))



                        break;
                }


            } else if (base === 'duree') {
                switch (media) {
                    case 'radio':

                        setNames(Top20Annonceurs.map((elem) => elem.Annonceur_Nom + " " + " " + "(" + Number(elem.proportion).toFixed(2) + "%" + ")"))
                        var list = Top20Annonceurs.map((elem) => Number(elem.total_duree))
                        setData(list)
                        //console.log("list volume annonceur", list)
                        //the average value from back-end take in consideration all not only top 20
                        //setAverage(Number(Top20Annonceurs[0].average_duree_per_annonceur).toFixed(2))
                        var sum = list.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
                        var average20 = sum / list.length;
                        //console.log("average 20", average20)
                        setAverage(average20.toFixed(2))
                        break;
                    case 'television':

                        setNames(Top20Annonceurs.map((elem) => elem.Annonceur_Nom + " " + " " + "(" + Number(elem.proportion).toFixed(2) + "%" + ")"))
                        var list = Top20Annonceurs.map((elem) => Number(elem.total_duree))
                        setData(list)
                        //console.log("list volume annonceur", list)
                        //the average value from back-end take in consideration all not only top 20
                        //setAverage(Number(Top20Annonceurs[0].average_duree_per_annonceur).toFixed(2))
                        var sum = list.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
                        var average20 = sum / list.length;
                        //console.log("average 20", average20)
                        setAverage(average20.toFixed(2))
                        break;
                }
            }


        }
    }, [Top20Annonceurs])

    const chartDatalabelsBarColors = [
        // "#FFC107", // Warm orange
        // "#8BC34A", // Muted green
        // "#45B3FA", // Soft blue
        // "#E67E73", // Pastel pink
        // "#F7DC6F", // Soft yellow
        // "#2196F3", // Deep blue
        // "#9C27B0", // Rich purple
        // "#66D9EF", // Soft blue-green
        // "#FF69B4", // Bright pink
        // "#34C759", // Lime green
        // "#1A1D23", // Dark gray
        // "#8E76A8", // Muted purple
        // "#2F4F7F", // Dark blue
        // "#9B59B6", // Rich pink
        // "#33B5E5", // Soft blue
        // "#F2C464", // Softer yellow
        // "#4CAF50", // Deep green
        // "#03A9F4", // Bright blue
        // "#E5E5EA", // Light gray
        // "#8F9E45", // Earthy brown
        // "#FF9900" // Warm red

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
    ]

    const series = [{
        data: data,

    }];
    var options = {
        chart: {
            type: 'bar',
            height: 350,
            toolbar: {
                show: false,
            }
        },
        plotOptions: {
            bar: {
                barHeight: '100%',
                barGap: '50%',
                borderRadius: 5,
                offsetX: 5,
                offsetY: 5,
                distributed: true,
                horizontal: true,
                dataLabels: {
                    position: 'bottom'
                },
            }
        },
        colors: chartDatalabelsBarColors,
        dataLabels: {
            enabled: true,
            textAnchor: 'start',
            style: {
                //colors: ['#2F4F7F']
                colors: ['#000000'],
            },
            formatter: function (val, opt) {
                // return opt.w.globals.labels[opt.dataPointIndex] + "" + val;
                const categoryLabel = opt.config.xaxis.categories_labels[opt.dataPointIndex];
                const startIndex = categoryLabel.indexOf('(');
                const substring = categoryLabel.substring(startIndex, categoryLabel.length);
                return substring + val;
            },
            offsetX: 0,
            dropShadow: {
                enabled: false
            }
        },
        stroke: {
            width: 1,
            colors: ['#fff']
        },
        xaxis: {
            categories: names?.map((el) => {
                return el.split('(')[0]
            }),
            categories_labels: names,

        },
        yaxis: {
            labels: {
                show: true
            }
        },
        title: {
            //text: `Top 20 des annonceurs`,
            align: 'center',
            floating: true,
            style: {
                fontWeight: 800,
            },
        },
        subtitle: {
            // text: `Base ${base} Pour ${media} Moyenne ${Number(average).toFixed(2)}`,
            align: 'center',
            style: {
                fontWeight: 500,

            },
            margin: 25,
        },
        tooltip: {
            theme: 'light',
            x: {
                show: false
            },
            y: {
                title: {
                    formatter: function () {
                        return '';
                    }
                }
            }
        },
        legend: {
            show: false
        }
    };

    return (
        <div >
            <Card style={{ borderRadius: 10, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <CardHeader style={{ backgroundColor: codeColor, padding: 20, borderBottom: '1px solid #ddd' }}>
                    <Row>
                        <Col>
                            <h4 className="card-title mb-0" style={{ fontSize: 18, fontWeight: 500, color: '#333' }}>
                                Top 20 des annonceurs
                            </h4>
                        </Col>
                        <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <h4 className="card-title mb-0" style={{ fontSize: 18, fontWeight: 500, color: '#333' }}>
                                La moyenne = {average}
                                <BaseDialog getData={getData} title="Top 20 des annonceurs" />
                            </h4>

                        </Col>

                    </Row>


                </CardHeader>
                {(data.length !== 0) ? (

                    <ReactApexChart
                        id='charts-container2'
                        style={{ margin: "5px" }}
                        dir="ltr"
                        className="apex-charts"
                        options={options}
                        series={series}
                        type="bar"
                        height={350}
                    />) : (

                    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <img src={WatingChart} alt="immar" />
                    </div>



                )}


            </Card>
        </div>
    );
};
const CustomDataLabelMarques = () => {
    //var chartDatalabelsBarColors = getChartColorsArray(dataColors);
    const { Top20marques, getTop20Marques } = UsePigeDashboardStore((state) => state)
    const { base, media, Filtersupports, Filterfamilles, Filterclassesids, Filtersecteursids, Filtervarietiesids, Filterannonceursids, Filtermarquesids, Filterproduitsids, rangs, date1, date2 } = UseFiltersStore((state) => state)

    const [data, setData] = useState([])
    const [average, setAverage] = useState(0)
    const [names, setNames] = useState()

    useEffect(() => {
        if (Top20marques && Top20marques.length > 0) {
            //console.log("list names television marques", Top20marques)
            if (base === 'budget') {

                switch (media) {
                    case 'presse':
                        setNames(Top20marques.map((elem) => elem.Marque_Lib + " " + " " + "(" + Number(elem.proportion).toFixed(2) + "%" + ")"))
                        var list = Top20marques.map((elem) => Number(elem.total_tarif).toFixed(2))

                        var sum = list.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
                        var average20 = sum / list.length;
                        //console.log("average 20", average20)
                        setAverage(average20.toFixed(2))


                        setData(list)
                        break;
                    case 'radio':
                        setNames(Top20marques.map((elem) => elem.Marque_Lib + " " + " " + "(" + Number(elem.proportion).toFixed(2) + "%" + ")"))
                        var list = Top20marques.map((elem) => Number(elem.marque_tarif).toFixed(2))
                        setData(list)
                        var sum = list.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
                        var average20 = sum / list.length;
                        //console.log("average 20", average20)
                        setAverage(average20.toFixed(2))
                        break;
                    case 'television':
                        setNames(Top20marques.map((elem) => elem.marque + " " + " " + "(" + Number(elem.proportion).toFixed(2) + "%" + ")"))
                        var list = Top20marques.map((elem) => Number(elem.marque_tarif).toFixed(2))
                        setData(list)

                        var sum = list.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
                        var average20 = sum / list.length;
                        //console.log("average 20", average20)
                        setAverage(average20.toFixed(2))
                        break;

                }

                //setAverage(Number(Top20marques[0].average_tarif_per_marque).toFixed(2))
            } else if (base == 'volume') {
                switch (media) {
                    case 'presse':
                        //setAverage(Top20marques[0].average_insertions_per_marque)
                        setNames(Top20marques.map((elem) => elem.Marque_Lib + " " + " " + "(" + Number(elem.percentage).toFixed(2) + "%" + ")"))
                        var list = Top20marques.map((elem) => Number(elem.appearance_count))
                        setData(list)

                        var sum = list.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
                        var average20 = sum / list.length;
                        //console.log("average 20", average20)
                        setAverage(average20.toFixed(2))


                        break;
                    case 'radio':

                        setNames(Top20marques.map((elem) => elem.Marque_Lib + " " + " " + "(" + Number(elem.proportion).toFixed(2) + "%" + ")"))
                        var list = Top20marques.map((elem) => Number(elem.marque_count))
                        setData(list)
                        //console.log("list volume annonceur", list)
                        //setAverage(Number(Top20marques[0].average_diffusion_per_marque).toFixed(2))

                        var sum = list.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
                        var average20 = sum / list.length;
                        //console.log("average 20", average20)
                        setAverage(average20.toFixed(2))


                        break;
                    case 'television':

                        setNames(Top20marques.map((elem) => elem.Marque_Lib + " " + " " + "(" + Number(elem.proportion).toFixed(2) + "%" + ")"))
                        var list = Top20marques.map((elem) => Number(elem.marque_count))
                        setData(list)
                        //console.log("list ", list)
                        //setAverage(Number(Top20marques[0].average_diffusion_per_marque).toFixed(2))

                        var sum = list.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
                        var average20 = sum / list.length;
                        //console.log("average 20", average20)
                        setAverage(average20.toFixed(2))


                        break;
                }


            } else if (base === 'duree') {
                switch (media) {
                    case 'radio':
                        setNames(Top20marques.map((elem) => elem.Marque_Lib + " " + " " + "(" + Number(elem.proportion).toFixed(2) + "%" + ")"))
                        var list = Top20marques.map((elem) => Number(elem.total_duree))
                        setData(list)
                        //setAverage(Number(Top20marques[0].average_duree_per_marque).toFixed(2))

                        var sum = list.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
                        var average20 = sum / list.length;
                        //console.log("average 20", average20)
                        setAverage(average20.toFixed(2))
                        break;
                    case 'television':
                        setNames(Top20marques.map((elem) => elem.Marque_Lib + " " + " " + "(" + Number(elem.proportion).toFixed(2) + "%" + ")"))
                        var list = Top20marques.map((elem) => Number(elem.total_duree))
                        setData(list)
                        // setAverage(Number(Top20marques[0].average_duree_per_marque).toFixed(2))

                        var sum = list.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
                        var average20 = sum / list.length;
                        //console.log("average 20", average20)
                        setAverage(average20.toFixed(2))

                        break;
                }
            }


        }
    }, [Top20marques])

    const chartDatalabelsBarColors = [
        // "#8B9467", // Weathered wood
        // "#45B5AA", // Calming aqua
        // "#FFA07A", // Pastel coral
        // "#2E865F", // Muted teal
        // "#C9E4CA", // Soft mint green
        // "#964B00", // Deep burnt orange
        // "#6495ED", // Soft sky blue
        // "#FFC394", // Warm peach
        // "#34A85A", // Fresh green
        // "#9A7D6E", // Earthy terracotta
        // "#4682B4", // Dusky blue
        // "#F8E231", // Bright sunshine yellow
        // "#B30000", // Rich burgundy
        // "#7BC8A4", // Fresh sage
        // "#FF99CC", // Pastel pink
        // "#4E5338", // Earthy brown
        // "#2C3E50", // Dark gray-blue
        // "#C2C5C7", // Light beige
        // "#E2786F", // Soft rust
        // "#1B3F4E" // Dark navy blue
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


    const series = [{
        data: data,

    }];
    var options = {
        chart: {
            type: 'bar',
            height: 550,
            toolbar: {
                show: false,
            }
        },
        plotOptions: {
            bar: {
                barHeight: '100%',
                distributed: true,
                horizontal: true,
                borderRadius: 5,
                dataLabels: {
                    position: 'bottom',

                },
            }
        },
        colors: chartDatalabelsBarColors,
        dataLabels: {
            enabled: true,
            textAnchor: 'start',
            style: {
                //colors: ['#2F4F7F']
                colors: ['#000000'],
            },
            formatter: function (val, opt) {
                const categoryLabel = opt.config.xaxis.categories_labels[opt.dataPointIndex];
                const startIndex = categoryLabel.indexOf('(');
                const substring = categoryLabel.substring(startIndex, categoryLabel.length);
                // //console.log('we are in data formatter',opt.config.xaxis.categories)
                return substring + val;
            },
            offsetX: 0,
            dropShadow: {
                enabled: false
            }
        },
        stroke: {
            width: 1,
            colors: ['#fff']
        },
        xaxis: {
            categories: names?.map((el) => {
                return el.split('(')[0]
            }),
            categories_labels: names,

        },
        yaxis: {
            labels: {
                show: true
            }
        },
        title: {
            // text: `Top 20 des marques `,
            align: 'center',
            floating: true,
            style: {
                fontWeight: 800,
            },
        },
        subtitle: {
            //text: `Base ${base} Pour ${media} Moyenne ${Number(average).toFixed(2)}`,
            align: 'center',
            margin: 25,
        },
        tooltip: {
            theme: 'light',
            x: {
                show: false
            },
            y: {
                title: {
                    formatter: function () {
                        return '';
                    }
                }
            }
        },
        legend: {
            show: false
        }
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
        getTop20Marques && getTop20Marques(Filtersupports, Filterfamilles, Filterclassesids, Filtersecteursids, Filtervarietiesids, Filterannonceursids, Filtermarquesids, Filterproduitsids, base, media, rangs, date1, date2)

    }

    return (
        <div >
            <Card style={{ borderRadius: 10, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <CardHeader style={{ backgroundColor: codeColor, padding: 20, borderBottom: '1px solid #ddd' }}>
                    <Row>
                        <Col>
                            <h4 className="card-title mb-0" style={{ fontSize: 18, fontWeight: 500, color: '#333' }}>
                                Top 20 des marques
                            </h4>
                        </Col>
                        <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <h4 className="card-title mb-0" style={{ fontSize: 18, fontWeight: 500, color: '#333' }}>
                                La moyenne = {Number(average).toFixed(2)}
                                <BaseDialog getData={getData} title="Top 20 des marques" />
                            </h4>

                        </Col>

                    </Row>


                </CardHeader>

                {(data.length !== 0) ? (

                    <ReactApexChart
                        id='charts-container3'
                        dir="ltr"
                        className="apex-charts"
                        options={options}
                        series={series}
                        type="bar"
                        height={350}
                    />) : (
                    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <img src={WatingChart} alt="immar" />
                    </div>


                )}
            </Card>
        </div>
    );
};
const CustomDataLabelProduits = () => {

    const { Top20produits, getTop20Produits } = UsePigeDashboardStore((state) => state)
    const { base, media, Filtersupports, Filterfamilles, Filterclassesids, Filtersecteursids, Filtervarietiesids, Filterannonceursids, Filtermarquesids, Filterproduitsids, rangs, date1, date2 } = UseFiltersStore((state) => state)

    const [data, setData] = useState([])
    const [average, setAverage] = useState(0)
    const [names, setNames] = useState()

    useEffect(() => {
        if (Top20produits && Top20produits.length > 0) {


            if (base === 'budget') {
                switch (media) {
                    case 'presse':
                        setNames(Top20produits.map((elem) => elem.Produit_Lib + " " + " " + " (" + Number(elem.proportion).toFixed(2) + "%" + ")"))
                        var list = Top20produits.map((elem) => Number(elem.total_tarif).toFixed(2))
                        setData(list)
                        var sum = list.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
                        var average20 = sum / list.length;
                        //console.log("average 20", average20)
                        setAverage(average20.toFixed(2))
                        break;
                    case 'radio':
                        setNames(Top20produits.map((elem) => elem.Produit_Lib + " " + " " + " (" + Number(elem.proportion).toFixed(2) + "%" + ")"))
                        var list = Top20produits.map((elem) => Number(elem.produit_tarif).toFixed(2))
                        setData(list)
                        var sum = list.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
                        var average20 = sum / list.length;
                        //console.log("average 20", average20)
                        setAverage(average20.toFixed(2))
                        break;
                    case 'television':
                        setNames(Top20produits.map((elem) => elem.Product_Name + " " + " " + " (" + Number(elem.proportion).toFixed(2) + "%" + ")"))
                        var list = Top20produits.map((elem) => Number(elem.produit_tarif).toFixed(2))
                        setData(list)
                        var sum = list.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
                        var average20 = sum / list.length;
                        //console.log("average 20", average20)
                        setAverage(average20.toFixed(2))
                        break;

                }

                //setAverage(Number(Top20produits[0].average_tarif_per_produit).toFixed(2))
            } else if (base == 'volume') {
                switch (media) {
                    case 'presse':
                        //setAverage(Top20produits[0].average_ratio)
                        setNames(Top20produits.map((elem) => elem.Produit_Lib + " " + " " + " (" + Number(elem.percentage).toFixed(2) + "%" + ")"))
                        var list = Top20produits.map((elem) => Number(elem.appearance_count))
                        setData(list)

                        var sum = list.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
                        var average20 = sum / list.length;
                        //console.log("average 20", average20)
                        setAverage(average20.toFixed(2))
                        break;
                    case 'radio':

                        setNames(Top20produits.map((elem) => elem.Produit_Lib + " " + " " + " (" + Number(elem.proportion).toFixed(2) + "%" + ")"))
                        var list = Top20produits.map((elem) => Number(elem.produit_count))
                        setData(list)
                        //setAverage(Number(Top20produits[0].average_diffusion_per_produit).toFixed(2))
                        var sum = list.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
                        var average20 = sum / list.length;
                        //console.log("average 20", average20)
                        setAverage(average20.toFixed(2))


                        break;

                    case 'television':

                        setNames(Top20produits.map((elem) => elem.Produit_Lib + " " + " " + " (" + Number(elem.proportion).toFixed(2) + "%" + ")"))
                        var list = Top20produits.map((elem) => Number(elem.produit_count))
                        setData(list)
                        //console.log("list volume annonceur", list)
                        //setAverage(Number(Top20produits[0].average_diffusion_per_produit).toFixed(2))

                        var sum = list.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
                        var average20 = sum / list.length;
                        //console.log("average 20", average20)
                        setAverage(average20.toFixed(2))


                        break;
                }


            } else if (base === 'duree') {
                switch (media) {
                    case 'radio':

                        setNames(Top20produits.map((elem) => elem.Produit_Lib + " " + " " + " (" + Number(elem.proportion).toFixed(2) + "%" + ")"))
                        var list = Top20produits.map((elem) => Number(elem.total_duree))
                        setData(list)

                        //console.log("list volume marques", list)
                        //setAverage(Number(Top20produits[0].average_duree_per_produit).toFixed(2))
                        var sum = list.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
                        var average20 = sum / list.length;
                        //console.log("average 20", average20)
                        setAverage(average20.toFixed(2))

                        break;

                    case 'television':

                        setNames(Top20produits.map((elem) => elem.Produit_Lib + " " + " " + " (" + Number(elem.proportion).toFixed(2) + "%" + ")"))
                        var list = Top20produits.map((elem) => Number(elem.total_duree))
                        setData(list)

                        //console.log("list ", list)
                        //setAverage(Number(Top20produits[0].average_duree_per_produit).toFixed(2))

                        var sum = list.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
                        var average20 = sum / list.length;
                        //console.log("average 20", average20)
                        setAverage(average20.toFixed(2))


                        break;
                }
            }


        }
    }, [Top20produits])

    const chartDatalabelsBarColors = [
        // "#A3CEFF", // Soft cerulean
        // "#FFD7BE", // Warm honey
        // "#8F0A1A", // Deep crimson
        // "#34C759", // Fresh lime
        // "#F7CAC9", // Soft blush
        // "#9C755F", // Earthy sienna
        // "#45B3FA", // Calming blue
        // "#FFA57D", // Pastel tangerine
        // "#2F4F7F", // Dark slate gray
        // "#C5E1A5", // Soft sagebrush
        // "#964B00", // Deep burnt orange
        // "#66D9EF", // Soft aquamarine
        // "#B30000", // Rich burgundy
        // "#7BC8A4", // Fresh eucalyptus
        // "#FFC5C5", // Pastel rose
        // "#4E5338", // Earthy umber
        // "#2C3E50", // Dark navy gray
        // "#C2C5C7", // Light mist
        // "#E2786F", // Soft terracotta
        // "#1A1D23" // Dark charcoal

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

    console.log("top 20produit", Top20produits)
    const series = [{
        data: data,

    }];
    var options = {
        chart: {
            type: 'bar',
            height: 550,
            toolbar: {
                show: false,
            }
        },
        plotOptions: {
            bar: {
                barHeight: '100%',
                distributed: true,
                horizontal: true,
                dataLabels: {
                    position: 'bottom'
                },
            }
        },
        colors: chartDatalabelsBarColors,
        dataLabels: {
            enabled: true,
            textAnchor: 'start',
            style: {
                //colors: ['#2F4F7F']
                colors: ['#000000'],
            },
            formatter: function (val, opt) {
                const categoryLabel = opt.config.xaxis.categories_labels[opt.dataPointIndex];
                const startIndex = categoryLabel.indexOf('(');
                const substring = categoryLabel.substring(startIndex, categoryLabel.length);

                return substring + val;
            },
            offsetX: 0,
            dropShadow: {
                enabled: false
            }
        },
        stroke: {
            width: 1,
            colors: ['#fff']
        },
        xaxis: {
            categories: names?.map((el) => {
                return el.split('(')[0]
            }),
            categories_labels: names,

        },
        yaxis: {
            labels: {
                show: true
            }
        },
        title: {
            // text: `Top 20 produits `,
            align: 'center',
            floating: true,
            style: {
                fontWeight: 800,
            },
        },
        subtitle: {
            // text: `Base ${base} Pour ${media} Moyenne ${Number(average).toFixed(2)}`,
            align: 'center',
            margin: 25,
        },
        tooltip: {
            theme: 'light',
            x: {
                show: false
            },
            y: {
                title: {
                    formatter: function () {
                        return '';
                    }
                }
            }
        },
        legend: {
            show: false
        }
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
        getTop20Produits && getTop20Produits(Filtersupports, Filterfamilles, Filterclassesids, Filtersecteursids, Filtervarietiesids, Filterannonceursids, Filtermarquesids, Filterproduitsids, base, media, rangs, date1, date2)

    }

    return (
        <div >
            <Card style={{ borderRadius: 10, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <CardHeader style={{ backgroundColor: codeColor, padding: 20, borderBottom: '1px solid #ddd' }}>
                    <Row>
                        <Col>
                            <h4 className="card-title mb-0" style={{ fontSize: 18, fontWeight: 500, color: '#333' }}>
                                Top 20 des produits
                            </h4>
                        </Col>
                        <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <h4 className="card-title mb-0" style={{ fontSize: 18, fontWeight: 500, color: '#333' }}>
                                La moyenne = {average}
                                <BaseDialog getData={getData} title="Top 20 des produits" />
                            </h4>

                        </Col>

                    </Row>


                </CardHeader>

                {(data.length !== 0) ? (

                    <ReactApexChart
                        id="charts-container4"
                        dir="ltr"
                        className="apex-charts"
                        options={options}
                        series={series}
                        type="bar"
                        height={350}
                    />) : (

                    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <img src={WatingChart} alt="immar" />
                    </div>



                )}

            </Card>
        </div>
    );
};
const CustomDataLabelAnnonceurParSupport = () => {
    const { AnnonceurParSupport } = UsePigeDashboardStore((state) => state)
    const { AnnonceurSupportOptions } = UseGraphStore((state) => state)
    const { base, media } = UseFiltersStore((state) => state)
    const [data, setData] = useState([])
    const [average, setAverage] = useState(0)
    const [names, setNames] = useState()
    // console.log("AnnonceurSupportOptions",AnnonceurSupportOptions)
    const [dynamicList, setDynamicList] = useState([])
    useEffect(() => {
        if (AnnonceurParSupport && AnnonceurParSupport.length > 0) {

            switch (media) {
                case 'presse':
                    //setAverage(Number(AnnonceurParSupport[0].average_ratio).toFixed(2))
                    setNames(AnnonceurSupportOptions.map((elem) => elem.Titre_Lib + " " + "( " + Number(elem.proportion).toFixed(2) + "%" + ")"))
                    var list = AnnonceurSupportOptions.map((elem) => Number(elem.annonceur_count))
                    setData(list)
                    //console.log("list volume annonceur", list)
                    var sum = list.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
                    var average20 = sum / list.length;
                    //console.log("average 20", average20)
                    setAverage(average20.toFixed(2))
                    break;
                case 'radio':

                    setNames(AnnonceurSupportOptions.map((elem) => elem.Chaine_Lib + " " + " (" + Number(elem.proportion).toFixed(2) + "%" + ")"))
                    var list = AnnonceurSupportOptions.map((elem) => Number(elem.annonceur_count))
                    setData(list)
                    //console.log("list volume annonceur", list)
                    //setAverage(Number(AnnonceurParSupport[0].average_annonceur_count).toFixed(2))
                    var sum = list.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
                    var average20 = sum / list.length;
                    //console.log("average 20", average20)
                    setAverage(average20.toFixed(2))

                    break;
                case 'television':

                    setNames(AnnonceurSupportOptions.map((elem) =>
                        elem.Chaine_Lib + " " + " (" + Number(elem.proportion).toFixed(2) + "%" + ")"))
                    var list = AnnonceurSupportOptions.map((elem) => Number(elem.annonceur_count))
                    setData(list)
                    var sum = list.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
                    var average20 = sum / list.length;
                    setAverage(average20.toFixed(2))

                    break;
            }
        }
    }, [AnnonceurParSupport, AnnonceurSupportOptions])

    const ModifyList = () => {
        var autresList = AnnonceurParSupport.filter((e) => !AnnonceurSupportOptions.includes(e))

        // var autresList = AnnonceurParSupport 
        var valueAutre = autresList.map((e) => Number(e.annonceur_count))
        var PourcentageAutre = autresList.map((e) => Number(e.proportion))
        const totalSum = valueAutre.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        const totalSumPourcentage = PourcentageAutre.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        var listWithAutre = AnnonceurSupportOptions;
        var autre = {
            annonceur_count: totalSum.toFixed(2).toString(),
            proportion: totalSumPourcentage.toFixed(2),
            Chaine_Lib: `autres`,
            Titre_Lib: "autre"
        }
        listWithAutre.push(autre)
        setDynamicList([...listWithAutre])
        console.log("dynamic list", dynamicList, AnnonceurParSupport)
    }
    const chartDatalabelsBarColors = [
        // "#FF69B4", // Hot magenta
        // "#33CC33", // Bright lime
        // "#FFC0CB", // Pastel peach
        // "#00698F", // Deep cobalt
        // "#FFD200", // Vibrant yellow
        // "#8F24AA", // Rich lavender
        // "#33B5E5", // Bright sky blue
        // "#FFA500", // Warm orange
        // "#4CAF50", // Fresh basil
        // "#9E9E9E", // Dark silver
        // "#FF7F24", // Pastel carrot
        // "#2196F3", // Deep royal blue
        // "#F8E231", // Bright sunshine
        // "#9C27B0", // Rich fuchsia
        // "#03A9F4", // Calming turquoise
        // "#E5E5EA", // Light fog
        // "#FF3737", // Hot red
        // "#1B5E20" // Dark forest
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

    const series = [{
        data: data,
    }];
    var options = {
        chart: {
            type: 'bar',
            height: 750,
            toolbar: {
                show: false,
            }
        },
        plotOptions: {
            bar: {
                barHeight: '100%',
                distributed: true,
                horizontal: true,
                dataLabels: {
                    position: 'bottom'
                },
            }
        },
        colors: chartDatalabelsBarColors,
        dataLabels: {
            enabled: true,
            textAnchor: 'start',
            style: {
                // colors: ['#2F4F7F']
                colors: ['#000000'],
            },
            formatter: function (val, opt) {
                const categoryLabel = opt.config.xaxis.categories_labels[opt.dataPointIndex];
                const startIndex = categoryLabel.indexOf('(');
                const substring = categoryLabel.substring(startIndex, categoryLabel.length);
                ////console.log('we are in data formatter',opt.config.xaxis.categories)
                return substring + val;
            },
            offsetX: 0,
            dropShadow: {
                enabled: false
            }
        },
        stroke: {
            width: 1,
            colors: ['#fff']
        },
        xaxis: {
            categories: names?.map((el) => {
                return el.split('(')[0]
            }),
            categories_labels: names,
        },
        yaxis: {
            labels: {
                show: true
            }
        },
        title: {
            // text: `Nombre d’annonceurs actifs par support `,
            align: 'center',
            floating: true,
            style: {
                fontWeight: 800,
            },
        },
        subtitle: {
            // text: `Base ${base} Pour ${media} Moyenne ${Number(average).toFixed(2)}`,
            align: 'center',
            margin: 25,
        },
        tooltip: {
            theme: 'light',
            x: {
                show: false
            },
            y: {
                title: {
                    formatter: function () {
                        return '';
                    }
                }
            }
        },
        legend: {
            show: false
        }
    };


    return (
        <div >
            <Card style={{ borderRadius: 10, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <CardHeader style={{ backgroundColor: '#f7f7f7', padding: 20, borderBottom: '1px solid #ddd' }}>
                    <Row>
                        <Col>
                            <h4 className="card-title mb-0"
                                style={{ fontSize: 16, fontWeight: 500, color: '#333' }}>
                                Nombre d’annonceurs actifs par support
                            </h4>
                        </Col>
                        <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <h4 className="card-title mb-0"
                                style={{ fontSize: 18, fontWeight: 500, color: '#333' }}>
                                La moyenne = {average}

                            </h4>

                        </Col>

                    </Row>
                    <Row>
                        <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <SelectGraphOptionsAnnonceurParsupport
                                media={media}
                                options={AnnonceurParSupport} UpdatedGraphDisplay={ModifyList}
                            />
                        </Col>
                    </Row>
                </CardHeader>

                {(data.length !== 0) ? (

                    <ReactApexChart
                        id='charts-container7'
                        dir="ltr"
                        className="apex-charts"
                        options={options}
                        series={series}
                        type="bar"
                        height={350}
                    />) : (
                    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <img src={WatingChart} alt="immar" />
                    </div>

                )}


            </Card>
        </div>
    );
};

const CustomDataLabelCreationParAnnonceur = () => {

    const { CreationParAnnonceur } = UsePigeDashboardStore((state) => state)
    const { base, media } = UseFiltersStore((state) => state)
    const { setCreationParAnnonceurOptions,
        CreationParAnnonceurOptions } = UseGraphStore((state) => state)
    const [data, setData] = useState([])
    const [average, setAverage] = useState(0)
    const [names, setNames] = useState()

    useEffect(() => {
        if (CreationParAnnonceur && CreationParAnnonceur.length > 0) {
            //console.log('media')
            switch (media) {
                case 'presse':
                    setNames(CreationParAnnonceurOptions.map((elem) => elem.Annonceur_Nom + " " + " (" + Number(elem.proportion).toFixed(2) + "%" + ")"))
                    var list = CreationParAnnonceurOptions.map((elem) => Number(elem.pressepub_count))
                    setData(list)
                    //setAverage(Number(CreationParAnnonceur[0].average_ratio).toFixed(2))
                    var sum = list.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
                    var average20 = sum / list.length;
                    //console.log("average 20", average20)
                    setAverage(average20.toFixed(2))
                    // //console.log("CreationParAnnonceur ici", data)
                    break;
                case 'radio':
                    setNames(CreationParAnnonceurOptions.map((elem) => elem.Annonceur_Nom + " " + " (" + Number(elem.proportion).toFixed(2) + "%" + ")"))
                    var list = CreationParAnnonceurOptions.map((elem) => Number(elem.radiopub_count).toFixed(2))
                    setData(list)
                    //console.log("list names", names)
                    //setAverage(Number(CreationParAnnonceur[0].average_radiopub_count_per_annonceur).toFixed(2))
                    var sum = list.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
                    var average20 = sum / list.length;
                    //console.log("average 20", average20)
                    setAverage(average20.toFixed(2))
                    break;
                case 'television':
                    setNames(CreationParAnnonceurOptions.map((elem) => elem.Annonceur_Nom + " " + " (" + Number(elem.proportion).toFixed(2) + "%" + ")"))
                    var list = CreationParAnnonceurOptions.map((elem) => Number(elem.radiopub_count).toFixed(2))
                    setData(list)
                    //console.log("list names", names)
                    //setAverage(Number(CreationParAnnonceur[0].average_radiopub_count_per_annonceur).toFixed(2))
                    var sum = list.reduce((accumulator, currentValue) => Number(accumulator) + parseFloat(currentValue), 0);
                    var average20 = sum / list.length;
                    //console.log("average 20", list)
                    setAverage(average20.toFixed(2))
                    break;
            }
        }
    }, [CreationParAnnonceur, CreationParAnnonceurOptions])

    const chartDatalabelsBarColors = [
        // "#FF99CC", // Pastel pink
        // "#34A85A", // Fresh mint
        // "#8B9467", // Earthy olive
        // "#45B3FA", // Calming blue
        // "#F7DC6F", // Soft amber
        // "#9C69AB", // Rich plum
        // "#66D9EF", // Soft aquamarine
        // "#FFC107", // Vibrant orange
        // "#2F4F7F", // Dark slate gray
        // "#C5E1A5", // Soft sagebrush
        // "#964B00", // Deep burnt orange
        // "#7BC8A4", // Fresh eucalyptus
        // "#FFA07A", // Pastel coral
        // "#4E5338", // Earthy umber
        // "#2C3E50", // Dark navy gray
        // "#C2C5C7", // Light mist
        // "#E67E73", // Soft salmon
        // "#1A1D23" // Dark charcoal

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
    const [dynamicList, setDynamicList] = useState([])
    const ModifyList = () => {
        var autresList = CreationParAnnonceur.filter((e) => !CreationParAnnonceurOptions.includes(e))
        console.log("autresList",CreationParAnnonceur,CreationParAnnonceurOptions,autresList)

        var valueAutre = [];
        if(media=="presse"){
            var valueAutre = autresList?.map((e) => Number(e.pressepub_count))
        }else{
            var valueAutre = autresList?.map((e) => Number(e.radiopub_count))
        }
        var PourcentageAutre = autresList?.map((e) => Number(e.proportion))
        
        const totalSum = valueAutre.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

        const totalSumPourcentage = PourcentageAutre.reduce((accumulator, currentValue) => accumulator + currentValue, 0);


        var listWithAutre = CreationParAnnonceurOptions;
        var autre = {
            radiopub_count: totalSum.toFixed(2).toString(),
            pressepub_count:totalSum.toFixed(2).toString(),
            proportion: totalSumPourcentage.toFixed(2),
            Annonceur_Nom: `autres`,
            average_radiopub_count_per_annonceur: 0,
            total_crea_count: 0,
            annonceur_count: "0",
            all_pub_count: ""
        }
        console.log("count & pourcentage", autre)
        listWithAutre.push(autre)
        setDynamicList([...listWithAutre])
       
    }

    const series = [{
        data: data,
    }];
    var options = {
        chart: {
            type: 'bar',
            height: 550,
            toolbar: {
                show: false,
            }
        },
        plotOptions: {
            bar: {
                barHeight: '100%',
                distributed: true,
                horizontal: true,
                dataLabels: {
                    position: 'bottom'
                },
            }
        },
        colors: chartDatalabelsBarColors,
        dataLabels: {
            enabled: true,
            textAnchor: 'start',
            style: {
                //colors: ['#2F4F7F']
                colors: ['#000000'],
            },
            formatter: function (val, opt) {
                const categoryLabel = opt.config.xaxis.categories_labels[opt.dataPointIndex];
                const startIndex = categoryLabel.indexOf('(');
                const substring = categoryLabel.substring(startIndex, categoryLabel.length);
                return substring + val;
            },
            offsetX: 0,
            dropShadow: {
                enabled: false
            }
        },
        stroke: {
            width: 1,
            colors: ['#fff']
        },
        xaxis: {
            categories: names?.map((el) => {
                return el.split('(')[0]
            }),
            categories_labels: names,

        },
        yaxis: {
            labels: {
                show: true
            }
        },
        title: {
            //text: `Nombre de créations uniques par annonceurs`,
            align: 'center',
            floating: true,
            style: {
                fontWeight: 800,
            },
        },
        subtitle: {
            //text: `Base ${base} Pour ${media} Moyenne ${Number(average).toFixed(2)}`,
            align: 'center',
            margin: 25,
        },
        tooltip: {
            theme: 'light',
            x: {
                show: false
            },
            y: {
                title: {
                    formatter: function () {
                        return '';
                    }
                }
            }
        },
        legend: {
            show: false
        }
    };


    return (
        <div >

            <Card style={{ borderRadius: 10, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <CardHeader style={{ backgroundColor: '#f7f7f7', padding: 20, borderBottom: '1px solid #ddd' }}>
                    <Row>
                        <Col>
                            <h4 className="card-title mb-0" style={{ fontSize: 14, fontWeight: 500, color: '#333' }}>
                                Nombre de créations uniques par annonceurs
                            </h4>
                        </Col>
                        <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <h4 className="card-title mb-0" style={{ fontSize: 18, fontWeight: 500, color: '#333' }}>
                                La moyenne = {average}

                            </h4>

                        </Col>

                    </Row>
                    <Row>
                        <Col style={{ display: "flex", justifyContent: "flex-end" }}>
                            <SelectGraphOptionsCreationParAnnonceur
                                media={media}
                                options={CreationParAnnonceur}
                                UpdatedGraphDisplay={ModifyList}

                            />
                        </Col>
                    </Row>

                </CardHeader>

                {data.length !== 0 ? (
                    <ReactApexChart
                        id="charts-container8"
                        dir="ltr"
                        className="apex-charts"
                        options={options}
                        series={series}
                        type="bar"
                        height={350}
                    />) : (
                    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>

                        <img src={WatingChart} alt="immar" style={{ width: "150px" }} />
                    </div>



                )}

            </Card>
        </div>
    );
};
const Stacked = ({ dataColors }) => {
    var chartStackedBarColors = getChartColorsArray(dataColors);
    const series = [{
        name: 'Marine Sprite',
        data: [44, 55, 41, 37, 22, 43, 21]
    }, {
        name: 'Striking Calf',
        data: [53, 32, 33, 52, 13, 43, 32]
    }, {
        name: 'Tank Picture',
        data: [12, 17, 11, 9, 15, 11, 20]
    }, {
        name: 'Bucket Slope',
        data: [9, 7, 5, 8, 6, 9, 4]
    }, {
        name: 'Reborn Kid',
        data: [25, 12, 19, 32, 25, 24, 10]
    }];
    var options = {
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            toolbar: {
                show: false,
            }
        },
        plotOptions: {
            bar: {
                horizontal: true,
            },
        },
        stroke: {
            width: 1,
            colors: ['#fff']
        },
        title: {
            text: 'Fiction Books Sales',
            style: {
                fontWeight: 500,
            },
        },
        xaxis: {
            categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
            labels: {
                formatter: function (val) {
                    return val + "K";
                }
            }
        },
        yaxis: {
            title: {
                text: undefined
            },
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + "K";
                }
            }
        },
        fill: {
            opacity: 1
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left',
            offsetX: 40
        },
        colors: chartStackedBarColors,
    };

    return (
        <React.Fragment>
            <ReactApexChart
                dir="ltr"
                className="apex-charts"
                options={options}
                series={series}
                type="bar"
                height={350}
            />
        </React.Fragment>
    );
};

const Stacked2 = ({ dataColors }) => {
    var chartStackedBar100Colors = getChartColorsArray(dataColors);
    const series = [
        {
            name: "Marine Sprite",
            data: [44, 55, 41, 37, 22, 43, 21],
        },
        {
            name: "Striking Calf",
            data: [53, 32, 33, 52, 13, 43, 32],
        },
        {
            name: "Tank Picture",
            data: [12, 17, 11, 9, 15, 11, 20],
        },
        {
            name: "Bucket Slope",
            data: [9, 7, 5, 8, 6, 9, 4],
        },
        {
            name: "Reborn Kid",
            data: [25, 12, 19, 32, 25, 24, 10],
        },
    ];

    const options = {
        chart: {
            stacked: !0,
            stackType: "100%",
            toolbar: {
                show: !1,
            },
        },
        plotOptions: {
            bar: {
                horizontal: !0,
            },
        },
        stroke: {
            width: 1,
            colors: ["#fff"],
        },
        title: {
            text: "100% Stacked Bar",
            style: {
                fontWeight: 600,
            },
        },
        xaxis: {
            categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + "K";
                },
            },
        },
        fill: {
            opacity: 1,
        },
        legend: {
            position: "top",
            horizontalAlign: "left",
            offsetX: 40,
        },
        colors: chartStackedBar100Colors,
    };

    return (
        <React.Fragment>
            <ReactApexChart
                dir="ltr"
                className="apex-charts"
                options={options}
                series={series}
                type="bar"
                height={350}
            />
        </React.Fragment>
    );
};

const Negative = ({ dataColors }) => {
    var chartNegativeBarColors = getChartColorsArray(dataColors);
    const series = [
        {
            name: "Males",
            data: [
                0.4, 0.65, 0.76, 0.88, 1.5, 2.1, 2.9, 3.8, 3.9, 4.2, 4, 4.3, 4.1, 4.2,
                4.5, 3.9, 3.5, 3,
            ],
        },
        {
            name: "Females",
            data: [
                -0.8, -1.05, -1.06, -1.18, -1.4, -2.2, -2.85, -3.7, -3.96, -4.22, -4.3,
                -4.4, -4.1, -4, -4.1, -3.4, -3.1, -2.8,
            ],
        },
    ];

    const options = {
        chart: {
            type: "bar",
            height: 360,
            stacked: !0,
            toolbar: {
                show: !1,
            },
        },
        colors: chartNegativeBarColors,
        plotOptions: {
            bar: {
                horizontal: !0,
                barHeight: "80%",
            },
        },
        dataLabels: {
            enabled: !1,
        },
        stroke: {
            width: 1,
            colors: ["#fff"],
        },

        grid: {
            xaxis: {
                lines: {
                    show: !1,
                },
            },
        },
        yaxis: {
            min: -5,
            max: 5,
            title: {
                text: "Age",
                style: {
                    fontWeight: 600,
                },
            },
        },
        tooltip: {
            shared: !1,
            x: {
                formatter: function (val) {
                    return val;
                },
            },
            y: {
                formatter: function (val) {
                    return Math.abs(val) + "%";
                },
            },
        },
        title: {
            text: "Mauritius population pyramid 2011",
            style: {
                fontWeight: 600,
            },
        },
        xaxis: {
            categories: [
                "85+",
                "80-84",
                "75-79",
                "70-74",
                "65-69",
                "60-64",
                "55-59",
                "50-54",
                "45-49",
                "40-44",
                "35-39",
                "30-34",
                "25-29",
                "20-24",
                "15-19",
                "10-14",
                "5-9",
                "0-4",
            ],
            title: {
                text: "Percent",
            },
            labels: {
                formatter: function (val) {
                    return Math.abs(Math.round(val)) + "%";
                },
            },
        },
    };

    return (
        <React.Fragment>
            <ReactApexChart
                dir="ltr"
                className="apex-charts"
                options={options}
                series={series}
                type="bar"
                height={350}
            />
        </React.Fragment>
    );
};

const Markers = ({ dataColors }) => {
    var chartBarMarkersColors = getChartColorsArray(dataColors);
    const series = [
        {
            name: "Actual",
            data: [
                {
                    x: "2011",
                    y: 12,
                    goals: [
                        {
                            name: "Expected",
                            value: 14,
                            strokeWidth: 5,
                            strokeColor: "#564ab1",
                        },
                    ],
                },
                {
                    x: "2012",
                    y: 44,
                    goals: [
                        {
                            name: "Expected",
                            value: 54,
                            strokeWidth: 5,
                            strokeColor: "#564ab1",
                        },
                    ],
                },
                {
                    x: "2013",
                    y: 54,
                    goals: [
                        {
                            name: "Expected",
                            value: 52,
                            strokeWidth: 5,
                            strokeColor: "#564ab1",
                        },
                    ],
                },
                {
                    x: "2014",
                    y: 66,
                    goals: [
                        {
                            name: "Expected",
                            value: 65,
                            strokeWidth: 5,
                            strokeColor: "#564ab1",
                        },
                    ],
                },
                {
                    x: "2015",
                    y: 81,
                    goals: [
                        {
                            name: "Expected",
                            value: 66,
                            strokeWidth: 5,
                            strokeColor: "#564ab1",
                        },
                    ],
                },
                {
                    x: "2016",
                    y: 67,
                    goals: [
                        {
                            name: "Expected",
                            value: 70,
                            strokeWidth: 5,
                            strokeColor: "#564ab1",
                        },
                    ],
                },
            ],
        },
    ];

    var options = {
        chart: {
            toolbar: {
                show: !1,
            },
        },
        plotOptions: {
            bar: {
                horizontal: !0,
            },
        },
        colors: chartBarMarkersColors,
        dataLabels: {
            formatter: function (val, opt) {
                var goals =
                    opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex].goals;

                if (goals && goals.length) {
                    return `${val} / ${goals[0].value}`
                }
                return val;
            },
        },
        legend: {
            show: !0,
            showForSingleSeries: !0,
            customLegendItems: ["Actual", "Expected"],
            Markers: {
                fillColors: ["#00E396", "#775DD0"],
            },
        },
    };

    return (
        <React.Fragment>
            <ReactApexChart
                dir="ltr"
                className="apex-charts"
                options={options}
                series={series}
                type="bar"
                height={350}
            />
        </React.Fragment>
    );
};

const Reversed = ({ dataColors }) => {
    var chartBarReversedColors = getChartColorsArray(dataColors);
    const series = [
        {
            data: [400, 430, 448, 470, 540, 580, 690],
        },
    ];

    var options = {
        chart: {
            type: 'bar',
            height: 350,
            toolbar: {
                show: false,
            }
        },
        annotations: {
            xaxis: [{
                x: 500,
                borderColor: '#038edc',
                label: {
                    borderColor: '#038edc',
                    style: {
                        color: '#fff',
                        background: '#038edc',
                    },
                    text: 'X annotation',
                }
            }],
            yaxis: [{
                y: 'July',
                y2: 'September',
                label: {
                    text: 'Y annotation'
                }
            }]
        },
        colors: chartBarReversedColors,
        plotOptions: {
            bar: {
                horizontal: true,
            }
        },
        dataLabels: {
            enabled: true
        },
        xaxis: {
            categories: ['June', 'July', 'August', 'September', 'October', 'November', 'December'],
        },
        grid: {
            xaxis: {
                lines: {
                    show: true
                }
            }
        },
        yaxis: {
            reversed: true,
            axisTicks: {
                show: true
            }
        }
    };

    return (
        <React.Fragment>
            <ReactApexChart
                dir="ltr"
                className="apex-charts"
                options={options}
                series={series}
                type="bar"
                height={350}
            />
        </React.Fragment>
    );
};

const Patterned = ({ dataColors }) => {
    var chartPatternedColors = getChartColorsArray(dataColors);
    const series = [{
        name: 'Marine Sprite',
        data: [44, 55, 41, 37, 22, 43, 21]
    }, {
        name: 'Striking Calf',
        data: [53, 32, 33, 52, 13, 43, 32]
    }, {
        name: 'Tank Picture',
        data: [12, 17, 11, 9, 15, 11, 20]
    }, {
        name: 'Bucket Slope',
        data: [9, 7, 5, 8, 6, 9, 4]
    }];
    var options = {
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            dropShadow: {
                enabled: true,
                blur: 1,
                opacity: 0.25
            },
            toolbar: {
                show: false,
            }
        },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: '60%',
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: 2,
        },
        title: {
            text: 'Compare Sales Strategy',
            style: {
                fontWeight: 500,
            },
        },
        xaxis: {
            categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
        },
        yaxis: {
            title: {
                text: undefined
            },
        },
        tooltip: {
            shared: false,
            y: {
                formatter: function (val) {
                    return val + "K";
                }
            }
        },
        fill: {
            type: 'pattern',
            opacity: 1,
            pattern: {
                style: ['circles', 'slantedLines', 'verticalLines', 'horizontalLines'], // string or array of strings

            }
        },
        states: {
            hover: {
                filter: 'none'
            }
        },
        legend: {
            position: 'right',
            offsetY: 40
        },
        colors: chartPatternedColors
    };

    return (
        <React.Fragment>
            <ReactApexChart
                dir="ltr"
                className="apex-charts"
                options={options}
                series={series}
                type="bar"
                height={350}
            />
        </React.Fragment>
    );
};

const Groupes = ({ dataColors }) => {
    var chartGroupbarColors = getChartColorsArray(dataColors);
    const series = [
        {
            data: [44, 55, 41, 64, 22, 43, 21],
        },
        {
            data: [53, 32, 33, 52, 13, 44, 32],
        },
    ];

    var options = {
        chart: {
            type: 'bar',
            height: 410,
            toolbar: {
                show: false,
            }
        },
        plotOptions: {
            bar: {
                horizontal: true,
                dataLabels: {
                    position: 'top',
                },
            }
        },
        dataLabels: {
            enabled: true,
            offsetX: -6,
            style: {
                fontSize: '12px',
                colors: ['#fff']
            }
        },
        stroke: {
            show: true,
            width: 1,
            colors: ['#fff']
        },
        tooltip: {
            shared: true,
            intersect: false
        },
        xaxis: {
            categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007],
        },
        colors: chartGroupbarColors
    };
    return (
        <React.Fragment>
            <ReactApexChart
                dir="ltr"
                className="apex-charts"
                options={options}
                series={series}
                type="bar"
                height={410}
            />
        </React.Fragment>
    );
};

const BarwithImages = () => {
    const series = [{
        name: 'coins',
        data: [2, 4, 3, 4, 3, 5, 5, 6.5, 6, 5, 4, 5, 8, 7, 7, 8, 8, 10, 9, 9, 12, 12,
            11, 12, 13, 14, 16, 14, 15, 17, 19, 21
        ]
    }];

    var options = {
        chart: {
            type: 'bar',
            height: 410,
            animations: {
                enabled: false
            },
            toolbar: {
                show: false,
            }
        },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: '100%',

            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            colors: ["#fff"],
            width: 0.2
        },
        labels: Array.apply(null, {
            length: 39
        }).map(function (el, index) {
            return index + 1;
        }),
        yaxis: {
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            labels: {
                show: false
            },
            title: {
                text: 'Weight',
            },
        },
        grid: {
            position: 'back'
        },
        title: {
            text: 'Paths filled by clipped image',
            align: 'right',
            offsetY: 30,
            style: {
                fontWeight: 500,
            },
        },
        fill: {
            type: 'image',
            opacity: 0.87,
            image: {
                src: [user],
                width: 466,
                height: 406
            }
        },
    };

    return (
        <React.Fragment>
            <ReactApexChart
                dir="ltr"
                className="apex-charts"
                options={options}
                series={series}
                type="bar"
                height={410}
            />
        </React.Fragment>
    );
};


export {
    Basic,
    CustomDataLabelFamilles,
    CustomDataLabelAnnonceurs,
    CustomDataLabelMarques,
    CustomDataLabelProduits,
    CustomDataLabelAnnonceurParSupport,
    CustomDataLabelCreationParAnnonceur,
    Stacked,
    Stacked2,
    Negative,
    Markers,
    Reversed,
    Patterned,
    Groupes,
    BarwithImages
};

