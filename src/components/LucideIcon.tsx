import { icons } from "lucide-react";
import { LucideProps } from "lucide-react";

const LucideIcon = ({ name, color, size, ...props }: LucideProps) => {
              // starting from "lucide:package-green"
            // going to "PackageGreen"
  let iconName = name.split(":")[1].split("-");
  let IconName = iconName.map((subName) => subName[0].toUpperCase() + subName.slice(1)).reduce((acc,i)=>acc+i, '');
  const LucideIcon = icons[IconName];

  return <LucideIcon color={color} size={size} {...props} />;
};

export default LucideIcon;
