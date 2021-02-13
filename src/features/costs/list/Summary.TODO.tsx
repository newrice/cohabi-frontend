import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AccordionDetails, Typography } from "@material-ui/core";
import { groupBy } from "lodash";
import {
  ICategory,
  ICost,
  ICostBase,
  IGroupedCostList,
  IUser,
  TCostsViewMode,
} from "../../../types";
import {
  getTotal,
  getUserName,
  isEqual,
  ph,
  thousandCommas,
} from "../../../utils";
import SummaryAccordion from "../components/SummaryAccordion";

interface ISummary {
  mode: TCostsViewMode;
  costs: ICost[];
  categories: ICategory[];
  users: IUser[];
}
interface IUserSummary {
  costs: ICost[];
  users: IUser[];
}
// TODO: 外だし
const getPaymentLabelKey = (payment: number) => {
  let str = "OUTPUT_USER_SUMMARY_HAPPY";
  if (payment > 0) {
    str = "OUTPUT_USER_SUMMARY_SEND";
  } else if (payment !== 0) {
    str = "OUTPUT_USER_SUMMARY_RECIEVE";
  }
  return str;
};

const equaler = (costs: ICost[], length: number) => {
  const all = getTotal(costs);
  const num = Math.floor(all / length);
  return num;
};

const groupByKey = (costs: ICostBase[], key: string) =>
  (groupBy(costs, key) as IGroupedCostList) || {};

const UserSummary = ({ costs, users }: IUserSummary): JSX.Element => {
  const { t } = useTranslation();
  const grouped = groupByKey(costs, "user");
  const getTotalSumString = (): string =>
    `${t("OUTPUT_SUMMARY_TOTAL")}: ${ph(t("PH_YEN"), [
      thousandCommas(getTotal(costs)),
    ])}`;
  const getUserPaymentString = (id: string) => {
    const diff =
      equaler(costs, Object.keys(grouped).length) - getTotal(grouped[id] || []);
    return `${getUserName(users, id)} ${t(getPaymentLabelKey(diff))} ${ph(
      t("PH_YEN"),
      [thousandCommas(Math.abs(diff))],
    )}`;
  };
  return (
    <SummaryAccordion title={getTotalSumString()}>
      <AccordionDetails className="column-container">
        {users.map(user => (
          <Typography key={`summary-user-${user.id}`}>
            {getUserPaymentString(user.id)}
          </Typography>
        ))}
      </AccordionDetails>
    </SummaryAccordion>
  );
};

export const Summary = React.memo(
  ({ mode, costs, categories, users }: ISummary): JSX.Element => {
    const summary = useMemo((): React.ReactNode => {
      switch (mode) {
        case "date":
        case "user":
        case "category":
        default:
          return <UserSummary costs={costs} users={users} />;
      }
    }, [mode, costs, categories, users]);
    return <>{summary}</>;
  },
  isEqual,
);

export default Summary;
