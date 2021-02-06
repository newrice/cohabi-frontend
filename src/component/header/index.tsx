import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import menuItems from "./menu";
import { NavigationMenu } from "./NavigationMenu";
import { GroupMenu } from "./GroupButton";
import { I18nMenu } from "./I18nButton";
import { UserMenu } from "./UserButton";
import settings from "../../settings";

const titleClass = "flex-auto";
const menuLinkClass = "router-link-base";

const Header = (): JSX.Element => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuToggle = (): void => {
    setMenuOpen(!menuOpen);
  };
  const handleMenuItemClick = () => {
    handleMenuToggle();
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleMenuToggle}>
            <MenuIcon />
          </IconButton>
          <Drawer open={menuOpen} onClose={handleMenuToggle}>
            {NavigationMenu(menuItems, handleMenuItemClick)}
          </Drawer>
          <Link to="/" className={clsx(menuLinkClass, titleClass)}>
            <Typography variant="h6" className={titleClass}>
              {settings.app.name}
            </Typography>
          </Link>
          {GroupMenu()}
          {I18nMenu()}
          {UserMenu()}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Header;
