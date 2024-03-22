import * as React from "react";
// import { cn } from "@/lib/utils";
import { cn } from "@/lib/utils";
import Typography from "./Typography";
// import Typography

export interface StarsProps extends React.HTMLAttributes<HTMLDivElement> {
  rating: number;
  dark?: boolean;
  large?: boolean;
}
export interface StarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Stars({ className, rating, dark, large, ...props }: StarsProps) {
  const uniqueId = React.useId();
  // const newRating = 2.8/5
  // const roundedRating = parseFloat((Math.floor(rating * 20) / 20).toFixed(2));
  var counts = [0, 0.33, 0.5, 0.66, 1];

  function getClosest(rating:number) {return counts.reduce(function (prev, curr) {
    return Math.abs(curr - rating) < Math.abs(prev - rating) ? curr : prev;
  });}

  const rest = getClosest(rating * 5 - Math.floor(rating * 5));
  // console.log('rounded:', roundedRating)
  // console.log(4 + 5 * 16 * roundedRating + Math.floor(roundedRating * 5) * 8)
  return (
    <div className={cn("flex gap-1 justify-center items-center ", dark ? "text-nu-black" : "text-nu-yellow-dark", className)} {...props}>
      <svg className={cn("w-[120px] h-auto", large && "w-[180px] ")} viewBox="0 0 120 19">
        <mask
          id={`starMask${uniqueId}`}
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width={120}
          height="19">
          <rect width={4 + Math.floor(rating*5) * (8+16) + rest * 16} x="0" y="0" height="20" fill="#ffffff" />
        </mask>
        <g mask={`url(#starMask${uniqueId})`}>
          <path
            className={(dark ? "fill-nu-black" : "fill-nu-yellow-dark") + " stroke-transparent"}
            d="M12 2L14.472 7.008L20 7.816L16 11.712L16.944 17.216L12 14.616L7.056 17.216L8 11.712L4 7.816L9.528 7.008L12 2Z"
          />
          <path
            className={(dark ? "fill-nu-black" : "fill-nu-yellow-dark") + " stroke-transparent"}
            d="M36 2L38.472 7.008L44 7.816L40 11.712L40.944 17.216L36 14.616L31.056 17.216L32 11.712L28 7.816L33.528 7.008L36 2Z"
          />
          <path
            className={(dark ? "fill-nu-black" : "fill-nu-yellow-dark") + " stroke-transparent"}
            d="M60 2L62.472 7.008L68 7.816L64 11.712L64.944 17.216L60 14.616L55.056 17.216L56 11.712L52 7.816L57.528 7.008L60 2Z"
          />
          <path
            className={(dark ? "fill-nu-black" : "fill-nu-yellow-dark") + " stroke-transparent"}
            d="M84 2L86.472 7.008L92 7.816L88 11.712L88.944 17.216L84 14.616L79.056 17.216L80 11.712L76 7.816L81.528 7.008L84 2Z"
          />
          <path
            className={(dark ? "fill-nu-black" : "fill-nu-yellow-dark") + " stroke-transparent"}
            d="M108 2L110.472 7.008L116 7.816L112 11.712L112.944 17.216L108 14.616L103.056 17.216L104 11.712L100 7.816L105.528 7.008L108 2Z"
          />
        </g>
        <path
          className={(dark ? "stroke-nu-black" : "stroke-nu-yellow-dark") + " fill-transparent"}
          d="M12 2L14.472 7.008L20 7.816L16 11.712L16.944 17.216L12 14.616L7.056 17.216L8 11.712L4 7.816L9.528 7.008L12 2Z"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className={(dark ? "stroke-nu-black" : "stroke-nu-yellow-dark") + " fill-transparent"}
          d="M36 2L38.472 7.008L44 7.816L40 11.712L40.944 17.216L36 14.616L31.056 17.216L32 11.712L28 7.816L33.528 7.008L36 2Z"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className={(dark ? "stroke-nu-black" : "stroke-nu-yellow-dark") + " fill-transparent"}
          d="M60 2L62.472 7.008L68 7.816L64 11.712L64.944 17.216L60 14.616L55.056 17.216L56 11.712L52 7.816L57.528 7.008L60 2Z"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className={(dark ? "stroke-nu-black" : "stroke-nu-yellow-dark") + " fill-transparent"}
          d="M84 2L86.472 7.008L92 7.816L88 11.712L88.944 17.216L84 14.616L79.056 17.216L80 11.712L76 7.816L81.528 7.008L84 2Z"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className={(dark ? "stroke-nu-black" : "stroke-nu-yellow-dark") + " fill-transparent"}
          d="M108 2L110.472 7.008L116 7.816L112 11.712L112.944 17.216L108 14.616L103.056 17.216L104 11.712L100 7.816L105.528 7.008L108 2Z"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <Typography variant={"p"} className={cn("w-fit pl-0.5 text-sm font-bold pt-0.5 leading-4", large && "text-xl ")}>
        {Math.round(rating * 5 * 100) / 100}/5
      </Typography>
    </div>
  );
}
