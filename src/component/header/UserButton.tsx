import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Auth } from "aws-amplify";
import { AuthState } from "@aws-amplify/ui-components";
import {
  createStyles,
  IconButton,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
  Theme,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import SettingsIcon from "@material-ui/icons/Settings";
import { selectAuthState } from "../../features/auth/authSlice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    userButton: {
      marginLeft: theme.spacing(1),
    },
  }),
);

const menuLinkClass = "router-link-base";

// eslint-disable-next-line import/prefer-default-export
export const UserMenu = (): JSX.Element => {
  const { t } = useTranslation();
  const authState = useSelector(selectAuthState);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleUserClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleUserClose = (): void => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        edge="end"
        color="inherit"
        className={classes.userButton}
        onClick={handleUserClick}
      >
        <AccountCircleIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleUserClose}
      >
        {authState === AuthState.SignedIn ? (
          [
            <MenuItem key="user-menu-settings" onClick={handleUserClose}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <Link to="/settings" className={menuLinkClass}>
                <ListItemText primary={t("MENU_LABEL_PROFILE")} />
              </Link>
            </MenuItem>,
            <MenuItem
              key="user-menu-signout"
              onClick={(): void => {
                handleUserClose();
                Auth.signOut({ global: false });
              }}
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <Link to="/" className={menuLinkClass}>
                <ListItemText primary={t("MENU_LABEL_SIGNOUT")} />
              </Link>
            </MenuItem>,
          ]
        ) : (
          <MenuItem
            key="user-menu-signup"
            onClick={(): void => {
              handleUserClose();
            }}
          >
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <Link to="/signup" className={menuLinkClass}>
              <ListItemText primary={t("MENU_LABEL_SIGNUP")} />
            </Link>
          </MenuItem>
        )}
      </Menu>
    </>
  );
};
