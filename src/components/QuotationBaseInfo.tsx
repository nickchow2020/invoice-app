import { useFormContext, useWatch } from "react-hook-form";
import { FormValues } from "@/app/quotation/page";
import { Column } from "./HeaderContact";

export default function FromTo() {
    const { control } = useFormContext<FormValues>();
    const { baseInfo } = useWatch({
        control,
    });

    return (
        <>
            <section className="ml-10 mt-2">
                <Column
                    name="报价编号"
                    value={baseInfo?.quoteNo || "无"}
                    noLink
                    titleClassName="text-[13px]"
                />
                <Column
                    name="付款方式"
                    value={baseInfo?.paymentMethod || "无"}
                    noLink
                    titleClassName="text-[13px]"
                />
                <Column
                    name="交货周期"
                    value={baseInfo?.deliveryTime || "无"}
                    noLink
                    titleClassName="text-[13px]"
                />
                <Column
                    name="交货地址"
                    value={baseInfo?.deliveryAddress || "无"}
                    noLink
                    titleClassName="text-[13px]"
                />
                <Column
                    name="保固期限"
                    value={baseInfo?.warrantyPeriod || "无"}
                    noLink
                    titleClassName="text-[13px]"
                />
            </section>
        </>
    );
}
