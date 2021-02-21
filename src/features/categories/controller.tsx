import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryForm from "./CategoryForm";
import { setProgress, setSnackState } from "../feedback/feedbackSlice";
import { selectCurrentGroup } from "../group/groupSlice";
import { createCategories } from "../../api";
import settings from "../../settings";
import { ICategory, IApiResponseBase } from "../../types";
import { createSnackState, isApiError } from "../../utils";
import { fetchCategories, selectCategories } from "./categoriesSlice";
// FIXME:
// import { categoriesData } from "../../__mock__/data";

const filterNew = (categories: ICategory[]): ICategory[] =>
  categories.map(item =>
    item.id.startsWith(settings.constants.newId)
      ? { ...item, ...{ id: "" } }
      : { ...item },
  );

const CategoriesController = (): JSX.Element => {
  const currentGroup = useSelector(selectCurrentGroup);
  const baseCategories = useSelector(selectCategories);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setCategories(baseCategories);
  }, [baseCategories]);

  useEffect(() => {
    dispatch(fetchCategories(currentGroup.id));
  }, [refresh]);

  const responseHandler = (
    res: IApiResponseBase<undefined>,
    withBody?: boolean,
  ) => {
    const { error, message } = isApiError(res, withBody);
    dispatch(setSnackState(createSnackState(error, message)));
    setRefresh(!refresh);
  };

  const handlePost = async () => {
    dispatch(setProgress(true));
    const newArray = filterNew(categories);
    const res = await createCategories(newArray, currentGroup.id);
    dispatch(setProgress(false));
    responseHandler(res);
  };

  return (
    <CategoryForm
      categories={categories}
      onEditCategories={setCategories}
      onSubmitClick={handlePost}
    />
  );
};

export default CategoriesController;
