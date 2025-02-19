import { Document, Svg, Path, Page, Text, View, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import {Line,} from "recharts";
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
    flexDirection: "column",
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
  sectionPageFirst: {
    margin: 1,
    padding: 1,
    flexGrow: 1,
    height: "50%",
    justifyContent: "space-between",
    flexDirection: "column",

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
    fontSize: 34,
    textAlign: "center",
    color: "white",
  },
  PiedPage: {
    fontSize: "14px",
    textAlign: "right",
    color: "white",
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
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  parametersContainerTable: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start"

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
    borderRight: "0.5px solid #4c5479",
    borderLeft: "0.5px solid #4c5479"

  },
  valueCell: {
    width: "70%", // Larger width for values
    padding: 4,
    color: "white",
    fontSize: "10px",
    borderRight: "1px solid #4c5479"
  },
  row: {
    flexDirection: "row",
    borderBottom: "1px solid #4c5479",
    borderTop: "1px solid #4c5479",
    marginTop: "10px"
  },
  svgChart: {
    width: 800,
    height: 400,
    backgroundColor: "red"
  }
});

const data = [
  { name: "Jan", value: 30 },
  { name: "Feb", value: 50 },
  { name: "Mar", value: 80 },
  { name: "Apr", value: 120 },
  { name: "Mai", value: 120 },
  { name: "Juin", value: 120 },
  { name: "Juillet", value: 120 },
  { name: "Août", value: 120 },
  { name: "Sep", value: 120 },
  { name: "Oct", value: 120 },
  { name: "Nov", value: 120 },
  { name: "Déc", value: 80 },
];
const width = 400;
const height = 300;
const barWidth = (width - 20) / data.length;
const maxValue = Math.max(...data.map((d) => d.value));
const scale = (value) => (height - 40) * (value / maxValue);
const LineChart = () => (
  <Svg width="600" height="400">
    {/* Line Graph Path */}
    <Path
      d="M50,350 L120,300 L190,270 L260,240 L330,220 L400,200 L470,180 L540,160 L610,150 L680,140 L750,120"
      stroke="#fec800"
      strokeWidth="3"
      fill="none"
    />

    {/* X-Axis */}
    <Line
      x1="50"
      y1="370"
      x2="750"
      y2="370"
      stroke="black"
      strokeWidth="2"
    />

    {/* X-Axis Labels */}
    <Text x="50" y="385" fontSize="" fill="#4c5479" textAnchor="middle">Jan</Text>
    <Text x="120" y="385" fontSize="" fill="#4c5479" textAnchor="middle">Feb</Text>
    <Text x="190" y="385" fontSize="" fill="#4c5479" textAnchor="middle">Mar</Text>
    <Text x="260" y="385" fontSize="" fill="#4c5479" textAnchor="middle">Apr</Text>
    <Text x="330" y="385" fontSize="" fill="#4c5479" textAnchor="middle">May</Text>
    <Text x="400" y="385" fontSize="" fill="#4c5479" textAnchor="middle">Jun</Text>
    <Text x="470" y="385" fontSize="" fill="#4c5479" textAnchor="middle">Jul</Text>
    <Text x="540" y="385" fontSize="" fill="#4c5479" textAnchor="middle">Aug</Text>
    <Text x="610" y="385" fontSize="" fill="#4c5479" textAnchor="middle">Sep</Text>
    <Text x="680" y="385" fontSize="" fill="#4c5479" textAnchor="middle">Oct</Text>
    <Text x="750" y="385" fontSize="" fill="#4c5479" textAnchor="middle">Nov</Text>

    {/* Y-Axis */}
    <Line
      x1="50"
      y1="50"
      x2="50"
      y2="370"
      stroke="black"
      strokeWidth="2"
    />

    {/* Y-Axis Labels */}
    <Text x="30" y="350" fontSize="" fill="white" textAnchor="end">4259</Text>
    <Text x="30" y="300" fontSize="" fill="white" textAnchor="end">2359</Text>
    <Text x="30" y="250" fontSize="" fill="white" textAnchor="end">2350</Text>
    <Text x="30" y="200" fontSize="" fill="white" textAnchor="end">3359</Text>
    <Text x="30" y="150" fontSize="" fill="white" textAnchor="end">3340</Text>
    <Text x="30" y="100" fontSize="" fill="white" textAnchor="end">3350</Text>
    <Text x="30" y="50" fontSize="" fill="white" textAnchor="end">3259</Text>
    <Text x="30" y="300" fontSize="" fill="white" textAnchor="end">2359</Text>
    <Text x="30" y="250" fontSize="" fill="white" textAnchor="end">1359</Text>
    <Text x="30" y="200" fontSize="" fill="white" textAnchor="end">1359</Text>
    <Text x="30" y="150" fontSize="" fill="white" textAnchor="end" >1359</Text>

    {/* Title */}

  </Svg>
);

