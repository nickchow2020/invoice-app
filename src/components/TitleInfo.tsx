"use client";
import { FormValues } from "@/app/maintenance/page";
import { ColumnDisplay } from "./common/ColumnDisplay";
import { useFormContext, useWatch } from "react-hook-form";

export function TitleInfo() {
    const { control } = useFormContext<FormValues>();
    const { contactName, email, phone } = useWatch({
        control,
    });

    return (
        <>
            <h1 className="font-extrabold text-2xl mb-1">
                苏州慕翰电子科技有限公司
            </h1>
            <div className="flex border-b-1 border-b-blue-800 text-[13px]">
                <ColumnDisplay
                    label="联系人"
                    value={contactName!}
                    className="mr-3"
                />
                <ColumnDisplay label="Tel" value={phone!} className="mr-3" />

                <ColumnDisplay label="Email" value={email!} />
            </div>
        </>
    );
}
