import { useContext } from "react";
import GroupCard from "../GroupCard/GroupCard";
import { GroupContext } from "@src/shared/GroupContext";
import style from "./style.module.scss";

function GroupsList() {
  const { groups } = useContext(GroupContext);
  return (
    <div className={style.wrapper}>
      {groups.map((group) => {
        return <GroupCard key={group.id} {...group} />;
      })}
    </div>
  );
}

export default GroupsList;
