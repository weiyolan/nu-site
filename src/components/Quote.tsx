import { cn } from "@/lib/utils";

export interface QuoteProps extends React.HTMLAttributes<HTMLOrSVGElement> {}

export default function Quote({ className, ...props }: QuoteProps) {
  return (
    <svg
      className={cn("absolute fill-nu-purple select-none opacity-10 w-10 h-auto top-0 left-0 -translate-x-full -translate-y-1/3", className)}
      width="30"
      height="26"
      viewBox="0 0 30 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path d="M22.7547 26C20.6415 25.016 19.0566 23.7671 18 22.2533C17.0189 20.7394 16.5283 18.885 16.5283 16.69C16.5283 11.4673 19.5849 5.90393 25.6981 0L29.8868 2.83843L30 3.74672C26.9057 7.07715 25.3585 10.2562 25.3585 13.2838C25.3585 14.8734 25.6981 16.2737 26.3774 17.4847C27.0566 18.6201 28.1887 19.5662 29.7736 20.3231V21.345C27.6604 23.2373 25.3208 24.7889 22.7547 26ZM6.22642 26C4.11321 25.016 2.5283 23.7671 1.4717 22.2533C0.490566 20.7394 0 18.885 0 16.69C0 11.4673 3.0566 5.90393 9.16981 0L13.3585 2.83843L13.4717 3.74672C10.3774 7.07715 8.83019 10.2562 8.83019 13.2838C8.83019 14.8734 9.16981 16.2737 9.84906 17.4847C10.5283 18.6201 11.6604 19.5662 13.2453 20.3231V21.345C11.1321 23.2373 8.79245 24.7889 6.22642 26Z" />
    </svg>
  );
}
