import React from "react";
import Controller from "./controller";
import Me from "../user/Me";
import Group from "../group/Group";
import useQuery from "../../hooks/useQuery";

export default (): JSX.Element => {
  const query = useQuery();
  return (
    <Me>
      <Group>
        <Controller id={query.get("id")} />
      </Group>
    </Me>
  );
};
