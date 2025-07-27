import { NodeProps, useReactFlow } from "@xyflow/react";
import { AppNode } from "./types";
import { TaskRegistry } from "./registry";
import { cn } from "@/lib/utils";
import NodeInputs from "./components/node-inputs";

export default function NodeComponent(props: NodeProps) {
  const { setCenter, getNode } = useReactFlow();

  const { id, data } = {
    id: props.id,
    data: props.data,
  } as AppNode;
  const node = getNode(id);

  const Task = TaskRegistry[data.taskClassification];

  return (
    <div
      onDoubleClick={() => {
        if (!node?.position || !node.measured) return;
        const { width, height } = node.measured;
        const x = node.position.x + width! / 2;
        const y = node.position.y + height! / 2;
        if (
          (x === undefined && isNaN(x)) ||
          (y === undefined && isNaN(y))
        )
          return;

        setCenter(x, y, {
          zoom: 1,
          duration: 500,
        });
      }}
      className={cn(
        "w-[420px] h-full cursor-auto border overflow-hidden",
        props.selected && "border-primary/60"
      )}
    >
      <Task
        nodeId={id}
        inputs={data.inputs}
        isSelected={props.selected}
      />
      <NodeInputs nodeId={id} inputs={data.inputs} />
    </div>
  );
}
