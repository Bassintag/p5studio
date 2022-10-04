import { Sketch } from "@types";
import { useRef } from "react";
import { useP5 } from "./hooks/useP5";
import { saveAs } from "file-saver";
import { Button, Card, Space } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import bgUrl from "../../static/bg.jpg?url";

export interface SketchWrapperProps {
  sketch: Sketch;
}

export const SketchWrapper = ({ sketch }: SketchWrapperProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const svg = useP5(sketch, wrapperRef);

  const handleDownload = () => {
    if (svg) {
      saveAs(new Blob([svg.outerHTML]), `${sketch.name}.svg`);
    }
  };

  return (
    <Space direction="vertical" style={{ display: "flex" }}>
      <Card title={sketch.name}>
        <div
          style={{
            display: "inline-block",
            backgroundImage: `url('${bgUrl}')`,
          }}
          ref={wrapperRef}
        />
      </Card>
      {svg && (
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          onClick={handleDownload}
        >
          Download
        </Button>
      )}
    </Space>
  );
};
