import React, { useCallback, useState } from "react";
import { groupBy } from "lodash";
import {
  ICategory,
  ICostBase,
  ICostResponse,
  IGroupedCostList,
  IUser,
  TCostsViewMode,
} from "../../../types";
import {
  getCategoryName,
  getDayOfWeekStr,
  getUserName,
  isEqual,
  sortByKey,
} from "../../../utils";
import CostGroupedList from "../components/CostGroupedList";
import ViewModeButtons from "./ViewModeButtons";
import Summary from "./Summary";

interface ICostLists {
  costs: ICostResponse[];
  categories: ICategory[];
  users: IUser[];
  editable: boolean | ((userid: string) => boolean);
  onSelect: (id: string) => void;
}
const groupByKey = (costs: ICostBase[], key: string) =>
  (groupBy(costs, key) as IGroupedCostList) || {};

export const CostLists = React.memo(
  ({
    costs,
    categories,
    users,
    editable,
    onSelect,
  }: ICostLists): JSX.Element => {
    const [mode, setMode] = useState<TCostsViewMode>("user");
    const getGroupTitle = useCallback(
      (key: string): string => {
        switch (mode) {
          case "date":
            return `${key}(${getDayOfWeekStr(key)})`;
          case "user":
            return `${getUserName(users, key)}`;
          case "category":
            return `${getCategoryName(categories, key)}`;
          default:
            return key;
        }
      },
      [mode, categories, users],
    );
    return (
      <>
        <ViewModeButtons currentMode={mode} onClick={setMode} />
        <div className="column-container ai-center-container">
          <Summary
            mode={mode}
            costs={costs}
            categories={categories}
            users={users}
          />
          <CostGroupedList
            data={sortByKey(groupByKey(costs, mode))}
            editable={editable}
            users={users}
            categories={categories}
            onSelect={onSelect}
            groupTitle={getGroupTitle}
          />
        </div>
      </>
    );
  },
  isEqual,
);

export default CostLists;
