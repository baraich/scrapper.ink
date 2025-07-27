import { JSX } from "react";
import {
  InputDataClassification,
  NodeInput,
  TaskClassification,
  TaskProps,
} from "../types";
import { launchBrowser } from "../tasks/launch-browser";

export const TasksConfig: Record<
  TaskClassification,
  { label: string }
> = {
  LAUNCH_BROWSER: {
    label: "Launch Browser",
  },
};

export const TaskRegistry: Record<
  keyof typeof TaskClassification,
  (props: TaskProps) => JSX.Element
> = {
  LAUNCH_BROWSER: launchBrowser,
} as const;

export const TaskInputsRegistry: Record<
  keyof typeof TasksConfig,
  NodeInput[]
> = {
  LAUNCH_BROWSER: [
    {
      id: crypto.randomUUID(),
      label: "Website URL",
      required: true,
      classification: InputDataClassification.STRING,
      hint: "eg: https://www.google.com/",
    },
  ],
};
