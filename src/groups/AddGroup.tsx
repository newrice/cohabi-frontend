import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";

interface IAddGroup {
  name: string;
  onSubmit: (name: string) => void;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ name, onSubmit }: IAddGroup) => {
  const [groupName, setGroupname] = useState<string>(name);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroupname(event.target.value);
  };

  const handleSubmit = async () => {
    onSubmit(groupName);
    setGroupname("");
  };
  return (
    <div>
      <TextField label='group name' value={groupName} onChange={handleChange} />
      <Button disabled={!groupName} onClick={handleSubmit}>
        Add Group
      </Button>
    </div>
  );
};
