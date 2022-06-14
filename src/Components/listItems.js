import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import { Link } from "react-router-dom";


export const mainListItems = (
  <div>
      <Link to="/" style={{color: "black", textDecoration: 'none'}} >
          <ListItem button>
              <ListItemIcon>
                  <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Главная" />
          </ListItem>
      </Link>
      <Link to="/table" style={{color: "black", textDecoration: 'none'}} >
          <ListItem button>
              <ListItemIcon>
                  <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Таблица" />
          </ListItem>
      </Link>
      <Link to="/statistics" style={{color: "black", textDecoration: 'none'}} >
          <ListItem button>
              <ListItemIcon>
                  <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Статистика" />
          </ListItem>
      </Link>
  </div>
);
