import { Input } from "@/components/ui/input";

interface Props {
  value?: string;
  className: string;
  updateValue: (newValue: string) => void;
}

export default function StringInput({
  value,
  className,
  updateValue,
}: Props) {
  return (
    <Input
      value={value}
      className={className}
      onChange={(e) => updateValue(e.target.value)}
    />
  );
}
