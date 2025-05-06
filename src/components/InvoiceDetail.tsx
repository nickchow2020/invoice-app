"use client";

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import React, { useState } from "react";

import { CirclePlus, Trash2, FilePenLine } from "lucide-react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/components/ui/table";
import { Button } from "./components/ui/button";
import { InputColumnRegular } from "./common/InputColumn";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { FormValues } from "@/app/page";
import { currencySymbols } from "./lib/constant";

export type Invoice = {
    id?: number;
    maintenanceTitle: string;
    quantity: string;
    unitPrice: string;
    totalAmount: string;
    remarks: string;
    action?: string;
};

export function isValidInvoice(invoice: Invoice): boolean {
    const isNonEmpty = (value: string) => value.trim() !== "";
    const isNonNegativeNumberString = (value: string) =>
        isNonEmpty(value) && !isNaN(+value) && +value >= 0;

    return (
        isNonEmpty(invoice.maintenanceTitle) &&
        isNonNegativeNumberString(invoice.quantity) &&
        isNonNegativeNumberString(invoice.unitPrice)
    );
}

export function InvoiceDetail() {
    const { control } = useFormContext<FormValues>();
    const {
        fields: data,
        append,
        remove,
        insert,
    } = useFieldArray<FormValues, "pricingInstructions">({
        control,
        name: "pricingInstructions",
    });

    const currencyType = useWatch({
        control,
        name: "currencyType",
    });

    const currencySymbol = currencySymbols[currencyType] || "¥";

    const [currentInvoice, setCurrentInvoice] = useState<Invoice>();

    const [editMode, setEditMode] = useState<boolean>(false);
    const [invoiceIndex, setInvoiceIndex] = useState<number>(0);

    const columnHelper = createColumnHelper<Invoice>();
    const handleRemove = (index: number) => {
        remove(index);
    };
    const handleOnEdit = (index: number) => {
        const invoice = data[index];
        const updatedInvoice = {
            ...invoice,
            unitPrice: invoice.unitPrice.replace(currencySymbol, ""),
            totalAmount: invoice.totalAmount.replace(currencySymbol, ""),
        };
        setCurrentInvoice(updatedInvoice);
        setEditMode(true);
    };

    const columns = [
        columnHelper.accessor("id", {
            header: "序号",
            cell: ({ row }) => row.index + 1,
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor("maintenanceTitle", {
            header: "维护内容",
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor("quantity", {
            header: "数量",
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor("unitPrice", {
            header: "单价",
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor("totalAmount", {
            header: "金额",
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor("remarks", {
            header: "备注",
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor("action", {
            header: "操作",
            cell: ({ row }) => {
                return (
                    <div className="flex gap-2 justify-center">
                        <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 cursor-pointer"
                            onClick={() => {
                                handleOnEdit(row.index);
                                setInvoiceIndex(row.index);
                            }}
                        >
                            <FilePenLine size={16} />
                        </Button>
                        <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 cursor-pointer"
                            onClick={() => {
                                handleRemove(row.index);
                            }}
                        >
                            <Trash2 size={16} />
                        </Button>
                    </div>
                );
            },
            footer: (info) => info.column.id,
        }),
    ];

    const table = useReactTable<Invoice>({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const totalAmount: () => string = () => {
        return (
            Number(currentInvoice?.unitPrice) * Number(currentInvoice?.quantity)
        ).toFixed(2);
    };

    const handleAddInvoiceItem = () => {
        if (currentInvoice && editMode) {
            remove(invoiceIndex);
            insert(invoiceIndex, {
                maintenanceTitle: currentInvoice.maintenanceTitle,
                quantity: currentInvoice.quantity,
                unitPrice: currencySymbol + "" + currentInvoice.unitPrice,
                totalAmount: currencySymbol + "" + totalAmount(),
                remarks: currentInvoice.remarks,
            });
            setCurrentInvoice(undefined);
            setEditMode(false);
        } else if (currentInvoice) {
            append({
                maintenanceTitle: currentInvoice.maintenanceTitle,
                quantity: currentInvoice.quantity,
                unitPrice: currencySymbol + "" + currentInvoice.unitPrice,
                totalAmount: currencySymbol + "" + totalAmount(),
                remarks: currentInvoice.remarks,
            });
            setCurrentInvoice(undefined);
            setEditMode(false);
        } else {
            {
                setCurrentInvoice({
                    maintenanceTitle: "",
                    quantity: "",
                    unitPrice: "",
                    totalAmount: "",
                    remarks: "",
                });
            }
        }
    };

    const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCurrentInvoice((prev) => {
            return {
                ...prev,
                [name]: value,
                maintenanceTitle: prev?.maintenanceTitle || "",
                quantity: prev?.quantity || "",
                unitPrice: prev?.unitPrice || "",
                totalAmount: prev?.totalAmount || "",
                remarks: prev?.remarks || "",
            };
        });
    };

    const buttonTitle = currentInvoice ? (
        editMode ? (
            <span>保存报价说明</span>
        ) : (
            <span>完成报价说明</span>
        )
    ) : (
        <span>添加报价说明</span>
    );

    return (
        <div>
            <h2 className="font-extrabold text-[17px] mb-4 bg-purple-600 text-white px-2 py-1 rounded-md">
                报价说明:
            </h2>
            <Table className="border border-black  leading-none">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => {
                        return (
                            <TableRow key={headerGroup.id} className="">
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            style={{ width: header.getSize() }}
                                            className="border text-[13px] font-medium text-center border-black"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        );
                    })}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <TableCell
                                            key={cell.id}
                                            className="text-[13px] text-center border border-black"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            <div className="flex flex-col gap-2 items-start mt-4">
                {currentInvoice && (
                    <section className="grid grid-cols-2 gap-2 my-2">
                        <InputColumnRegular
                            title="维护内容"
                            placeholder="输入维护内容"
                            inputClassName="w-70"
                            value={currentInvoice.maintenanceTitle}
                            onChange={handleOnInputChange}
                            name="maintenanceTitle"
                        />
                        <InputColumnRegular
                            title="数量"
                            placeholder="输入数量"
                            inputClassName="w-70"
                            onChange={handleOnInputChange}
                            name="quantity"
                            inputType="number"
                            value={Number(currentInvoice?.quantity)}
                        />
                        <InputColumnRegular
                            title="单价"
                            placeholder="输入单价"
                            inputClassName="w-70"
                            onChange={handleOnInputChange}
                            name="unitPrice"
                            inputType="number"
                            value={Number(currentInvoice?.unitPrice)}
                        />
                        <InputColumnRegular
                            title="金额"
                            placeholder="输入金额"
                            inputClassName="w-70"
                            onChange={handleOnInputChange}
                            value={currencySymbol + "" + totalAmount()}
                            name="totalAmount"
                        />
                        <InputColumnRegular
                            title="备注"
                            placeholder="输入备注"
                            inputClassName="w-70"
                            onChange={handleOnInputChange}
                            name="remarks"
                        />
                    </section>
                )}

                <Button
                    className="h-8 cursor-pointer bg-purple-400 hover:bg-purple-600 hover:text-white font-bold py-2 px-4 mb-5 text-white"
                    onClick={handleAddInvoiceItem}
                    disabled={currentInvoice && !isValidInvoice(currentInvoice)}
                >
                    {buttonTitle}
                    <CirclePlus />
                </Button>
            </div>
        </div>
    );
}
