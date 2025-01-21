import { create } from "zustand";
import axios from "axios";
const PORT = "https://pige-dev.immar-media.com/api/index.php"
export const UseMediaDashboardStore = create((set, get) => ({
  MediaData: [],
  IsMediadataisFetched: false,
  ErrorHandel: true,
  HandelErrorPopup: (show) => {
    set({ErrorHandel: show})
  },
  ReseMediadataisFetched: () => {
    set({ IsMediadataisFetched: false })
  },
  RestRadioTvData: async () => {
    set({ MediaData: [] })
  },
  //   getDataMedia: async(media, supports,familles,
  //      classes,secteurs,varieties,annonceurs,marques,
  //      produits,rangs,date1,date2)=>{
  // // console.log("media for tv radio data", media)
  // // console.log("rangs for media calling", rangs)
  // // console.log("produits for media calling", produits)
  //       try {

  //         axios.post(`${PORT}/getfilters2.php`,
  //          { 
  //           supports:supports,
  //           familles:familles,
  //           classes:classes,
  //           secteurs:secteurs,
  //           varieties:varieties,
  //           annonceurs:annonceurs,
  //           marques:marques,
  //           produits:produits,
  //           rangs:rangs,
  //           media:media,
  //           fetchdata:"fetchdata",
  //           date1:date1,
  //           date2:date2,
  //         }

  //         )
  //         .then(response => {

  //           console.log("radio/ tv data",response);
  //           set({
  //             MediaData:response.data.data
  //           })
  //           //setData(response.data.data.splice(0, 20));
  //         }) 
  //       } catch (error) {
  //         console.error(error);
  //       }

  //       },
  getDataMedia: async (email, media, supports, familles, classes,
    secteurs, varieties, annonceurs, marques, produits, rangs, date1, date2) => {
    let isDataFetched = false;

    try {
      const response = await axios.post(`${PORT}/${media}/table`, {
        email: email,
        supports: supports,
        familles: familles,
        classes: classes,
        secteurs: secteurs,
        varieties: varieties,
        annonceurs: annonceurs,
        marques: marques,
        produits: produits,
        media: media,
        date_debut: date1,
        date_fin: date2,
      });
      console.log("data pige", response.data);
      //Assuming you want to set the MediaData in your state management
      set({
        MediaData: response.data
      });
      isDataFetched = true;
      set({ IsMediadataisFetched: true })
      if(response.data.length === 0){  
        console.log("data empty")
        set({ ErrorHandel: true})
      }else{
        //do nothing
      }
      // Return the data for further use
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      set({
        MediaData: [],
        ErrorHandel: true
      });
      throw error;
    }
  },



  FilterDataMediaByrangs: async (rangs, data, media) => {
    console.log(rangs)

    switch (media) {
      case "television":
        if (rangs.length === 1 && rangs[0] === 1 || rangs[0] === 2) {
          const filtredata = data.filter((elem) => Number(elem.Pub_Rank) === rangs[0])
          console.log("succesfully", filtredata)

        }
        else if (rangs.length === 1 && rangs[0] === 3) {

          const filtredata = data.filter((elem) => elem.Pub_Rank === elem.media_Encomb)
          console.log("succesfully", filtredata)
        } else if (rangs.length === 1 && rangs[0] === 4) {
          console.log('data[0].media_Encomb-1', Number(data[0].media_Encomb) - 1)
          const filtredata = data.filter((elem) => Number(elem.Pub_Rank) === (Number(elem.media_Encomb) - 1))
          console.log("filtredata", filtredata)
        }
        else if (rangs.length === 1 && rangs[0] === 5) {
          var array = []
          const filtredata = data.forEach(element => {
            //le calcule prend bcp de temps
            if (element.Pub_Rank !== "1" && element.Pub_Rank !== "2" && element.Pub_Rank !== element.media_Encomb
              && Number(element.Pub_Rank) !== Number(element.media_Encomb) - 1) {
              array.push(element)

            }
            console.log('element', array)

          });


        }
        break;
      case 'radio':


    }
  }

}))