import { useFormContext, useWatch } from "react-hook-form";
import { HeaderContactInfo } from "./HeaderContact";
import { FormValues } from "@/app/quotation/page";

export default function FromTo() {
    const { control } = useFormContext<FormValues>();
    const { from, to } = useWatch({
        control,
    });

    return (
        <section className="flex items-center justify-start">
            <HeaderContactInfo
                title="From"
                companyName={from!.companyName!}
                contactName={from!.name!}
                email={from!.email!}
                phone={from!.phone!}
            />
            <HeaderContactInfo
                title="To"
                companyName={to!.companyName!}
                contactName={to!.name!}
                email={to!.email!}
                phone={to!.phone!}
                className="ml-65"
            />
        </section>
    );
}
