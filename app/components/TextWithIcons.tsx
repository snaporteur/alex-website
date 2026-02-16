import { BoxIconProps } from "@boxicons/react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export default function TextWithIcons({ icon: Icon, text }: { icon: ForwardRefExoticComponent<BoxIconProps & RefAttributes<SVGSVGElement>>, text: string }) {
    return <p className="mt-3 text-lg md:text-xl bottom-text font-medium flex items-center"><Icon className="mr-2 w-5 h-5"/>{text}</p>
}