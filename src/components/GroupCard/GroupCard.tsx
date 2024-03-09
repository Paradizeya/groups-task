import { Group, User } from "@src/shared/types";
import Avatar from "../Avatar/Avatar";
import style from "./style.module.scss";
import { useState } from "react";

function GroupCard(group: Group) {
  return (
    <article className={style.card}>
      <GroupCardHeader {...group} />
      <GroupCardBody {...group} />
    </article>
  );
}

function GroupCardHeader(group: Group) {
  function getStyleForStatus(group: Group) {
    return group.closed
      ? style.cardStatus + " " + style.cardStatusClosed
      : style.cardStatus + " " + style.cardStatusOpen;
  }

  return (
    <div className={style.cardHeader}>
      {group.avatar_color && (
        <Avatar color={group.avatar_color} title={group.name.substring(0, 1)} />
      )}

      <div
        className={`${style.cardTitle} ${
          !group.avatar_color && style.noAvatar
        }`}
      >
        <p className={style.cardName}>{group.name}</p>
        <p className={getStyleForStatus(group)}>
          {group.closed ? "Закрытая" : "Открытая"} группа
        </p>
      </div>
    </div>
  );
}

function GroupCardBody(group: Group) {
  const [hidden, setHidden] = useState(true);

  return (
    <div className={style.cardBody}>
      <div className={style.cardUsersCount}>
        Участников: {group.members_count}
      </div>

      {group.friends && (
        <div className={style.cardFriends}>
          <button
            className={style.cardFriendsToggle}
            onClick={() => setHidden(!hidden)}
          >
            Друзья: {group.friends.length}
          </button>

          {!hidden && <FriendsList friends={group.friends} />}
        </div>
      )}
    </div>
  );
}

function FriendsList({ friends }: { friends: User[] }) {
  return (
    <ul className={style.cardFriendsList}>
      {friends.map((friend, index) => {
        return (
          <li key={index}>
            {friend.first_name} {friend.last_name}
          </li>
        );
      })}
    </ul>
  );
}

export default GroupCard;
