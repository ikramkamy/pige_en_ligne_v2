import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import dayjs from "dayjs";
import { UseLoginStore } from 'store/dashboardStore/useLoginStore';
function TabPanel(props) {
  const { 
    children, value, index,
    annonceur,date_debut ,
     date_fin,
     date_recherche,
     email,
     id,
     media,
     user,...other
    } = props;
    
 
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);
  const{historyExportUser}=UseLoginStore((state)=>state);
  const today = dayjs();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab sx={{textTransform:"none"}} label='today' {...a11yProps(0)} />
        <Tab sx={{textTransform:"none"}}label="annonceur" {...a11yProps(1)} />
        <Tab sx={{textTransform:"none"}}label="date début" {...a11yProps(2)} />
        <Tab sx={{textTransform:"none"}}label="Item Four" {...a11yProps(3)} />
        <Tab sx={{textTransform:"none"}}label="Item Five" {...a11yProps(4)} />
        <Tab sx={{textTransform:"none"}}label="Item Six" {...a11yProps(5)} />
        <Tab sx={{textTransform:"none"}}label="Item Seven" {...a11yProps(6)} />
      </Tabs>
      <TabPanel value={value} index={7}>
        media
      </TabPanel>
      <TabPanel value={value} index={0}>
        annonceur
      </TabPanel>
      <TabPanel value={value} index={1}>
        date début
      </TabPanel>
      <TabPanel value={value} index={2}>
        date fin
      </TabPanel>
      <TabPanel value={value} index={3}>
        date de recherche
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        client
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
    </Box>
  );
}