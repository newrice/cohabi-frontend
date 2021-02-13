import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { TCostsViewMode } from "../../../types";
import { SimpleButton } from "../../../component/parts";
import { isEqual } from "../../../utils";

interface IViewModeButtons {
  currentMode: TCostsViewMode;
  onClick: (mode: TCostsViewMode) => void;
}
interface IViewModeButton extends IViewModeButtons {
  me: TCostsViewMode;
  label: string;
}
interface IViewModeSetting {
  key: TCostsViewMode;
  i18nKey: string;
}
const modes: IViewModeSetting[] = [
  {
    key: "date",
    i18nKey: "LABEL_DATE",
  },
  {
    key: "user",
    i18nKey: "LABEL_USER",
  },
  {
    key: "category",
    i18nKey: "LABEL_CATEGORY",
  },
];
const modeButtonClass = "strech-button margin-tb-8";

const ViewModeButton = React.memo(
  ({ label, currentMode, me, onClick }: IViewModeButton): JSX.Element => {
    const handleClick = useCallback(() => {
      onClick(me);
    }, [me]);
    const isActive = useMemo(() => currentMode === me, [currentMode, me]);
    return (
      <div style={{ minWidth: "30%" }}>
        <SimpleButton
          label={label}
          color={isActive ? "secondary" : "default"}
          onClick={handleClick}
          size="small"
          variant="outlined"
          className={modeButtonClass}
        />
      </div>
    );
  },
  isEqual,
);

export const ViewModeButtons = React.memo(
  (props: IViewModeButtons): JSX.Element => {
    const { t } = useTranslation();
    return (
      <div className="row-container jc-sp-between-container">
        {modes.map(item => (
          <ViewModeButton
            key={`viewmode-button-${item.key}`}
            label={t(item.i18nKey)}
            me={item.key}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
          />
        ))}
      </div>
    );
  },
  isEqual,
);

export default ViewModeButtons;
