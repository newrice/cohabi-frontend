import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ISnackBarBase } from "../../component/parts";
import { selectCurrentGroup } from "../group/groupSlice";
import { createCategories, fetchCategories } from "../../api";
import { createSnackState, isApiError } from "../../utils";
import { ICategory, IApiResponseBase } from "../../types";
import settings from "../../settings";
import CategoryForm from "./CategoryForm";

const filterNew = (categories: ICategory[]): ICategory[] =>
  categories.map(item =>
    item.id.startsWith(settings.constants.newId)
      ? { ...item, ...{ id: "" } }
      : { ...item },
  );

const CategoriesController = (): JSX.Element => {
  const currentGroup = useSelector(selectCurrentGroup);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);
  const [snackOpen, setSnackOpen] = useState<boolean>(false);
  const [snack, setSnack] = useState<ISnackBarBase>({
    message: "",
    severity: "success",
    closable: true,
  });

  useEffect(() => {
    setSending(true);
    const getDatas = async () => {
      const data = [
        { id: "aaa", name: "家具", disabled: false },
        { id: "bbb", name: "食費", disabled: false },
        { id: "N_999", name: "その他", disabled: false },
      ];
      setCategories(data);
      // await fetchCategories(currentGroup.id)
      // const { error, message } = isApiError(data, true)
      // if (error) {
      //   setSnack(createSnackState(error, message))
      //   setSnackOpen(true)
      // } else {
      //   setCategories(data.body || [])
      // }
      setSending(false);
    };
    getDatas();
  }, [refresh, currentGroup]);

  const responseHandler = (
    res: IApiResponseBase<undefined>,
    withBody?: boolean,
  ) => {
    const { error, message } = isApiError(res, withBody);
    setSnack(createSnackState(error, message));
    setSnackOpen(true);
    setRefresh(!refresh);
  };

  const handlePost = async () => {
    setSending(true);
    const newArray = filterNew(categories);
    const res = await createCategories(newArray, currentGroup.id);
    setSending(false);
    responseHandler(res);
  };

  return (
    <CategoryForm
      categories={categories}
      onEditCategories={setCategories}
      onSubmitClick={handlePost}
      loading={sending}
      snackbar={{
        ...snack,
        open: snackOpen,
        onClose: () => setSnackOpen(false),
      }}
    />
  );
};

export default CategoriesController;
