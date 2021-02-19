import React, { useCallback, useState } from "react";
import { IconButton } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { GroupNameField } from "./GroupNameTextField";
import { IRequestHandler } from "../../../types";
import { add } from "./functions";

const formFieldCommonClass = "input-field-base margin-tb-8";

export const GroupAdd = ({
  onRequestStart,
  onRequestEnd,
}: IRequestHandler): JSX.Element => {
  const [name, setName] = useState<string>("");
  const handleNameChange = useCallback((value: string) => {
    setName(value);
  }, []);
  const handleAdd = () => {
    add({ data: { name }, onRequestStart, onRequestEnd });
  };
  return (
    <>
      <GroupNameField
        name={name}
        onNameChange={handleNameChange}
        className={formFieldCommonClass}
      />
      <IconButton disabled={!name} onClick={handleAdd}>
        <SaveIcon />
      </IconButton>
    </>
  );
};

export default GroupAdd;
