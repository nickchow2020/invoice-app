"use client";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/components/ui/table";

import { useFormContext, useWatch } from "react-hook-form";
import { FormValues } from "@/app/maintenance/page";
import { Invoice } from "./InvoiceDetail";
import {
    booleanOptionsMap,
    currencyAbbreviations,
    currencySymbols,
} from "./lib/constant";

const parseCurrency = (value: string): number => {
    return parseFloat(value.replace(/[^\d.-]/g, "")) || 0;
};

const columnHelper = createColumnHelper<Invoice>();

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
        header: "单价 (未税)",
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor("totalAmount", {
        header: "金额 (未税)",
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor("remarks", {
        header: "备注",
        footer: (info) => info.column.id,
    }),
];

export default function PricingTable() {
    const { control } = useFormContext<FormValues>();

    const data = useWatch({
        control,
        name: "pricingInstructions",
    });

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const subtotal = data.reduce(
        (sum, item) => sum + parseCurrency(item.totalAmount),
        0
    );

    const currencyType = useWatch({
        control,
        name: "currencyType",
    });

    const fctTax = useWatch({
        control,
        name: "fctTax",
    });

    const currencySymbol = currencySymbols[currencyType] || "¥";

    // Add 13% tax
    let taxRate = 0.13;

    const isFctTax = fctTax === booleanOptionsMap.true;

    if (isFctTax) {
        taxRate += 0.05; // Add 5% FCT tax if applicable
    }

    const totalWithTax = subtotal * (1 + taxRate);

    const currencyAbbreviationsName =
        currencyAbbreviations[currencyType] || "CNY";

    // Format both
    const formattedSubtotal = subtotal.toFixed(2);
    const formattedTotalWithTax = totalWithTax.toFixed(2);

    const formattedSubtotalAmount = `${currencySymbol}${formattedSubtotal}`;
    const formattedSubtotalAmountWithTax = `${currencySymbol}${formattedTotalWithTax}`;

    return (
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
            <TableFooter>
                <TableRow className="bg-[#fff]">
                    <TableCell
                        colSpan={3}
                        className="text-[13px] text-center border border-black"
                    ></TableCell>
                    <TableCell className="text-[13px] text-left border border-black">
                        总价 {currencyAbbreviationsName} (未税)
                    </TableCell>
                    <TableCell
                        colSpan={2}
                        className="text-[13px] border border-black text-left"
                    >
                        {formattedSubtotalAmount}
                    </TableCell>
                </TableRow>
                <TableRow className="bg-[#fff]">
                    <TableCell colSpan={3}></TableCell>
                    <TableCell className="text-[13px] text-left border border-black">
                        {isFctTax
                            ? `总价 ${currencyAbbreviationsName} (含税 13% + 5%FCT)`
                            : `总价 ${currencyAbbreviationsName} (含税 13%)`}
                    </TableCell>
                    <TableCell
                        colSpan={2}
                        className="text-[13px]  border border-black text-left"
                    >
                        {formattedSubtotalAmountWithTax}
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}
