"use client";

import { Icon } from "@iconify/react";

// const Icon = ({ name, color, size, ...props }: LucideProps) => {
//   // starting from "lucide:package-green"
//   // going to "PackageGreen"
//   let iconName = name?.split(":")[1].split("-");
//   let IconName: keyof typeof icons = iconName?.map((subName) => subName[0].toUpperCase() + subName.slice(1)).reduce((acc, i) => acc + i, "");
//   const LucideIcon = icons[IconName || "Ban"];

//   return <LucideIcon color={color} size={size} {...props} />;

// };

// function getName(name: `lucide:${keyof typeof icons}`): keyof typeof icons {
//   if (name === undefined) return "Ban";

//   const iconName = name?.split(":")[1].split("-");
//   const newName = iconName.map((subName) => subName[0].toUpperCase() + subName.slice(1)).reduce((acc, i) => acc + i, "");

//   return newName;
// }

// export default Icon;

export interface myProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
}

const LucideIcon = ({ name, className, ...props }: myProps) => {
  return <Icon icon={name} className={className}></Icon>;
};
export default LucideIcon;
