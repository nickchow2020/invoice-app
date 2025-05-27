import { useFormContext } from "react-hook-form";
import { CalenderColumn } from "./common/CalenderColumn";
import { InputColumn } from "./common/InputColumn";

export default function Instruction() {
    const { control } = useFormContext();

    return (
        <section>
            <h2 className="font-extrabold text-[17px] mb-4 bg-purple-600 text-white px-2 py-1 rounded-md">
                报价基本信息:
            </h2>
            <CalenderColumn
                title="报价有效期"
                placeholder={"请选择报价有效期"}
                className="w-200"
                control={control}
                name="baseInfo.expirationDate"
                labelClassName="mr-4"
            />
            <InputColumn
                title="报价编号"
                placeholder="请输入报价编号"
                inputClassName="w-100"
                control={control}
                name="baseInfo.quoteNo"
            />
            <InputColumn
                title="付款方式"
                placeholder="请输入付款方式"
                inputClassName="w-100"
                control={control}
                name="baseInfo.paymentMethod"
            />
            <InputColumn
                title="交货周期"
                placeholder="请输入交货周期"
                inputClassName="w-100"
                control={control}
                name="baseInfo.deliveryTime"
            />
            <InputColumn
                title="交货地址"
                placeholder="请输入交货地址"
                inputClassName="w-100"
                control={control}
                name="baseInfo.deliveryAddress"
            />
            <InputColumn
                title="保固期限"
                placeholder="请输入保固期限"
                inputClassName="w-100"
                control={control}
                name="baseInfo.warrantyPeriod"
            />
        </section>
    );
}
