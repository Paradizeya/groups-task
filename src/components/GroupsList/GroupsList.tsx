import GroupCard from "../GroupCard/GroupCard";
import { Group } from "@src/shared/types";
import style from "./style.module.scss";

function GroupsList({ groups }: { groups: Group[] }) {
  return (
    <div className={style.wrapper}>
      {groups.map((group) => {
        return <GroupCard key={group.id} {...group} />;
      })}
    </div>
  );
}

export default GroupsList;
