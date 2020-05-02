import React from "react"
import AppBar from "@material-ui/core/AppBar"
import ToolBar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"

const NavBar = () => {
  return (
    <React.Fragment>
      <AppBar position='static'>
        <ToolBar>
          <IconButton color='inherit'>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' color='inherit'>
            Bem vindo - React App com Material-UI
          </Typography>
        </ToolBar>
      </AppBar>
    </React.Fragment>
  )
}

export default NavBar
