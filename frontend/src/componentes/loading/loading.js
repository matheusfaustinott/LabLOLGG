import React from 'react';
import { Modal, Backdrop, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const ModalBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Paper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 10,
  boxShadow: theme.shadows[5],
  padding: theme.spacing(2, 4, 3),
  outline: 'none',
  textAlign: 'center',
}));

const Image = styled('img')(({ theme }) => ({
  width: '100%',
  maxWidth: 200,
  marginBottom: theme.spacing(2),
}));

const LoadingComponent = ({ open }) => {
  return (
    <Modal
      open={open}
      BackdropComponent={Backdrop}
      BackdropProps={{
        invisible: false,
      }}
    >
      <ModalBox>
        <Paper>
          <Typography variant="h2">Carregando dados do invocador</Typography>
          <Image src="https://i.pinimg.com/originals/1b/28/70/1b287016548914a63010f89609a0800a.gif" alt="loading" />
        </Paper>
      </ModalBox>
    </Modal>
  );
};

export default LoadingComponent;
