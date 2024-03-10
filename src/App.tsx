import { useState, useEffect } from "react";
import GroupsList from "./components/GroupsList/GroupsList";
import { GroupContext } from "./shared/GroupContext";
import { getGroups } from "./api/getGroups";
import { Filter, AppliedFilter, Group } from "./shared/types";
import style from "./app.module.scss";
import FiltersList from "./components/Filters/FiltersList";

function App() {
  //groups для изначальных данных, displayGroups для отображения отфильтрованных
  const [groups, setGroups] = useState<Group[]>([]);
  const [displayGroups, setDisplayGroups] = useState<Group[]>([]);

  const [isSuccess, setIsSuccess] = useState<1 | 0>(0);
  const [isLoading, setIsLoading] = useState(true);

  //filters для создания компонентов, appliedFilters для подписки на их состояние и запуска обработчиков
  const [filters, setFilters] = useState<Filter[]>([]);
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilter[]>([]);

  const updateAppliedFilters = (newFilters: AppliedFilter[]) => {
    setAppliedFilters(newFilters);
  };

  // Запрос + создание фильтров
  useEffect(() => {
    const createAvatarFilter: (groups: Group[]) => Filter = (groups) => {
      let colors = ["Нет"];
      groups.forEach((group) => {
        group.avatar_color &&
          colors.indexOf(group.avatar_color) === -1 &&
          colors.push(group.avatar_color);
      });
      return { name: "Аватар", value: colors };
    };

    const fetchData = async () => {
      setIsLoading(true);
      const response = await getGroups();
      setIsSuccess(response.result);

      if (response.data) {
        setGroups(response.data);
        setDisplayGroups(response.data);

        //Здесь добавлять новые фильтры
        //Значение по умолчанию "Все" не добавлять
        setFilters([
          {
            name: "Статус",
            value: ["Закрытые", "Открытые"],
          },
          { name: "Друзья", value: ["Да", "Нет"] },
          createAvatarFilter(response.data),
        ]);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  // Создание примененных фильтров в дефолтном состоянии на основе списка фильтров
  useEffect(() => {
    let newAppFilters: AppliedFilter[] = [];
    filters.map((filter) => {
      newAppFilters.push({ name: filter.name, value: "Все" });
    });
    setAppliedFilters(newAppFilters);
  }, [filters]);

  //Применение фильтров
  //Значение "Все" сбрасывает фильтр
  //Здесь добавлять новые обработчики фильтров в свитч
  useEffect(() => {
    let filteredGroups = groups;

    appliedFilters.forEach((filter) => {
      if (filter.value !== "Все") {
        switch (filter.name) {
          case "Аватар":
            filteredGroups = filteredGroups.filter(
              (group) =>
                (group.avatar_color && group.avatar_color === filter.value) ||
                (!group.avatar_color && filter.value === "Нет")
            );
            break;
          case "Статус":
            filteredGroups = filteredGroups.filter(
              (group) =>
                (group.closed && filter.value === "Закрытые") ||
                (!group.closed && filter.value === "Открытые")
            );
            break;
          case "Друзья":
            filteredGroups = filteredGroups.filter(
              (group) =>
                (group.friends && filter.value === "Да") ||
                (!group.friends && filter.value === "Нет")
            );
            break;
          default:
            break;
        }
      }
    });

    setDisplayGroups(filteredGroups);
  }, [appliedFilters]);

  return (
    <div className={style.wrapper}>
      <h1>Группы</h1>
      {isLoading ? (
        <div>Загрузка...</div>
      ) : isSuccess ? (
        <GroupContext.Provider
          value={{
            groups: displayGroups,
            filters,
            appliedFilters,
            updateAppliedFilters,
          }}
        >
          <FiltersList />
          <GroupsList />
        </GroupContext.Provider>
      ) : (
        <div>{"Что-то пошло не так :("}</div>
      )}
    </div>
  );
}

export default App;
