import { Input } from "@/components/ui/input";
import React, { useId } from "react";

export interface InputIconProps extends React.ComponentProps<"input">{
  icon: React.ReactNode;
}

export default function InputIcon(props: InputIconProps) {
  const id = useId();

  const { icon, ...override } = props;

  const processedIcon = React.isValidElement(icon) ?
    React.cloneElement(icon as React.ReactElement<{ size?: number; strokeWidth?: number }>, {
      size: 16,
      strokeWidth: 2,
    })
    : icon;

  return (
    <div className="relative">
      <Input id={id} className="peer ps-9" {...override} />
      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
        {processedIcon}
      </div>
    </div>
  );
}
