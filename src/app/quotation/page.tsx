"use client";
import Instruction from "@/components/Instruction";
import { InvoiceDetail } from "@/components/InvoiceDetail";
import { useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/components/ui/button";
import { Printer, Download, RotateCcw } from "lucide-react";
import { Column } from "@/components/HeaderContact";
import { NestedTable } from "@/components/NestedTable";
import Image from "next/image";
import From from "@/components/From";
import FromTo from "@/components/FromTo";
import To from "@/components/To";

export type FormValues = {
    // From info
    from: {
        companyName: string;
        name: string;
        phone: string;
        email: string;
    };
    to: {
        companyName: string;
        name: string;
        phone: string;
        email: string;
    };
    // quoteNo: string;
    // contactName: string;
    // phone: string;
    // clientName: string;
    // service: string;
    // currencyType: string;
    // serviceDate: string;

    // Instruction info
    // quoteID: string;
    // clientOrganization: string;
    // deviceName: string;
    // deviceModel: string;
    // userFeedback: string;
    // repairServices: string;
    // deliveryTime: string;

    // Tax info
    // fctTax?: boolean;

    // Pricing info
    // pricingInstructions?: Invoice[];
};

export default function Page() {
    const methods = useForm<FormValues>({
        defaultValues: {
            //base info

            from: {
                companyName: "苏州慕翰电子科技有限公司",
                name: "宗培芳",
                phone: "18676737950",
                email: "peifang.zong@esamber.com",
            },

            to: {
                companyName: "",
                name: "",
                phone: "",
                email: "",
            },

            // quoteNo: "",
            // contactName: "宗培芳",

            // phone: "18676737950",
            // clientName: "",
            // service: "",
            // currencyType: "人民币",
            // serviceDate: "",

            // //instruction info
            // quoteID: "",
            // clientOrganization: "",
            // deviceName: "",
            // deviceModel: "",
            // userFeedback: "",
            // repairServices: "",
            // deliveryTime: "",

            // //tax info
            // fctTax: "false",

            // //pricing info
            // pricingInstructions: [],
        },
    });

    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({ contentRef });
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
                    <div className="w-[210mm] px-6 py-4 flex" ref={contentRef}>
                        <section className="w-[210mm]">
                            <section className="flex items-center justify-start">
                                <FromTo />
                            </section>
                            <section className="flex justify-end my-4 mr-26">
                                <Image
                                    src="/images/quotation.png"
                                    width={110}
                                    height={1}
                                    alt="Picture of the quotation logo"
                                />
                            </section>
                            <section className="text-[13px] font-extrabold text-black">
                                <p>价有效期: 2025-08-31</p>
                            </section>
                            <section className="w-full border border-gray-300">
                                <section className="ml-10 mt-2">
                                    <Column
                                        name="报价编号"
                                        value="ESA20250503010"
                                        noLink
                                        titleClassName="text-[13px]"
                                    />
                                    <Column
                                        name="付款方式"
                                        value="电汇,100%预付"
                                        noLink
                                        titleClassName="text-[13px]"
                                    />
                                    <Column
                                        name="交货周期"
                                        value="3-4周交货"
                                        noLink
                                        titleClassName="text-[13px]"
                                    />
                                    <Column
                                        name="交货地址"
                                        value="扬州"
                                        noLink
                                        titleClassName="text-[13px]"
                                    />
                                    <Column
                                        name="保固期限"
                                        value="1年"
                                        noLink
                                        titleClassName="text-[13px]"
                                    />
                                </section>
                                <section>
                                    <NestedTable />
                                </section>
                                <section className="flex justify-between items-start px-10 py-4  border-gray-300 mt-7">
                                    <div className="flex">
                                        <h3 className="text-[13px] font-extrabold text-black ">
                                            测试项目：
                                        </h3>
                                        <ul className="list-disc ml-4">
                                            <li className="text-[13px]  text-black">
                                                功能测试
                                            </li>
                                            <li className="text-[13px]  text-black">
                                                性能测试
                                            </li>
                                            <li className="text-[13px]  text-black">
                                                安全性测试
                                            </li>
                                            <li className="text-[13px]  text-black">
                                                兼容性测试
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="flex w-60">
                                        <h3 className="text-[13px] font-extrabold text-black whitespace-nowrap">
                                            应用领域：
                                        </h3>
                                        <p className="text-[13px] text-black ml-2">
                                            ESAMBER测温仪,采用先
                                            进的PT32K数据采集器，
                                            仪器主要应用于回流/波
                                            峰焊接、太阳能烧结、胶
                                            水固化、炉窖、食品加工、
                                            喷涂、汽车热处理、金属
                                            热处理、陶瓷烧制以及特
                                            殊的水蒸气热导焊制造等
                                            高温行业，作为温度数据 的采集分析。
                                        </p>
                                    </div>
                                </section>
                                <section className="flex justify-around items-center border-t border-gray-300 px-8 py-1">
                                    <div className="text-[13px] font-extrabold text-black">
                                        总额优惠价 (含13%增值税)
                                    </div>
                                    <div className="text-[13px] font-extrabold text-black">
                                        100,000.00 RMB
                                    </div>
                                </section>
                            </section>
                            <section>
                                <p className="text-[13px]  text-black mt-1">
                                    此报价单为企业商业机密，未经允许禁止对外传播！
                                </p>
                                <section className="flex justify-between items-center mt-6">
                                    <Column
                                        name="报价日期"
                                        value="2025/05/03"
                                        titleClassName="text-[13px]"
                                        valueClassName="text-[13px]"
                                    />
                                    <Column
                                        name="报价人"
                                        value="宗培芳"
                                        titleClassName="text-[13px]"
                                        valueClassName="text-[13px]"
                                    />
                                    <div>客户确认：_____________________</div>
                                </section>
                            </section>
                        </section>
                        <section>
                            <Image
                                src="/images/logo.png"
                                width={30}
                                height={1}
                                alt="Picture of the company logo"
                            />
                        </section>
                    </div>
                    <div className="px-10 py-4 border-l-2 border-l-purple-600 min-w-[210mm]">
                        <article className="flex h-fit w-full">
                            <From />
                            <To />
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
