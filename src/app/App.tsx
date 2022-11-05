import { AppShell } from "@mantine/core";
import { Sidebar } from "./features/layout/components/Sidebar";
import { Navigate, Route, Routes } from "react-router-dom";
import { SketchPage } from "./features/sketches/pages/SketchPage";
import { HomePage } from "./features/home/pages/HomePage";

export const App = () => {
  return (
    <AppShell padding={0} navbar={<Sidebar />}>
      <Routes>
        <Route index element={<HomePage />}></Route>
        <Route path=":sketchId" element={<SketchPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AppShell>
  );
};
