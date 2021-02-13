import React, { useState, useEffect } from "react";
import { isArray, isEmpty } from "lodash";
import { ICategory, IUser, ICostResponse } from "../../../types";
import NewCostDialog from "./NewCostDialog";
import { fetchMonthlyList } from "../../../api";
import { isEqual, isApiError } from "../../../utils";

const divClass = "fab-bottom-spacer";

interface IListCostController {
  currentGroupId: string;
  currentUserId: string;
  users: IUser[];
  categories: ICategory[];
  onRequestStart: () => void;
  onRequestEnd: (error: boolean, message: string) => void;
}

const ListCostController = React.memo(
  (props: IListCostController): JSX.Element => {
    const {
      currentGroupId,
      currentUserId,
      users,
      categories,
      onRequestStart,
      onRequestEnd,
    } = props;
    const [date, setDate] = useState<Date>(new Date());
    const [costs, setCosts] = useState<ICostResponse[]>([]);
    const [refresh, setRefresh] = useState<boolean>(false);
    // dialogs
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [currentSelection, setCurrentSelection] = useState<string>("");

    useEffect(() => {
      const getDatas = async () => {
        const data = await fetchMonthlyList(currentGroupId, date);
        const { error } = isApiError(data, true);
        if (!error) {
          setCosts(
            data.body && !isEmpty(data.body) && isArray(data.body) // FIXME: API修正次第削除
              ? data.body
              : [],
          );
        }
      };
      getDatas();
    }, [refresh, date, currentGroupId]);

    const handleDateChange = (d: Date) => {
      setDate(d);
    };

    return (
      <div className={divClass}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <NewCostDialog {...props} />
      </div>
    );
  },
  isEqual,
);

export default ListCostController;
