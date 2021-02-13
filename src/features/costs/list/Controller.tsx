import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Paper } from "@material-ui/core";
import { isArray, isEmpty } from "lodash";
import { ICategory, IUser, ICostResponse } from "../../../types";
import NewCostDialog from "./NewCostDialog";
import { fetchMonthlyList } from "../../../api";
import { isEqual, isApiError } from "../../../utils";
import { MonthlyDatePicker } from "../../../component/molecules";
import { CostLists } from "./CostLists";
import EditCostDialog from "./EditCostDialog";
// FIXME: remove
// import { costsData } from "../../../__mock__/data";

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
      // setCosts(costsData);
    }, [refresh, date, currentGroupId]);

    const handleDateChange = useCallback((d: Date | null) => {
      if (d) setDate(d);
    }, []);
    const handleOpen = useCallback((id: string) => {
      setCurrentSelection(id);
      setDialogOpen(true);
    }, []);
    const handleClose = useCallback(() => {
      setDialogOpen(false);
    }, []);
    const handleRequestEnd = useCallback(
      (error: boolean, message: string) => {
        handleClose();
        if (!error) {
          setRefresh(!refresh);
        }
        onRequestEnd(error, message);
      },
      [onRequestEnd, refresh],
    );
    const currentSelectionItem = useMemo(
      () => costs.find(item => item.id === currentSelection),
      [currentSelection],
    );
    const isEditable = useCallback(
      (userid: string): boolean => currentUserId === userid,
      [currentUserId],
    );

    return (
      <div className={divClass}>
        <Paper className="output-cost-base">
          <MonthlyDatePicker value={date} onChange={handleDateChange} />
          <CostLists
            costs={costs}
            editable={isEditable}
            users={users}
            categories={categories}
            onSelect={handleOpen}
          />
        </Paper>

        {currentSelection && (
          <EditCostDialog
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
            item={currentSelectionItem || null}
            open={dialogOpen}
            onClose={handleClose}
            onRequestEnd={handleRequestEnd}
          />
        )}
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <NewCostDialog {...props} />
      </div>
    );
  },
  isEqual,
);

export default ListCostController;
