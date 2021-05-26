import { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputMask from 'react-input-mask';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
    form: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        maxWidth: '80%',
        margin: '0 auto',
        '& .MuiFormControl-root': {
            minWidth: '200px',
            maxWidth: '500px',
            margin: '0 24px 24px 0'
        }
    },
    toobar: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-around',
        marginTop: '36px',
    }
}))

export default function KarangosForm () {

    const classes = useStyles()

    const colors = [
        'Amarelo',
        'Azul',
        'Bege',
        'Branco',
        'Cinza',
        'Dourado',
        'Laranja',
        'Marrom',
        'Prata',
        'Rosa',
        'Roxo',
        'Verde',
        'Vermelho',
        'Vinho'
    ]

    const years = []
    for(let i = (new Date()).getFullYear(); i >= 1900; i--) years.push(i)

    // Classes de caracteres para a máscara da placa
    // 1) 1, 2, 3  posições, somente letras (maiúsculas ou minúsculas) -> [A-Za-z]
    // 2) 5, 7, 8 posições, somente digitos - > [0-9]
    // 3) 6 posição, digitos e letras de A a J (maiúsculas ou minúsculas) -> [0-9A-Ja-j]

    const formatChars ={
        'A': '[A-Za-z]',
        '0': '[0-9]',
        '#': '[0-9A-Ja-j]',
    }


    // Máscara de entrada para a placa
    const placaMask = 'AAA-0#00'

    const [karango, setKarango] = useState({
        id: null,
        marca: '',
        modelo: '',
        cor: '',
        ano_fabricacao: (new Date()).getFullYear(), // Ano corrente
        importado: '0',
        placa: '',
        preco: 0
    })

    const [currentId, setCurrentId] = useState()

    const [importadoChecked, setImportadoChecked] = useState(false)

    const [sendBtnStatus, setSendBtnStatus] = useState({
        disable: false,
        label: 'Enviar'
    })

    const [sbStatus, setSbStatus] = useState({
        open: false,
        severity: 'success',
        massage: ''
    })

    const history = useHistory()

    function handleInputChange(event, property) {
        setCurrentId(event.target.id)
        if(event.target.id) property = event.target.id

        if(property === 'importado') {
            const newState = ! importadoChecked // Inverte o valor
            if(newState) setKarango({...karango, importado: '1'})
            else setKarango({...karango, importado: '0'})
            setImportadoChecked(newState) 
        }
        else if(property === 'placa') {
            setKarango({...karango, placa: event.target.value.topUpperacase()})
        }
        else {
            // quando o nome de uma propriedade de objeto entre[],
            //significa que o nome da propriedade será determinado
            //pela variável ou expressão contida dentro dos colchetes
            setKarango({...karango, [property]: event.target.value})
        }
    }

    async function saveData(){
        try {
            // Desabilita o botão enviar para evitar envios duplicados
            setSendBtnStatus({disable: true, label: 'Enviando...'})
            await axios.post('https://api.faustocintra.com.br/karangos', karango)
            // Mostra a Snackbar
            setSbStatus({open: true, severity: 'success', message: 'Dados Salvos com sucesso!'})
        }
        catch(error) {
            // Mostra a SnackBar
            setSbStatus({open: true, severity: 'error', message: 'ERRO' + error.message})
        }
        //Restaura o estado inicial do botão de envio
        setSendBtnStatus({disable: false, label: 'Enviar'})
    }
    
    function handleSubmit(event) {
        event.preventDefault() // Evita que a página seja carregada

        saveData()
    }

    function handleSbClose() {
        setSbStatus({...sbStatus, open: false})

        // Retorna para a página de listagem em caso de sucesso
        if(sbStatus.severity === 'sucess')
        history.push('/list')
    }

    return (
        <>

            <Snackbar open={sbStatus.open} autoHideDuration={6000} onClose={handleSbClose}>
                <MuiAlert elevation={6} variant="filled" onClose={handleSbClose} severity={sbStatus.severity}>
                    {sbStatus.message}
                </MuiAlert>
            </Snackbar>

      
            <h1>Cadastrar Karango!</h1>

            <form className={classes.form} onSubmit={handleSubmit}>

                <TextField 
                    id="marca"
                    label="Marca"
                    variant="filled"
                    value={karango.marca}
                    onChange={handleInputChange}
                    required  // not null =. significa que esse campo é obrigatório 
                    placeholder="Informe a marca do veículo"
                    fullWidth
                />

                <TextField 
                    id="modelo"
                    label="Modelo"
                    variant="filled"
                    value={karango.modelo}
                    onChange={handleInputChange}
                    required  // not null =. significa que esse campo é obrigatório 
                    placeholder="Informe o modelo do veículo"
                    fullWidth
                />

                <TextField 
                    id="cor"
                    label="Cor"
                    variant="filled"
                    value={karango.cor}
                    onChange={(event) => handleInputChange(event, 'cor')}
                    required  // not null =. significa que esse campo é obrigatório 
                    placeholder="Informe a cor do veículo"
                    select
                    fullWidth
                >
                    { colors.map(color => <MenuItem value={color}>{color}</MenuItem>)}
                </TextField>

                <TextField 
                    id="ano_fabricacao"
                    label="Ano de Fabricação"
                    variant="filled"
                    value={karango.ano_fabricacao}
                    onChange={(event) => handleInputChange(event, 'ano_fabricacao')}
                    required  // not null =. significa que esse campo é obrigatório 
                    placeholder="Informe o ano de fabricação do veículo"
                    select
                    fullWidth
                >
                    { years.map(year => <MenuItem value={year}>{year}</MenuItem>)}
                </TextField>

                <FormControl fullWidth>
                    <FormControlLabel control={
                        <Checkbox
                            id="importado"
                            checked={importadoChecked}
                            onChange={handleInputChange}
                            // removida a cor do checkBox -> color="primary"
                        />
                        }
                        label="Importado?"
                    />
                </FormControl>

                <InputMask
                    id="placa"
                    mask={placaMask}
                    formatChars={formatChars}
                    value={karango.placa}
                    onChange={handleInputChange}>
                    {() => <TextField 
                        label="Placa"
                        variant="filled"
                        required  // not null =. significa que esse campo é obrigatório 
                        placeholder="Informe a placa do veículo"
                        fullWidth
                    />}
                </InputMask>

                <TextField 
                    id="preco"
                    label="Preço"
                    variant="filled" 
                    value={karango.preco}
                    onChange={handleInputChange}
                    required  // not null =. significa que esse campo é obrigatório 
                    placeholder="Informe o valor do veículo"
                    fullWidth
                    type="number"
                    onFocus={event => event.target.select()} // Seleciona o conteúdo ao focar
                    InputProps={{
                        startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                    }}
                />

                <Toolbar className={classes.tollbar}>
                    <Button 
                            type="submit"
                            variant="contained"
                            color="secondary"
                            discable={sendBtnStatus.disable}>
                        {sendBtnStatus.label}
                        
                    </Button>
                    <Button variant="contained">Voltar</Button>
                </Toolbar>

                <div>
                
                    {JSON.stringify(karango)}
                    <br />
                    currentId: {JSON.stringify(currentId)}
                
                </div>
            </form>
        </>
    )
}