import { InputColumn } from "./common/InputColumn";

import { useFormContext } from "react-hook-form";

export default function From() {
    const { control } = useFormContext();

    return (
        <section className="pr-10">
            <h2 className="font-extrabold text-[17px] mb-4 bg-purple-600 text-white px-2 py-1 rounded-md">
                From:
            </h2>
            <InputColumn
                title="公司名称"
                placeholder="输入公司名称"
                inputClassName="w-70"
                control={control}
                name="from.companyName"
            />
            <InputColumn
                title="联系人"
                placeholder="输入联系人姓名"
                inputClassName="w-70"
                control={control}
                name="from.name"
            />
            <InputColumn
                title="电话"
                placeholder="输入联系人电话"
                inputClassName="w-70"
                control={control}
                name="from.phone"
            />
            <InputColumn
                title="邮箱"
                placeholder="输入联系人电话"
                inputType="email"
                inputClassName="w-70"
                control={control}
                name="from.email"
            />
        </section>
    );
}
