import { TaskInputsRegistry } from "../registry";
import {
  AppNode,
  NodeClassification,
  NodeInput,
  TaskClassification,
} from "../types";

export function makeNode(
  taskClassification: TaskClassification
): AppNode {
  return {
    id: crypto.randomUUID(),
    type: NodeClassification.NODE,
    dragHandle: ".drag-handle__custom",
    data: {
      taskClassification: taskClassification,
      inputs: TaskInputsRegistry[taskClassification] ?? [],
    },
    position: { x: 0, y: 0 },
  };
}
