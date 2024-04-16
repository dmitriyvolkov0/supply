import * as React from 'react';
import s from './style.module.css';

import { REQUESTS_PAGE, ARCHIVE_PAGE } from '@utils/constants/routes';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { Divider } from '@mui/material';

import ArchiveIcon from '@mui/icons-material/Archive';
import MenuIcon from '@mui/icons-material/Menu';
import SummarizeIcon from '@mui/icons-material/Summarize';

import LogoImg from '@assets/logo.webp';


export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const menuList = [
    {
      title: "Заявки снабжение",
      icon: <SummarizeIcon/>,
      link: REQUESTS_PAGE
    },
    {
      title: "Архив заявок",
      icon: <ArchiveIcon/>,
      link: ARCHIVE_PAGE
    }
  ];

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
        <div className={s.logoWrapper}>
            <img className={s.logo} src={LogoImg} alt="Технолайн" />
        </div>

        <Divider/>
        
        <List>
            {
                menuList.map((item, index) => 
                    <ListItem disablePadding key={index}>
                        <ListItemButton onClick={()=> navigate(item.link)}>
                            <ListItemIcon> {item.icon} </ListItemIcon>
                            <ListItemText primary={item.title}/>
                        </ListItemButton>
                    </ListItem>
                )
            }
        </List>
    </Box>
  );

  return (
    <div>
      <IconButton
        onClick={toggleDrawer(true)}
          size="large"
          edge="start"
          color="inherit"
          sx={{ mr: 1 }}
        >
            <MenuIcon />
        </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}