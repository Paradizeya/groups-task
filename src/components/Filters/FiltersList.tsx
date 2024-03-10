import { useContext } from "react";
import { GroupContext } from "@src/shared/GroupContext";
import { Filter as FilterType } from "@src/shared/types";
import style from "./style.module.scss";

function FiltersList() {
  const { filters } = useContext(GroupContext);
  return (
    <div className={style.wrapper}>
      {filters.map((filter, index) => {
        return <Filter key={index} {...filter} />;
      })}
    </div>
  );
}

function Filter(filter: FilterType) {
  const { appliedFilters, updateAppliedFilters } = useContext(GroupContext);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const filterName = e.target.name;
    const filterValue = e.target.value;

    const updatedFilters = appliedFilters.map((filter) => {
      if (filter.name === filterName) {
        return { ...filter, value: filterValue };
      }
      return filter;
    });

    updateAppliedFilters(updatedFilters);
  };

  return (
    <div className={style.filter}>
      <label className={style.filterLabel} htmlFor={filter.name}>
        {filter.name}
      </label>
      <select
        className={style.filterSelect}
        name={filter.name}
        id={filter.name}
        onChange={handleFilterChange}
      >
        <option value="Все">Все</option>
        {filter.value.map((value, index) => {
          return (
            <option key={index} value={value}>
              {value}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default FiltersList;
