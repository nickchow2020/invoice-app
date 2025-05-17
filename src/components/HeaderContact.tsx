import { cn } from "@/utility/helper";

function Column({
    name,
    value,
    link,
    className = "",
}: {
    name: string;
    value: string;
    link?: boolean;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "flex text-[13px] font-normal text-gray-950 mb-1",
                className
            )}
        >
            <p className="">{name}</p>
            <span className="font-bold mx-1">:</span>
            <p className={cn("", { " text-blue-800 underline": link })}>
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
