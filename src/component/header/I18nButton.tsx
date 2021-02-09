import React, { useState } from "react";
import i18n from "i18next";
import { useDispatch } from "react-redux";
import {
  createStyles,
  IconButton,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
  Theme,
} from "@material-ui/core";
import LanguageIcon from "@material-ui/icons/Language";
import { setLocale } from "../../features/i18n/i18nSlice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    userButton: {
      marginLeft: theme.spacing(1),
    },
  }),
);

const i18nList = [
  { value: "en", label: "English" },
  { value: "ja", label: "日本語" },
];

// TODO:locale list も引数で受け取る
// eslint-disable-next-line import/prefer-default-export
export const I18nMenu = (): JSX.Element => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleI18nIconClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleI18nClose = (): void => {
    setAnchorEl(null);
  };
  const handleI18nClick = (value: string): void => {
    const n = dispatch(setLocale(value)).payload;
    i18n.changeLanguage(n);
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        edge="end"
        color="inherit"
        className={classes.userButton}
        onClick={handleI18nIconClick}
      >
        <LanguageIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleI18nClose}
      >
        {i18nList.map(item => (
          <MenuItem
            key={`i18n-menu-${item.value}`}
            onClick={() => handleI18nClick(item.value)}
          >
            <ListItemText primary={item.label} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
