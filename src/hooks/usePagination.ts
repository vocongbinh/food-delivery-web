import { useState } from "react"

export const usePagination =<T>() => {
    const [page, setPage ] = useState<Number>(0);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
      };

}