import { Switch } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../../store";
import { selectSketchAutoRefresh, setSketchAutoRefresh } from "../sketchSlice";

export const SketchAutoRefreshSwitch = () => {
  const autoRefresh = useAppSelector(selectSketchAutoRefresh);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSketchAutoRefresh(e.target.checked));
  };

  return (
    <Switch
      checked={autoRefresh}
      onChange={handleChange}
      color="gray"
      label="Auto refresh"
    />
  );
};
