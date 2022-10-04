import { useMemo } from "react";
import { format } from "date-fns";

export const useFormattedTime = (time: Date | number) => {
  return useMemo(() => {
    return format(time, "kk:mm:ss:SSS");
  }, [time]);
};
