import { Typography, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LocalCafeTwoToneIcon from '@material-ui/icons/LocalCafeTwoTone';

const useStyles = makeStyles((theme) => ({

    toolBar: {
        backgroundColor: theme.palette.background.paper,
        minHeight: '42px',
        // posicionar o footer bar na parte inferior da página
        width: '100%',
        position: 'fixed',
        bottom: '0'
    },
    text: {
        width: '100%', // ou width: '0, auto' => no caso retira o aling do inline
    },
    link: {
        color: theme.palette.secondary.light,
        textDecoration: 'none', // tira o sublinhado do link
        '&:hover': {
            textDecoration: 'underline', // retorna o sublinhado
        }
    },
    
}));

export default function FooterBar(){
    
    const classes = useStyles();

    return(
        <Toolbar className={classes.toolBar}>
            <Typography className={classes.text} variant="caption" display="block" align="center" color="textSecondary">
                Produzido com <LocalCafeTwoToneIcon fontSize="small" /> por <a className={classes.link} href="mailto:luis17ads@gmail.com">Gustavo Gianvecchio</a> &copy; 2021
            </Typography>
        </Toolbar>
    )
}