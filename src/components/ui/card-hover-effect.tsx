import { cn } from "../../utils/helpers";
import { AnimatePresence, motion } from "motion/react";

import { useState } from "react";
import { PNPLinks } from "../../utils/dummyData";
import { CardImage } from "./Card";

interface ProvinceLinksOption {
    title: String;
    link: String;
}

export const HoverEffect = ({
    items,
    className,
    setProvinceLinks,
    setShowLinksDialog,
}: {
    items: {
        name: string;
        code: string;
        flag: string;
    }[];
    className?: string;
    setProvinceLinks: (provinceLinks: ProvinceLinksOption[]) => void;
    setShowLinksDialog: (showLinksDialog: boolean) => void;
}) => {
    let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  py-10",
                className
            )}
        >
            {items.map((item, idx) => (
                <div
                    // href={item?.link}
                    key={item?.code}
                    className="relative group  block p-2 h-full w-full"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <AnimatePresence>
                        {hoveredIndex === idx && (
                            <motion.span
                                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-secondary-500/[0.8] block rounded-3xl"
                                layoutId="hoverBackground"
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: 1,
                                    transition: { duration: 0.15 },
                                }}
                                exit={{
                                    opacity: 0,
                                    transition: { duration: 0.15, delay: 0.2 },
                                }}
                            />
                        )}
                    </AnimatePresence>
                    <Card 
                        onClick={() => {
                            setShowLinksDialog(true);
                            setProvinceLinks(PNPLinks[item.code as keyof typeof PNPLinks])}
                        }
                        className="bg-secondary-100 border border-secondary-300"
                    >
                        <CardImage src={item.flag} alt={item.name} className="w-48 h-24 object-cover"/>
                        <CardTitle className="text-secondary-900">{item.name}</CardTitle>
                        {/* <CardDescription>{item.description}</CardDescription> */}
                    </Card>
                </div>
            ))}
        </div>
    );
};

const Card = ({
    className,
    children,
    onClick,
}: {
    className?: string;
    children: React.ReactNode;
    onClick: () => void;
}) => {
    return (
        <div
            onClick={onClick}
            className={cn(
                "rounded-2xl h-full w-full p-4 overflow-hidden bg-secondary-100 border border-secondary-300 relative z-20",
                className
            )}
        >
            <div className="relative z-50">
                <div className="p-4">{children}</div>
            </div>
        </div>
    );
};
const CardTitle = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <h4 className={cn("text-secondary-950 font-bold tracking-wide mt-4", className)}>
            {children}
        </h4>
    );
};
// const CardDescription = ({
//     className,
//     children,
// }: {
//     className?: string;
//     children: React.ReactNode;
// }) => {
//     return (
//         <p
//             className={cn(
//                 "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
//                 className
//             )}
//         >
//             {children}
//         </p>
//     );
// };
