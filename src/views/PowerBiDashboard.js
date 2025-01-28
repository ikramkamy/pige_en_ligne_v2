import { useEffect ,useRef} from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import {models} from 'powerbi-client';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig, loginRequest } from '../components/config/authConfig';

const msalInstance = new PublicClientApplication(msalConfig);
const PowerBiDashbord=()=>{
    const accessTokenRef = useRef(null);
    useEffect(() => {
        const getAccessToken = async () => {
            try {
                // Ensure MSAL is initialized
                await msalInstance.initialize();

                // Attempt to acquire a token
                const response = await msalInstance.loginPopup(loginRequest);
                const accessToken = response.accessToken;
                accessTokenRef.current = accessToken; // Store the access token
                console.log("Access Token:", accessToken);
                // Use the access token to embed Power BI report
            } catch (error) {
                console.error("Error acquiring access token:", error);
                if (true) {
                    // Handle interaction required error
                    console.error("Interaction required. Please sign in again.");
                } else {
                    // Handle other errors
                    console.error("An error occurred:", error.message);
                }
            }
        };

        getAccessToken();
    }, []);
    return(
        <div>
<h3 style={{color:"white", width:"100%", textAlign:"center", marginTop:"5%"}}>
    Bienvenue sur Power BI Dashboard</h3>
        
{/* <PowerBIEmbed
	embedConfig = {{
		type: 'report',   // Supported types: report, dashboard, tile, visual, qna, paginated report and create
		id: '9bf1b4df-fd10-4dfa-825f-c9f91d53ffc7',
		embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=9bf1b4df-fd10-4dfa-825f-c9f91d53ffc7',
		accessToken: '<Access Token>',
		tokenType: models.TokenType.Embed, // Use models.TokenType.Aad for SaaS embed
		settings: {
			panes: {
				filters: {
					expanded: false,
					visible: false
				}
			},
			background: models.BackgroundType.Transparent,
		}
	}}

	eventHandlers = {
		new Map([
			['loaded', function () {console.log('Report loaded');}],
			['rendered', function () {console.log('Report rendered');}],
			['error', function (event) {console.log(event.detail);}],
			['visualClicked', () => console.log('visual clicked')],
			['pageChanged', (event) => console.log(event)],
		])
	}

	cssClassName = { "reportClass" }

	getEmbeddedComponent = { (embeddedReport) => {
		window.report = embeddedReport;
	}}

/>   */}
<div style={{width:"100%", display:"flex", justifyContent:"center", alignItems:"center", marginTop:"2.5%", marginBottom:"5%"}}>

<iframe 
style={{backgroundColor:""}}
title="Dashboard de la Pige publicitaire" width="1140" 
height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=9bf1b4df-fd10-4dfa-825f-c9f91d53ffc7&autoAuth=true&ctid=2906f490-a4a9-4f4e-be11-4fb937da1aff" frameborder="0" allowFullScreen="true"></iframe> 
</div>

        </div>
    )
}
export default PowerBiDashbord;