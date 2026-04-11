import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: "primary" | "secondary" | "accent" | "none";
  hover?: boolean;
}

const GlassCard = ({ className, glow = "none", hover = true, children, ...props }: GlassCardProps) => (
  <div
    className={cn(
      "glass p-6 transition-all duration-500",
      hover && "hover:bg-card/60 hover:-translate-y-1 hover:shadow-xl",
      glow === "primary" && "hover:glow-primary",
      glow === "secondary" && "hover:glow-secondary",
      glow === "accent" && "hover:glow-accent",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export default GlassCard;
