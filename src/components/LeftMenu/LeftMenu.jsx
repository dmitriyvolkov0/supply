import React, { useContext } from 'react';
import s from './style.module.css';
import UserContext from '@contexts/User/UserContext';

import { PROFILE_PAGE, REQUESTS_PAGE, ARCHIVE_PAGE, USERS_PAGE } from '@utils/constants/routes';
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

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArchiveIcon from '@mui/icons-material/Archive';
import MenuIcon from '@mui/icons-material/Menu';
import SummarizeIcon from '@mui/icons-material/Summarize';
import GroupIcon from '@mui/icons-material/Group';

import LogoImg from '@assets/logo.webp';

export default function TemporaryDrawer() {
  const { user } = useContext(UserContext);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  let menuList = [
    {
      title: "Профиль",
      icon: <AccountCircleIcon/>,
      link: PROFILE_PAGE
    },
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

  if(+user.role_id === 1) {
    menuList = [
      ...menuList,
      {
        title: "Пользователи",
        icon: <GroupIcon/>,
        link: USERS_PAGE
      }
    ];
  }

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
        <div className={s.logoWrapper}>
            <img className={s.logo} src={LogoImg} alt="Технолайн" />
        </div>

        <Divider/>
        
        <List>
            {
              menuList && menuList.map((item, index) => 
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