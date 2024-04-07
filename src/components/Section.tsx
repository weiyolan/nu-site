import * as React from "react";
import { cn } from "@/lib/utils";

// export interface SectionProps extends React.HTMLAttributes<HTMLInputElement> {}

const Section = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <section ref={ref} className={cn("w-full mt-16 md:mt-32 max-w-7xl mx-auto relative px-4 md:px-32 2xl:px-0", className)} {...props} />
));
// {children}
// </section>
// )
// )
Section.displayName = "section";
export default Section;
