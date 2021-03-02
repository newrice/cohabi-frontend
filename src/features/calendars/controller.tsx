import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { groupBy, isArray, isEmpty } from "lodash";
import CalendarForm from "./CalendarForm";
import { setProgress, setSnackState } from "../feedback/feedbackSlice";
import {
  selectCurrentGroup,
  selectCurrentGroupUser,
} from "../group/groupSlice";
import {
  createCalendar,
  deleteCalendar,
  fetchCalendars,
  updateCalendar,
} from "../../api";
import {
  IApiResponseBase,
  ICalendar,
  ICalendarBase,
  ICalendarResponse,
} from "../../types";
import { isApiError, createSnackState } from "../../utils";
// FIXME:
// import { calendarsData, usersData } from "../../__mock__/data";

const calendarGroupBy = (calendars: ICalendarResponse[]) => {
  const obj: { [key: string]: ICalendarResponse[] } = {};
  const data = groupBy(calendars, "date");
  Object.keys(data)
    .sort()
    .forEach(item => {
      obj[item] = data[item];
    });
  return obj;
};

const CalendarController = (): JSX.Element => {
  const currentGroup = useSelector(selectCurrentGroup);
  const users = useSelector(selectCurrentGroupUser);
  const dispatch = useDispatch();
  const [calendars, setCalendars] = useState<ICalendarResponse[]>([]);
  // const [users, setUsers] = useState<IUser[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    dispatch(setProgress(true));
    const getDatas = async () => {
      const data = await fetchCalendars(currentGroup.id);
      const { error, message } = isApiError(data, true);
      if (error) {
        dispatch(setSnackState(createSnackState(error, message)));
      } else {
        setCalendars(
          data.body && !isEmpty(data.body) && isArray(data.body)
            ? data.body
            : [],
        );
      }
      // setCalendars(calendarsData);
      dispatch(setProgress(false));
    };
    getDatas();
  }, [refresh, currentGroup]);

  const responseHandler = useCallback(
    (res: IApiResponseBase<undefined>, withBody?: boolean) => {
      const { error, message } = isApiError(res, withBody);
      dispatch(setSnackState(createSnackState(error, message)));
      setRefresh(!refresh);
    },
    [dispatch, refresh],
  );

  const handlePost = async (item: ICalendarBase) => {
    dispatch(setProgress(true));
    const res = await createCalendar(item, currentGroup.id);
    dispatch(setProgress(false));
    responseHandler(res);
  };

  const handlePut = async (item: ICalendar) => {
    dispatch(setProgress(true));
    const res = await updateCalendar(item, currentGroup.id);
    dispatch(setProgress(false));
    responseHandler(res);
  };

  const handleDelete = async (id: string) => {
    dispatch(setProgress(false));
    const res = await deleteCalendar(id, currentGroup.id);
    dispatch(setProgress(false));
    responseHandler(res);
  };

  const groupedCalendar = useMemo(() => calendarGroupBy(calendars), [
    calendars,
  ]);

  return (
    <CalendarForm
      groupedCalendar={groupedCalendar}
      users={users}
      onDelete={handleDelete}
      onPost={handlePost}
      onPut={handlePut}
    />
  );
};

export default CalendarController;
