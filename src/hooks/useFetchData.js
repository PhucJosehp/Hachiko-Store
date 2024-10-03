import { useEffect, useState } from "react";
import axios from "axios";

export const useFetchData = (API) => {
  const [data, setData] = useState();

  useEffect(() => {
    axios.get(API).then((res) => {
      console.log(res);
      setData(res.data);
    });
  }, [API]);

  return data;
};
