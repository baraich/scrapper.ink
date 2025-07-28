"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TasksConfig } from "../registry";
import { Button } from "@/components/ui/button";

export default function NodesListing() {
  const tasks = Object.entries(TasksConfig);

  const grouped = tasks.reduce(
    (acc, [TaskClassification, config]) => {
      const group = config.group || "ungrouped";
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push([TaskClassification, config]);
      return acc;
    },
    {} as Record<
      string,
      [string, (typeof TasksConfig)[keyof typeof TasksConfig]][]
    >
  );

  const render = Object.keys(grouped).map((group) => (
    <AccordionItem value={group} key={group}>
      <AccordionTrigger className="capitalize">
        {group}
      </AccordionTrigger>
      <AccordionContent>
        {grouped[group].map(([classification, config]) => (
          <Button className="w-full" key={classification}>
            {config.label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  ));

  return (
    <Accordion type="multiple" className="w-full">
      {render}
    </Accordion>
  );
}
