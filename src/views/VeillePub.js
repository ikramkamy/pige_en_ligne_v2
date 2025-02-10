import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";

import MultipleSelectMedia from '../components/Commun/MediaSelect';
import { UseVeilleStore } from "store/dashboardStore/VeilleMediaStore";
import { UseFiltersStore } from "../store/dashboardStore/FiltersStore";
import RecherchePub from "components/Commun/RechechePub";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Pagination, TextField } from '@mui/material';
import LoadingLineIndicator from "components/Commun/LineLoading";
import DateRangeTest from 'components/Commun/DateRangePickerTest';
import TableIlustration from 'assets/tableSearch.gif';
import AutomaticSideFilterBar from "components/FixedPlugin/AutomatiSideFilterBar";
import LoadingButtonData from "components/Commun/LoadingBtnData";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { UseLoginStore } from "store/dashboardStore/useLoginStore";
import AdvertisementCard from 'components/Commun/veille/MediaCardVeille2';
import BasicSpeedDial from 'components/Commun/veille/SpeedDealToolBar';
import 'components/Commun/commun.css';
import presse_mini from 'assets/img/veille/presse_mini.jpg';
import radio_mini from 'assets/img/veille/radio_mini.png';
import tv_mini from 'assets/img/veille/tv_mini.jpg';
import { UseCountStore } from "store/dashboardStore/UseCounts";
import DataUnavailablePopup from "components/Commun/popups/DataUnavailable";
import { NetworkErrorPopup } from "components/Commun/popups";
export default function VeillePub() {
  const PORT = "https://immar-media.com";
  const { autoriseVeillePresse,
    autoriseVeilleRadio,
    autoriseVeilleTv,
    client, email } = UseLoginStore((state) => state)
  const history = useHistory()
  const {
    getveilletvData,
    veilletvData,
    getVeilleSearch,
    getVeilleById,
    dataVeilleISFetched,
    ResetDataveilleFetched,
    ShowSearchKey,
    setShowSearchKey,
    setCloseSearchKey,
    ID_message,
    ResetMessageIdInput,
    OpenNetworkPopupVeille,
    handleCloseNetworkPopupVeille,
  } = UseVeilleStore((state) => state)
  const {
    media, date1, date2, veille_diffusion, Filtersupports,
    Filterfamilles,
    familles,
    supports,
    classes,
    Filterclassesids,
    Filtersecteursids,
    secteurs,
    Filtervarietiesids,
    varieties,
    Filterannonceursids,
    annonceurs,
    Filtermarquesids,
    marques,
    Filterproduitsids,
    produits,
    SideBarFilterPosition,
    ManageSideBarfilterDisplay,
    sideBarFilterPosition,
    typeVeille,
    getFilters,
    FilterLoading,
    ErrorFetchFilter,
    messageFilterError,
    HandeErrorFetchFiletrs
  } = UseFiltersStore((state) => state);

  const { VeilleCoun,
    count_v,
    getVeilleCount,
    ResetVeilleCount,
    OpenNetworkPopupCount,
    handleCloseNetworkPopupCount } = UseCountStore((state) => state)
  const [mediaUrl, setMediaUrl] = useState("/veille_radio");
  const { DownloadExlsxFile } = UseVeilleStore((state) => state)
  const [disable, setDisable] = useState(true);
  const [dataList, setDataList] = useState([]);
  const [sortOption, setSortOption] = useState('dateAsc');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10
  const [searchTerm, setSearchTerm] = useState('');
  const [pdata, setPdata] = useState([]);
  const [sdata, setSdata] = useState('');
  const [welcomVeille, setWelcomVeille] = useState(false)
  const [showdataloading, setShowdataloading] = useState(false)
  const [fetchDataTime, setFetchDataTime] = useState(0)
  const [loadingStep, setLoadingStep] = useState(0.5)
  const [displayVeilleDate, setDisplayVeilleDate] = useState(false)
  const [loadingLineDisplay, setLoadingLineDisplay] = useState(false)
  const [loadingWithCount, setLoadingWithCount] = React.useState(false)
  document.title = 'veille publicitaire'
  useEffect(() => {
    // console.log("media", media)
    setPdata([])
    ResetDataveilleFetched && ResetDataveilleFetched()
    ResetMessageIdInput && ResetMessageIdInput()
    setWelcomVeille(false)
    if (media == "") {
      setDisable(true)
    } else if (media == "television") {
      setDisable(false)
      setMediaUrl("/veille_tv")
    } else if (media == "radio") {
      setDisable(false)
      setMediaUrl("/veille_radio")
    } else if (media == "presse") {
      setDisable(false)
      setMediaUrl("image_veille")
    }

  }, [media, veille_diffusion, date1, date2])

  useEffect(() => {
    if (veilletvData.length > 0) {
      // Filter out entries with null values in any required field
      const sortedData = veilletvData.filter((elem) => {
        return (
          elem.Insertion_Pub_Name !== null &&
          elem.Insertion_Supports !== null &&
          elem.Insertion_Advertiser_Id !== null &&
          elem.Insertion_Advertiser_Name !== null &&
          elem.Insertion_Brand_Id !== null &&
          elem.Insertion_Brand_Name !== null &&
          elem.Insertion_Classe_Id !== null &&
          elem.Insertion_Classe_Name !== null &&
          elem.Insertion_Diffusion !== null &&
          elem.Insertion_Famille_Id !== null &&
          elem.Insertion_Famille_Name !== null &&
          elem.Insertion_Fichier !== null &&
          elem.Insertion_Format !== null &&
          elem.Insertion_Id !== null &&
          elem.Insertion_Image !== null &&
          elem.Insertion_Premiere !== null &&
          elem.Insertion_Product_Id !== null &&
          elem.Insertion_Product_Name !== null &&
          elem.Insertion_Pub_Id !== null &&
          elem.Insertion_Secteur_Id !== null &&
          elem.Insertion_Secteur_Name !== null &&
          elem.Insertion_Type !== null &&
          elem.Insertion_Variete_Id !== null &&
          elem.Insertion_Variete_Name !== null &&
          elem.Insertion_Version !== null
        );
      }).sort((a, b) => {
        // Sort based on the selected option
        if (sortOption === 'dateAsc') {
          return new Date(a.Veille_Date) - new Date(b.Veille_Date);
        } else if (sortOption === 'dateDesc') {
          return new Date(b.Veille_Date) - new Date(a.Veille_Date);
        } else if (sortOption === 'message') {
          return a.Message_Lib.localeCompare(b.Message_Lib);
        } else if (sortOption === 'product') {
          return a.Produit_Lib.localeCompare(b.Produit_Lib);
        }
        return 0;
      });

      //console.log("sortedData", sortedData);
      setSdata(sortedData);

      // Filter based on search term
      const filteredData = sortedData.filter((e) => {
        if (sortedData.length > 0) {
          const searchLower = searchTerm.toLowerCase();
          // Filter items that match the search term in any relevant field
          return (
            e.Produit_Lib?.toLowerCase().includes(searchLower) ||
            e.Message_Id?.toString().includes(searchLower) ||
            e.Famille_Lib?.toLowerCase().includes(searchLower) ||
            e.Marque_Lib?.toLowerCase().includes(searchLower) ||
            e.Support_Lib?.toLowerCase().includes(searchLower) ||
            e.Classe_Lib?.toLowerCase().includes(searchLower) ||
            e.Variété_Lib?.toLowerCase().includes(searchLower) ||
            e.Annonceur_Lib?.toLowerCase().includes(searchLower) ||
            e.Insertion_Advertiser_Name?.toLowerCase().includes(searchLower)
          );
        }
        return false;
      });

      //console.log("filteredData", filteredData);

      // Apply pagination
      const paginatedData = filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage);
      //console.log("paginatedData", paginatedData);
      setPdata(paginatedData);
    } else {
      // If no data, set empty or default data
      setPdata([]);
    }
  }, [veilletvData, searchTerm, sortOption, page]);

  const [increment, setIncrement] = React.useState(0)
  const selectSortOption = () => {
    var option = ["dateAsc", "dateDesc", "message", "product"]

    if (increment > option.length - 1) {

      setIncrement(0)
      setSortOption(option[0]);
    } else {
      setIncrement(increment + 1)
      setSortOption(option[increment]);
    }
    //console.log(sortOption, increment)
  }

  const handlePageChange = (event, value) => {
    //console.log("page value", value)
    setPage(value);
    setPdata(pdata);
  };
  const getData = async () => {
    ResetVeilleCount && ResetVeilleCount()
    setLoadingWithCount(true)


    if (ID_message) {
      //alert("get By ID")
      setSearchTerm('')
      const startTime = new Date().getTime();
      setWelcomVeille(true)
      setLoadingLineDisplay(true)
      getVeilleById && getVeilleById(email, media, ID_message)
      setLoadingWithCount(false)
      setTimeout(() => {
        setShowdataloading(true)
      }, 10000);
      const endTime = new Date().getTime();
      setFetchDataTime(endTime - startTime);
      setTimeout(() => {
        setLoadingStep(fetchDataTime / 100)

      }, fetchDataTime);
      setTimeout(() => {
        setLoadingLineDisplay(false)
      }, 5000);
      setDisplayVeilleDate(true)

    } else {
      //alert("get All data ID")
      const pigeCountResult = await getVeilleCount && getVeilleCount(
        email,
        date1,
        date2,
        media,
        veille_diffusion,
        Filterfamilles,
        Filterannonceursids,
        Filtermarquesids,
        Filterproduitsids,
      )
    }

  }
  useEffect(() => {
    setSearchTerm('')
    const startTime = new Date().getTime();
    setWelcomVeille(true)

    if (count_v > 0) {
      setLoadingLineDisplay(true)
      //alert("fetch veille data")
      getveilletvData && getveilletvData(
        email,
        date1,
        date2,
        media,
        typeVeille,
        veille_diffusion,
        Filterfamilles,
        Filterannonceursids,
        Filtermarquesids,
        Filterproduitsids,
      )

    } else if (count_v === 0) {
      //PopUP no data veille available
      //alert('data veille unavailable')
    } else {
      //do nothing
    }
    setTimeout(() => {
      //setLoadingWithCount(false)
    }, 5000);

    setTimeout(() => {
      setShowdataloading(true)
    }, 10000);
    const endTime = new Date().getTime();
    setFetchDataTime(endTime - startTime);
    setTimeout(() => {
      setLoadingStep(fetchDataTime / 100)

    }, fetchDataTime);
    setTimeout(() => {
      setLoadingLineDisplay(false)
      setLoadingWithCount(false)
    }, 5000);
    setDisplayVeilleDate(true)
  }, [count_v])

  const DownloadFile = () => {
    DownloadExlsxFile && DownloadExlsxFile(veilletvData, media)
  }
  const handelZIPfileDownload = async () => {
    console.log("veilletvData", veilletvData)

    //const id=e.Insertion_Id
    const imageUrls = veilletvData.map((item) => `https://immar-media.com/${item.Insertion_Image}`)
    console.log("list of files to download", imageUrls)

    const zip = new JSZip();

    // Loop through each image URL
    for (const url of imageUrls) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch image: ${url}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const fileName = url.split('/').pop(); // Get the file name from the URL
        zip.file(fileName, arrayBuffer); // Add the image to the ZIP file
      } catch (error) {
        console.error('Error downloading image:', error);
      }
    }

    // Generate the ZIP file and trigger download
    zip.generateAsync({ type: 'blob' })
      .then((content) => {
        saveAs(content, 'images.zip'); // Save the ZIP file
      })
      .catch((error) => {
        console.error('Error generating ZIP file:', error);
      });

    //const files=veilletvData.map((item)=>`${PORT}${mediaUrl}/${item.Insertion_Fichier}`)

    // const zip = new JSZip();

    // const filePromises = files.map(async (file) => {
    //   try {
    //     const response = await axios.get(file);
    //     if (!response.ok) {
    //       throw new Error(`Failed to fetch ${file}: ${response.statusText}`);
    //     }
    //     const blob = await response.blob();
    //     zip.file(file.name, blob);
    //   } catch (error) {
    //     console.error(`Error fetching ${file}:`, error);

    //   }
    // });
    // // Wait for all files to be fetched
    // await Promise.all(filePromises);

    // // Generate the zip file
    // const zipBlob = await zip.generateAsync({ type: 'blob' });

    // // Trigger the download
    // saveAs(zipBlob, `${media}_web_veille_${date1}_${date2}.zip`);

  }
  const handeToggleSideBar = () => {
    ManageSideBarfilterDisplay('-100%');
  }
  const [fetchFilter, setFetchFilter] = React.useState(false)
  React.useEffect(() => {
    setCloseSearchKey && setCloseSearchKey()
    setFetchFilter(true)

  }, [media, date1, date2])

  const HandelSideBarPisition = async () => {
    if (fetchFilter === true) {
      await getFilters && getFilters(email, media, date1, date2)
      setFetchFilter(false)

      setTimeout(() => {
        ManageSideBarfilterDisplay && ManageSideBarfilterDisplay("0%")
      }, 5000);

    } else {
      //do nothing
      ManageSideBarfilterDisplay && ManageSideBarfilterDisplay("0%")
    }
  }
  const handerechercheveille = () => {
    getVeilleSearch && getVeilleSearch(
      date1,
      date2,
      veille_diffusion,
      media
    )
  }
  //console.log("filterloading",FilterLoading)
  useEffect(() => {


  }, [Filterfamilles, familles, Filtersupports, supports,
    classes,
    Filterclassesids,
    Filtersecteursids,
    secteurs,
    Filtervarietiesids,
    varieties,
    Filterannonceursids,
    annonceurs,
    Filtermarquesids,
    marques,
    Filterproduitsids,
    produits])
  const [resStyle, setResStyle] = useState({
    wrapDiv: 'nowrap',
    marginTopAll: '4%',
    widthRightbtns: '',
    widthImage: "500px",
    felexDirection: 'row',
    back: window.innerWidth < 768 ? 'yellow' : '',
  });
  useEffect(() => {
    const handleResize = () => {
      setResStyle({
        wrapDiv: window.innerWidth < 768 ? 'wrap' : 'nowrap',
        widthRightbtns: window.innerWidth < 768 ? '100%' : '',
        paddingLeftBtn: window.innerWidth < 768 ? '10px' : '0px',
        widthLefbtnWrapper: window.innerWidth < 768 ? '100%' : '',
        justifyContentRightBtnWrapper: window.innerWidth < 768 ? 'space-between' : 'center',
        marginTopAll: window.innerWidth < 768 ? '14vh' : '4%',
        widthImage: window.innerWidth < 768 ? '250px' : '500px',
        felexDirection: window.innerWidth < 1150 ? 'column' : 'row',
        back: window.innerWidth < 768 ? 'yellow' : '',
        MarginRightbtn: window.innerWidth < 1150 ? '0px' : '16px',
        textAlineCenter: window.innerWidth < 768 ? 'center' : '',
        displayFlex: window.innerWidth < 768 ? 'flex' : '',
        WidthToolBarWrap: window.innerWidth < 1150 ? '100%' : '',
        back: window.innerWidth < 1150 ? 'red' : 'yellow',
        marginWraper: window.innerWidth < 1150 ? '10px' : '0',
        justifyContentWraper: window.innerWidth < 1150 ? 'space-around' : 'space-between',
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    if (veilletvData.length > 0) {

      setDisplayVeilleDate(true)


    } else {
      setDisplayVeilleDate(false)
    }
  }, [veilletvData])

  const HandelgetVeilleCount = () => {
    getVeilleCount && getVeilleCount(
      media, date1, date2,
      Filterannonceursids,
      Filtermarquesids,
      Filterproduitsids,
      Filterfamilles,
    )
  }
  const handleClosePopupDataUnavailable = () => {
    ResetVeilleCount && ResetVeilleCount(false)
  }

  if (!(autoriseVeillePresse || autoriseVeilleRadio || autoriseVeilleTv) && client) {
    return (
      <Container
        fluid
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          backgroundColor: "#f8f9fa",
          textAlign: "center",
          borderRadius: "5px",
          marginTop: "12%"
        }}
      >
        <Row
          className="responsive-row"
          style={{
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <b style={{ color: "#00a6e0" }}>
            vous n'êtes pas abonnés</b>

        </Row>
      </Container>)
  }
  if (!client) {
    history.push('/login')
    LougoutRestErrorMessages && LougoutRestErrorMessages(email)
  }
  return (
    <div style={{
      height: "auto", width: "100%", padding: "2%",
      marginTop: resStyle.marginTopAll,
    }}
    >
      <Container style={{ maxWidth: "100%" }}>
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: 'space-between',
          flexWrap: resStyle.wrapDiv,
          flexDirection: resStyle.felexDirection
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: resStyle.wrapDiv,
            width: resStyle.WidthToolBarWrap
          }}>
            {ShowSearchKey && (<TextField
              label="Chercher..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              style={{
                marginRight: resStyle.MarginRightbtn,
                marginTop: resStyle.paddingLeftBtn,
                backgroundColor: "white",
                borderRadius: "5px",
                height: "40px",
                border: "none"
              }}
            />)}
            <MultipleSelectMedia />
            <RecherchePub />
            <div style={{
              width: "auto", height: "auto",
              marginTop: resStyle.paddingLeftBtn,
              marginLeft: resStyle.MarginRightbtn,
            }}>
              <DateRangeTest />
            </div>
          </div>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: resStyle.widthRightbtns,
            paddingTop: resStyle.paddingLeftBtn,
            width: resStyle.WidthToolBarWrap,
            marginTop: resStyle.marginWraper,

          }}>
            <LoadingButtonData
              getData={getData}
              isloading={loadingWithCount}
              isSucces={false}
              title="Afficher"
              mr="10px"
              disablebtn={!media}
            />

            <LoadingButtonData
              getData={HandelSideBarPisition}
              isloading={FilterLoading}
              isSucces={false}
              title="Recherche avancée"
              disablebtn={!media}
            />
          </div>
        </div>
        <div onClick={() => handeToggleSideBar()}>
          {welcomVeille ? (
            <div style={{ marginBottom: "10%", }}>
              {showdataloading ? (
                <div style={{ width: "100%" }}>
                  {loadingLineDisplay && <LoadingLineIndicator
                    step={loadingStep} totalDuration={fetchDataTime} />}
                  {(displayVeilleDate && !loadingLineDisplay && pdata.length > 0) && (
                    <BasicSpeedDial DownloadFile={DownloadFile}
                      handelZIPfileDownload={handelZIPfileDownload}
                      selectSortOption={selectSortOption}
                    />
                  )}
                  {(displayVeilleDate && !loadingLineDisplay && count_v > 0) && (
                    <div className="veilledata tootbal-element"
                      style={{
                        width: "100%", display: "flex",
                        justifyContent: "center",
                        flexDirection: "column"

                      }}
                    >
                      <div className="advertisment_wrap" style={{
                        display: "flex", flexWrap: "wrap",
                        justifyContent: resStyle.justifyContentWraper,
                        marginTop: "20px",
                      }}>
                        {pdata?.map((e) => (<AdvertisementCard
                          key={veilletvData.indexOf(e)}
                          diffusion_first={e.Veille_Date}
                          Veille_Date_All={e.Veille_Date_All}
                          //creation={`${PORT}/${mediaUrl}/${e.Veille_Creation}`}
                          creation={media === "presse" ? presse_mini : media === "radio" ? radio_mini : tv_mini}
                          product={e.Produit_Lib}
                          id_message={e.Message_Id}
                          message={e.Message_Lib}
                          format={e.Format}
                          version={e.Version}
                          fichier={`${PORT}${mediaUrl}/${e.Veille_Creation}`}
                          famille={e.Famille_Lib}
                          classe={e.Classe_Lib}
                          secteur={e.Secteur_Lib}
                          marque={e.Marque_Lib}
                          support={e.Support_Lib}
                          produit={e.Produit_Lib}
                          variete={e.Variété_Lib}
                          annonceur={e.Annonceur_Lib}
                          id={media === "presse" ? e.Insertion : e.Insertion}


                        />))
                        }
                      </div>
                      <Pagination
                        count={Math.ceil(sdata.length / itemsPerPage)}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                        sx={{
                          display: 'flex', justifyContent: 'center',
                          marginTop: '20px', marginBottom: '20px',
                          '& .MuiPaginationItem-root': {
                            color: 'white',
                          },

                        }}
                      />
                    </div>
                  )
                  }
                  {(!displayVeilleDate && dataVeilleISFetched) && (
                    //addloading condition
                    <Container
                      fluid
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "50vh",
                        backgroundColor: "#f8f9fa",
                        textAlign: "center",
                        borderRadius: "5px",
                        backgroundColor: 'transparent'
                      }}
                    >
                      <Row
                        className="responsive-row"
                        style={{
                          padding: "20px",
                          backgroundColor: "#fff",
                          borderRadius: "10px",
                          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <b style={{ color: "#00a6e0" }}>Aucune données {media} n'as été
                          enregistrée. </b>

                      </Row>
                    </Container>

                  )
                  }
                </div>)
                : (
                  <div></div>
                )}
            </div>
          ) : (
            <div className="w-100 justify-content-center" style={{ display: "flex" }}>
              <img src={TableIlustration}
                alt="immar media"
                width={resStyle.widthImage}
                height={resStyle.widthImage} />
            </div>

          )}
        </div>

        <AutomaticSideFilterBar
          getData={getData}
          isloading={loadingWithCount}
          isSucces={false}

        />

        <DataUnavailablePopup
          media={media}
          ErrorHandel={count_v === 0}
          handleClosePopup={handleClosePopupDataUnavailable}

        />

      </Container>


      {/* <NetworkErrorPopup
        OpenNetworkPopup={OpenNetworkPopupVeille || OpenNetworkPopupCount}
        handleCloseNetworkPopup={handleCloseNetworkPopupCount}

      /> */}
      {/* error Popup filter pige*/}
      {/* <NetworkErrorPopup
        OpenNetworkPopup={ErrorFetchFilter}
        handleCloseNetworkPopup={HandeErrorFetchFiletrs}
        message={messageFilterError}
      /> */}
    </div>
  );
}
