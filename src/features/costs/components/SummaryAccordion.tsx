import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
  Typography,
} from "@material-ui/core";
import { isEqual } from "../../../utils";

interface ISummaryAccordion {
  title: string;
  children: React.ReactNode;
}

const summaryPaperClass = "output-cost-user-summary-paper";
const summaryTotalClass = "p-text-align-center";

export const SummaryAccordion = React.memo(
  ({ title, children }: ISummaryAccordion): JSX.Element => (
    <Paper className={summaryPaperClass} elevation={2}>
      <Accordion elevation={0}>
        <AccordionSummary className={summaryTotalClass}>
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </Paper>
  ),
  isEqual,
);

export default SummaryAccordion;
