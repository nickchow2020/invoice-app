"use client";
import BasicInfo from "@/components/BasicInfo";
import Instruction from "@/components/Instruction";
import { Invoice, InvoiceDetail } from "@/components/InvoiceDetail";
import { useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/components/ui/button";
import { Printer, Download, RotateCcw } from "lucide-react";
import { Column, HeaderContactInfo } from "@/components/HeaderContact";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

export type TableRow = {
    itemNumber: string;
    isParent: boolean;
    itemCode: string;
    description: string;
    quantity: string;
    unitPrice?: string;
    totalPrice?: string;
    notes?: string[];
    subRows?: TableRow[];
};

function transformProductToTableRow(product: ProductPackage): TableRow {
    return {
        id: product.itemCode,
        isParent: true,
        itemCode: product.itemCode,
        description: `${product.title} ${product.subtitle ?? ""}`,
        quantity: product.quantity,
        unitPrice: product.unitPrice,
        totalPrice: product.totalPrice,
        notes: product.notes,
        subRows: product.items.map((item) => ({
            id: item.itemCode,
            isParent: false,
            itemCode: item.itemCode,
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.totalPrice,
            notes: item.notes,
        })),
    };
}

export type FormValues = {
    quoteNo: string;
    contactName: string;
    name: string;
    email: string;
    phone: string;
    clientName: string;
    service: string;
    currencyType: string;
    serviceDate: string;
    quoteID: string;
    clientOrganization: string;
    deviceName: string;
    deviceModel: string;
    userFeedback: string;
    repairServices: string;
    deliveryTime: string;
    fctTax: string;
    pricingInstructions: Invoice[];
};

export default function Page() {
    const methods = useForm<FormValues>({
        defaultValues: {
            //base info
            quoteNo: "",
            contactName: "宗培芳",
            name: "宗培芳",
            email: "peifang.zong@esamber.com",
            phone: "18676737950",
            clientName: "",
            service: "",
            currencyType: "人民币",
            serviceDate: "",

            //instruction info
            quoteID: "",
            clientOrganization: "",
            deviceName: "",
            deviceModel: "",
            userFeedback: "",
            repairServices: "",
            deliveryTime: "",

            //tax info
            fctTax: "false",

            //pricing info
            pricingInstructions: [],
        },
    });

    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({ contentRef });

    const columnHelper = createColumnHelper<TableRow>();

    const columns = [
        columnHelper.accessor("itemCode", {
            header: "项目",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("description", {
            header: "产品描述",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("quantity", {
            header: "数量",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("unitPrice", {
            header: "单价",
            cell: (info) => info.getValue() ?? "",
        }),
        columnHelper.accessor("totalPrice", {
            header: "总额",
            cell: (info) => info.getValue() ?? "",
        }),
    ];
    return (
        <FormProvider {...methods}>
            <div>
                <Button
                    className="w-full rounded-none cursor-pointer bg-purple-400 hover:bg-purple-600 hover:text-white font-bold py-2 px-4 mb-5 text-white sticky top-0"
                    onClick={reactToPrintFn}
                    variant="outline"
                    size="lg"
                    disabled={!methods.formState.isDirty}
                >
                    <Printer className="mr-2" size={16} /> 打印 / 下载
                    <Download className="ml-2" size={16} />
                </Button>
                <main className="flex">
                    <div className="w-[210mm] px-6 py-4" ref={contentRef}>
                        <section className="flex items-center justify-start">
                            <HeaderContactInfo
                                title="From"
                                companyName="苏州慕翰电子科技有限公司"
                                contactName={"宗培芳"}
                                email={"peifang.zong@esamber.com"}
                                phone={"18676737950"}
                            />
                            <HeaderContactInfo
                                title="To"
                                companyName="苏州万杨电子科技有限公司"
                                contactName={"洪永"}
                                email={"wanyang1271@163.com"}
                                phone={""}
                                className="ml-65"
                            />
                        </section>
                        <section>
                            <p className="text-4xl text-right my-3 mr-32 font-extrabold">
                                报价单
                            </p>
                        </section>
                        <section className="text-[13px] font-extrabold">
                            <p>价有效期: 2025-08-31</p>
                        </section>
                        <section className="h-[500px] w-full border border-gray-300">
                            <div className="ml-10 mt-2">
                                <Column
                                    name="报价编号"
                                    value="ESA20250503010"
                                    noLink
                                    titleClassName="font-extrabold text-[13px]"
                                />
                                <Column
                                    name="付款方式"
                                    value="电汇,100%预付"
                                    noLink
                                    titleClassName="font-extrabold text-[13px]"
                                />
                                <Column
                                    name="交货周期"
                                    value="3-4周交货"
                                    noLink
                                    titleClassName="font-extrabold text-[13px]"
                                />
                                <Column
                                    name="交货地址"
                                    value="扬州"
                                    noLink
                                    titleClassName="font-extrabold text-[13px]"
                                />
                                <Column
                                    name="保固期限"
                                    value="1年"
                                    noLink
                                    titleClassName="font-extrabold text-[13px]"
                                />
                            </div>
                            <div></div>
                        </section>
                        <section>{/* <Footer /> */}</section>
                    </div>
                    <div className="px-10 py-4 border-l-2 border-l-purple-600 min-w-[210mm]">
                        <article className="flex h-fit w-full">
                            <BasicInfo />
                            <Instruction />
                            <Button
                                className="h-8 cursor-pointer bg-purple-400 hover:bg-purple-600 hover:text-white font-bold py-2 px-4 mb-5 text-white ml-auto"
                                onClick={() => methods.reset()}
                            >
                                <RotateCcw size={16} />
                                重置
                            </Button>
                        </article>
                        <article>
                            <InvoiceDetail />
                        </article>
                    </div>
                </main>
            </div>
        </FormProvider>
    );
}
