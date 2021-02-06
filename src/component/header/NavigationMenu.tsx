import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Collapse,
  createStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
} from "@material-ui/core";
import _ from "lodash";
import { MenuObject } from "./menu";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }),
);

const menuClass = "navigation-menu";
const menuLinkClass = "router-link-base";

const CreateMenuItem = (
  item: MenuObject,
  isNested?: boolean,
  onClick?: () => void,
): JSX.Element => {
  const { t } = useTranslation();
  const classes = useStyles();
  const listItemKey = `menuListItem_${item.key}`;
  const linkItemKey = `menuListLink_${item.key}`;
  const listItem = (
    <ListItem
      key={listItemKey}
      button
      onClick={onClick}
      className={isNested ? classes.nested : ""}
    >
      <ListItemIcon>{item.icon}</ListItemIcon>
      <ListItemText primary={t(item.label)} />
    </ListItem>
  );
  return item.linkTo ? (
    <Link key={linkItemKey} to={item.linkTo} className={menuLinkClass}>
      {listItem}
    </Link>
  ) : (
    listItem
  );
};

// eslint-disable-next-line import/prefer-default-export
export const NavigationMenu = (
  items: MenuObject[],
  onUnCollapseClick: () => void,
  isNested?: boolean,
): JSX.Element => {
  const [openedCollapses, setOpenedCollapses] = useState<string[]>([]);
  const onCollapseClick = (key: string) => () => {
    let clonedState = _.cloneDeep(openedCollapses);
    if (!openedCollapses.includes(key)) {
      clonedState.push(key);
    } else {
      clonedState = clonedState.filter(item => item !== key);
    }
    setOpenedCollapses(clonedState);
  };
  return (
    <div className={menuClass}>
      <List>
        {items &&
          items.map(item => {
            if (item.children && item.children.length) {
              return (
                <React.Fragment key={`menuListWrapper_${item.key}`}>
                  {CreateMenuItem(item, isNested, onCollapseClick(item.key))}
                  <Collapse
                    in={openedCollapses.includes(item.key)}
                    timeout="auto"
                    unmountOnExit
                    key={`menuListCollapse_${item.key}`}
                  >
                    {NavigationMenu(item.children, onUnCollapseClick, true)}
                  </Collapse>
                </React.Fragment>
              );
            }
            return CreateMenuItem(item, isNested, onUnCollapseClick);
          })}
      </List>
    </div>
  );
};
