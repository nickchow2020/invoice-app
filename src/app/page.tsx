"use client";
import BasicInfo from "@/components/BasicInfo";
import Footer from "@/components/Footer";
import Instruction from "@/components/Instruction";
import { Invoice, InvoiceDetail } from "@/components/InvoiceDetail";
import MaintenanceInstructionTable from "@/components/MaintenanceInstructionTable";
import PersonalInfo from "@/components/PersonalInfo";
import PricingTable from "@/components/PricingTable";
import { TitleInfo } from "@/components/TitleInfo";
import { useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/components/ui/button";
import { Printer, Download, RotateCcw } from "lucide-react";

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
                        <section className="flex flex-col items-center justify-center">
                            <TitleInfo />
                        </section>
                        <section>
                            <PersonalInfo />
                        </section>
                        <section className="mb-3">
                            <h2 className="font-extrabold text-[17px]">
                                故障说明:
                            </h2>
                            <MaintenanceInstructionTable />
                        </section>
                        <section className="mb-5">
                            <h2 className="font-extrabold text-[17px]">
                                报价说明:
                            </h2>
                            <PricingTable />
                        </section>
                        <section>
                            <Footer />
                        </section>
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
