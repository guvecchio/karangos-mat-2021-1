// o nome do arquivo é igual ao nome do componente que ele vai representar
// nome de componentes começam com maiúsculas => no caso TopBar

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logotipo from '../img/karangos.png'
import MainMenu from './MainMenu.js'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {
      width: '300px'
  }
}));

export default function TopBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <MainMenu />
          <img src={logotipo} alt="Karangos" className={classes.logo}></img>
        </Toolbar>
      </AppBar>
    </div>
  );
}