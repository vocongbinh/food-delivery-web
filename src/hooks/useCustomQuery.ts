import { BaseData, ObjectResponse, User } from "@/data/types";
import http from "@/utils/http";
import { DefinedInitialDataOptions, useQuery } from "@tanstack/react-query";
import { extend } from "lodash";
import qs from "qs";
export type TypeKeys =
  | "categories"
  | "applications"
  | "reviews"
  | "blogs"
  | "advertisements"
  | "communities"
  | "global"
  | "about-page"
  | "users"
  | "users/me"
  | "settings"
  | "news-categories";
export const getQueryFunction = async <T extends BaseData>({
  key,
  urlParamsObject,
  id,
}: {
  key: TypeKeys;
  id?: number;
  urlParamsObject?: {};
}) => {
  const query = qs.stringify(urlParamsObject, {
    encodeValuesOnly: true,
  });
  try {
    if (key === "users/me") {
      const res = await http.get<T>(`/${key}?${query}`);
      return res.data as T;
    }
    const res = await http.get<ObjectResponse<T>>(
      `/${key}${id ? `/${id}` : ""}${query ? `?${query}` : ""}`
    );
    const { data } = res.data;
    if (!Array.isArray(data)) {
      return {
        id: data.id,
        ...data.attributes,
      } as T;
    }
    return data.map((item) => {
      return {
        id: item.id,
        ...item.attributes,
      } as T;
    });
  } catch (e) {
    throw e;
  }
};
export const useCustomQuery = <T extends BaseData>({
  key,
  id,
  urlParamsObject,
  opts,
}: {
  key: TypeKeys;
  id?: number;
  urlParamsObject?: {};
  opts?: Omit<
    DefinedInitialDataOptions<T | T[]>,
    "queryKey" | "queryFn" | "initialData"
  >;
}) => {
  const { data, isLoading } = useQuery({
    queryKey: [key, urlParamsObject],
    queryFn: async () => {
      return getQueryFunction<T>({ key, urlParamsObject, id });
    },
    ...opts,
  });
  return { data, isLoading };
};

export const getPrefetchQuery = <T extends BaseData>({
  key,
  urlParamsObject,
}: {
  key: TypeKeys;
  urlParamsObject?: {};
}) => {
  return {
    queryKey: [key, urlParamsObject],
    queryFn: async () => {
      return getQueryFunction<T>({ key, urlParamsObject });
    },
  };
};
