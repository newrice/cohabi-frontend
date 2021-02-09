import React from "react";
import { useTranslation } from "react-i18next";
import equal from "fast-deep-equal/react";
import { Menu, MenuItem } from "@material-ui/core";
import { ICategory } from "../../types";

interface ICategoryEditMenu {
  el: null | HTMLElement;
  open: boolean;
  category: ICategory;
  onClose: () => void;
  onDisableClick: () => void;
  onRemoveClick: () => void;
}

const CategoryEditMenu = React.memo(
  ({
    el,
    open,
    category,
    onClose,
    onDisableClick,
    onRemoveClick,
  }: ICategoryEditMenu): JSX.Element => {
    const { t } = useTranslation();
    const handleCloseMenu = () => {
      onClose();
    };
    const handleDisableClick = () => {
      onDisableClick();
      handleCloseMenu();
    };
    const handleRemoveClick = () => {
      onRemoveClick();
      handleCloseMenu();
    };

    return (
      <Menu
        anchorEl={el}
        open={Boolean(el && open)}
        onClose={handleCloseMenu}
        PaperProps={{
          elevation: 3,
        }}
      >
        <MenuItem onClick={handleDisableClick} dense>
          {t(category.disabled ? "LABEL_ACTIVATION" : "LABEL_INVALIDATION")}
        </MenuItem>
        <MenuItem onClick={handleRemoveClick} dense>
          {t("LABEL_DELETE")}
        </MenuItem>
      </Menu>
    );
  },
  equal,
);

export default CategoryEditMenu;
