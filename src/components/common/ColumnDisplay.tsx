import { cn } from "../lib/utils";

export function ColumnDisplay({
    label,
    value,
    className,
    labelClassName,
    valueClassName,
}: {
    label: string;
    value: string;
    className?: string;
    labelClassName?: string;
    valueClassName?: string;
}) {
    return (
        <div
            className={cn(
                "flex text-blue-800 items-center text-[13px]",
                className
            )}
        >
            <div className={labelClassName}>{label}</div>
            <span className="font-medium">:</span>
            <div className={valueClassName}>{value}</div>
        </div>
    );
}
