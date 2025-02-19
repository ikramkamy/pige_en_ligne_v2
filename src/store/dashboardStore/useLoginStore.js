import axios from "axios";
import { create } from 'zustand'
//const PORT = "https://immar-media.com";
const PORT = "https://pige-dev.immar-media.com/api/index.php"
import { jwtDecode } from 'jwt-decode';
//import jwt from 'jsonwebtoken';

export const UseLoginStore = create((set, get) => ({
  utilisateur_id: "",
  client: "",
  email: "",
  date_debut: "",
  date_fin: "",
  errormessage: "",
  showAlert1: false,
  showAlert2: false,
  showAlert3: false,
  showAlert4: false,
  historyExportUser: [],
  messageAlertResetPasswrod: "",
  usePrevilegesSupport_radio: [],
  usePrevilegeschainetv: [],
  usePrevilegesFamilles: [],
  usePrevilegesClasse: [],
  usePrevilegesSecteur: [],
  usePrevilegesProduit: [],
  usePrevilegesVarietes: [],
  usePrevilegesAnnonceurs: [],
  usePrevilegesMarques: [],
  userPrevilegesVeille: [],
  messageUpdatePassword: "",
  isloading: false,
  isSucces: false,
  test: 123,
  userIdentifications: {},
  autorisePigePresse: false,
  autorisePigeRadio: false,
  autorisePigeTv: false,
  autoriseVeillePresse: false,
  autoriseVeilleRadio: false,
  autoriseVeilleTv: false,
  autoriseDash: false,

  ReseAlertShwing: () => {
    set({
      showAlert1: false,
      showAlert2: false,
      showAlert3: false,
      showAlert4: false
    })
  },
  setTestvalue: (i) => {
   

    set({ test: i })
  },
  setLoginInputs: (user) => {
    //console.log("calling log in set")
    set({
      userIdentifications: user
    })
  },
  LougoutRestErrorMessages: async (user) => {
    set({
      showAlert1: false,
      showAlert2: false,
      client: "",
      email: "",
    })
    try {
      let response = await axios.post(`${PORT}/logout`, {
        email: "ikramzerkout13@gmail.com"
      })
      // //console.log(response)
    } catch (error) {
    }
  },
  Loginuser: async (user) => {
    try {
      let response = await axios.post(`${PORT}/login`, {
        submitted: true,
        password: user.pass,
        email: user.email
      });

      // ////console.log("response",response)
      if (response.data.message === "Connexion établie avec succès.") {
        var decoded = jwtDecode(response.data.payload);
        //console.log("response.data.payload", response.data.payload)
        set({

          client: decoded.user_id.utilisateur,
          email: decoded.user_id.email,
          date_debut: decoded.user_id.date_debut,
          date_fin: decoded.user_id.date_fin,
          showAlert1: true,
          showAlert2: false,
          usePrevilegesAnnonceurs: [],
          usePrevilegesMarques: [],
          userPrevilegesVeille: [],
          //not ready yet
          historyExportUser: [],

          autorisePigePresse: decoded.user_id.autorisations.pige_presse === 1 ? true : false,
          autoriseVeillePresse: decoded.user_id.autorisations.veille_presse === 1 ? true : false,
          autorisePigeRadio: decoded.user_id.autorisations.pige_radio === 1 ? true : false,
          autoriseVeilleRadio: decoded.user_id.autorisations.veille_radio === 1 ? true : false,
          autorisePigeTv: decoded.user_id.autorisations.pige_tv === 1 ? true : false,
          autoriseVeilleTv: decoded.user_id.autorisations.veille_tv === 1 ? true : false,
          autoriseDash: decoded.user_id.autorisations.dashboard === 1 ? true : false,

        })
        //console.log("redirecting to home succefully", decoded.user_id)
        //window.localStorage.setItem('user_name', decoded.user_id.utilisateur) 
        window.localStorage.setItem('user_email', "decoded.user_id.utilisateur")
        window.localStorage.setItem('date_debut', decoded.user_id.date_debut)
        window.localStorage.setItem('date_fin', decoded.user_id.date_fin)
        //no longer using ""user_id" to be deleted later     
        //window.localStorage.setItem('user_id', decoded.user_id.utilisateur)


        //to avoid refreshing I will use react hook useNavigate
        //window.location.href="/admin/home";

      } else {
        //console.log("mot de passe incorrect")
        set({
          errormessage: response.data.message,
          showAlert1: false,
          showAlert2: true,
        })
      }
    } catch (error) {
      //console.log(error);
    }
  },
  GetUserData: async (user) => {
    try {
      let response = await axios.post(`${PORT}/forgot`, {
        user_id: user
      });
      //console.log("response", response)
    } catch (error) {

    }
  },
  SendResePasswordLink: async (email) => {
    //console.log('email before', email)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    emailRegex.test(email);

    if (email === "") {
      set({ messageAlertResetPasswrod: "Tous les champs doivent être remplis." })
      set({
        showAlert3: false,
        showAlert4: true,
      })
    } else if (!emailRegex.test(email)) {
      set({ messageAlertResetPasswrod: "email incorrect" })
      set({
        showAlert3: false,
        showAlert4: true,
      })
    } else {
      //console.log(email)
      set({
        showAlert3: true,
        showAlert4: false,
      })
      try {
        let response = await axios.post(`${PORT}/forgot`, {
          email: email,
        });
        //console.log("response", response)
      } catch (error) {

      }
    }
  },
  UpdatePasseword: async (pass, emailToken) => {
    //console.log("token", emailToken)

    //   try {
    //     const verified = jwt.verify(emailToken, secret);
    //     //console.log('Verified JWT:', verified);
    // } catch (error) {
    //     console.error('Token verification failed:', error.message);
    // }
    try {
      var decodedEmail = jwtDecode(emailToken)
      //console.log('decoded email', decodedEmail)
      let response = await axios.post(`${PORT}/reset`, {
        email: decodedEmail.user_id,
        password: pass,
      })
      ////console.log("response pass udated", response)
      set({
        isloading: false,
        // isSucces:true,
      })
      if (response.data.message == 'Mot de passe réinitialisé avec succès.') {
        set({
          //isloading:false,
          isSucces: true,
        })
        set({ messageUpdatePassword: response.data.message })
        setTimeout(() => {
          window.location.href = '/#/login'
        }, 2000);

      } else {
        window.location.href = '/#/login/motdepasseoublier';
      }
    } catch (error) {
      window.location.href = '/#/login/motdepasseoublier';
    }
  },
  LoginWithParamToken: async (ParamToken) => {
    var decoded = jwtDecode(ParamToken);

    set({

      client: decoded.user_id.utilisateur,
      email: decoded.user_id.email,
      date_debut: decoded.user_id.date_debut,
      date_fin: decoded.user_id.date_fin,
      showAlert1: true,
      showAlert2: false,
      usePrevilegesAnnonceurs: [],
      usePrevilegesMarques: [],
      userPrevilegesVeille: [],
      //not ready yet
      historyExportUser: [],

      autorisePigePresse: decoded.user_id.autorisations.pige_presse === 1 ? true : false,
      autoriseVeillePresse: decoded.user_id.autorisations.veille_presse === 1 ? true : false,
      autorisePigeRadio: decoded.user_id.autorisations.pige_radio === 1 ? true : false,
      autoriseVeilleRadio: decoded.user_id.autorisations.veille_radio === 1 ? true : false,
      autorisePigeTv: decoded.user_id.autorisations.pige_tv === 1 ? true : false,
      autoriseVeilleTv: decoded.user_id.autorisations.veille_tv === 1 ? true : false,
      autoriseDash: decoded.user_id.autorisations.dashboard === 1 ? true : false,

    })


  },
  TokenParam: "",
  StoreParamToken: (tokenParam) => {
    set({TokenParam:tokenParam})
  }




}

))