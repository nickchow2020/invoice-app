import { useFormContext } from "react-hook-form";
import { CalenderColumn } from "./common/CalenderColumn";
import { InputColumn } from "./common/InputColumn";
import { TextareaColumn } from "./common/TextareaColumn";

export default function Instruction() {
    const { control } = useFormContext();

    return (
        <section>
            <h2 className="font-extrabold text-[17px] mb-4 bg-purple-600 text-white px-2 py-1 rounded-md">
                故障说明:
            </h2>
            <InputColumn
                title="ID号"
                placeholder="请输入ID号"
                inputClassName="w-100"
                control={control}
                name="quoteID"
            />
            <InputColumn
                title="需求单位"
                placeholder="请输入需求单位"
                inputClassName="w-100"
                control={control}
                name="clientOrganization"
            />
            <InputColumn
                title="设备名称"
                placeholder="请输入设备名称"
                inputClassName="w-100"
                control={control}
                name="deviceName"
            />
            <InputColumn
                title="设备型号"
                placeholder="请输入设备型号"
                inputClassName="w-100"
                control={control}
                name="deviceModel"
            />
            <InputColumn
                title="用户反馈"
                placeholder="请填写用户反馈内容"
                inputClassName="w-100"
                control={control}
                name="userFeedback"
            />
            <TextareaColumn
                title="送修检测"
                placeholder="请填写送修检测内容"
                control={control}
                name="repairServices"
            />
            <CalenderColumn
                title="出货时间"
                placeholder={"请选择出货日期"}
                selectorClassName="w-100"
                control={control}
                name="deliveryTime"
            />
        </section>
    );
}
