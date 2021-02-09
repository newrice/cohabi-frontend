import React from "react";
import Controller from "./controller";
import Me from "../user/Me";
import Group from "../group/Group";

export default (): JSX.Element => (
  <Me>
    <Group>
      <Controller />
    </Group>
  </Me>
);
