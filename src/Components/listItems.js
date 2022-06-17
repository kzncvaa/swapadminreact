import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import BackupTableIcon from '@mui/icons-material/BackupTable';
import LinkIcon from '@mui/icons-material/Link';
import { Link } from "react-router-dom";


export const mainListItems = (
  <div>
      {/*<Link to="/" style={{color: "black", textDecoration: 'none'}} >*/}
      {/*    <ListItem button>*/}
      {/*        <ListItemIcon>*/}
      {/*            <DashboardIcon />*/}
      {/*        </ListItemIcon>*/}
      {/*        <ListItemText primary="Главная" />*/}
      {/*    </ListItem>*/}
      {/*</Link>*/}
      <Link to="/" style={{color: "black", textDecoration: 'none'}} >
          <ListItem button>
              <ListItemIcon>
                  <BackupTableIcon />
              </ListItemIcon>
              <ListItemText primary="Таблица" />
          </ListItem>
      </Link>
      <Link to="/statistics" style={{color: "black", textDecoration: 'none'}} >
          <ListItem button>
              <ListItemIcon>
                  <LinkIcon />
              </ListItemIcon>
              <ListItemText primary="Ссылки" />
          </ListItem>
      </Link>
  </div>
);
