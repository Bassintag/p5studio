import { AppShell } from "@mantine/core";
import { Sidebar } from "./features/layout/components/Sidebar";
import { Route, Routes } from "react-router-dom";
import { SketchPage } from "./features/sketches/pages/SketchPage";

export const App = () => {
  return (
    <AppShell padding={0} navbar={<Sidebar />}>
      <Routes>
        <Route path=":sketchId" element={<SketchPage />} />
      </Routes>
    </AppShell>
  );
};
