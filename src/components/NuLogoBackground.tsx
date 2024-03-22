import { cn } from "@/lib/utils";

export interface NuLogoBackgroundProps extends React.HTMLAttributes<HTMLOrSVGElement> {}

export default function NuLogoBackground({ className, ...props }: NuLogoBackgroundProps) {
  return (
    <svg
      className={cn("fill-nu-black w-[120vw] h-auto opacity-[0.03] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 fixed z-0  ", className)}
      viewBox="0 0 1877 1315"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path d="M911.638 662.505C874.078 697.459 835.138 704.259 831.637 644.656C829.408 607.576 836.73 569.753 843.732 533.63C863.043 434.399 894.238 337.823 918.747 239.866C933.708 180.156 842.99 154.977 826.65 214.473C820.602 236.572 814.448 258.777 808.294 280.876C795.668 323.692 781.98 367.571 769.672 411.769C760.972 439.498 752.059 467.122 742.404 494.533C710.891 584.521 678.423 676.848 630.359 760.249C615.398 786.279 588.448 807.847 565.317 797.966C548.553 790.741 539.746 772.998 539.746 745.269C539.64 717.539 556.829 651.455 568.5 609.489C596.512 508.132 630.04 408.475 663.357 308.818C682.88 250.384 590.782 225.204 571.259 283.426C526.165 418.249 474.705 555.411 448.285 695.547C431.839 782.56 484.467 910.691 591.631 893.904C668.874 881.792 718.424 800.941 753.863 722.851C765.853 747.181 784.421 767.367 811.795 778.842C873.335 804.765 934.026 772.255 979.12 730.288C1024.21 688.109 956.626 620.538 911.638 662.505Z" />
      <path d="M379.318 824.314C346.002 834.62 344.092 814.859 346.851 782.242C350.034 745.162 361.917 707.977 372.315 672.385C395.976 591.958 422.608 512.275 448.073 432.38C472.689 355.353 501.125 277.901 520.223 199.28C532.956 146.902 538.155 81.4557 499.003 38.3206C404.783 -65.3736 302.393 64.6691 247.856 153.17C236.079 124.485 215.176 100.473 184.088 87.1929C122.548 60.9506 61.8571 93.0363 15.596 133.303C-30.8772 173.782 36.9228 241.141 83.0777 200.874C119.577 169.001 164.777 162.414 163.928 221.06C163.398 261.221 149.817 303.825 139.312 342.179C114.06 434.823 78.4092 524.175 48.9125 615.438C29.8139 674.298 120.851 698.521 141.01 640.831C149.605 616.076 158.411 591.215 167.218 566.46C180.056 531.931 193.637 496.764 206.264 461.278C235.124 387.226 266.849 314.343 305.152 244.54C316.929 223.185 397.037 69.6626 430.46 105.892C445.102 121.722 429.187 169.001 424.412 186.531C413.802 224.991 401.282 263.027 389.398 301.062C344.622 444.279 283.825 589.515 257.405 737.619C248.493 787.129 243.188 843.651 278.096 884.767C313.216 926.096 355.551 931.408 404.783 916.215C463.246 898.366 438.206 806.04 379.318 824.314Z" />
      <path d="M1794.64 1053.5C1757.08 1088.46 1718.14 1095.26 1714.64 1035.66C1712.41 998.576 1719.73 960.753 1726.73 924.63C1746.04 825.399 1777.24 728.823 1801.75 630.866C1816.71 571.156 1725.99 545.977 1709.65 605.473C1703.6 627.572 1697.45 649.777 1691.29 671.876C1678.67 714.692 1664.98 758.571 1652.67 802.768C1643.97 830.498 1635.06 858.122 1625.4 885.533C1593.89 975.521 1561.42 1067.85 1513.36 1151.25C1498.4 1177.28 1471.45 1198.85 1448.32 1188.97C1431.55 1181.74 1422.75 1164 1422.75 1136.27C1422.64 1108.54 1439.83 1042.46 1451.5 1000.49C1479.51 899.132 1513.04 799.475 1546.36 699.818C1565.88 641.384 1473.78 616.204 1454.26 674.426C1409.17 809.249 1357.71 946.411 1331.29 1086.55C1314.84 1173.56 1367.47 1301.69 1474.63 1284.9C1551.87 1272.79 1601.42 1191.94 1636.86 1113.85C1648.85 1138.18 1667.42 1158.37 1694.8 1169.84C1756.34 1195.77 1817.03 1163.25 1862.12 1121.29C1907.21 1079.11 1839.63 1011.54 1794.64 1053.5Z" />
      <path d="M1262.32 1215.31C1229 1225.62 1227.09 1205.86 1229.85 1173.24C1233.03 1136.16 1244.92 1098.98 1255.32 1063.39C1278.98 982.958 1305.61 903.275 1331.07 823.38C1355.69 746.353 1384.12 668.901 1403.22 590.28C1415.96 537.902 1421.15 472.456 1382 429.321C1287.78 325.626 1185.39 455.669 1130.86 544.17C1119.08 515.485 1098.18 491.473 1067.09 478.193C1005.55 451.951 944.857 484.036 898.596 524.303C852.123 564.782 919.923 632.141 966.078 591.874C1002.58 560.001 1047.78 553.414 1046.93 612.06C1046.4 652.221 1032.82 694.825 1022.31 733.179C997.06 825.823 961.409 915.175 931.912 1006.44C912.814 1065.3 1003.85 1089.52 1024.01 1031.83C1032.6 1007.08 1041.41 982.215 1050.22 957.46C1063.06 922.931 1076.64 887.764 1089.26 852.278C1118.12 778.226 1149.85 705.343 1188.15 635.54C1199.93 614.185 1280.04 460.663 1313.46 496.892C1328.1 512.722 1312.19 560.001 1307.41 577.531C1296.8 615.991 1284.28 654.027 1272.4 692.062C1227.62 835.279 1166.83 980.515 1140.41 1128.62C1131.49 1178.13 1126.19 1234.65 1161.1 1275.77C1196.22 1317.1 1238.55 1322.41 1287.78 1307.22C1346.25 1289.37 1321.21 1197.04 1262.32 1215.31Z" />
    </svg>
  );
}
