import { createContext } from "react";
import { GroupContext as GroupContextType } from "@src/shared/types";

export const GroupContext = createContext<GroupContextType>(
  {} as GroupContextType
);
