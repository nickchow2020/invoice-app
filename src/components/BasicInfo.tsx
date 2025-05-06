import { CalenderColumn } from "./common/CalenderColumn";
import { InputColumn } from "./common/InputColumn";
import { SelectColumn } from "./common/SelectColumn";
import {
    currencyItems,
    currencyMap,
    fctTaxOption,
    serviceItems,
} from "./lib/constant";
import { useFormContext, useWatch } from "react-hook-form";

export default function BasicInfo() {
    const { control } = useFormContext();
    const currencyType = useWatch({
        control,
        name: "currencyType",
    });

    return (
        <section className="pr-10">
            <h2 className="font-extrabold text-[17px] mb-4 bg-purple-600 text-white px-2 py-1 rounded-md">
                基本信息:
            </h2>
            <InputColumn
                title="报价单号"
                placeholder="输入报价单号"
                inputClassName="w-70"
                control={control}
                name="quoteNo"
            />
            <InputColumn
                title="联系人"
                placeholder="输入联系人姓名"
                inputClassName="w-70"
                control={control}
                name="contactName"
            />
            <InputColumn
                title="姓名"
                placeholder="输入报价人姓名"
                inputClassName="w-70"
                control={control}
                name="name"
            />
            <InputColumn
                title="客户"
                placeholder="输入客户名称"
                inputClassName="w-70"
                control={control}
                name="clientName"
            />
            <InputColumn
                title="邮箱"
                placeholder="输入联系人电话"
                inputType="email"
                inputClassName="w-70"
                control={control}
                name="email"
            />
            <InputColumn
                title="电话"
                placeholder="输入联系人电话"
                inputClassName="w-70"
                control={control}
                name="phone"
            />
            <SelectColumn
                title="业务"
                placeholder="请选择服务业务"
                dropdownItems={serviceItems}
                selectorClassName="w-70"
                control={control}
                name="service"
            />
            <SelectColumn
                title="币别"
                placeholder="请选择币别"
                dropdownItems={currencyItems}
                selectorClassName="w-70"
                control={control}
                name="currencyType"
            />

            {currencyType === currencyMap.美元 && (
                <SelectColumn
                    title="FCT税"
                    placeholder="请选择是否包含FCT税"
                    dropdownItems={fctTaxOption}
                    selectorClassName="w-70"
                    control={control}
                    name="fctTax"
                />
            )}

            <CalenderColumn
                title="日期"
                placeholder={"请选择日期"}
                control={control}
                name="serviceDate"
            />
        </section>
    );
}
