import React, { useState, useEffect } from 'react';

import { Button, Typography, Grid, Popover } from '@mui/material';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import MenuIcon from '@mui/icons-material/Menu';


export default function CombineAll(props) {

    const [anchor, setAnchor] = useState(null)

    const handleClick = (event) => {
        setAnchor(event.currentTarget);
      };

    const handleClose = () => {
        setAnchor(null);
    };

    const open = Boolean(anchor);


    return (
        <div style={{float: "right", marginRight: "5%", marginTop: 20}}>
            <Button
            variant="text"
            color = {props.page == "About" ? "secondary" : "primary"}
            onClick={handleClick} 
            >
              <MenuIcon style={{color: "#000000"}} />
           
          </Button>

            <Popover
              id={"popover1"}
              open={open}
              anchorEl={anchor}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
                <List>
                <ListItem>
                    <Button href="/">
                        <Typography variant="subtitle1" style={{fontFamily: "Anton", color: window.location.pathname == "/" ? "#E5650F" : "#000000"}}> Home </Typography>
                    </Button>
                </ListItem>
                <ListItem>
                    <Button href="/about">
                        <Typography variant="subtitle1" style={{fontFamily: "Anton", color: window.location.pathname == "/about" ? "#E5650F" : "#000000"}}> About Us </Typography>
                    </Button>
                </ListItem>
                <ListItem>
                    <Button href="/work">
                        <Typography variant="subtitle1" style={{fontFamily: "Anton", color: window.location.pathname == "/work" ? "#E5650F" : "#000000"}}> Our Work </Typography>
                    </Button>
                </ListItem>
                <ListItem>
                    <Button href="/contact">
                        <Typography variant="subtitle1" style={{fontFamily: "Anton", color: window.location.pathname == "/contact" ? "#E5650F" : "#000000"}}> Contact </Typography>
                    </Button>
                </ListItem>
                </List>
            </Popover>

        </div>
    )
}


