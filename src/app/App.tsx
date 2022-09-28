import { Layout } from "antd";
import { Sidebar } from "./features/layout/Sidebar";
import { Router } from "./features/roouting/Router";

export const App = () => {
  return (
    <Layout style={{ height: "100vh" }}>
      <Sidebar />
      <Layout.Content
        style={{
          padding: "24px",
        }}
      >
        <Router />
      </Layout.Content>
    </Layout>
  );
};
