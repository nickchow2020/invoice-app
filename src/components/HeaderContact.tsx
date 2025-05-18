import { cn } from "@/utility/helper";

export function Column({
    name,
    value,
    link,
    className = "",
    titleClassName = "",
    valueClassName = "",
    noLink,
}: {
    name: string;
    value: string;
    link?: boolean;
    className?: string;
    titleClassName?: string;
    valueClassName?: string;
    noLink?: boolean;
}) {
    return (
        <div
            className={cn(
                "flex text-[13px] font-normal text-gray-950 mb-1",
                className
            )}
        >
            <p className={cn("", titleClassName)}>{name}</p>
            <span className="font-bold mx-1">:</span>
            <p
                className={cn("", valueClassName, {
                    " text-blue-800 underline": link,
                    " text-blue-800": noLink,
                })}
            >
                {value}
            </p>
        </div>
    );
}

export function HeaderContactInfo({
    title,
    companyName,
    contactName,
    email,
    phone,
    className = "",
}: {
    title: string;
    companyName: string;
    contactName: string;
    email: string;
    phone: string;
    className?: string;
}) {
    return (
        <div className={cn("flex flex-col", className)}>
            <h3 className="font-bold  text-blue-500 mb-3">{title}:</h3>
            <p className="text-[13px] font-normal text-gray-950 mb-1">
                {companyName}
            </p>
            <Column name="联系人" value={contactName} />
            <Column name="电话" value={phone} />
            <Column name="邮箱" value={email} link />
        </div>
    );
}