// Create Document Component
const BarChart = () => (
  <svg width="800" height="400">
    {/* Y-Axis */}
    <line x1="50" y1="50" x2="50" y2="370" stroke="black" strokeWidth="2" />
    {/* Y-Axis Labels */}
    <text x="30" y="350" fontSize="10" fill="black" textAnchor="end">0</text>
    <text x="30" y="300" fontSize="10" fill="black" textAnchor="end">500</text>
    <text x="30" y="250" fontSize="10" fill="black" textAnchor="end">1000</text>
    <text x="30" y="200" fontSize="10" fill="black" textAnchor="end">1500</text>
    <text x="30" y="150" fontSize="10" fill="black" textAnchor="end">2000</text>
    <text x="30" y="100" fontSize="10" fill="black" textAnchor="end">2500</text>
    <text x="30" y="50" fontSize="10" fill="black" textAnchor="end">3000</text>

    {/* X-Axis */}
    <line x1="50" y1="370" x2="750" y2="370" stroke="black" strokeWidth="2" />
    {/* X-Axis Labels */}
    <text x="50" y="385" fontSize="10" fill="black" textAnchor="middle">Jan</text>
    <text x="120" y="385" fontSize="10" fill="black" textAnchor="middle">Feb</text>
    <text x="190" y="385" fontSize="10" fill="black" textAnchor="middle">Mar</text>
    <text x="260" y="385" fontSize="10" fill="black" textAnchor="middle">Apr</text>
    <text x="330" y="385" fontSize="10" fill="black" textAnchor="middle">May</text>
    <text x="400" y="385" fontSize="10" fill="black" textAnchor="middle">Jun</text>
    <text x="470" y="385" fontSize="10" fill="black" textAnchor="middle">Jul</text>
    <text x="540" y="385" fontSize="10" fill="black" textAnchor="middle">Aug</text>
    <text x="610" y="385" fontSize="10" fill="black" textAnchor="middle">Sep</text>
    <text x="680" y="385" fontSize="10" fill="black" textAnchor="middle">Oct</text>
    <text x="750" y="385" fontSize="10" fill="black" textAnchor="middle">Nov</text>

    {/* Bars */}
    <rect x="50" y="370" width="40" height="-120" fill="#fec800" /> {/* Jan: Value = 120 */}
    <rect x="120" y="370" width="40" height="-200" fill="#fec800" /> {/* Feb: Value = 200 */}
    <rect x="190" y="370" width="40" height="-180" fill="#fec800" /> {/* Mar: Value = 180 */}
    <rect x="260" y="370" width="40" height="-250" fill="#fec800" /> {/* Apr: Value = 250 */}
    <rect x="330" y="370" width="40" height="-220" fill="#fec800" /> {/* May: Value = 220 */}
    <rect x="400" y="370" width="40" height="-280" fill="#fec800" /> {/* Jun: Value = 280 */}
    <rect x="470" y="370" width="40" height="-300" fill="#fec800" /> {/* Jul: Value = 300 */}
    <rect x="540" y="370" width="40" height="-270" fill="#fec800" /> {/* Aug: Value = 270 */}
    <rect x="610" y="370" width="40" height="-240" fill="#fec800" /> {/* Sep: Value = 240 */}
    <rect x="680" y="370" width="40" height="-210" fill="#fec800" /> {/* Oct: Value = 210 */}
    <rect x="750" y="370" width="40" height="-150" fill="#fec800" /> {/* Nov: Value = 150 */}

    {/* Title */}
    <text x="400" y="30" fontSize="14" fill="black" textAnchor="middle">Monthly Sales Report</text>
  </svg>
);
export const PDFPage = ({ date1, date2, parameters, unifiedGraphStructure,
  tableData, media }) => (

  <div>
    <PDFViewer width="100%" height={1000}>
      <Document>
        <Page size="A4" orientation="landscape" style={styles.page}>
          <View style={styles.section}>
            <Image src={logo} style={styles.image} />
          </View>
          <View style={styles.sectionPageFirst}>
            <Text style={styles.firstPageTitle}>Adtrics Review</Text>
            <Text style={styles.PiedPage}>Du {date1} au {date2}</Text>
          </View>


        </Page>
        <Page size="A4" orientation="landscape" style={styles.page}>
          {/* <View style={styles.section}>
            <Image src={logoWhite} style={styles.image} />
          </View> */}
          <View style={styles.sectionPage}>
            <Text style={styles.firstPageTitle}>Informations</Text>

            <View style={styles.parametersContainerTable}>
              {tableData.map((row, index) => (
                <View style={styles.row} key={index}>
                  <Text style={styles.titleCell}>{row.title}</Text>
                  <Text style={styles.valueCell}>{row.value}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Display an image */}

        </Page>
        <Page size="A4" orientation="landscape" style={styles.page}>
          <View style={styles.section}>
            <Image src={logoWhite} style={styles.image} />
          </View>
          <View style={styles.sectionPage}>
            <Text style={styles.firstPageTitle}>Vue d'ensemble</Text>
          </View>
          {/* Grid for Parameters */}
          <View style={styles.parametersContainer}>

            {parameters.map((param, index) => (
              <View key={index} style={styles.parameterBox}>
                <Text style={styles.paramTitle}>{param.name}</Text>
                <Text style={styles.paramValue}>{param.count}</Text>
                <Text style={styles.paramValueLast}>{param.countLastYear}</Text>
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
            {/* <Image src={dataImage} style={styles.ChartImage} /> */}
            <LineChart style={styles.ChartImage} />
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
            {/* <Image src={dataImage2} style={styles.ChartImage} /> */}
            <LineChart style={styles.ChartImage} />

            <BarChart />
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
        {/* <Page size="A4" orientation="landscape" style={styles.pageChart}>
          <View style={styles.section}>
            <Text style={styles.title}>Top annonceurs </Text>

          </View>
          <View style={styles.sectionGraph}>
            
            <LineChart style={styles.ChartImage} />
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

        </Page> */}
        {/* 
        <Page size="A4" orientation="landscape" style={styles.pageChart}>
          <View style={styles.section}>
            <Text style={styles.title}>Top marques </Text>
          </View>

          <View style={styles.sectionGraph}>
          
            <LineChart style={styles.ChartImage} />
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

        </Page> */}
        {/* <Page size="A4" orientation="landscape" style={styles.pageChart}>
          <View style={styles.section}>
            <Text style={styles.title}>Top produits </Text>
          </View>
          <View style={styles.sectionGraph}>
          
            <LineChart style={styles.ChartImage} />
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

        </Page> */}

        {/* <Page size="A4" orientation="landscape" style={styles.pageChart}>
          <View style={styles.section}>
            <Text style={styles.title}>Annonceurs par support</Text>
            <View style={styles.sectionGraph}>
             
              <LineChart style={styles.ChartImage} />

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
        </Page> */}

        {/* <Page size="A4" orientation="landscape" style={styles.pageChart}>
          <View style={styles.section}>
            <Text style={styles.title}>Création unique par annonceur</Text>

          </View>

          <View style={styles.sectionGraph}>
           
            <LineChart style={styles.ChartImage} />
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
        </Page> */}
        {/* <Page size="A4" orientation="landscape" style={styles.pageChart}>
          <View style={styles.section}>
            <Text style={styles.title}>Parts marché</Text>

          </View>
          <View style={styles.sectionGraph}>
         
            <LineChart style={styles.ChartImage} />
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

        </Page> */}
        {/* <Page size="A4" orientation="landscape" style={styles.pageChart}>
          <View style={styles.section}>
            <Text style={styles.title}>Répartition par format</Text>
            <View style={styles.sectionGraph}>
            
              <LineChart style={styles.ChartImage} />
              <View style={styles.parametersGraph}>
                <View style={styles.parameterBoxGraph}>
                  <Text style={styles.paramTitle}>Top valeur</Text>
                  <Text style={styles.paramValue}>
                    {unifiedGraphStructure?.FormatRepartitionModified}</Text>

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
        </Page> */}

        {/* <Page size="A4" orientation="landscape" style={styles.pageChart}>
          <View style={styles.section}>
            <Text style={styles.title}>Répartition par Type</Text>

          </View>

          <View style={styles.sectionGraph}>
    
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
        </Page> */}
        {/* <Page size="A4" orientation="landscape" style={styles.pageChart}>
          <View style={styles.section}>
            <Text style={styles.title}>Répartition par Type</Text>

          </View>

          <View style={styles.sectionGraph}>
           
            <LineChart style={styles.ChartImage} />
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
        </Page> */}
      </Document>
    </PDFViewer>
  </div>
);


