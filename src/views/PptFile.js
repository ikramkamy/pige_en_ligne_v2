import React, { useEffect, useState } from "react";
import pptxgen from "pptxgenjs";
import html2canvas from "html2canvas";
import { UseFiltersStore } from "store/dashboardStore/FiltersStore";
import dash from "assets/images.png";
import {
  CustomDataLabelFamilles,
  CustomDataLabelAnnonceurs,
  CustomDataLabelMarques,
  CustomDataLabelProduits,
  CustomDataLabelAnnonceurParSupport,
  CustomDataLabelCreationParAnnonceur,

} from "../components/Commun/charts/BarCharts";
import { Row, Col } from 'react-bootstrap'
const ExportPPT = () => {
  const {
    media,
    date1, date2,
    supports,
    Filtersupports,
    familles,
    classes,
    annonceurs,
    marques,
    Filterfamilles,
    Filterannonceursids,
    Filtermarques,
  } = UseFiltersStore((state) => state);
  const [capturedImages, setCapturedImages] =
    useState({ mainImage: null, graphImage: null });

  const captureElement = async (id, key) => {
    const element = document.getElementById(id);
    if (!element) return;

    try {
      const canvas = await html2canvas(element);
      const image = canvas.toDataURL("image/png");
      setCapturedImages((prev) => ({ ...prev, [key]: image }));
      console.log(`Captured ${key}`);
    } catch (error) {
      console.error(`Error capturing ${key}:`, error);
    }
  };

  const handleExportPpt = () => {
    const ppt = new pptxgen();

    // Slide 1: Add Title and Main Image
    const slide1 = ppt.addSlide();
    // slide1.addText("Immar review", {
    //   x: 1,
    //   y: 0.5,
    //   fontSize: 24,
    //   color: "363636",
    //   bold: true,
    // });
    if (capturedImages.mainImage) {
      slide1.addImage({ data: capturedImages.mainImage, x: 0, y: 0, w: 10, h: 7.5 });
    }
    
    // Slide 2: Add Graph Image
    const slide2 = ppt.addSlide();
    slide2.addText("Graph Data", {
      x: 1,
      y: 0.5,
      fontSize: 24,
      color: "363636",
      bold: true,
    });
    if (capturedImages.graphImage) {
      slide2.addImage({ data: capturedImages.graphImage, x: 0.5, y: 1.5, w: 5, h: 3 });
    } else {
      console.error("Graph image not available.");
    }
    //Slide 3: 
    const slide3= ppt.addSlide();
    slide2.addText("Graph Data3", {
      x: 1,
      y: 0.5,
      fontSize: 24,
      color: "363636",
      bold: true,
    });
    if (capturedImages.graphImage) {
      slide3.addImage({ data: capturedImages.graphImage, x: 0.5, y: 1.5, w: 5, h: 3 });
    } else {
      console.error("Graph image not available.");
    }
    ppt.writeFile(`media-review-${date1}-${date2}.pptx`);
  };

  useEffect(() => {
    setTimeout(() => {
      captureElement("capture-main", "mainImage", "info-main");
      captureElement("capture-graph", "graphImage");
      captureElement("capture-graph3", "graphImage3");
    }, 500);
  }, []);
  const [supportnames, setSupportnames] = useState([])
  const [famillenames, setFamillenames] = useState([])
  const [annonceurnames, setAnnonceurnames] = useState([])
  const [marquenames, setMarquenames] = useState([])
  useEffect(() => {
    const selectedSupportnames = supports.filter((e) => Filtersupports.includes(e.support_id))
    const selectedFamillenames = familles.filter((e) => Filterfamilles.includes(e.CodeFamille))
    const selectedAnnonceurnames = annonceurs.filter((e) => Filterannonceursids.includes(e.Annonceur_Id))
    const selectedMarquenames = marques.filter((e) => Filtermarques.includes(e.Marque_id))

    var selection = selectedSupportnames.map((e) => e.support_name)
    setMarquenames(selectedMarquenames.map((e) => e.Marque_Lib))
    setFamillenames(selectedFamillenames.map((e) => e.Famille))
    //too large number we do not display it in ppt file
    setAnnonceurnames(selectedAnnonceurnames.map((e) => e.Annonceur_Nom))


    setSupportnames(selection)

    //     marques
    // Filtermarques
    console.log("Filtermarques  in ppt", Filtermarques)
  }, [Filtersupports, Filterfamilles, Filterannonceursids, Filtermarques])


  return (
    <React.Fragment>
       {/* Export PPT Button */}
       {/* <button onClick={handleExportPpt}>
        Exporter le fichier PPT
      </button> */}
      {/* DOM Element to Capture */}
      {/* <div id="capture-main" style={{
        display: "flex", flexDirection:
          "column", alignItems: "center"
      }}> */}
        <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
         <img src={dash} alt="IMMAR DASHBOARD" style={{ width: "50px"}} />
        </div>
        <h3 style={{ textDecoration: "underline", color: "#00a6e0" }}>Media Review </h3>
        <div id="info-main" style={{ width: "100%", border: "1px solid #ccc", borderRadius: "5px", overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", backgroundColor: "white", padding: "10px" }}>
            <strong style={{ color: "#00a6e0" }}>Media</strong>
            <p style={{ margin: 0, fontSize: "10px" }}>{media}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", backgroundColor: "white", padding: "10px" }}>
            <strong style={{ color: "#00a6e0" }}>Date</strong>
            <p style={{ margin: 0, fontSize: "10px" }}>{date1} / {date2}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", backgroundColor: "white", padding: "10px" }}>
            <strong style={{ color: "#00a6e0" }}>Support(s)</strong>
            <p style={{ margin: 0, fontSize: "10px" }}>{supportnames?.join(', ')}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", backgroundColor: "white", padding: "10px" }}>
            <strong style={{ color: "#00a6e0" }}>Famille(s)</strong>
            <p style={{ margin: 0, fontSize: "10px" }}>{famillenames?.join(', ')}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", backgroundColor: "white", padding: "10px" }}>
            <strong style={{ color: "#00a6e0" }}>Annonceur(s)</strong>
            <p style={{ margin: 0, fontSize: "10px" }}>{annonceurnames.length}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", backgroundColor: "white", padding: "10px" }}>
            <strong style={{ color: "#00a6e0" }}>Marque(s)</strong>
            <p style={{ margin: 0, fontSize: "10px" }}>{Filtermarques.length}</p>
          </div>
        </div>



      {/* </div> */}
      {/* <div id="capture-graph" style={{ marginTop: "20px" }}>
        <CustomDataLabelFamilles />
      </div>
      <div id="capture-graph3" style={{ marginTop: "20px" }}>
      <CustomDataLabelAnnonceurs />
      </div>
      <div id="capture-graph4" style={{ marginTop: "20px" }}>
        <CustomDataLabelAnnonceurParSupport />
      </div>
      <div id="capture-graph5" style={{ marginTop: "20px" }}>
        <CustomDataLabelAnnonceurs />
        </div>
        <div id="capture-graph6" style={{ marginTop: "20px" }}>
        <CustomDataLabelMarques />
        </div>
        <div id="capture-graph7" style={{ marginTop: "20px" }}>
        <CustomDataLabelProduits />
        </div>


        <div id="capture-graph7" style={{ marginTop: "20px" }}>
        <CustomDataLabelCreationParAnnonceur />
        </div>
      */}
    </React.Fragment>
  );
};

export default ExportPPT;
