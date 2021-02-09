import React from "react";
import { useTranslation } from "react-i18next";
import { Grid, Paper, Button } from "@material-ui/core";
import clsx from "clsx";
import CategoryList from "./CategoryList";
import { ICategory } from "../../types";

interface ICategoryForm {
  categories: ICategory[];
  onEditCategories: (categories: ICategory[]) => void;
  onSubmitClick: () => void;
}

const divClass = clsx("input-wrapper");
const paperClass = clsx("underlay-paper-base");
const formClass = clsx("column-container");
const updateButtonClass = clsx("input-field-base");

const CategoryForm = ({
  categories,
  onEditCategories,
  onSubmitClick,
}: ICategoryForm): JSX.Element => {
  const { t } = useTranslation();

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
    </div>
  );
};

export default CategoryForm;
