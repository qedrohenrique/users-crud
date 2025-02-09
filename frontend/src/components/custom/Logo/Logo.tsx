import { Club } from "lucide-react"

export interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <>
      <h1 className={`${className} text-primary text-2xl font-mono flex flex-row gap-2 items-center`}>
        <Club size={20} />
        Cruser
      </h1>
    </>
  )
}

export default Logo;