import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { List } from "@material-ui/core";
import CostList from "./CostList";
import { GroupItemTitle } from "../../../component/molecules";
import { ICategory, IGroupedCostList, IUser } from "../../../types";
import { thousandCommas, ph, isEqual, getTotal } from "../../../utils";

export interface ICostGroupedList {
  data: IGroupedCostList;
  categories: ICategory[];
  users: IUser[];
  editable: boolean | ((userid: string) => boolean);
  onSelect: (id: string) => void;
  groupTitle?: (key: string) => string;
}

const listRootClass = "output-cost-list-root output-cost-date-list-root";

export const CostGroupedList = React.memo(
  ({
    data,
    editable,
    categories,
    users,
    onSelect,
    groupTitle,
  }: ICostGroupedList): JSX.Element => {
    const { t } = useTranslation();
    const getSubHeaderString = (key: string): string =>
      `${groupTitle ? groupTitle(key) : key}: ${ph(t("PH_YEN"), [
        thousandCommas(getTotal(data[key])),
      ])}`;

    return (
      <>
        <List className={listRootClass}>
          {Object.keys(data).map(key => (
            <Fragment key={`groupedlist-subgroup-wrapper-${key}`}>
              <GroupItemTitle
                key={`groupedlist-subgroup-header-${key}`}
                title={getSubHeaderString(key)}
              />
              <CostList
                key={`groupedlist-subgroup-list-${key}`}
                list={data[key]}
                editable={editable}
                categories={categories}
                users={users}
                onSelect={onSelect}
              />
            </Fragment>
          ))}
        </List>
      </>
    );
  },
  isEqual,
);

export default CostGroupedList;
