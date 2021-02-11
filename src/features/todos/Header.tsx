import React from "react";
import { useTranslation } from "react-i18next";
import { IconButton } from "@material-ui/core";
import FilterIcon from "@material-ui/icons/HorizontalSplit";
import FeatureHeader from "../../component/molecules/FeatureHeader";

interface ITodoHeader {
  showDisabled: boolean;
  onShowDisabledChange: () => void;
}

const TodoHeader = ({
  showDisabled,
  onShowDisabledChange,
}: ITodoHeader): JSX.Element => {
  const { t } = useTranslation();
  const toggleShowButton = (
    <IconButton
      color={showDisabled ? "secondary" : "default"}
      edge="end"
      onClick={onShowDisabledChange}
    >
      <FilterIcon />
    </IconButton>
  );
  return (
    <FeatureHeader title={t("HEADER_TODO")} endAdornment={toggleShowButton} />
  );
};

export default TodoHeader;
