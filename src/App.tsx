import { useState, useEffect } from "react";
import GroupsList from "./components/GroupsList/GroupsList";
import { getGroups } from "./api/getGroups";
import { Group } from "./shared/types";
import style from "./app.module.scss";

function App() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isSuccess, setIsSuccess] = useState<1 | 0>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await getGroups();
      setIsSuccess(response.result);
      if (response.data) {
        setGroups(response.data);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className={style.wrapper}>
      <h1>Группы</h1>
      {isLoading ? (
        <div>Загрузка...</div>
      ) : (
        <>
          {isSuccess ? (
            <GroupsList groups={groups} />
          ) : (
            <div>{"Что-то пошло не так :("}</div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
