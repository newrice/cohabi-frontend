import React from "react";
import { IconButton, Typography } from "@material-ui/core";
import FileCopyIcon from "@material-ui/icons/FileCopy";
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
  private getDiff = (id: string): number => {
    const grouped = groupByKey(this.costs, "user");
    return equaler(this.costs, this.users.length) - getTotal(grouped[id] || []);
  };

  private handleCopy = (id: string) => () => {
    navigator.clipboard.writeText(String(this.getDiff(id))).then(
      () => {
        console.log("Async: Copying to clipboard was successful!");
      },
      err => {
        console.error("Async: Could not copy text: ", err);
      },
    );
  };

  public getSummary = (t: TFunction): JSX.Element => {
    const getUserPaymentString = (id: string) => {
      const diff = this.getDiff(id);
      return `${getUserName(this.users, id)} ${t(
        getPaymentLabelKey(diff),
      )} ${ph(t("PH_YEN"), [thousandCommas(Math.abs(diff))])}`;
    };
    const child = this.users.map(user => (
      <div className="row-container jc-center-container ai-center-container">
        <Typography key={`summary-user-${user.id}`}>
          {getUserPaymentString(user.id)}
        </Typography>
        <IconButton onClick={this.handleCopy(user.id)}>
          <FileCopyIcon />
        </IconButton>
      </div>
    ));
    return <>{this.wrap(this.getTitle(t), child)}</>;
  };
}

export default UserSummary;
