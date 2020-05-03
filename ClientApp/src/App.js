import React from 'react'
import { BrowserRouter, StaticRouter } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseLine from '@material-ui/core/CssBaseline'
import Routes from './Routes'

import theme from './theme'

const App = (props) => {
    if (typeof window === 'undefined') {
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseLine />
                <StaticRouter
                    context={props.context}
                    location={props.location}
                >
                    <Routes />
                </StaticRouter>
            </MuiThemeProvider>
        );
    }
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseLine />
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </MuiThemeProvider>
    )
}

export default App
