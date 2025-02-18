import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
const logo = require('assets/Logo adtrics.png');
const logoWhite = require("assets/logo transparent adtrics.png")
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    justifyContent: "flex-start",
    backgroundColor: '#020b42',
    padding: 20,
  },
  pageChart: {
    flexDirection: "column", // Use row layout to split the page into sections
    backgroundColor: '#020b42',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  sectionGraph: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    width: "100%"
  },
  sectionPage: {
    margin: 1,
    padding: 1,
    flexGrow: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "white",
    width: "100%",

  },
  firstPageTitle: {
    width: "100%",
    margin: 0,
    fontSize: 24,
    textAlign: "center",
    color: "white",
  },
  PiedPage: {
    width: "100%",
    fontSize: "14px",
    fontSize: "normal",
    color: "lightgrey",
    display: "flex",
    justifyContent: "flex-end",
    textAlign: "right"

  },
  image: {
    width: 100,
    height: 50,
  },
  ChartImage: {
    width: "50%",
    height: "50%",
    marginTop: 10
  },
  /** New Styles for Parameter Grid **/
  parametersContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap', // Allow wrapping to fit all parameters
    justifyContent: 'space-between',
    marginTop: 10,
  },
  parametersContainerTable: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    border: "1px solid #000",
  },
  parametersGraph: {
    display: 'flex',
    width: "20%",
    flexDirection: 'column',
    marginTop: 10,
  },
  parameterBox: {
    width: '30%', // Each box takes 30% of row width
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#ffffff10', // Slight transparency for styling
    textAlign: 'center',
  },
  parameterBoxGraph: {
    width: '100%', // Each box takes 30% of row width
    padding: 10,
    flexDirection: "column",
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#ffffff10', // Slight transparency for styling
    textAlign: 'center',
  },
  paramTitle: {
    fontSize: 14,
    color: '#f9c400',
    fontWeight: 'bold',
  },
  paramValue: {
    fontSize: 16,
    color: 'white', // Highlighting color for values
    marginTop: 2,
  },
  paramValueLast: {
    fontSize: 12,
    color: 'lightgrey',
    width: "100%",
    textAlign: "right",
  },
  titleCell: {
    width: "30%", // Smaller width for title column
    padding: 4,
    // backgroundColor: "#f0f0f0",
    fontSize: "12px",
    color: "white",
    borderRight:"1px solid lightgrey",
    borderLeft:"1px solid lightgrey"
  
  },
  valueCell: {
    width: "70%", // Larger width for values
    padding: 4,
    color: "white",
    fontSize: "10px",
    borderRight:"1px solid lightgrey"
  },
  row: {
    flexDirection: "row",
    borderBottom: "1px solid lightgrey",
    borderTop:"1px solid lightgrey"
  },
});

const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const data = [
  { name: "Jan", value: 30 },
  { name: "Feb", value: 50 },
  { name: "Mar", value: 80 },
  { name: "Apr", value: 120 },
];

