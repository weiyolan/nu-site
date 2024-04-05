import { LucideProps, icons } from "lucide-react";
// import dynamicIconImports from "lucide-react/dynamicIconImports";

// interface IconProps extends LucideProps {
//   name: keyof typeof index;
// }

const Icon = ({ name, color, size, ...props }: LucideProps) => {
  // starting from "lucide:package-green"
  // going to "PackageGreen"
  // if (name !== undefined) {
  let iconName = name?.split(":")[1].split("-");
  let IconName: keyof typeof icons = iconName?.map((subName) => subName[0].toUpperCase() + subName.slice(1)).reduce((acc, i) => acc + i, "");
  const LucideIcon = icons[IconName || "Ban"];

  return <LucideIcon color={color} size={size} {...props} />;
  // } else {
  // console.log("Undefined Name");
  // let LucideIcon = icons["Ban"];
  // return <LucideIcon color={color} size={size} {...props} />;
  // }
};

export default Icon;
