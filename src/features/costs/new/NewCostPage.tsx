import React from "react";
import { Grid, Paper } from "@material-ui/core";
import { isEqual } from "../../../utils";
import NewCostForm, { INewCostForm } from "../components/NewCostForm";

const divClass = "input-wrapper";
const paperClass = "underlay-paper-base";

const NewCostPage = React.memo((props: INewCostForm): JSX.Element => {
  console.log("*** NewCostPage");

  return (
    <div className={divClass}>
      <Paper className={paperClass}>
        <Grid container direction="column" alignItems="center">
          <Grid item xs={6}>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <NewCostForm {...props} />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}, isEqual);

export default NewCostPage;
