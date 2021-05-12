import { useState, useEffect } from 'react'
import axios from 'axios'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button'
import FiberNewIcon from '@material-ui/icons/FiberNew'; // AddBoxIcon foi o usado na aula
import { useHistory } from 'react-router-dom'; // pára buscar a rota

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  tableRow: {
    '& button': { // esconde os botões das linhas da tabela
      visibility: 'hidden'
    },
    '&:hover button': { // exibe os botões quando o mouse passar pela linha
      visibility: 'visible'
    },
    '&:hover': { // muda a cor da linha quando o mouse passar por cima
      backgroundColor: theme.palette.action.hover
    }
  },
  toolBar: {
    justifyContent: 'flex-end',
    paddingRight: 0,
    margin: theme.spacing(2, 0)
  }
}));

export default function KarangosList() {
  const classes = useStyles()

  // Variáveis que conterão dados PRECISAM ser inicializadas como vetores vazios
  const [karangos, setKarangos] = useState([])
  const history = useHistory() // o history puxa a rota principal

  useEffect(() => {
    async function getData() {
      try { // tenta buscar os dados
        let response = await axios.get('https://api.faustocintra.com.br/karangos?by=marca,modelo') // by eu defino a ordenação
        setKarangos(response.data)
      }
      catch(error) {
        console.error(error)
      }
    }
    getData()
  }, []) // Quando a lista de dependências é um vetor vazio, o useEffect()
         // é executado apenas uma vez, no carregamento inicial do componente

  return (
    <>
      <h1>Listagem de Karangos</h1>
      <Toolbar className={classes.toolBar}>
        <Button color="secondary" 
          variant="contained" 
          size="large" 
          startIcon={<FiberNewIcon />}
          onClick={() => history.push('/new')}> {/* com uma arrow function eu dou um push para indicar qual rota eu quero */}
          Karango
        </Button>
      </Toolbar>
      <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="rigth">Cód.</TableCell>
            <TableCell>Marca</TableCell>
            <TableCell>Modelo</TableCell>
            <TableCell>Cor</TableCell>
            <TableCell align="center">Ano</TableCell>
            <TableCell align="center">Importado?</TableCell>
            <TableCell align="center">Placa</TableCell>
            <TableCell align="right">Preço</TableCell>
            <TableCell align="center">Editar</TableCell>
            <TableCell align="center">Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {karangos.map((karango) => (
            <TableRow key={karango.id} className={classes.tableRow}>
              <TableCell align="rigth">{karango.id}</TableCell>
              <TableCell>{karango.marca}</TableCell>
              <TableCell>{karango.modelo}</TableCell>
              <TableCell>{karango.cor}</TableCell>
              <TableCell align="center">{karango.ano_fabricacao}</TableCell>
              <TableCell align="center">
                <Checkbox checked={karango.importado === "1"} readOnly />
              </TableCell>
              <TableCell align="center">{karango.placa}</TableCell>
              <TableCell align="right">
                { Number(karango.preco).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }
              </TableCell>
              <TableCell align="center">
                <IconButton aria-label="editar">
                  <EditIcon />
                </IconButton>
              </TableCell>
              <TableCell align="center">
                <IconButton aria-label="excluir">
                  <DeleteIcon color="error"/>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
      </TableContainer>      
    </>
  )
}