import React from "react";
import { Typography } from "@material-ui/core";
import { TFunction } from "i18next";
import { groupBy } from "lodash";
import AbstractSumary from "./AbstractSummary";
import { getTotal, getUserName, ph, thousandCommas } from "../../../utils";
import { ICost, ICostBase, IGroupedCostList } from "../../../types";

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

export class UserSummary extends AbstractSumary {
  public getSummary = (t: TFunction): JSX.Element => {
    const getUserPaymentString = (id: string) => {
      const grouped = groupByKey(this.costs, "user");
      const diff =
        equaler(this.costs, this.users.length) - getTotal(grouped[id] || []);
      return `${getUserName(this.users, id)} ${t(
        getPaymentLabelKey(diff),
      )} ${ph(t("PH_YEN"), [thousandCommas(Math.abs(diff))])}`;
    };
    const child = this.users.map(user => (
      <Typography key={`summary-user-${user.id}`}>
        {getUserPaymentString(user.id)}
      </Typography>
    ));
    return <>{this.wrap(this.getTitle(t), child)}</>;
  };
}

export default UserSummary;
