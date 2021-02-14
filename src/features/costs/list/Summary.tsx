import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ICategory, ICost, IUser, TCostsViewMode } from "../../../types";
import { isEqual } from "../../../utils";
import { ISummaryClass } from "../components/AbstractSummary";
import CategorySummary from "../components/SummaryCategory";
import DateSummary from "../components/SummaryDate";
import UserSummary from "../components/SummaryUser";

interface ISummaryBase {
  mode: TCostsViewMode;
}
interface ISummary {
  costs: ICost[];
  categories: ICategory[];
  users: IUser[];
}

const SummaryFactory = ({ mode }: ISummaryBase) => {
  switch (mode) {
    case "date":
      return new DateSummary();
    case "user":
      return new UserSummary();
    case "category":
      return new CategorySummary();
    default:
      return new UserSummary();
  }
};

export const Summary = React.memo(
  ({
    mode,
    costs,
    categories,
    users,
  }: ISummary & ISummaryBase): JSX.Element => {
    const { t } = useTranslation();
    const concrete: ISummaryClass = useMemo(() => SummaryFactory({ mode }), [
      mode,
    ]);
    concrete.setCosts(costs);
    concrete.setUsers(users);
    concrete.setCategories(categories);
    return <>{concrete.getSummary(t)}</>;
  },
  isEqual,
);

export default Summary;
