/* import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button'
*/

/*

    <div className="App">
      <header className="App-header">
      <h1>Projeto Karangos</h1>
      <Button variant="contained" color="primary">Clique aqui</Button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>

*/
import { createMuiTheme , ThemeProvider} from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import red from '@material-ui/core/colors/red';
import TopBar from './ui/TopBar'
import FooterBar from './ui/FooterBar'
import Box from '@material-ui/core/Box';
import { makeStyles } from "@material-ui/core/styles";


// define globalmente as cores primárias e secundárias do projeto
// utilizamos os endereços:
// https://material-ui.com/pt/customization/theming/
// https://www.materialpalette.com/colors
// https://paletton.com/#uid=21C0u0koBw0eNKOk6C3uKu5vsmQ
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: yellow[500],
    },
    secondary: {
      main: red[500],
    },
  },
});

const useStyles = makeStyles((theme) => ({

  fundo: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh', // 100% da altura da área de visualização
    margin: '0 0 0 0'
  }

}))

function Main() {
  const classes = useStyles()

    return (
      <>
      {/* altera as cores primárias e secundárias ThemeProvider */}
      <Box className={classes.fundo}>
          <TopBar></TopBar>
          <FooterBar></FooterBar>
      </Box>
      </>
    );
  }

function App() {

  return (
    <>
    {/* altera as cores primárias e secundárias ThemeProvider */}
      <ThemeProvider theme={theme}>
        <Main />
      </ThemeProvider>
    </>
  );
}

export default App;
