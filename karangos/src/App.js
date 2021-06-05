/*
import logo from './logo.svg';
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
import pink from '@material-ui/core/colors/pink';
import TopBar from './ui/TopBar'
import FooterBar from './ui/FooterBar'
import Box from '@material-ui/core/Box';
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import KarangosList from './routed/KarangosList2';
import KarangosForm from './routed/KarangosForm';


// define globalmente as cores primárias e secundárias do projeto
// utilizamos os endereços de documentação:
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
      main: pink[500],
    },
  },
});

const useStyles = makeStyles((theme) => ({

  main: {
    backgroundColor: theme.palette.background.default,
    paddingBottom: '42px', // evita que o footer cubra o conteúdo
    minHeight: '100vh', // 100% da altura da área de visualização
  },
  routed: {
    padding: '25px',
    color: theme.palette.text.primary,
    fontFamily: theme.typography.fontFamily
  }

}))

function Main() {
  const classes = useStyles()

    return (
 
      <Box className={classes.main}> {/* altera as cores primárias e secundárias ThemeProvider */}
          
          <BrowserRouter> {/* inicia a região onde pode haver troca dinâmica de elementos
            - links e demais elementos dinâmicos tem que estar dentro */}

            <TopBar />
            <Box id="routed" className={classes.routed}>
              <Switch> {/* Determina o elemento que será exibido, de acordo com a rota. */}

                <Route path="/list">
                  <KarangosList />
                </Route>

                <Route path="/new">
                  <KarangosForm />
                </Route>

               {/* :id é um parâmetro (espécie de variável de rota) */}
                <Route path="/edit/:id">
                  <KarangosForm />
                </Route>

              </Switch>

            </Box>
            <FooterBar /> {/* também pode ser exibido assim fechando a tag na abertura mesmo. */}
          
          </BrowserRouter>
      </Box>
    )
  }

function App() {

  return (
    <> {/* fragment para exibir mais de um Componente/Elemento */}

    {/* altera as cores primárias e secundárias ThemeProvider, recebendo lá do -> const theme = createMuiTheme */}
    {/* const useStyles = makeStyles((theme) também trabalha estilos do tema */}

      <ThemeProvider theme={theme}>
        <Main />
      </ThemeProvider>

    </>
  );
}

export default App;
