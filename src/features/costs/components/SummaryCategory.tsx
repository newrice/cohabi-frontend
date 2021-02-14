import React from "react";
import { Typography } from "@material-ui/core";
import { TFunction } from "i18next";
import AbstractSumary from "./AbstractSummary";

export class CategorySummary extends AbstractSumary {
  public getSummary = (t: TFunction): JSX.Element => {
    const child = <Typography>[CAT] Comming soon...</Typography>;
    return <>{this.wrap(this.getTitle(t), child)}</>;
  };
}

export default CategorySummary;
