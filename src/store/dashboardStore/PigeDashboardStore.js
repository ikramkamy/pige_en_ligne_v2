import { create  } from "zustand";
import axios  from "axios";
import dayjs from "dayjs";
const PORT="https://pige-dev.immar-media.com/api/index.php";
export const UsePigeDashboardStore= create((set, get)=>({
    PressData:[],
    VolumePresse :0,
    VolumePresseLastYear:0,
    VolumeMedia:0,
    VolumeMediaLastyear:0,

    AnnonceursActifPresse:0,
    AnnonceursActifPresseLastYear:0,

    AnnonceursActifMedia:0,
    AnnonceursActifMediaLastYear:0,

    CreationUniquesPresse:0,
    CreationUniquesPresseLastYear:0,


    CreationUniquesMedia:0,
    CreationUniquesMediaLastYear:0,
    BudgetBrutPresse:0,
    BudgetBrutPresseLastYear:0,

    BudgetBrutMedia:0,
    BudgetBrutMediaLastYear:0,

    SupportDiffusionPresse:0,
    SupportDiffusionPresseLastYear:0,

    SupportDiffusionMedia:0,
    SupportDiffusionMediaLastYear:0,

    Couleur:0,
    NoireBlanc:0,
    DureeTotal:0,
    DureeTotalLastYear:0,
    DureeMoyenne:0,
    DureeMoyenneLastYear:0,

    PicCommunication:{
      count:0,
      interval_start:"08:00",
      interval_end:"08:15",
    },
    PicCommunicationLastYear:{
      count:0,
      interval_start:"08:00",
      interval_end:"08:15",
    },

    Top20famillesSectorielles:[],
    Top20Annonceurs:[],
    Top20marques:[],
    Top20produits:[],
    PartmarchePresse:[],
    FormatRepartition:[],
    NombreAnnonceursActifParSupportPresse:[],
    NombreCreationUniqueParAnnonceurPresse:[],
    PartMarche:[],
    isloading:true,
    errorSendingLink:"",
    ExportExcelPending:false,
    DisplayEmailSent:false,
    CloseEmailExcel:()=>{
   set({DisplayEmailSent:false})
    },
   
     // Methods
ResetDataArrays: async()=>{
  // console.log("data reset")
set({
    PressData:[],
    Top20famillesSectorielles:[],
    Top20Annonceurs:[],
    Top20marques:[],
    Top20produits:[],
    PartmarchePresse:[],
    FormatRepartition:[],
    NombreAnnonceursActifParSupportPresse:[],
    NombreCreationUniqueParAnnonceurPresse:[],
    PartMarche:[],
    VolumePresse :0,
    VolumeMedia:0,
    AnnonceursActifPresse:0,
    AnnonceursActifMedia:0,
    CreationUniquesPresse:0,
    CreationUniquesMedia:0,
    BudgetBrutPresse:0,
    BudgetBrutMedia:0,
    SupportDiffusionPresse:0,
    SupportDiffusionMedia:0,
    Couleur:0,
    NoireBlanc:0,
    DureeTotal:0,
    DureeMoyenne:0,
    AnnonceurParSupport:0,
    CreationParAnnonceur:0,
    PicCommunication:{
      count:0,
      interval_start:"08:00",
      interval_end:"08:15",
    },

})
},
SetIsloadingMethode:async(e)=>{
set({isloading:e})
},
IsPressdataisFetched:false,
ResePressdataisFetched:()=>{
  set({IsPressdataisFetched:false}) 
},
getDataPresse: async(supports,familles,classes,secteurs,varieties,annonceurs,marques,produits,date1,date2)=>{  
let isfetched=false;
  try {
  axios.post(`${PORT}/presse/table`,
   { 
    supports:supports,
    familles:familles,
    classes:classes,
    secteurs:secteurs,
    varieties:varieties,
    annonceurs:annonceurs,
    marques:marques,
    produits:produits,
    media:"presse",
    fetchdata:"fetchdata",
    date1:date1,
    date2:date2,
  })
  .then(response => {
    console.log("presse response",{
      supports: supports,
      familles: familles,
      classes: classes,
      secteurs: secteurs,
      varieties: varieties,
      annonceurs: annonceurs,
      marques: marques,
      produits: produits,
      date1: date1,
      date2: date2,
  });
    console.log("presse response", response)
    set({
      PressData:response.data.data
    })
    isfetched=true;
    set({IsPressdataisFetched:isfetched})
    //setData(response.data.data.splice(0, 20));
  }) 
} catch (error) {
  console.error(error);
}

},

getVolumePresse: async (
    supports,
    familles,
    classes,
    secteurs,
    varieties,
    annonceurs,
    marques,
    produits,
    date1,
    date2,

) => {

    try {
      
      let response = await axios.post(`${PORT}/getfilters2.php`,{
        supports:supports,
        familles:familles,
        classes:classes,
        secteurs:secteurs,
        varieties:varieties,
        annonceurs:annonceurs,
        marques:marques,
        produits:produits,
        
        date1:date1,
        date2:date2,
        dashboard:"dashboard",
        media:"presse",
        countEnteries:"countEnteries",

      });
     
      set({VolumePresse: Number(response.data.data[0].count)});
      
    } catch (error) {
      console.log(error);
    }
  },
getVolumePresseLastYear: async (
    supports,
    familles,
    classes,
    secteurs,
    varieties,
    annonceurs,
    marques,
    produits,
    date1,
    date2,

) => {

    try {
      
      let response = await axios.post(`${PORT}/getfilters2.php`,{
        supports:supports,
        familles:familles,
        classes:classes,
        secteurs:secteurs,
        varieties:varieties,
        annonceurs:annonceurs,
        marques:marques,
        produits:produits,
        
        date1:dayjs(date1).subtract(1, 'year').format('YYYY-MM-DD'),
        date2:dayjs(date2).subtract(1, 'year').format('YYYY-MM-DD'),
        dashboard:"dashboard",
        media:"presse",
        countEnteries:"countEnteries",

      });
     
      set({VolumePresseLastYear: Number(response.data.data[0].count)});
      
    } catch (error) {
      console.log(error);
    }
  },
setBasedeCalucule:(i)=>{
    set({base:i})
   
},
ResetBasedeCalucule:(i)=>{
  set({base:""})
 
},
getAnnonceursActifPresse: async (
      supports,
      familles,
      classes,
      secteurs,
      varieties,
      annonceurs,
      marques,
      produits,
      date1,
      date2,) => {
  
      try {
        
        let response = await axios.post(`${PORT}/getfilters2.php`,{
          supports:supports,
        familles:familles,
        classes:classes,
        secteurs:secteurs,
        varieties:varieties,
        annonceurs:annonceurs,
        marques:marques,
        produits:produits, 
        date1:date1,
        date2:date2,
          dashboard:"dashboard",
          media:"presse",
          annonceursactifs:"annonceursactifs",
  
        });
        set({AnnonceursActifPresse: Number(response.data.data[0].count)});
      } catch (error) {
        console.log(error);
      }
},
getAnnonceursActifPresseLastYear: async (
  supports,
  familles,
  classes,
  secteurs,
  varieties,
  annonceurs,
  marques,
  produits,
  date1,
  date2,) => {

  try {
    
    let response = await axios.post(`${PORT}/getfilters2.php`,{
      supports:supports,
    familles:familles,
    classes:classes,
    secteurs:secteurs,
    varieties:varieties,
    annonceurs:annonceurs,
    marques:marques,
    produits:produits, 
    date1:date1,
    date2:date2,
      dashboard:"dashboard",
      media:"presse",
      annonceursactifs:"annonceursactifs",

    });
    set({AnnonceursActifPresseLastYear: Number(response.data.data[0].count)});
  } catch (error) {
    console.log(error);
  }
},
getCreationUniquesPresse: async (
          supports,
          familles,
          classes,
          secteurs,
          varieties,
          annonceurs,
          marques,
          produits,
          date1,
          date2,) => {
      
          try {
            
            let response = await axios.post(`${PORT}/getfilters2.php`,{
              supports:supports,
              familles:familles,
              classes:classes,
              secteurs:secteurs,
              varieties:varieties,
              annonceurs:annonceurs,
              marques:marques,
              produits:produits, 
              date1:date1,
              date2:date2,
              dashboard:"dashboard",
              media:"presse",
              creationsunique:"creationsunique",
      
            });
            set({CreationUniquesPresse: Number(response.data.data[0].count)});
            
          } catch (error) {
            console.log(error);
          }
},
getCreationUniquesPresseLastYear: async (
  supports,
  familles,
  classes,
  secteurs,
  varieties,
  annonceurs,
  marques,
  produits,
  date1,
  date2,) => {

  try {
    
    let response = await axios.post(`${PORT}/getfilters2.php`,{
      supports:supports,
      familles:familles,
      classes:classes,
      secteurs:secteurs,
      varieties:varieties,
      annonceurs:annonceurs,
      marques:marques,
      produits:produits, 
      date1:dayjs(date1).subtract(1, 'year').format('YYYY-MM-DD'),
      date2:dayjs(date2).subtract(1, 'year').format('YYYY-MM-DD'),
      dashboard:"dashboard",
      media:"presse",
      creationsunique:"creationsunique",

    });
    set({CreationUniquesPresseLastYear: Number(response.data.data[0].count)});
    
  } catch (error) {
    console.log(error);
  }
},
getBudgetBrutPresse: async (
             supports,
              familles,
              classes,
              secteurs,
              varieties,
              annonceurs,
              marques,
              produits,
              date1,
              date2,
            
            ) => {
          
              try {
                
                let response = await axios.post(`${PORT}/getfilters2.php`,{
                  supports:supports,
                  familles:familles,
                  classes:classes,
                  secteurs:secteurs,
                  varieties:varieties,
                  annonceurs:annonceurs,
                  marques:marques,
                  produits:produits,
                  date1:date1,
                  date2:date2, 
                  dashboard:"dashboard",
                  media:"presse",
                  budgettotal:"budgettotal",
          
                });
               console.log('response',response)
                set({BudgetBrutPresse: Number(response.data.data[0].total).toFixed(2)});
                
              } catch (error) {
                console.log(error);
              }
},
getBudgetBrutPresseLastYear: async (
  supports,
   familles,
   classes,
   secteurs,
   varieties,
   annonceurs,
   marques,
   produits,
   date1,
   date2,
 
 ) => {

   try {
     
     let response = await axios.post(`${PORT}/getfilters2.php`,{
       supports:supports,
       familles:familles,
       classes:classes,
       secteurs:secteurs,
       varieties:varieties,
       annonceurs:annonceurs,
       marques:marques,
       produits:produits,
       date1:dayjs(date1).subtract(1, 'year').format('YYYY-MM-DD'),
       date2:dayjs(date2).subtract(1, 'year').format('YYYY-MM-DD'),
       dashboard:"dashboard",
       media:"presse",
       budgettotal:"budgettotal",

     });
    console.log('response',response)
     set({BudgetBrutPresseLastYear: Number(response.data.data[0].total).toFixed(2)});
     
   } catch (error) {
     console.log(error);
   }
},
getSupportDiffusionPresse: async (
                 supports,
                  familles,
                  classes,
                  secteurs,
                  varieties,
                  annonceurs,
                  marques,
                  produits,
                  date1,
                  date2,) => {
              
                  try {
                    
                    let response = await axios.post(`${PORT}/getfilters2.php`,{
                      supports:supports,
                      familles:familles,
                      classes:classes,
                      secteurs:secteurs,
                      varieties:varieties,
                      annonceurs:annonceurs,
                      marques:marques,
                      produits:produits,  
                      date1:date1,
                      date2:date2,
                      dashboard:"dashboard",
                      media:"presse",
                      supportsdiffusion:"supportsdiffusion",
              
                    });
                    
                    set({SupportDiffusionPresse: Number(response.data.data[0].count)});
                    
                  } catch (error) {
                    console.log(error);
                  }
},
getSupportDiffusionPresseLastYear: async (
  supports,
   familles,
   classes,
   secteurs,
   varieties,
   annonceurs,
   marques,
   produits,
   date1,
   date2,) => {

   try {
     
     let response = await axios.post(`${PORT}/getfilters2.php`,{
       supports:supports,
       familles:familles,
       classes:classes,
       secteurs:secteurs,
       varieties:varieties,
       annonceurs:annonceurs,
       marques:marques,
       produits:produits,  
       date1:dayjs(date1).subtract(1, 'year').format('YYYY-MM-DD'),
       date2:dayjs(date2).subtract(1, 'year').format('YYYY-MM-DD'),
       dashboard:"dashboard",
       media:"presse",
       supportsdiffusion:"supportsdiffusion",

     });
     
     set({SupportDiffusionPresseLastYear: Number(response.data.data[0].count)});
     
   } catch (error) {
     console.log(error);
   }
},
getCouleur: async (supports,familles,classes,secteurs,varieties,annonceurs,marques,produits, date1,
  date2,) => {
                  
                      try {
                        
                        let response = await axios.post(`${PORT}/getfilters2.php`,{
                          supports:supports,
                          familles:familles,
                          classes:classes,
                          secteurs:secteurs,
                          varieties:varieties,
                          annonceurs:annonceurs,
                          marques:marques,
                          produits:produits,
                          date1:date1,
                          date2:date2, 
                          dashboard:"dashboard",
                          media:"presse",
                          nombrecouleur:"nombrecouleur",
                  
                        });
                       
                        set({Couleur: Number(response.data.data.couleur)});
                        set({NoireBlanc: Number(response.data.data.noir_et_blanc)});
                        
                      } catch (error) {
                        console.log(error);
                      }
},

//les fonctions suivantes pour radio et TV
getVolume: async (
  supports,
  familles,
  classes,
  secteurs,
  varieties,
  annonceurs,
  marques,
  produits,
  media,
  rangs,
  date1,
  date2,

) => {
console.log("link to volume calculation",`${PORT}/getfilters2.php`)
  try {
    
    let response = await axios.post(`${PORT}/getfilters2.php`,{
      supports:supports,
      familles:familles,
      classes:classes,
      secteurs:secteurs,
      varieties:varieties,
      annonceurs:annonceurs,
      marques:marques,
      produits:produits, 
      date1:date1,
      date2:date2,
      rangs:rangs,
      dashboard:"dashboard",
      media:media,
      countEnteries:"countEnteries",

    });
  if(Number(response.data.data[0].count)>1000){
    set({VolumeMedia: (Number(response.data.data[0].count)/1000).toFixed(1) +"K"});
}else{
  set({VolumeMedia: Number(response.data.data[0].count)});
}
   
    
  } catch (error) {
    console.log(error);
  }
},
getVolumelastyear: async (
  supports,
  familles,
  classes,
  secteurs,
  varieties,
  annonceurs,
  marques,
  produits,
  media,
  rangs,
  date1,
  date2,

) => {
  // console.log("date1",dayjs(date1).subtract(1, 'year').format('YYYY-MM-DD'))
  // console.log("link to volume calculation",`${PORT}/getfilters2.php`)
  try {
    let response = await axios.post(`${PORT}/getfilters2.php`,{
      supports:supports,
      familles:familles,
      classes:classes,
      secteurs:secteurs,
      varieties:varieties,
      annonceurs:annonceurs,
      marques:marques,
      produits:produits, 
      date1:dayjs(date1).subtract(1, 'year').format('YYYY-MM-DD'),
      date2:dayjs(date2).subtract(1, 'year').format('YYYY-MM-DD'),
      rangs:rangs,
      dashboard:"dashboard",
      media:media,
      countEnteries:"countEnteries",
    });
  if(Number(response.data.data[0].count)>1000){
    set({VolumeMediaLastyear: (Number(response.data.data[0].count)/1000).toFixed(1) +"K"});
}else{
  set({VolumeMediaLastyear: Number(response.data.data[0].count)});
}    
  } catch (error) {
    console.log(error);
  }
},
getAnnonceursActif: async (
  supports,
  familles,
  classes,
  secteurs,
  varieties,
  annonceurs,
  marques,
  produits,
  media,
  rangs,
  date1,
  date2,

) => {

  try {
    
    let response = await axios.post(`${PORT}/getfilters2.php`,{
      supports:supports,
     familles:familles,
     classes:classes,
     secteurs:secteurs,
     varieties:varieties,
     annonceurs:annonceurs,
     marques:marques,
     produits:produits,
     rangs:rangs, 
      dashboard:"dashboard",
      media:media,
      annonceursactifs:"annonceursactifs",

    });
    console.log('response', response)
    set({AnnonceursActifMedia: Number(response.data.data[0].count)});
  } catch (error) {
    console.log(error);
  }
},
getAnnonceursActifLastYear: async (
  supports,
  familles,
  classes,
  secteurs,
  varieties,
  annonceurs,
  marques,
  produits,
  media,
  rangs,
  date1,
  date2,

) => {

  try {
    
    let response = await axios.post(`${PORT}/getfilters2.php`,{
      supports:supports,
     familles:familles,
     classes:classes,
     secteurs:secteurs,
     varieties:varieties,
     annonceurs:annonceurs,
     marques:marques,
     produits:produits,
     rangs:rangs, 
      dashboard:"dashboard",
      media:media,
      annonceursactifs:"annonceursactifs",

    });
    console.log('response', response)
    set({AnnonceursActifMediaLastYear: Number(response.data.data[0].count)});
  } catch (error) {
    console.log(error);
  }
},
//les fontions sont en commun entre presse radio television
getTop20famillesSectorielles: async (
     supports,
      familles,
      classes,
      secteurs,
      varieties,
      annonceurs,
      marques,
      produits,
      base,
      media,
      rangs,
      date1,
      date2,
    ) => {
  
      try {
        set({isloading:true})
        let response = await axios.post(`${PORT}/getfilters2.php`,{
          media:media,
          dashboard:"dashboard",
          base:base,
          top20familles:"top20familles",
          supports:supports,
          familles:familles,
          classes:classes,
          secteurs:secteurs,
          varieties:varieties,
          annonceurs:annonceurs,
          marques:marques,
          produits:produits, 
          date1:date1,
          date2:date2,
          rangs:rangs,

  
        });
      
        set({Top20famillesSectorielles: response.data.data});
        set({isloading:false})
       console.table("response top 20 famille", response)
        
      } catch (error) {
        console.log(error);
      }
      
},
getTop20Annonceurs: async (
  supports,
   familles,
   classes,
   secteurs,
   varieties,
   annonceurs,
   marques,
   produits,
   base,
   media,
   rangs,
   date1,
   date2,
 ) => {

   try {
     set({isloading:true})
     let response = await axios.post(`${PORT}/getfilters2.php`,{
       media:media,
       dashboard:"dashboard",
       base:base,
       top20annonceurs:"top20annonceurs",

       supports:supports,
       familles:familles,
       classes:classes,
       secteurs:secteurs,
       varieties:varieties,
       annonceurs:annonceurs,
       marques:marques,
       produits:produits,
       date1:date1,
       date2:date2, 
       rangs:rangs,
     });
     
     console.log('rangs',rangs)
     console.log('media',media)
     console.log('base',base)
     console.log('response',response)
     set({Top20Annonceurs: response.data.data});
     set({isloading:false})
    
     
   } catch (error) {
     console.log(error);
     set({Top20Annonceurs: []});
   }
   
},  
getPrtMarchet:async(

  supports,
  familles,
  classes,
  secteurs,
  varieties,
  annonceurs,
  marques,
  produits,
  base,
  media,
  rangs,
  date1,
  date2,
)=>{

  try {
     
    let response = await axios.post(`${PORT}/getfilters2.php`,{
      supports:supports,
      familles:familles,
      classes:classes,
      secteurs:secteurs,
      varieties:varieties,
      annonceurs:annonceurs,
      marques:marques,
      produits:produits,
      rangs:rangs,  
      media:media,
      base:base,
      date1:date1,
      date2:date2,
      dashboard:"dashboard",
      partmarche:"partmarche",

    });

  console.log('part marche',response)
    set({PartMarche: response.data.data});
    
  } catch (error) {
    console.log(error);
  }








},
getTop20Marques:async(
  supports,
  familles,
  classes,
  secteurs,
  varieties,
  annonceurs,
  marques,
  produits,
  base,
  media,
  rangs,
  date1,
  date2,
) => {

  try {
    set({isloading:true})
    let response = await axios.post(`${PORT}/getfilters2.php`,{
      media:media,
      dashboard:"dashboard",
      base:base,

      top20marques:"top20marques",

      supports:supports,
      familles:familles,
      classes:classes,
      secteurs:secteurs,
      varieties:varieties,
      annonceurs:annonceurs,
      marques:marques,
      produits:produits, 
      date1:date1,
      date2:date2,
      rangs:rangs,


    });
    
    console.log('rangs',rangs)
    console.log('media',media)
    console.log('base',base)
    console.log('response',response)
    set({Top20marques: response.data.data});
    set({isloading:false})
   
    
  } catch (error) {
    console.log(error);
  }
},
getTop20Produits:async(
  supports,
  familles,
  classes,
  secteurs,
  varieties,
  annonceurs,
  marques,
  produits,
  base,
  media,
  rangs,
  date1,
  date2,
) => {

  try {
    set({isloading:true})
    let response = await axios.post(`${PORT}/getfilters2.php`,{
      media:media,
      dashboard:"dashboard",
      base:base,

      top20produits:"top20produits",

      supports:supports,
      familles:familles,
      classes:classes,
      secteurs:secteurs,
      varieties:varieties,
      annonceurs:annonceurs,
      marques:marques,
      produits:produits, 
      rangs:rangs,
      date1:date1,
      date2:date2,

    });
    
    console.log('rangs',rangs)
    console.log('media',media)
    console.log('base',base)
    console.log('response produit',response)
    set({Top20produits: response.data.data});
    set({isloading:false})
   
    
  } catch (error) {
    console.log(error);
  }
},
getRepartitionFormat:async(
  supports,
  familles,
  classes,
  secteurs,
  varieties,
  annonceurs,
  marques,
  produits,
  base,
  media,
  rangs,
  date1,
  date2,
) => {

  try {
    set({isloading:true})
    let response = await axios.post(`${PORT}/getfilters2.php`,{
      media:media,
      dashboard:"dashboard",
      base:base,
      repartitionformat:"repartitionformat",
      
      
      supports:supports,
      familles:familles,
      classes:classes,
      secteurs:secteurs,
      varieties:varieties,
      annonceurs:annonceurs,
      marques:marques,
      produits:produits, 
      rangs:rangs,
      date1:date1,
      date2:date2,

    });
    
    console.log('rangs',rangs)
    console.log('media',media)
    console.log('base',base)
    console.log('response repartition',response)
    set({FormatRepartition: response.data.data});
    set({isloading:false})
   
    
  } catch (error) {
    console.log(error);
  }
},
getAnnonceursParSupport:async(
  supports,
  familles,
  classes,
  secteurs,
  varieties,
  annonceurs,
  marques,
  produits,
  base,
  media,
  rangs,
  date1,
  date2,
) => {

  try {
    set({isloading:true})
    let response = await axios.post(`${PORT}/getfilters2.php`,{
      media:media,
      dashboard:"dashboard",
      base:base,

      annonceurparsupport:"annonceurparsupport",

      supports:supports,
      familles:familles,
      classes:classes,
      secteurs:secteurs,
      varieties:varieties,
      annonceurs:annonceurs,
      marques:marques,
      produits:produits, 
      rangs:rangs,
      date1:date1,
      date2:date2,

    });
    
    console.log('rangs',rangs)
    console.log('media',media)
    console.log('base',base)
    console.log('response a a par support',response)
    set({AnnonceurParSupport: response.data.data});
    set({isloading:false})
   
    
  } catch (error) {
    console.log(error);
  }
},

getCreationParAnnonceur:async(
  supports,
  familles,
  classes,
  secteurs,
  varieties,
  annonceurs,
  marques,
  produits,
  base,
  media,
  rangs,
  date1,
  date2,
) => {

  try {
    set({isloading:true})
    let response = await axios.post(`${PORT}/getfilters2.php`,{
      media:media,
      dashboard:"dashboard",
      base:base,

      creationparannonceurs:"creationparannonceurs",

      supports:supports,
      familles:familles,
      classes:classes,
      secteurs:secteurs,
      varieties:varieties,
      annonceurs:annonceurs,
      marques:marques,
      produits:produits, 
      rangs:rangs,
      date1:date1,
      date2:date2,

    });
    
    console.log('rangs',rangs)
    console.log('media',media)
    console.log('base',base)
    console.log('response creation par annonceur',response)
    set({CreationParAnnonceur: response.data.data});
    set({isloading:false})
   
    
  } catch (error) {
    console.log(error);
  }
},

//Parametres Dashboard
getCreationUniques: async (
  supports,
  familles,
  classes,
  secteurs,
  varieties,
  annonceurs,
  marques,
  produits,
  media,
  rangs,
  date1,
  date2,

) => {

  try {
    set({isloading:true})
    let response = await axios.post(`${PORT}/getfilters2.php`,{
      supports:supports,
      familles:familles,
      classes:classes,
      secteurs:secteurs,
      varieties:varieties,
      annonceurs:annonceurs,
      marques:marques,
      produits:produits, 
      media:media,
      rangs:rangs,
      date1:date1,
      date2:date2,
      dashboard:"dashboard",
      creationsunique:"creationsunique",

    });
    console.log("creation unique",response)
    set({CreationUniquesMedia: Number(response.data.data[0].count)});
    set({isloading:false})
  } catch (error) {
    console.log(error);
  }
}, 
getCreationUniquesLastYear: async (
  supports,
  familles,
  classes,
  secteurs,
  varieties,
  annonceurs,
  marques,
  produits,
  media,
  rangs,
  date1,
  date2,

) => {

  try {
    set({isloading:true})
    let response = await axios.post(`${PORT}/getfilters2.php`,{
      supports:supports,
      familles:familles,
      classes:classes,
      secteurs:secteurs,
      varieties:varieties,
      annonceurs:annonceurs,
      marques:marques,
      produits:produits, 
      media:media,
      rangs:rangs,
      date1:dayjs(date1).subtract(1, 'year').format('YYYY-MM-DD'),
      date2:dayjs(date2).subtract(1, 'year').format('YYYY-MM-DD'),
      dashboard:"dashboard",
      creationsunique:"creationsunique",

    });
    console.log("creation unique",response)
    set({CreationUniquesMediaLastYear: Number(response.data.data[0].count)});
    set({isloading:false})
  } catch (error) {
    console.log(error);
  }
}, 

getBudgetBrut: async (
   supports,
   familles,
   classes,
   secteurs,
   varieties,
   annonceurs,
   marques,
   produits,
   media,
   rangs,
   date1,
   date2,
  ) => {

   try {
    set({isloading:true})
     let response = await axios.post(`${PORT}/getfilters2.php`,{
      media:media,
      dashboard:"dashboard",
      budgettotal:"budgettotal",

       supports:supports,
       familles:familles,
       classes:classes,
       secteurs:secteurs,
       varieties:varieties,
       annonceurs:annonceurs,
       marques:marques,
       produits:produits,
       date1:date1,
       date2:date2,
       rangs:rangs,

     });
    // console.log("media", media)
    // console.log("reponse budget", response)
    if(Number(response.data.data[0].count)>1000){
      set({BudgetBrutMedia: (Number(response.data.data[0].count)/1000).toFixed(1)+"Md"});
      set({isloading:true})
     }else{
      set({BudgetBrutMedia: (Number(response.data.data[0].count).toFixed(1))+"M"});
      set({isloading:true})
     }
   
   } catch (error) {
     console.log(error);
   }
},
getBudgetBrutLastYear: async (
  supports,
  familles,
  classes,
  secteurs,
  varieties,
  annonceurs,
  marques,
  produits,
  media,
  rangs,
  date1,
  date2,
 ) => {

  try {
   set({isloading:true})
    let response = await axios.post(`${PORT}/getfilters2.php`,{
     media:media,
     dashboard:"dashboard",
     budgettotal:"budgettotal",

      supports:supports,
      familles:familles,
      classes:classes,
      secteurs:secteurs,
      varieties:varieties,
      annonceurs:annonceurs,
      marques:marques,
      produits:produits,
      date1:dayjs(date1).subtract(1, 'year').format('YYYY-MM-DD'),
      date2:dayjs(date2).subtract(1, 'year').format('YYYY-MM-DD'),
      rangs:rangs,

    });
   // console.log("media", media)
   // console.log("reponse budget", response)
   if(Number(response.data.data[0].count)>1000){
     set({BudgetBrutMediaLastYear: (Number(response.data.data[0].count)/1000).toFixed(1)+"Md"});
     set({isloading:true})
    }else{
     set({BudgetBrutMediaLastYear: (Number(response.data.data[0].count).toFixed(1))+"M"});
     set({isloading:true})
    }
  
  } catch (error) {
    console.log(error);
  }
},

getSupportDiffusion: async (
   supports,
   familles,
   classes,
   secteurs,
   varieties,
   annonceurs,
   marques,
   produits,
   media,
   rangs,
   date1,
   date2,
  ) => {

   try {
     
     let response = await axios.post(`${PORT}/getfilters2.php`,{
       supports:supports,
       familles:familles,
       classes:classes,
       secteurs:secteurs,
       varieties:varieties,
       annonceurs:annonceurs,
       marques:marques,
       produits:produits,
       rangs:rangs,  
       media:media,
       date1:date1,
       date2:date2,
       dashboard:"dashboard",
       supportdiffusion:"supportdiffusion",

     });
   console.log("support de diffusion",response)
     set({SupportDiffusionMedia: Number(response.data.data[0].count)});
     
   } catch (error) {
     console.log(error);
     set({SupportDiffusionMedia: 0});
   }
},
getSupportDiffusionLastYear: async (
  supports,
  familles,
  classes,
  secteurs,
  varieties,
  annonceurs,
  marques,
  produits,
  media,
  rangs,
  date1,
  date2,
 ) => {

  try {
    
    let response = await axios.post(`${PORT}/getfilters2.php`,{
      supports:supports,
      familles:familles,
      classes:classes,
      secteurs:secteurs,
      varieties:varieties,
      annonceurs:annonceurs,
      marques:marques,
      produits:produits,
      rangs:rangs,  
      media:media,
      date1:dayjs(date1).subtract(1, 'year').format('YYYY-MM-DD'),
      date2:dayjs(date2).subtract(1, 'year').format('YYYY-MM-DD'),
      dashboard:"dashboard",
      supportdiffusion:"supportdiffusion",

    });
  console.log("support de diffusion",response)
    set({SupportDiffusionMediaLastYear: Number(response.data.data[0].count)});
    
  } catch (error) {
    console.log(error);
  }
},


getDureeTotalDiffusion:async (
  supports,
   familles,
   classes,
   secteurs,
   varieties,
   annonceurs,
   marques,
   produits,
   media,
   rangs,
   date1,
   date2,
)=>{
  try {
     
    let response = await axios.post(`${PORT}/getfilters2.php`,{
      supports:supports,
      familles:familles,
      classes:classes,
      secteurs:secteurs,
      varieties:varieties,
      annonceurs:annonceurs,
      marques:marques,
      produits:produits,
      rangs:rangs,  
      media:media,
      date1:date1,
      date2:date2,
      dashboard:"dashboard",
      dureetotal:"dureetotal",

    });
  console.log('response duree',response)
  if( Number(response.data.data[0].count)>3600){
    set({DureeTotal: (Number(response.data.data[0].count)/3600).toFixed(2) +"H"});
  }else{
    set({DureeTotal: Number(response.data.data[0].count)+ "s"});

  }
   
    
  } catch (error) {
    console.log(error);
  }

},
getDureeTotalDiffusionLastYear:async (
  supports,
   familles,
   classes,
   secteurs,
   varieties,
   annonceurs,
   marques,
   produits,
   media,
   rangs,
   date1,
   date2,
)=>{
  try {
     
    let response = await axios.post(`${PORT}/getfilters2.php`,{
      supports:supports,
      familles:familles,
      classes:classes,
      secteurs:secteurs,
      varieties:varieties,
      annonceurs:annonceurs,
      marques:marques,
      produits:produits,
      rangs:rangs,  
      media:media,
      date1:dayjs(date1).subtract(1, 'year').format('YYYY-MM-DD'),
      date2:dayjs(date2).subtract(1, 'year').format('YYYY-MM-DD'),
      dashboard:"dashboard",
      dureetotal:"dureetotal",

    });
  console.log('response duree',response)
  if( Number(response.data.data[0].count)>3600){
    set({DureeTotalLastYear: (Number(response.data.data[0].count)/3600).toFixed(2) +"H"});
  }else{
    set({DureeTotalLastYear: Number(response.data.data[0].count)+ "s"});

  }
   
    
  } catch (error) {
    console.log(error);
  }

},

getDureeTotalMoyenne:async (
  supports,
   familles,
   classes,
   secteurs,
   varieties,
   annonceurs,
   marques,
   produits,
   media,
   rangs,
   date1,
   date2,
)=>{
  try {
     
    let response = await axios.post(`${PORT}/getfilters2.php`,{
      supports:supports,
      familles:familles,
      classes:classes,
      secteurs:secteurs,
      varieties:varieties,
      annonceurs:annonceurs,
      marques:marques,
      produits:produits,
      rangs:rangs,  
      media:media,
      date1:date1,
      date2:date2,
      dashboard:"dashboard",
      dureemoyenne:"dureemoyenne",

    });
  console.log('duree moyenne', response)
    set({DureeMoyenne: Number(response.data.data[0].proportion)});
    
  } catch (error) {
    console.log(error);
  }

},
getDureeTotalMoyenneLastYear:async (
  supports,
   familles,
   classes,
   secteurs,
   varieties,
   annonceurs,
   marques,
   produits,
   media,
   rangs,
   date1,
   date2,
)=>{
  try {
     
    let response = await axios.post(`${PORT}/getfilters2.php`,{
      supports:supports,
      familles:familles,
      classes:classes,
      secteurs:secteurs,
      varieties:varieties,
      annonceurs:annonceurs,
      marques:marques,
      produits:produits,
      rangs:rangs,  
      media:media,
      date1:dayjs(date1).subtract(1, 'year').format('YYYY-MM-DD'),
      date2:dayjs(date2).subtract(1, 'year').format('YYYY-MM-DD'),
      dashboard:"dashboard",
      dureemoyenne:"dureemoyenne",

    });
  console.log('duree moyenne', response)
    set({DureeMoyenneLastYear: Number(response.data.data[0].proportion)});
    
  } catch (error) {
    console.log(error);
  }

},

getPicCommunication:async(
  supports,
  familles,
  classes,
  secteurs,
  varieties,
  annonceurs,
  marques,
  produits,
  media,
  rangs,
  date1,
  date2,
)=>{

  try {
     
    let response = await axios.post(`${PORT}/getfilters2.php`,{
      supports:supports,
      familles:familles,
      classes:classes,
      secteurs:secteurs,
      varieties:varieties,
      annonceurs:annonceurs,
      marques:marques,
      produits:produits,
      rangs:rangs,  
      media:media,
      date1:date1,
      date2:date2,
      dashboard:"dashboard",
      piccommunication:"piccommunication",

    });
  console.log("pic",response)
    set({PicCommunication: response.data.data[0]});
    
  } catch (error) {
    console.log(error);
  }




},
getPicCommunicationLastYear:async(
  supports,
  familles,
  classes,
  secteurs,
  varieties,
  annonceurs,
  marques,
  produits,
  media,
  rangs,
  date1,
  date2,
)=>{

  try {
     
    let response = await axios.post(`${PORT}/getfilters2.php`,{
      supports:supports,
      familles:familles,
      classes:classes,
      secteurs:secteurs,
      varieties:varieties,
      annonceurs:annonceurs,
      marques:marques,
      produits:produits,
      rangs:rangs,  
      media:media,
      date1:dayjs(date1).subtract(1, 'year').format('YYYY-MM-DD'),
      date2:dayjs(date2).subtract(1, 'year').format('YYYY-MM-DD'),
      dashboard:"dashboard",
      piccommunication:"piccommunication",

    });
  console.log("pic",response)
    set({PicCommunicationLastYear:response.data.data[0]});
    
  } catch (error) {
    console.log(error);
  }




},
sendDownloadLink:async(
  email,
  date1,
  date2,
  media,
  annonceurs,
  produits,
  varietes,
  marques,
  familles,
  classes,
  secteurs,  
)=>{
try {
  set({ExportExcelPending:true})
  let response=await axios.post(`${PORT}/${media}/excel`,{
     email:email,
     date_debut:date1,
     date_fin:date2,
     annonceurs_ids:annonceurs,
     produits_ids:produits,
     marques_ids:marques,    
     familles_ids:familles,
     classes_ids:classes,
     secteurs_ids:secteurs,
     varietes_ids:varietes
  })
console.log("response excel",response)
set({ExportExcelPending:false,
  DisplayEmailSent:true
})
} catch (error) {
  
}

}

}))