import React from "react";
import Profile from "./Profile";
import Me from "./Me";
import Group from "../group/Group";

const User = (): JSX.Element => (
  <Me>
    <Group>
      <Profile />
    </Group>
  </Me>
);

export default User;
