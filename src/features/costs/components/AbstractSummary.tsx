import { TFunction } from "i18next";
import React from "react";
import SummaryAccordion from "./SummaryAccordion";
import { ICost, IUser, ICategory } from "../../../types";
import { getTotal, ph, thousandCommas } from "../../../utils";

export interface ISummary {
  costs: ICost[];
  categories: ICategory[];
  users: IUser[];
}

export interface ISummaryClass {
  getSummary: (t: TFunction) => JSX.Element;
  setCosts: (cost: ICost[]) => void;
  setUsers: (users: IUser[]) => void;
  setCategories: (categories: ICategory[]) => void;
}

export abstract class AbstractSumary implements ISummaryClass {
  protected costs: ICost[] = [];

  protected users: IUser[] = [];

  protected categories: ICategory[] = [];

  protected getTitle = (t: TFunction): string => {
    const getTotalSumString = (): string =>
      `${t("OUTPUT_SUMMARY_TOTAL")}: ${ph(t("PH_YEN"), [
        thousandCommas(getTotal(this.costs)),
      ])}`;
    return getTotalSumString();
  };

  public getSummary = (t: TFunction): JSX.Element => <>AbstractSumary</>;

  public setCosts = (costs: ICost[]): void => {
    this.costs = costs;
  };

  public setUsers = (users: IUser[]): void => {
    this.users = users;
  };

  public setCategories = (categories: ICategory[]): void => {
    this.categories = categories;
  };

  /**
   * Wrapper
   */
  protected wrap = (title: string, children: React.ReactNode): JSX.Element => (
    <SummaryAccordion title={title}>{children}</SummaryAccordion>
  );
}
export default AbstractSumary;
