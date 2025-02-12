import { LoaderCircle } from "lucide-react";

export interface LoadingIconProps {
  override?: string
}

const LoadingIcon = ({ override }: LoadingIconProps) => {

  return (
    <LoaderCircle
      className={`animate-spin text-primary ${override}`}
      size={16}
      strokeWidth={2}
      role="status"
      aria-label="Loading..."
    />
  )
}

export default LoadingIcon;