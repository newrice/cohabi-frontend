import React, { useCallback } from "react";
import { IconButton } from "@material-ui/core";
import PrevIcon from "@material-ui/icons/NavigateBefore";
import NextIcon from "@material-ui/icons/NavigateNext";
import { isAfter } from "date-fns";
import clsx from "clsx";
import { DatePicker } from "../parts";
import { getPrevMonth, getNextMonth, isEqual } from "../../utils";

export interface IMonthlyDatePicker {
  value: Date;
  onChange: (date: Date | null) => void;
  /**
   * Calls instead of onChange
   */
  onPrevClick?: (date?: Date | null) => void;
  /**
   * Calls instead of onChange
   */
  onNextClick?: (date?: Date | null) => void;
}

const divClass = "row-container jc-sp-between-container";
const calendarClass = "input-text-align-center";

export const MonthlyDatePicker = React.memo(
  ({
    value,
    onChange,
    onPrevClick,
    onNextClick,
  }: IMonthlyDatePicker): JSX.Element => {
    const handleDateChange = useCallback(
      (date: Date | null) => {
        onChange(date);
      },
      [onChange],
    );
    const handleDatePrevClick = useCallback(() => {
      const prev = getPrevMonth(value);
      if (onPrevClick) {
        onPrevClick(prev);
      } else {
        handleDateChange(prev);
      }
    }, [value, onPrevClick, handleDateChange]);
    const handleDateNextClick = useCallback(() => {
      const next = getNextMonth(value);
      if (onNextClick) {
        onNextClick(next);
      } else {
        handleDateChange(next);
      }
    }, [value, onPrevClick, handleDateChange]);

    return (
      <div className={divClass}>
        <IconButton onClick={handleDatePrevClick}>
          <PrevIcon />
        </IconButton>
        <DatePicker
          views={["year", "month"]}
          format="yyyy/MM"
          value={value}
          onChange={handleDateChange}
          disableFuture
          className={calendarClass}
        />
        <IconButton
          disabled={isAfter(getNextMonth(value), new Date())}
          onClick={handleDateNextClick}
        >
          <NextIcon />
        </IconButton>
      </div>
    );
  },
  isEqual,
);

export default MonthlyDatePicker;
