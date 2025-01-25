import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import { Search } from '@mui/icons-material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import AdjustIcon from '@mui/icons-material/Adjust';
import { keyframes } from '@mui/system';
import { UseVeilleStore } from 'store/dashboardStore/VeilleMediaStore';
export default function BasicSpeedDial({
  handelZIPfileDownload,
  DownloadFile,
  selectSortOption}) {
    const {setShowSearchKey}=UseVeilleStore((state)=>state)
    const pulsate = keyframes`
    0% {
        transform: scale(1);
        opacity: 1;
    }
    50% {
        transform: scale(1.1);
        opacity: 0.8;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
`;
    const actions = [
        { icon: <FolderZipIcon color='#00a6e0' />, name: 'Zip', todo:handelZIPfileDownload },
        { icon: <SimCardDownloadIcon  color='#00a6e0'/>, name: 'Télécharger',todo:DownloadFile },
        { icon: <Search  color='#00a6e0'/>, name: 'Recherche', todo:setShowSearchKey },
        { icon: <SwapVertIcon color='#00a6e0'/>, name: 'Trier', todo: selectSortOption },
      ];
      const [resStyle,setResStyle]=React.useState({})
      React.useEffect(() => {
          const handleResize = () => {
            setResStyle({
              PositionSpeedDeal:window.innerWidth < 768 ? 
              '10%' :window.innerWidth < 400 ? "20%" : '0%',
          
            });
          };
          handleResize();
          window.addEventListener('resize', handleResize);
          return () => {
            window.removeEventListener('resize', handleResize);
          };
        }, []);
  return (
    <Box sx={{ height: 50, transform: 'translateZ(0px)',
     flexGrow: 1,
      position:"fixed",top:"70%", left:resStyle.PositionSpeedDeal }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16}}
        icon={<AdjustIcon sx={{
            color: "#ffc600",
            animation: `${pulsate} 1.5s infinite`,
            transition: 'transform 0.3s, opacity 0.3s',
            '&:hover': {
                animation: `none`,
            },
        }}/>}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.todo}

          />
        ))}
      </SpeedDial>
    </Box>
  );
}