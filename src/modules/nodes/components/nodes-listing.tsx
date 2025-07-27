"use client";
import { TasksConfig } from "../registry";

export default function NodesListing() {
  const tasks = Object.entries(TasksConfig);

  const render = tasks.map(([taskClassification, config]) => (
    <div
      className="w-full p-4 border cursor-grab"
      key={taskClassification}
    >
      {config.label}
    </div>
  ));

  return <div className="w-full h-full p-4">{render}</div>;
}
