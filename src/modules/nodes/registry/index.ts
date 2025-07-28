import { JSX } from "react";
import {
  GroupClassification,
  InputDataClassification,
  NodeInput,
  TaskClassification,
  TaskProps,
} from "../types";
import { launchBrowser } from "../tasks/launch-browser";

export const TasksConfig: Record<
  TaskClassification,
  { label: string; group: GroupClassification }
> = {
  LAUNCH_BROWSER: {
    label: "Launch Browser",
    group: GroupClassification.TRIGGER,
  },
  READ_HTML_FROM_PAGE: {
    label: "Read HTML From Page",
    group: GroupClassification.EXTRACTION,
  },
};

// TODO: Fix these.
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
