"use client";
import { Button } from "@/components/components/ui/button";
import { HandHeart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    const handleOnClickMaintenance = () => {
        router.push("/maintenance");
    };

    const handleOnClickQuotation = () => {
        router.push("/quotation");
    };

    return (
        <main className="h-screen w-full flex flex-col items-center justify-center bg-gray-100">
            <Button
                className="cursor-pointer bg-purple-400 hover:bg-purple-600 hover:text-white font-bold py-2 px-4 mb-5 text-white sticky top-0"
                onClick={handleOnClickMaintenance}
                variant="outline"
                size="lg"
            >
                <HandHeart className="mr-2" size={16} /> 设备维护报价单
                <HandHeart className="ml-2" size={16} />
            </Button>

            <Button
                className="cursor-pointer w-[196px] bg-purple-400 hover:bg-purple-600 hover:text-white font-bold py-2 px-4 mb-5 text-white sticky top-0"
                onClick={handleOnClickQuotation}
                variant="outline"
                size="lg"
            >
                <HandHeart className="mr-2" size={16} /> 报价单
                <HandHeart className="ml-2" size={16} />
            </Button>
        </main>
    );
}
