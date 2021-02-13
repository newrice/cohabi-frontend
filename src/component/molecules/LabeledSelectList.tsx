import React from "react";
import { MenuItem } from "@material-ui/core";
import _ from "lodash";
import { ILabeledSelect, LabeledSelect } from "../parts";
import { KeyValuePair } from "../../types";

interface ILabeledSelectList extends ILabeledSelect {
  options: KeyValuePair[];
  value: string | number;
  optionsClass?: string;
  showUnresolvedValue?: boolean;
  testid?: string;
}

export const LabeledSelectList = ({
  options,
  optionsClass,
  showUnresolvedValue,
  testid,
  value,
  ...rest
}: ILabeledSelectList): JSX.Element => {
  const optionList: JSX.Element[] = [];
  options.forEach(option => {
    if (!option.disabled || option.id === value) {
      const testId = { "data-testid": `labeled-select-${testid}-${option.id}` };
      optionList.push(
        <MenuItem
          key={`labeled-select-${testid}-${option.id}`}
          value={option.id}
          className={optionsClass}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...testId}
        >
          {option.name}
        </MenuItem>,
      );
    }
  });
  if (showUnresolvedValue && value && !_.find(options, { id: value })) {
    const testId = { "data-testid": `labeled-select-${testid}-${value}` };
    optionList.push(
      <MenuItem
        key={`labeled-select-${testid}-${value}`}
        value={value}
        className={optionsClass}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...testId}
      >
        {value}
      </MenuItem>,
    );
  }
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <LabeledSelect value={value} {...rest}>
      {optionList}
    </LabeledSelect>
  );
};
LabeledSelectList.defaultProps = {
  optionsClass: "",
  showUnresolvedValue: true,
  testid: "labeled-select-list",
};
export default LabeledSelectList;
