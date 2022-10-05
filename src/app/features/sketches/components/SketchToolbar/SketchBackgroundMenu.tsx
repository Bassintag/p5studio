import { Box, Button, Menu, Text } from "@mantine/core";
import bgUrl from "../../../static/bg.jpg";
import { useAppDispatch, useAppSelector } from "../../../store";
import { selectSketchBackground, setSketchBackground } from "../sketchSlice";
import { BackgroundIcon } from "./BackgroundIcon";

const options = {
  white: {
    title: "White",
    value: "white",
  },
  gray: {
    title: "Gray",
    value: "rgb(195, 195, 195)",
  },
  black: {
    title: "Black",
    value: "black",
  },
  checkerboard: {
    title: "Checkerboard",
    value: `url('${bgUrl}') center`,
  },
};

export const SketchBackgroundMenu = () => {
  const dispatch = useAppDispatch();

  const background = useAppSelector(selectSketchBackground);

  const handleSetBackground = (value: string) => {
    dispatch(setSketchBackground(value));
  };

  return (
    <Menu shadow="md">
      <Menu.Target>
        <Button
          variant="subtle"
          color="gray"
          leftIcon={<BackgroundIcon background={background} />}
        >
          Background
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {Object.entries(options).map(([key, { title, value }]) => (
          <Menu.Item
            key={key}
            onClick={() => handleSetBackground(value)}
            icon={<BackgroundIcon background={value} />}
          >
            <Text>{title}</Text>
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};
