"use client";
import { Label } from "@/components/components/ui/label";
import { cn } from "../lib/utils";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/components/ui/select";
import { Control, Controller, FieldValues } from "react-hook-form";

export function SelectColumn({
    title,
    labelClassName,
    selectorClassName,
    placeholder,
    className,
    dropdownItems,
    name,
    control,
}: {
    className?: string;
    labelClassName?: string;
    selectorClassName?: string;
    title: string;
    value?: string;
    placeholder?: string;
    dropdownItems?: { label: string; value: string }[];
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
                    <span className="mr-2">:</span>
                    <Select value={value} onValueChange={onChange}>
                        <SelectTrigger
                            className={cn(
                                "w-[180px] border-purple-400 focus-visible:border-purple-400 cursor-pointer",
                                selectorClassName
                            )}
                        >
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg">
                            {dropdownItems?.map((item, index) => (
                                <SelectItem key={index} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}
        />
    );
}
