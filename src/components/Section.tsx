import { cn } from "@/lib/utils";
import AnimateOnScroll from "@/components/AnimateOnScroll";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  label?: string;
  title: string;
  subtitle?: string;
}

const Section = ({ label, title, subtitle, className, children, ...props }: SectionProps) => (
  <section className={cn("py-20 lg:py-28", className)} {...props}>
    <div className="container mx-auto px-4 lg:px-8">
      <AnimateOnScroll animation="fade-up">
        <div className="text-center max-w-2xl mx-auto mb-14">
          {label && (
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase glass text-primary mb-4">
              {label}
            </span>
          )}
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">{title}</h2>
          {subtitle && <p className="text-muted-foreground text-lg leading-relaxed">{subtitle}</p>}
        </div>
      </AnimateOnScroll>
      {children}
    </div>
  </section>
);

export default Section;
