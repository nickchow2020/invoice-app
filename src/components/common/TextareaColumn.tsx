import { Label } from "@/components/components/ui/label";
import { cn } from "../lib/utils";
import { Textarea } from "@/components/components/ui/textarea";
import { Controller } from "react-hook-form";

export function TextareaColumn({
    title,
    labelClassName,
    textareaClassName,
    placeholder,
    className,
    control,
    name,
}: {
    className?: string;
    labelClassName?: string;
    textareaClassName?: string;
    title: string;
    value?: string;
    placeholder?: string;
    control: any;
    name: string;
}) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value } }) => (
                <div
                    className={cn("flex flex-col items-start  mb-3", className)}
                >
                    <div className="flex items-center mb-2">
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
                    </div>
                    <Textarea
                        placeholder={placeholder}
                        className={cn(
                            "h-50 border-purple-400 focus-visible:border-purple-400 ",
                            textareaClassName
                        )}
                        value={value}
                        onChange={onChange}
                    />
                </div>
            )}
        />
    );
}
