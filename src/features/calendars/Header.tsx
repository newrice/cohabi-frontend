import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { IconButton } from "@material-ui/core";
import FilterIcon from "@material-ui/icons/HorizontalSplit";
import FeatureHeader from "../../component/molecules/FeatureHeader";

interface ICalendarHead {
  showPast: boolean;
  onChangeShowPast: () => void;
}

const CalendarHeader = ({
  showPast,
  onChangeShowPast,
}: ICalendarHead): JSX.Element => {
  const { t } = useTranslation();
  const getElement = useMemo(
    () => (
      <IconButton
        color={showPast ? "secondary" : "default"}
        edge="end"
        onClick={onChangeShowPast}
      >
        <FilterIcon />
      </IconButton>
    ),
    [showPast],
  );
  return (
    <FeatureHeader title={t("HEADER_CALENDAR")} endAdornment={getElement} />
  );
};

export default CalendarHeader;
