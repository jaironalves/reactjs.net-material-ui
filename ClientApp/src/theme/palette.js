import green from '@material-ui/core/colors/green'
import blue from '@material-ui/core/colors/pink'
import red from '@material-ui/core/colors/red'
import orange from '@material-ui/core/colors/orange'
import blueGrey from '@material-ui/core/colors/blueGrey'
import grey from '@material-ui/core/colors/grey'
import { createMuiTheme } from '@material-ui/core/styles'

const white = '#FFFFFF'
const black = '#000000'

const theme = createMuiTheme({})

export default {
    black,
    white,
    primary: {
        dark: green[900],
        main: green[500],
        light: green[100],
    },
    secondary: {
        //contrastText: white,
        dark: blue[900],
        main: blue['A400'],
        light: blue['A400'],
    },
    error: {
        dark: red[900],
        main: red[600],
        light: red[400],
    },
    success: {
        dark: green[900],
        main: green[600],
        light: green[400],
        contrastText: theme.palette.getContrastText(green[600]),
    },
    info: {
        dark: blue[900],
        main: blue[600],
        light: blue[400],
        contrastText: theme.palette.getContrastText(blue[600]),
    },
    warning: {
        dark: orange[900],
        main: orange[600],
        light: orange[400],
        contrastText: theme.palette.getContrastText(orange[600]),
    },
    text: {
        primary: blueGrey[900],
        secondary: blueGrey[600],
        link: blue[600],
    },
    background: {
        default: '#F4F6F8',
        paper: white,
    },
    icon: blueGrey[600],
    divider: grey[200],
}