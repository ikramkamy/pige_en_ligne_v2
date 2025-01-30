import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import DropDownBaseRepartitionFormat from './DropDownComponents/BaseGrapheRepartitionMarchet';

export default function BaseDialog({getData,title}) {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value,
    );
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  return (
    <React.Fragment>
      <Button variant="" sx={{ color: '#007bff' }} onClick={handleClickOpen}>
        Base
      </Button>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Base de calcul</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Etes-vous sûr de vouloir changer la base de calcule pour les {title}?
          </DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: '500',
            }}
          >
            <FormControl sx={{ mt: 2, minWidth:100 }}>
        

              <DropDownBaseRepartitionFormat />
            </FormControl>
            {/* <FormControlLabel
              sx={{ mt: 1 }}
              control={
                <Switch checked={fullWidth} onChange={handleFullWidthChange} />
              }
              label="Full width"
            /> */}
          </Box>
        </DialogContent>
        <DialogActions>
        <Button onClick={getData}>Appliquer</Button>
        {/* <LoadingBaseChangeBtn  onClick={getData}  /> */}
          <Button onClick={handleClose}>Retour</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