const dataImage = sessionStorage.getItem('dataimage')
const dataImage2 = sessionStorage.getItem('.top20famille')
const dataImage3 = sessionStorage.getItem('.top20annonceur')
const dataImage4 = sessionStorage.getItem('.top20marque')
const dataImage5 = sessionStorage.getItem('.top20produit')
const dataImage6 = sessionStorage.getItem('.repartitionmarche')
const dataImage7 = sessionStorage.getItem('.repartitionformat')
const dataImage8 = sessionStorage.getItem('.annonceurparsupport')
const dataImage9 = sessionStorage.getItem('.creationparannonceur')
const dataImage10 = sessionStorage.getItem('.type')
// Create Document Component
export const PDFPage = ({ date1, date2, parameters, unifiedGraphStructure,
  tableData }) => (

  <div>
    <PDFViewer width="100%" height={1000}>
      <Document>
        <Page size="A4" orientation="landscape" style={styles.page}>
          <View style={styles.section}>
            <Image src={logo} style={styles.image} />
          </View>
          <View style={styles.sectionPage}>
            <Text style={styles.firstPageTitle}>Media Review</Text>
            {/* Charts need to be recreated with @react-pdf/renderer */}
            {/* <PieChartVelsonpageNumber={index + 1} /> */}
          </View>
          <View style={styles.section}>
            <Text style={styles.PiedPage}>{date1}-{date2}</Text>
            {/* <PieChartVelson pageNumber={index + 1} /> */}
          </View>
          {/* Display an image */}

        </Page>
        <Page size="A4" orientation="landscape" style={styles.page}>
          {/* <View style={styles.section}>
            <Image src={logoWhite} style={styles.image} />
          </View> */}
          <View style={styles.sectionPage}>
            <Text style={styles.firstPageTitle}>Informations</Text>
          </View>
          <View style={styles.parametersContainerTable}>
            {tableData.map((row, index) => (
              <View style={styles.row} key={index}>
                <Text style={styles.titleCell}>{row.title}</Text>
                <Text style={styles.valueCell}>{row.value}</Text>
              </View>
            ))}
          </View>
          <View style={styles.section}>
            <Text style={styles.PiedPage}>{date1}-{date2}</Text>
            {/* <PieChartVelson pageNumber={index + 1} /> */}
          </View>

          {/* Display an image */}

        </Page>
        <Page size="A4" orientation="landscape" style={styles.page}>
          <View style={styles.section}>
            <Image src={logoWhite} style={styles.image} />
          </View>
          <View style={styles.sectionPage}>
            <Text style={styles.firstPageTitle}>Vue d'ensemble</Text>
            {/* Charts need to be recreated with @react-pdf/renderer */}
            {/* <PieChartVelsonpageNumber={index + 1} /> */}
          </View>
          {/* Grid for Parameters */}
          <View style={styles.parametersContainer}>

            {parameters.map((param, index) => (
              <View key={index} style={styles.parameterBox}>
                <Text style={styles.paramTitle}>{param.name}</Text>
                <Text style={styles.paramValue}>{param.count}</Text>
                <Text style={styles.paramValueLast}>VS: {param.countLastYear}</Text>
              </View>
            ))}
          </View>
          <View style={styles.section}>
            <Text style={styles.PiedPage}>{date1}-{date2}</Text>
            {/* <PieChartVelson pageNumber={index + 1} /> */}
          </View>

          {/* Display an image */}

        </Page>
        <Page size="A4" orientation="landscape" style={styles.pageChart}>
          <View style={styles.section}>
            <Text style={styles.title}>Evolution</Text>
          </View>
          <View style={styles.sectionGraph}>
            <Image src={dataImage} style={styles.ChartImage} />

            <View style={styles.parametersGraph}>

              <View style={styles.parameterBoxGraph}>
                <Text style={styles.paramTitle}>Top valeur</Text>
                <Text style={styles.paramValue}>{unifiedGraphStructure?.top20familleModified}</Text>

              </View>
              <View style={styles.parameterBoxGraph}>
                <Text style={styles.paramTitle}>Total %</Text>
                <Text style={styles.paramValue}>100%</Text>
              </View>
              <View style={styles.parameterBoxGraph}>
                <Text style={styles.paramTitle}>AVG</Text>
                <Text style={styles.paramValue}>{unifiedGraphStructure?.top20familleModifiedaverage}</Text>

              </View>

            </View>


          </View>

        </Page>
        <Page size="A4" orientation="landscape" style={styles.pageChart}>
          <View style={styles.section}>
            <Text style={styles.title}>Top Familles </Text>
          </View>
          <View style={styles.sectionGraph}>
            <Image src={dataImage2} style={styles.ChartImage} />

            <View style={styles.parametersGraph}>

              <View style={styles.parameterBoxGraph}>
                <Text style={styles.paramTitle}>Top valeur</Text>
                <Text style={styles.paramValue}>{unifiedGraphStructure?.top20familleModified}</Text>

              </View>
              <View style={styles.parameterBoxGraph}>
                <Text style={styles.paramTitle}>Total %</Text>
                <Text style={styles.paramValue}>100%</Text>
              </View>
              <View style={styles.parameterBoxGraph}>
                <Text style={styles.paramTitle}>AVG</Text>
                <Text style={styles.paramValue}>{unifiedGraphStructure?.top20familleModifiedaverage}</Text>

              </View>

            </View>


          </View>

        </Page>
        <Page size="A4" orientation="landscape" style={styles.pageChart}>
          <View style={styles.section}>
            <Text style={styles.title}>Top annonceurs </Text>

          </View>
          <View style={styles.sectionGraph}>
            <Image src={dataImage3} style={styles.ChartImage} />
            <View style={styles.parametersGraph}>

              <View style={styles.parameterBoxGraph}>
                <Text style={styles.paramTitle}>Top valeur</Text>
                <Text style={styles.paramValue}>{unifiedGraphStructure?.Top20AnnonceursModified}</Text>

              </View>
              <View style={styles.parameterBoxGraph}>
                <Text style={styles.paramTitle}>Total %</Text>
                <Text style={styles.paramValue}>100%</Text>
              </View>
              <View style={styles.parameterBoxGraph}>
                <Text style={styles.paramTitle}>AVG</Text>
                <Text style={styles.paramValue}>{unifiedGraphStructure?.Top20AnnonceursModifiedaverage}</Text>

              </View>

            </View>
          </View>

        </Page>

        <Page size="A4" orientation="landscape" style={styles.pageChart}>
          <View style={styles.section}>
            <Text style={styles.title}>Top marques </Text>
          </View>

          <View style={styles.sectionGraph}>
            <Image src={dataImage4} style={styles.ChartImage} />

            <View style={styles.parametersGraph}>

              <View style={styles.parameterBoxGraph}>
                <Text style={styles.paramTitle}>Top valeur</Text>
                <Text style={styles.paramValue}>{unifiedGraphStructure?.top20marquemodified}</Text>

              </View>
              <View style={styles.parameterBoxGraph}>
                <Text style={styles.paramTitle}>Total %</Text>
                <Text style={styles.paramValue}>100%</Text>
              </View>
              <View style={styles.parameterBoxGraph}>
                <Text style={styles.paramTitle}>AVG</Text>
                <Text style={styles.paramValue}>{unifiedGraphStructure?.top20marquemodifiedaverage}</Text>

              </View>

            </View>
          </View>

        </Page>
        <Page size="A4" orientation="landscape" style={styles.pageChart}>
          <View style={styles.section}>
            <Text style={styles.title}>Top produits </Text>
          </View>
          <View style={styles.sectionGraph}>
            <Image src={dataImage5} style={styles.ChartImage} />
            <View style={styles.parametersGraph}>

              <View style={styles.parameterBoxGraph}>
                <Text style={styles.paramTitle}>Top valeur</Text>
                <Text style={styles.paramValue}>{unifiedGraphStructure?.Top20produitsmodified}</Text>

              </View>
              <View style={styles.parameterBoxGraph}>
                <Text style={styles.paramTitle}>Total %</Text>
                <Text style={styles.paramValue}>100%</Text>
              </View>
              <View style={styles.parameterBoxGraph}>
                <Text style={styles.paramTitle}>AVG</Text>
                <Text style={styles.paramValue}>{unifiedGraphStructure?.Top20produitsmodifiedaverage}</Text>

              </View>

            </View>
          </View>

        </Page>

        <Page size="A4" orientation="landscape" style={styles.pageChart}>
          <View style={styles.section}>
            <Text style={styles.title}>Annonceurs par support</Text>
            <View style={styles.sectionGraph}>
              <Image src={dataImage6} style={styles.ChartImage} />

            </View>
            <View style={styles.parametersGraph}>

              <View style={styles.parameterBoxGraph}>
                <Text style={styles.paramTitle}>Top valeur</Text>
                <Text style={styles.paramValue}>{unifiedGraphStructure?.AnnonceurParSupportModified}</Text>

              </View>
              <View style={styles.parameterBoxGraph}>
                <Text style={styles.paramTitle}>Total %</Text>
                <Text style={styles.paramValue}>100%</Text>
              </View>
              <View style={styles.parameterBoxGraph}>
                <Text style={styles.paramTitle}>AVG</Text>
                <Text style={styles.paramValue}>{unifiedGraphStructure?.AnnonceurParSupportModifiedaverage}</Text>

              </View>

            </View>
          </View>
        </Page>


        <Page size="A4" orientation="landscape" style={styles.pageChart}>
          <View style={styles.section}>
            <Text style={styles.title}>Création unique par annonceur</Text>

          </View>

          <View style={styles.sectionGraph}>
            <Image src={dataImage7} style={styles.ChartImage} />

            <View style={styles.parametersGraph}>

              <View style={styles.parameterBoxGraph}>
                <Text style={styles.paramTitle}>Top valeur</Text>
                <Text style={styles.paramValue}>{unifiedGraphStructure?.CreationParAnnonceurModified}</Text>

              </View>
              <View style={styles.parameterBoxGraph}>
                <Text style={styles.paramTitle}>Total %</Text>
                <Text style={styles.paramValue}>100%</Text>
              </View>
              <View style={styles.parameterBoxGraph}>
                <Text style={styles.paramTitle}>AVG</Text>
                <Text style={styles.paramValue}>{unifiedGraphStructure?.CreationParAnnonceurModifiedaverage}</Text>

              </View>

            </View>
          </View>
        </Page>
        <Page size="A4" orientation="landscape" style={styles.pageChart}>
          <View style={styles.section}>
            <Text style={styles.title}>Parts marché</Text>

          </View>
          <View style={styles.sectionGraph}>
            <Image src={dataImage7} style={styles.ChartImage} />

            <View style={styles.parametersGraph}>

              <View style={styles.parameterBoxGraph}>
                <Text style={styles.paramTitle}>Top valeur</Text>
                <Text style={styles.paramValue}>{unifiedGraphStructure?.PartMarcheModified}</Text>

              </View>
              <View style={styles.parameterBoxGraph}>
                <Text style={styles.paramTitle}>Total %</Text>
                <Text style={styles.paramValue}>100%</Text>
              </View>
              <View style={styles.parameterBoxGraph}>
                <Text style={styles.paramTitle}>AVG</Text>
                <Text style={styles.paramValue}>{unifiedGraphStructure?.PartMarcheModifiedaverage}</Text>

              </View>

            </View>
          </View>

        </Page>
        <Page size="A4" orientation="landscape" style={styles.pageChart}>
          <View style={styles.section}>
            <Text style={styles.title}>Répartition par format</Text>
            <View style={styles.sectionGraph}>
              <Image src={dataImage8} style={styles.ChartImage} />



              <View style={styles.parametersGraph}>

                <View style={styles.parameterBoxGraph}>
                  <Text style={styles.paramTitle}>Top valeur</Text>
                  <Text style={styles.paramValue}>{unifiedGraphStructure?.FormatRepartitionModified}</Text>

                </View>
                <View style={styles.parameterBoxGraph}>
                  <Text style={styles.paramTitle}>Total %</Text>
                  <Text style={styles.paramValue}>100%</Text>
                </View>
                <View style={styles.parameterBoxGraph}>
                  <Text style={styles.paramTitle}>AVG</Text>
                  <Text style={styles.paramValue}>{unifiedGraphStructure?.FormatRepartitionModifiedaverage}</Text>

                </View>

              </View>
            </View>
          </View>
        </Page>

        <Page size="A4" orientation="landscape" style={styles.pageChart}>
          <View style={styles.section}>
            <Text style={styles.title}>Répartition par Type</Text>

          </View>

          <View style={styles.sectionGraph}>
            <Image src={dataImage9} style={styles.ChartImage} />

            <View style={styles.parametersGraph}>

              <View style={styles.parameterBoxGraph}>
                <Text style={styles.paramTitle}>Top valeur</Text>
                <Text style={styles.paramValue}>{unifiedGraphStructure?.RepartitionParTypeModified}</Text>

              </View>
              <View style={styles.parameterBoxGraph}>
                <Text style={styles.paramTitle}>Total %</Text>
                <Text style={styles.paramValue}>100%</Text>
              </View>
              <View style={styles.parameterBoxGraph}>
                <Text style={styles.paramTitle}>AVG</Text>
                <Text style={styles.paramValue}>{unifiedGraphStructure?.RepartitionParTypeModifiedaverage}</Text>

              </View>

            </View>
          </View>
        </Page>
        <Page size="A4" orientation="landscape" style={styles.pageChart}>
          <View style={styles.section}>
            <Text style={styles.title}>Répartition par Type</Text>

          </View>

          <View style={styles.sectionGraph}>
            <Image src={dataImage10} style={styles.ChartImage} />

            <View style={styles.parametersGraph}>

              <View style={styles.parameterBoxGraph}>
                <Text style={styles.paramTitle}>Top valeur</Text>
                <Text style={styles.paramValue}>{unifiedGraphStructure?.RepartitionParTypeModified}</Text>

              </View>
              <View style={styles.parameterBoxGraph}>
                <Text style={styles.paramTitle}>Total %</Text>
                <Text style={styles.paramValue}>100%</Text>
              </View>
              <View style={styles.parameterBoxGraph}>
                <Text style={styles.paramTitle}>AVG</Text>
                <Text style={styles.paramValue}>{unifiedGraphStructure?.RepartitionParTypeModifiedaverage}</Text>

              </View>

            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  </div>
);


