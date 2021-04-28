import { Typography, Toolbar } from "@material-ui/core";

export default function FooterBar(){
    return(
        <Toolbar>
            <Typography variant="caption" display="block">
                &copy; 2021 by <a href="mailto:luis17ads@gmail.com">Gustavo Gianvecchio</a>
            </Typography>
        </Toolbar>
    )
}