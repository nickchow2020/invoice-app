"use client";
import { Input } from "@/components/components/ui/input";
import { Label } from "@/components/components/ui/label";
import { cn } from "../lib/utils";
import { Control, Controller, FieldValues } from "react-hook-form";

export function InputColumn({
    className,
    labelClassName,
    inputClassName,
    title,
    defaultValue,
    placeholder,
    inputType = "text",
    name,
    control,
}: {
    className?: string;
    labelClassName?: string;
    inputClassName?: string;
    title: string;
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    inputType?: string;
    name?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control?: Control<FieldValues, any, FieldValues>;
}) {
    return (
        <Controller
            control={control}
            name={name!}
            render={({ field: { onChange, value } }) => (
                <div className={cn("flex items-center mb-3", className)}>
                    <Label
                        htmlFor={title}
                        className={cn(
                            " whitespace-nowrap font-bold text-[14px] w-15",
                            labelClassName
                        )}
                    >
                        {title}
                    </Label>
                    <span>:</span>
                    <Input
                        value={value}
                        defaultValue={defaultValue}
                        className={cn(
                            "ml-2 w-40  border-purple-400 focus-visible:border-purple-400",
                            inputClassName
                        )}
                        placeholder={placeholder}
                        id={title}
                        type={inputType}
                        onChange={onChange}
                    />
                </div>
            )}
        />
    );
}

export function InputColumnRegular({
    className,
    labelClassName,
    inputClassName,
    title,
    value,
    defaultValue,
    placeholder,
    inputType = "text",
    onChange,
    name,
    disabled,
}: {
    className?: string;
    labelClassName?: string;
    inputClassName?: string;
    title: string;
    value?: number | string;
    defaultValue?: string;
    placeholder?: string;
    inputType?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    disabled?: boolean;
}) {
    return (
        <div className={cn("flex items-center mb-3", className)}>
            <Label
                htmlFor={title}
                className={cn(
                    " whitespace-nowrap font-bold text-[14px] w-15 ",
                    labelClassName
                )}
            >
                {title}
            </Label>
            <span>:</span>
            <Input
                value={value}
                defaultValue={defaultValue}
                className={cn(
                    "ml-2 w-40 border-purple-400 focus-visible:border-purple-400",
                    inputClassName
                )}
                placeholder={placeholder}
                id={title}
                type={inputType}
                onChange={onChange}
                name={name}
                disabled={disabled}
            />
        </div>
    );
}
