import { create  } from "zustand";
import axios  from "axios";
import dayjs from "dayjs";
const PORT="https://immar-media.com";
//const PORT="http://localhost/pigeonligne"
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
    // base:'volume',
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

sendDownloadLink:async(Filtersupports,
  annonceurs,produits,
  date1,date2,media,
  client,email,user_id
)=>{
 console.log("we are sending user_id ",user_id)
console.log("Filtersupports",Filtersupports)
// console.log("annonceurs",annonceurs.join(","))
// console.log("produits",produits.join(","))
// console.log("date1",date1)
var support=Filtersupports.length===0? "56" : Filtersupports.join(",")
var annonceur=annonceurs.length===0?"15,16,13" :annonceurs.join(",")
var produit =produits.length===0? "13,14,16": produits.join(",")
var type= 'ALL'
var famille = 'ALL'
var classe = 'ALL'
var urlsend="https://immar-media.com/phpexcel/ex/calcul_pige_presse_limite4_v2.php?chaine="+
support+"&type_diffusion="+type +"ALL&Annonceur_Nom="
+annonceur+"&Produit_Lib="+produit+ 
"&Marque_Lib=ALL"+ "&type_recherche=en_cours"+"&date1="
+date1+"&date2="+date2+"&CodeFamille=ALL&classe=ALL+&user_id="+user_id+"&email="+email+"&client="+client
var urlsend_radio="https://immar-media.com/phpexcel/ex/calcul_pige_radio_limite4_v2.php?chaine="+support+"&type_diffusion="+type +"ALL&Annonceur_Nom="+annonceur+"&Produit_Lib="+produit+"&Marque_Lib=ALL"+"&type_recherche=en_cours"+"&date1="+date1+"&date2="+date2+"&CodeFamille=ALL&classe=ALL+&user_id="+user_id+"&email="+email+"&client="+client
var urlsend_tv="https://immar-media.com/phpexcel/ex/calcul_pige_tv_limite4_v2.php?chaine="+support+"&type_diffusion="+type +"ALL&Annonceur_Nom="+annonceur+"&Produit_Lib="+produit+ "&Marque_Lib=ALL"+ "&type_recherche=en_cours"+"&date1="+date1+"&date2="+date2+"&CodeFamille=ALL&classe=ALL+&user_id="+user_id+"&email="+email+"&client="+client
//https://immar-media.com/phpexcel/ex/calcul_pige_presse_limite4.php?chaine=56&type_diffusion=ALL&Annonceur_Nom=ALGERIE%20TELECOM&Produit_Lib=152,158,166,168,237,291,539,1433,1974,2280,7201,9194&Marque_Lib=ALL&type_recherche=en_cours&date1=09-12-2024&date2=09-12-2024&CodeFamille=ALL&classe=AL

urlsend = urlsend.split(" ").join("%20")
urlsend_radio=urlsend_radio.split(" ").join("%20")
urlsend_tv=urlsend_tv.split(" ").join("%20")

console.log("urlsend", urlsend)
switch(media){
  case "presse":
    await axios.get(urlsend).then(res => {
      console.log("response link sending", res)
             if (parseInt(res.data.total_export) >= 30) {
             console.log(res)
               set({
                   errorSendingLink: 'vous avez atteint votre limite quotidienne !'
               })
           }
           if (parseInt(res.data.total_annonceur) >= 30) {
             console.log(res)
              set({
                   errorSendingLink: 'vous avez atteint votre total max d\'annonceur !'
               })
           }
           if (parseInt(res.data.total_export) < 30 && parseInt(res.data.total_annonceur) < 30) {
             console.log("email response",res)
               if (res.data.sent_email == 1) {
                 console.log("email sent succesfully")
                   set({
                       errorSendingLink: 'lien de téléchargement envoyé. veuillez consulter votre boîte de réception.'
                   })
               } else {            
                 console.log("emai sent succesfully")
                  set({
                    errorSendingLink: 'Une erreur est survenue lors de l\'exportation, veuillez réessayer !'
                   })
               }
           }
        
       }).catch(err => {
           console.log(err)
       })
  break;
  case "radio":
    await axios.get(urlsend_radio).then(res => {
      console.log("response", res)
      if (parseInt(res.data.total_export) >= 30) {
        console.log(res)
          set({
              errorSendingLink: 'vous avez atteint votre limite quotidienne !'
          })
      }
      if (parseInt(res.data.total_annonceur) >= 30) {
        console.log(res)
         set({
              errorSendingLink: 'vous avez atteint votre total max d\'annonceur !'
          })
      }
      if (parseInt(res.data.total_export) < 30 && parseInt(res.data.total_annonceur) < 30) {
        console.log("email response",res)
          if (res.data.sent_email == 1) {
            console.log("emai sent succesfully")
              set({
                  errorSendingLink: 'lien de téléchargement envoyé. veuillez consulter votre boîte de réception.'
              })
          } else {            
            console.log("emai sent succesfully")
             set({
               errorSendingLink: 'Une erreur est survenue lors de l\'exportation, veuillez réessayer !'
              })
          }
      }
           
        
       }).catch(err => {
           console.log(err)
       })
  break;
  case "television":
    await axios.get(urlsend_tv).then(res => {
      console.log("response", res)
     
      if (parseInt(res.data.total_export) >= 30) {
        console.log(res)
          set({
              errorSendingLink: 'vous avez atteint votre limite quotidienne !'
          })
      }
      if (parseInt(res.data.total_annonceur) >= 30) {
        console.log(res)
         set({
              errorSendingLink: 'vous avez atteint votre total max d\'annonceur !'
          })
      }
      if (parseInt(res.data.total_export) < 30 && parseInt(res.data.total_annonceur) < 30) {
        console.log("email response",res)
          if (res.data.sent_email == 1) {
            console.log("emai sent succesfully")
              set({
                  errorSendingLink: 'lien de téléchargement envoyé. veuillez consulter votre boîte de réception.'
              })
          } else {            
            console.log("emai sent succesfully")
             set({
               errorSendingLink: 'Une erreur est survenue lors de l\'exportation, veuillez réessayer !'
              })
          }
      }
        
       }).catch(err => {
           console.log(err)
       })
  break;
}

}

}))