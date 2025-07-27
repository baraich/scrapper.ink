import { useReactFlow } from "@xyflow/react";
import {
  InputDataClassification,
  NodeInput,
  TaskProps,
} from "../types";
import StringInput from "./string-input";
import { useCallback } from "react";

const allowedInputClassification = [
  InputDataClassification.STRING,
] as const;

export default function NodeInputs({
  nodeId,
  inputs,
}: Pick<TaskProps, "inputs"> & { nodeId: string }) {
  const { updateNodeData } = useReactFlow();

  const updateNodeInputValue = useCallback(
    (id: string, newValue: string) => {
      updateNodeData(nodeId, {
        inputs: inputs.map((input) =>
          input.id === id
            ? {
                ...input,
                value: newValue,
              }
            : input
        ),
      });
    },
    [nodeId, inputs]
  );

  return (
    <div className="w-full p-4 bg-muted">
      {(inputs ?? []).map((input, idx) => {
        if (
          allowedInputClassification.includes(input.classification)
        ) {
          return (
            <div key={idx} className="w-full flex flex-col gap-1">
              <div className="flex gap-0.5 items-start">
                <span className="text-sm">{input.label}</span>
                {input.required && (
                  <span className="text-rose-500 text-xs">*</span>
                )}
              </div>
              <ClassifiedInput
                input={input}
                className={"bg-background"}
                updateValue={(newValue) =>
                  updateNodeInputValue(input.id, newValue)
                }
              />
              <span className="text-gray-500 text-xs">
                {input.hint}
              </span>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}

interface ClassifiedInputProps {
  input: NodeInput;
  className: string;
  updateValue: (newValue: string) => void;
}

function ClassifiedInput({
  input,
  className,
  updateValue,
}: ClassifiedInputProps) {
  if (input.classification === InputDataClassification.STRING) {
    return (
      <StringInput
        value={input.value}
        updateValue={updateValue}
        className={className}
      />
    );
  }
}
