import { useFormContext, useWatch } from "react-hook-form";
import { ColumnDisplay } from "./common/ColumnDisplay";
import { FormValues } from "@/app/maintenance/page";
import { format } from "date-fns";

export default function PersonalInfo() {
    const { control } = useFormContext<FormValues>();
    const {
        quoteNo,
        contactName,
        phone,
        service,
        currencyType,
        serviceDate,
        clientName,
    } = useWatch({
        control,
    });

    return (
        <div className="flex flex-col my-3">
            <h2 className="text-center font-extrabold text-[17px] mt-2">
                设备维护报价单
            </h2>
            <div className="flex justify-start">
                <div className="mr-80">
                    <ColumnDisplay
                        label="报价单号"
                        value={quoteNo!}
                        className="text-black mb-1"
                        labelClassName="w-[70px]"
                        valueClassName="ml-3"
                    />
                    <ColumnDisplay
                        label="客户"
                        value={clientName!}
                        className="text-black mb-1"
                        labelClassName="w-[70px]"
                        valueClassName="ml-3"
                    />
                    <ColumnDisplay
                        label="联系人"
                        value={contactName!}
                        className="text-black mb-1"
                        labelClassName="w-[70px]"
                        valueClassName="ml-3"
                    />
                    <ColumnDisplay
                        label="电话"
                        value={phone!}
                        className="text-black"
                        labelClassName="w-[70px]"
                        valueClassName="ml-3"
                    />
                </div>
                <div>
                    <ColumnDisplay
                        label="日期"
                        value={
                            serviceDate ? format(serviceDate, "yyyy-MM-dd") : ""
                        }
                        className="text-black mb-1"
                        labelClassName="w-[40px]"
                        valueClassName="ml-3"
                    />
                    <ColumnDisplay
                        label="业务"
                        value={service!}
                        className="text-black mb-1"
                        labelClassName="w-[40px]"
                        valueClassName="ml-3"
                    />
                    <ColumnDisplay
                        label="币别"
                        value={currencyType!}
                        className="text-black"
                        labelClassName="w-[40px]"
                        valueClassName="ml-3"
                    />
                </div>
            </div>
        </div>
    );
}
