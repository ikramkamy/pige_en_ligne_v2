import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Col, Row, Container } from 'react-bootstrap';
import { UseFiltersStore } from 'store/dashboardStore/FiltersStore';
import ButtonBaseDemo from 'components/Commun/veille/ImageButton';
import { Dialog, DialogActions, Button } from "@mui/material";
const PORT = "https://immar-media.com";
export default function MediaControlCard({
  diffusion_first, creation, product, id_message, details, format, fichier,
  famille, classe, secteur, produit, marque, version, support, variete, annonceur,
  message, id
}) {
  const theme = useTheme();
  const [play, setPlay] = React.useState(false);
  const [display, setDisplay] = React.useState(false);
  const { media } = UseFiltersStore((state) => state);
  const [popupDataLageData, setPopupDataLageData] = React.useState(false)
  const handelClick = (() => {
    setPlay(!play);
  });

  const showDetails = () => {
    setDisplay(true);
  }

  const handleOpenPdf = () => {
    window.open(`${PORT}/pdf/article/pdf_veille.php?id=${id}`, '_blank');
  };
  const handleClosePopupLargeData = () => {
    console.log("call large")
    setPopupDataLageData(true)
  }
  //const [hideInSmallScreen,setHideInSmallScreen]=React.useState(false)
  const [resStyle, setResStyle] = React.useState({

  });
  React.useEffect(() => {
    const handleResize = () => {
      setResStyle({
        wrapDiv: window.innerWidth < 768 ? 'wrap' : 'nowrap',
        widthRightbtns: window.innerWidth < 768 ? '100%' : '',
        paddingLeftBtn: window.innerWidth < 768 ? '10px' : '0px',
        widthLefbtnWrapper: window.innerWidth < 768 ? '100%' : '',
        justifyContentRightBtnWrapper: window.innerWidth < 768 ? 'space-between' : 'center',
        marginTopAll: window.innerWidth < 768 ? '14vh' : '4%',
        widthImage: window.innerWidth < 768 ? '250px' : '500px',
        felexDirection: window.innerWidth < 768 ? 'column' : 'row',
        back: window.innerWidth < 768 ? 'yellow' : '',
        MarginRightbtn: window.innerWidth < 768 ? '0px' : '16px',
        hideInSmallScreen: window.innerWidth < 768 ? true : false,
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  console.log('hideInSmallScreen', resStyle.hideInSmallScreen)
  const getMonthName = (monthNumber) => {
    const monthNames = [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre"
    ];

    if (monthNumber < 1 || monthNumber > 12) {
      return "Numéro de mois invalide";
    }
    return monthNames[monthNumber - 1];
  }
  return (
    <Card sx={{
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row' },
      width: "100%",
      marginY: "16px",
      paddingY: "16px",
      backgroundColor: '#f9f9f9',
      borderRadius: '12px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: "100%" }}>
        <Row style={{ justifyContent: "space-between" }}>
          <Col xs={12} sm={2} md={2}>
            {!resStyle.hideInSmallScreen && (
              <CardContent sx={{
                flex: '1 0 auto',
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "16px",
                borderBottom: { xs: '1px solid #e0e0e0', sm: 'none' }, // Border on small screens only
                borderRight: { sm: '1px solid #e0e0e0' }, // Right border for larger screens
              }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>
                  {diffusion_first.split("-")[0]}
                </div>
                <div style={{ fontSize: '1.2rem', color: '#666' }}>
                  {diffusion_first.split("-")[1] == 1 ? "janvier" :
                    diffusion_first.split("-")[1] == 2 ? "février" :
                      diffusion_first.split("-")[1] == 3 ? "mars" :
                        diffusion_first.split("-")[1] == 4 ? "avril" :
                          diffusion_first.split("-")[1] == 5 ? "mai" :
                            diffusion_first.split("-")[1] == 6 ? "juin" :
                              diffusion_first.split("-")[1] == 7 ? "juillet" :
                                diffusion_first.split("-")[1] == 8 ? "août" :
                                  diffusion_first.split("-")[1] == 9 ? "septembre" :
                                    diffusion_first.split("-")[1] == 10 ? "octobre" :
                                      diffusion_first.split("-")[1] == 11 ? "novembre" :
                                        diffusion_first.split("-")[1] == 12 ? "décembre" :
                                          "Numéro de mois invalide"}
                </div>
                <Typography sx={{ fontWeight: "bold", fontSize: '1.8rem', color: '#00a6e0' }}>
                  {diffusion_first.split("-")[2]}
                </Typography>
              </CardContent>)}



            {resStyle.hideInSmallScreen && (
              <CardContent sx={{
                flex: '1 0 auto',
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "16px",
                borderBottom: { xs: '1px solid #e0e0e0', sm: 'none' }, // Border on small screens only
                borderRight: { sm: '1px solid #e0e0e0' }, // Right border for larger screens
              }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>
                  {diffusion_first}
                </div>
              </CardContent>
            )}
          </Col>

          <Col xs={12} sm={2} md={2}>
            <CardContent style={{
              // flex: '1 0 auto',
              // padding: "16px",
              display: "flex",
              justifyContent: "center",
              alignitems: "center",
            }}>
              {media === "presse" && (
                <div style={{
                  position: 'relative',
                  display: 'inline-block', cursor: 'pointer', borderRadius: "5px"
                }}>
                  {/* <PictureAsPdfIcon onClick={handleOpenPdf} color="#00a6e0"
                   style={{ margin: "20px", width: "50px", height: "50px" }} /> */}
                  <img src={creation} style={{
                    margin: "20px", width: "50px",
                    height: "50px", cursor: 'pointer',
                  }} onClick={handleClosePopupLargeData} />
                </div>
              )}
              {media === "radio" && (
                <div style={{
                  marginTop: "5px", padding: "10px",
                  backgroundColor: "#e0f7fa", borderRadius: "8px"
                }}>
                  {/* <audio src={`${fichier}`} controls 
                  style={{ width: "100%", borderRadius: "8px" }} /> */}
                  <img src={creation} style={{
                    margin: "20px",
                    width: "50px", height: "50px", borderRadius: "5px"
                  }}
                    onClick={handleClosePopupLargeData} />
                </div>
              )}
              {media === "television" && (
                // <video src={`${fichier}`} controls={true} width="100%"
                //  style={{ marginTop: "5px", borderRadius: "20px" }} />
                <img src={creation} style={{
                  margin: "20px",
                  width: "50px", height: "50px",
                  borderRadius: "5px"
                }} onClick={handleClosePopupLargeData} />
              )}

            </CardContent>
          </Col>

          <Col xs={12} sm={2} md={2}>
            <CardContent sx={{
              flex: '1 0 auto',
              padding: "16px",
            }}>
              <Typography component="div"
                sx={{
                  color: '#00a6e0', textTransform: "none", fontWeight: "bold",
                  display: { xs: 'flex', sm: 'flex' },
                  justifyContent: { xs: 'center', sm: 'center' },
                  textAlign: "center"
                }}>
                {product}
              </Typography>
              <Typography variant="subtitle1" component="div" sx={{
                color: 'text.secondary', display: { xs: 'flex', sm: 'flex' },
                justifyContent: { xs: 'center', sm: 'center' }
              }}>
                <b>version:</b> {version}
              </Typography>
              <Typography variant="subtitle1" component="div" sx={{
                color: 'text.secondary', display: { xs: 'flex', sm: 'flex' },
                justifyContent: { xs: 'center', sm: 'center' }
              }}>
                <b>format:</b>{format}
              </Typography>
            </CardContent>
          </Col>

          <Col xs={12} sm={2} md={2} style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Typography variant="h5"
              component="div"
              sx={{ color: 'text.secondary' }}>
              {id_message}
            </Typography>
          </Col>

          <Col xs={12} sm={2} md={2}
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >

            <ButtonBaseDemo
              creation={creation}
              showDetails={showDetails}
              fichier={fichier}
              date={diffusion_first}
              famille={famille}
              classe={classe}
              secteur={secteur}
              marque={marque}
              support={support}
              produit={produit}
              variete={variete}
              annonceur={annonceur}
              message={message}
              format={format}
              version={version}
              id={id}
            />
          </Col>
        </Row>
      </Box>

      <Dialog open={popupDataLageData} onClose={handleClosePopupLargeData}>

        <Container
          fluid
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            height: "auto",
            //padding: "20%",
            width: '40vw',
            height: "50vh",
          }}
        >
          <Row style={{ height: "80%" }}>
            <div style={{
              display: 'flex', flexDirection: "column",
              alignItems: 'center', justifyContent: 'center',
              width: "auto"
            }}>
              {media === "presse" && (
                //<div style={{ position: 'relative', display: 'inline-block', cursor: 'pointer',width:"300px" }}>
                <PictureAsPdfIcon onClick={handleOpenPdf} color="#00a6e0" width="80%"
                  style={{ margin: "20px", width: "40%", height: "40%" }} />

                //</div>
              )}
              {media === "radio" && (
                //<div style={{ marginTop: "5px", padding: "10px", backgroundColor: "#e0f7fa", borderRadius: "8px",width:"300px" }}>
                <audio src={`${fichier}`} controls width="800px"
                  style={{
                    borderRadius: "8px", marginTop: "5px"

                  }} />

                //</div>
              )}
              {media === "television" && (
                <video src={`${fichier}`} controls={true} width="80%"
                  style={{ marginTop: "5px", borderRadius: "20px" }} />

              )}

            </div>
          </Row>
          <DialogActions sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",

          }}>

            <Button color="primary" sx={{
              textTransform: "none",
              marginTop: "10px",
              marginBottom: "10px",
              backgroundColor: "#00a6e0",
              width: "50%",
              color: "white",

            }}
              onClick={() => setPopupDataLageData(false)}>Fermer</Button>
          </DialogActions>
        </Container>

      </Dialog>




    </Card>
  );
}
