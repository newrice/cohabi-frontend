import React from "react";
import { useTranslation } from "react-i18next";
import {
  Grid,
  Paper,
  Backdrop,
  CircularProgress,
  makeStyles,
  createStyles,
  Theme,
  Button,
} from "@material-ui/core";
import clsx from "clsx";
import CategoryList from "./CategoryList";
import { ISnackBarBase, SnackBar } from "../../component/parts";
import { ICategory } from "../../types";

interface ISnackBarState extends ISnackBarBase {
  open: boolean;
  onClose: () => void;
}
interface ICategoryForm {
  categories: ICategory[];
  onEditCategories: (categories: ICategory[]) => void;
  onSubmitClick: () => void;
  loading: boolean;
  snackbar: ISnackBarState;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
    },
  }),
);

const divClass = clsx("input-wrapper");
const paperClass = clsx("underlay-paper-base");
const formClass = clsx("column-container");
const updateButtonClass = clsx("input-field-base");

const CategoryForm = ({
  categories,
  onEditCategories,
  onSubmitClick,
  loading,
  snackbar,
}: ICategoryForm): JSX.Element => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div className={divClass}>
      <Paper className={paperClass}>
        <Grid container direction="column" alignItems="center">
          <Grid item xs={10}>
            <div className={formClass}>
              <CategoryList
                categories={categories}
                onEditCategories={onEditCategories}
              />
              <Button
                color="secondary"
                variant="outlined"
                onClick={onSubmitClick}
                className={updateButtonClass}
              >
                {t("LABEL_SAVE")}
              </Button>
            </div>
          </Grid>
        </Grid>
      </Paper>
      {/* controles */}
      <Backdrop open={loading} className={classes.backdrop}>
        <CircularProgress color="secondary" size={80} />
      </Backdrop>
      <SnackBar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        closable
        autoHideDuration={snackbar.autoHideDuration}
        handleClose={snackbar.onClose}
      />
    </div>
  );
};

export default CategoryForm;
