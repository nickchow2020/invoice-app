"use client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@/components/components/ui/table";
import { FormValues } from "@/app/maintenance/page";
import { useFormContext, useWatch } from "react-hook-form";
import { cn } from "@/utility/helper";
import { format } from "date-fns";

function IDColumn({
    cellContent,
    IDValue,
}: {
    cellContent: string;
    IDValue: string;
}) {
    return (
        <div className="flex h-8 items-center justify-between">
            <section className="flex-1 border-r border-black h-full items-center flex justify-start ml-2">
                {cellContent}
            </section>
            <section className="flex flex-1 h-8">
                <div className=" flex-1 border-r border-black h-full items-center flex justify-center">
                    ID
                </div>
                <div className=" flex-2 h-full items-center flex justify-start ml-2">
                    {IDValue}
                </div>
            </section>
        </div>
    );
}

function RepairSubMissionContent({
    repairSubMissionContent,
    shippingDate,
}: {
    repairSubMissionContent: string;
    shippingDate: string;
}) {
    return (
        <div className="grid grid-cols-[3fr_1fr] min-h-8">
            <section className="whitespace-pre-line p-2 leading-5  border-black border-r flex-3">
                {repairSubMissionContent}
            </section>
            <section className="flex-1 flex flex-col pt-2 pl-2">
                <div className="mb-1">出货时间：</div>
                <div>{shippingDate}</div>
            </section>
        </div>
    );
}

function RowContent({
    headerTitle,
    cellContent,
    className,
    headerClassName,
    cellClassName,
    ID,
    IDValue,
    repairSubMission,
    repairSubMissionContent,
    shippingDate,
}: {
    headerTitle: string;
    cellContent?: string;
    className?: string;
    headerClassName?: string;
    cellClassName?: string;
    ID?: boolean;
    IDValue?: string;
    repairSubMission?: boolean;
    repairSubMissionContent?: string;
    shippingDate?: string;
}) {
    return (
        <TableRow className={cn("h-[10px] ", className)}>
            <TableHead
                className={cn(
                    "border text-[13px] font-medium text-center border-black",
                    headerClassName
                )}
            >
                {headerTitle}
            </TableHead>
            <TableCell
                className={cn(
                    "border text-[13px] font-medium border-black text-left",
                    { " p-0 m-0": ID || repairSubMission },
                    cellClassName
                )}
            >
                {ID ? (
                    <IDColumn cellContent={cellContent!} IDValue={IDValue!} />
                ) : repairSubMission ? (
                    <RepairSubMissionContent
                        repairSubMissionContent={repairSubMissionContent!}
                        shippingDate={shippingDate!}
                    />
                ) : (
                    cellContent
                )}
            </TableCell>
        </TableRow>
    );
}

export default function MaintenanceInstructionTable() {
    const { control } = useFormContext<FormValues>();
    const {
        quoteID,
        clientOrganization,
        deviceName,
        deviceModel,
        userFeedback,
        repairServices,
        deliveryTime,
    } = useWatch({
        control,
    });

    return (
        <Table className="border border-black leading-none">
            <TableBody>
                <RowContent
                    headerTitle="设备名称"
                    cellContent={deviceName}
                    headerClassName="h-2"
                    cellClassName="h-[30px]"
                />
                <RowContent
                    headerTitle="设备型号"
                    cellContent={deviceModel}
                    headerClassName="h-2"
                    ID={true}
                    IDValue={quoteID}
                />
                <RowContent
                    headerTitle="用户反馈"
                    cellContent={userFeedback}
                    headerClassName="h-2"
                    cellClassName="h-[30px]"
                />
                <RowContent
                    headerTitle="送修检测"
                    repairSubMission={true}
                    repairSubMissionContent={repairServices}
                    shippingDate={
                        deliveryTime ? format(deliveryTime, "yyyy-MM-dd") : ""
                    }
                    headerClassName="h-2"
                    cellClassName="h-[30px]"
                />
                <RowContent
                    headerTitle="需求单位"
                    cellContent={clientOrganization}
                    headerClassName="h-2"
                    cellClassName="h-[30px]"
                />
            </TableBody>
        </Table>
    );
}
