import mockData from "../groups.json";
import { GetGroupsResponse } from "@src/shared/types";

export const getGroups: () => Promise<GetGroupsResponse> = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (mockData) {
        resolve({
          result: 1,
          data: mockData,
        });
      } else {
        console.error("Не удалось получить данные!");
        resolve({
          result: 0,
        });
      }
    }, 1000);
  });
};
