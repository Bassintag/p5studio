import { Navigate, Route, Routes } from "react-router-dom";
import { SketchPage } from "../sketch/SketchPage";
import { HomePage } from "../home/HomePage";

export const Router = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path=":sketchId" element={<SketchPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
