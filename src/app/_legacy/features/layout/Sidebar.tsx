import { Layout, Menu } from "antd";
import { selectSketches } from "../sketch/sketchSlice";
import { useAppSelector } from "../../store";
import { Link, useLocation } from "react-router-dom";

export const Sidebar = () => {
  const sketches = useAppSelector(selectSketches);
  const location = useLocation();

  return (
    <Layout.Sider>
      {sketches && (
        <Menu
          style={{ height: "100%" }}
          mode="inline"
          selectedKeys={[location.pathname]}
        >
          {sketches.map((sketch) => (
            <Menu.Item key={`/${sketch}`}>
              <Link to={`/${sketch}`}>{sketch}</Link>
            </Menu.Item>
          ))}
        </Menu>
      )}
    </Layout.Sider>
  );
};
