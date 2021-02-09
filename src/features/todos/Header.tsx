import React from "react";
import { useTranslation } from "react-i18next";
import { IconButton, Toolbar, Typography } from "@material-ui/core";
import FilterIcon from "@material-ui/icons/HorizontalSplit";

interface IHeader {
  showDisabled: boolean;
  onShowDisabledChange: () => void;
}

const pageTitleClass = "flex-auto";

const Header = ({
  showDisabled,
  onShowDisabledChange,
}: IHeader): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Toolbar>
      <Typography variant="h6" className={pageTitleClass}>
        {t("HEADER_TODO")}
      </Typography>
      <IconButton
        color={showDisabled ? "secondary" : "default"}
        edge="end"
        onClick={onShowDisabledChange}
      >
        <FilterIcon />
      </IconButton>
    </Toolbar>
  );
};

export default Header;
