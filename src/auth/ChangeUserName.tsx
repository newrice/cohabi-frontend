import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";

interface IUserNameChange {
  name: string;
  onSubmit: (name: string) => void;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ name, onSubmit }: IUserNameChange) => {
  const [changeName, setChangeName] = useState<string>(name);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChangeName(event.target.value);
  };
  const handleSubmit = async () => onSubmit(changeName);
  return (
    <div>
      <TextField label='new name' value={changeName} onChange={handleChange} />
      <Button onClick={handleSubmit}>Change Name</Button>
    </div>
  );
};
