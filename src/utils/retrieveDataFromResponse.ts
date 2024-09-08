import { BaseData, DataResponse } from "@/data/types";

export const retrieveDataFromResponse = <T extends BaseData>(
  data: DataResponse<T>[]
): T[] => {
  return data.map(
    (item) =>
      ({
        id: item.id,
        ...item.attributes,
      } as T)
  );
};

export const retrieveObjectFromResponse = <T extends BaseData>(
  data: DataResponse<T>
): T => {
  return {
    id: data.id,
    ...data.attributes,
  } as T;
};
