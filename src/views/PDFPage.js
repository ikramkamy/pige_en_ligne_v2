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
    flexDirection: "row", // Use row layout to split the page into sections
    backgroundColor: '#020b42',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
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
    color:"lightgrey",
    display: "flex",
    justifyContent: "flex-end",
    textAlign: "right"

  },
  image: {
    width: 100,
    height: 50,
  },
  /** New Styles for Parameter Grid **/
  parametersContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap', // Allow wrapping to fit all parameters
    justifyContent: 'space-between',
    marginTop: 10,
  },
  parametersGraph: {
    display: 'flex',
    width:"20%",
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
    flexDirection:"column",
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
});

const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const data = [
  { name: "Jan", value: 30 },
  { name: "Feb", value: 50 },
  { name: "Mar", value: 80 },
  { name: "Apr", value: 120 },
];

// Create Document Component
export const PDFPage = ({ date1, date2, parameters, unifiedGraphStructure }) => (

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
            <Text style={styles.title}>Top Familles </Text>
            <Text>

            </Text>

            {/* <LineChart width={400} height={200} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart> */}
          </View>
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
        </Page>
        <Page size="A4" orientation="landscape" style={styles.pageChart}>
          <View style={styles.section}>
            <Text style={styles.title}>Top annonceurs </Text>
            <Text>

            </Text>

            {/* <LineChart width={400} height={200} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart> */}
          </View>
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
        </Page>

        <Page size="A4" orientation="landscape" style={styles.pageChart}>
          <View style={styles.section}>
            <Text style={styles.title}>Top marques </Text>
            <Text>

            </Text>

            {/* <LineChart width={400} height={200} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart> */}
          </View>
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
        </Page>
        <Page size="A4" orientation="landscape" style={styles.pageChart}>
          <View style={styles.section}>
            <Text style={styles.title}>Top produits </Text>
            <Text>

            </Text>

            {/* <LineChart width={400} height={200} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart> */}
          </View>
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
        </Page>

        <Page size="A4" orientation="landscape" style={styles.pageChart}>
          <View style={styles.section}>
            <Text style={styles.title}>Annonceurs par support</Text>
            <Text>

            </Text>

            {/* <LineChart width={400} height={200} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart> */}
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
        </Page>


        <Page size="A4" orientation="landscape" style={styles.pageChart}>
          <View style={styles.section}>
            <Text style={styles.title}>Création unique par annonceur</Text>
            <Text>

            </Text>

            {/* <LineChart width={400} height={200} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart> */}
          </View>
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
        </Page>
        <Page size="A4" orientation="landscape" style={styles.pageChart}>
          <View style={styles.section}>
            <Text style={styles.title}>Parts marché</Text>
            <Text>

            </Text>

            {/* <LineChart width={400} height={200} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart> */}
          </View>
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
        </Page>
        <Page size="A4" orientation="landscape" style={styles.pageChart}>
          <View style={styles.section}>
            <Text style={styles.title}>Répartition par format</Text>
            <Text>

            </Text>

            {/* <LineChart width={400} height={200} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart> */}
          </View>
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
        </Page>

        <Page size="A4" orientation="landscape" style={styles.pageChart}>
          <View style={styles.section}>
            <Text style={styles.title}>Répartition par Type</Text>
            <Text>

            </Text>

            {/* <LineChart width={400} height={200} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart> */}
          </View>
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
        </Page>
       
      </Document>
    </PDFViewer>
  </div>
);


// {pages.map((_, index) => (
//   <Page key={index} size="A4" orientation="landscape" style={styles.page}>
//     <View style={styles.section}>
//       <Text style={styles.title}>{date1}-{date2}</Text>
//       <Text style={styles.title}>page</Text>
//       {/* Charts need to be recreated with @react-pdf/renderer */}
//       {/* <PieChartVelsonpageNumber={index + 1} /> */}
//     </View>
//     <View style={styles.section}>
//       <Text style={styles.title}>contenue</Text>
//       {/* <PieChartVelson pageNumber={index + 1} /> */}
//     </View>
//     {/* Display an image */}
//     <View style={styles.section}>
//       <Image src={logoWhite} style={styles.image} />
//     </View>
//   </Page>
// ))}