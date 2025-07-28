import { Node } from "@xyflow/react";

export enum GroupClassification {
  TRIGGER = "TRIGGER",
  EXTRACTION = "EXTRACTION",
}

export enum TaskClassification {
  LAUNCH_BROWSER = "LAUNCH_BROWSER",
  READ_HTML_FROM_PAGE = "READ_HTML_FROM_PAGE",
}

export enum NodeClassification {
  NODE = "NODE",
}

export enum InputDataClassification {
  STRING = "STRING",
}

export interface NodeInput {
  id: string;
  hint: string;
  label: string;
  value?: string;
  required: boolean;
  classification: InputDataClassification;
}

export interface AppNode extends Node {
  id: string;
  type: NodeClassification;
  data: {
    taskClassification: TaskClassification;
    inputs: NodeInput[];
  };
}

export interface TaskProps {
  nodeId: string;
  inputs: NodeInput[];
  isSelected: boolean;
}
