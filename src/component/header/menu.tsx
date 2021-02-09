import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import ListIcon from "@material-ui/icons/List";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import CategoryIcon from "@material-ui/icons/Category";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";

export interface MenuObject {
  icon: JSX.Element;
  key: string;
  priority: number;
  label: string;
  linkTo?: string;
  children?: MenuObject[];
}

const menuItems: MenuObject[] = [
  {
    key: "c_kakeibo",
    priority: 0,
    label: "MENU_LABEL_KAKEIBO",
    icon: <AccountBalanceWalletIcon />,
    children: [
      //     {
      //       key: "input",
      //       priority: 0,
      //       label: "MENU_LABEL_FORM",
      //       icon: <EditIcon />,
      //       linkTo: "/input",
      //     },
      //     {
      //       key: "output",
      //       priority: 1,
      //       label: "MENU_LABEL_LIST",
      //       linkTo: "/output",
      //       icon: <ListIcon />,
      //     },
      {
        key: "manage_category",
        priority: 2,
        label: "MENU_LABEL_CATEGORIES",
        linkTo: "/categories",
        icon: <CategoryIcon />,
      },
    ],
  },
  {
    key: "todos",
    priority: 1,
    label: "MENU_LABEL_TODO",
    linkTo: "/todos",
    icon: <PlaylistAddCheckIcon />,
  },
  // {
  //   key: "calendar",
  //   priority: 2,
  //   label: "MENU_LABEL_CALENDAR",
  //   linkTo: "/calendars",
  //   icon: <EventAvailableIcon />,
  // },
];

export default menuItems;
