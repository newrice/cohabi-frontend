import React from "react";
import { useTranslation } from "react-i18next";
import { Grid, Paper, Button } from "@material-ui/core";
import clsx from "clsx";
import { Link } from "react-router-dom";

const divClass = clsx("home-wrapper");
const paperClass = clsx("underlay-paper-base");
const formClass = clsx("column-container", "jc-strech-container");
const linkClass = clsx("router-link-base");
const buttonClass = clsx("strech-button", "margin-tb-8");

const HomeController = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <div className={divClass}>
      <Paper className={paperClass}>
        <Grid container direction="column" alignItems="center">
          <Grid item xs={10}>
            <div className={formClass}>
              <Link to="/costs/list" className={linkClass}>
                <Button
                  color="primary"
                  variant="contained"
                  className={buttonClass}
                >
                  {t("LABEL_LOGIN")}
                </Button>
              </Link>
              <Link to="/signup" className={linkClass}>
                <Button
                  color="secondary"
                  variant="contained"
                  className={buttonClass}
                >
                  {t("LABEL_SIGNUP")}
                </Button>
              </Link>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default HomeController;
