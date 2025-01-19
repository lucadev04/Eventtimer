import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import event from "./new_event"

export const SidebarData = [
  {
    title: "New Event",
    path: event(),
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Backgroundimage",
    path: "/",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
];