"use client";

import React from "react";

import { CirclePlus } from "lucide-react";

import { Button } from "./components/ui/button";
import { InputColumnRegular } from "./common/InputColumn";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getExpandedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { cn } from "./lib/utils";
import { ProductionItem } from "@/app/quotation/page";

export type Invoice = {
    id?: number;
    maintenanceTitle: string;
    quantity: string;
    unitPrice: string;
    totalAmount: string;
    remarks: string;
    action?: string;
};

const data: ProductionItem[] = [
    {
        itemCode: "1",
        description: "ESAMBER R6T 炉温测试仪",
        quantity: "1",
        unitPrice: "32,000.00",
        totalPrice: "32,000.00",
        items: [
            { itemCode: "1.0", description: "R6T 炉温测试仪", quantity: "1" },
            {
                itemCode: "1.1",
                description: "热电偶+插头（K type）",
                quantity: "6",
            },
            { itemCode: "1.2", description: "USB 数据线", quantity: "1" },
            {
                itemCode: "1.3",
                description: "隔热箱（200℃50 分钟）",
                quantity: "1",
            },
            { itemCode: "1.4", description: "EPRs 软件光盘", quantity: "1" },
            { itemCode: "1.5", description: "隔热手套", quantity: "1" },
            { itemCode: "1.6", description: "用户手册", quantity: "1" },
            { itemCode: "1.7", description: "产品合格证书", quantity: "1" },
            { itemCode: "1.8", description: "产品保修单", quantity: "1" },
            { itemCode: "1.9", description: "仪器箱", quantity: "1" },
        ],
    },
];

const columns: ColumnDef<ProductionItem>[] = [
    {
        id: "expander",
        header: () => null,
        cell: ({ row }) =>
            row.getCanExpand() ? (
                <button onClick={row.getToggleExpandedHandler()}>
                    {row.getIsExpanded() ? "▾" : "▸"}
                </button>
            ) : null,
        size: 90,
    },
    { accessorKey: "itemCode", header: "项目", size: 50 },
    { accessorKey: "description", header: "产品描述", size: 200 },
    { accessorKey: "quantity", header: "数量", size: 50 },
    { accessorKey: "unitPrice", header: "单价", size: 130 },
    { accessorKey: "totalPrice", header: "总额", size: 130 },
];

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

export function QuotationInvoiceDetailInput() {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getRowCanExpand: () => true,
    });

    return (
        <div>
            <h2 className="font-extrabold text-[17px] mb-4 bg-purple-600 text-white px-2 py-1 rounded-md">
                报价说明:
            </h2>

            <table className="table-fixed w-full border-collapse">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                const colId = header.column.id;

                                // Merge 'expander' and 'itemCode' headers
                                if (colId === "expander") {
                                    return (
                                        <th
                                            key="expander-itemCode-header"
                                            colSpan={2}
                                            style={{
                                                width: header.column.getSize(),
                                            }}
                                            className="text-[13px] font-extrabold text-black text-center border-b border-t border-gray-300 h-7"
                                        >
                                            项目
                                        </th>
                                    );
                                }

                                // Skip rendering the 'itemCode' header since it's merged
                                if (colId === "itemCode") return null;

                                return (
                                    <th
                                        key={header.id}
                                        style={{
                                            width: header.column.getSize(),
                                        }}
                                        className="text-[13px] font-extrabold text-black text-center border-b border-t border-l border-gray-300"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>

                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <React.Fragment key={row.id}>
                            <tr>
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        className={cn(
                                            "text-[13px] font-extrabold text-black text-center pt-1",
                                            {
                                                "text-left":
                                                    cell.column.id ===
                                                        "description" ||
                                                    cell.column.id ===
                                                        "itemCode",
                                            }
                                        )}
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>

                            {row.getIsExpanded() &&
                                row.original.items?.map((item, idx) => (
                                    <tr key={`${row.id}-${idx}`}>
                                        {table
                                            .getVisibleFlatColumns()
                                            .map((col) => {
                                                const width = col.getSize();

                                                if (col.id === "expander") {
                                                    return (
                                                        <td
                                                            key={col.id}
                                                            style={{ width }}
                                                        />
                                                    );
                                                }

                                                let value: React.ReactNode = "";
                                                switch (col.id) {
                                                    case "itemCode":
                                                        value = item.itemCode;
                                                        break;
                                                    case "description":
                                                        value =
                                                            item.description;
                                                        break;
                                                    case "quantity":
                                                        value = item.quantity;
                                                        break;
                                                    default:
                                                        value = "";
                                                }

                                                return (
                                                    <td
                                                        key={col.id}
                                                        style={{ width }}
                                                        className={cn(
                                                            "text-[13px]  text-black text-center pt-1",
                                                            {
                                                                "text-left":
                                                                    col.id ===
                                                                        "description" ||
                                                                    col.id ===
                                                                        "itemCode",
                                                            }
                                                        )}
                                                    >
                                                        {value}
                                                    </td>
                                                );
                                            })}
                                    </tr>
                                ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>

            <div className="flex flex-col gap-2 items-start mt-4">
                <section className="flex flex-col gap-2 w-full">
                    <InputColumnRegular
                        title="产品描述"
                        placeholder="输入产品描述"
                        inputClassName="w-150"
                        value={""}
                        onChange={() => {}}
                        name="maintenanceTitle"
                    />
                    <div>
                        <InputColumnRegular
                            title="数量"
                            placeholder="输入数量"
                            inputClassName="w-70"
                            onChange={() => {}}
                            name="quantity"
                            inputType="number"
                            value={""}
                        />
                        <InputColumnRegular
                            title="单价"
                            placeholder="输入单价"
                            inputClassName="w-70"
                            onChange={() => {}}
                            name="unitPrice"
                            inputType="number"
                            value={""}
                        />
                    </div>
                </section>

                <Button
                    className="h-8 cursor-pointer bg-purple-400 hover:bg-purple-600 hover:text-white font-bold py-2 px-4 mb-5 text-white"
                    onClick={() => {}}
                    disabled={false}
                >
                    {"添加报价说明!"}
                    <CirclePlus />
                </Button>
            </div>
        </div>
    );
}
