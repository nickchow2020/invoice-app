export default function Footer() {
    return (
        <>
            <h4 className=" text-[13px]">注意事项：</h4>
            <div className="flex justify-start">
                <ul className="ml-5 mr-30">
                    <li className="text-[13px] mb-1">1.付款条件 : 100% 预付</li>
                    <li className="text-[13px] mb-1">
                        2.维护时间 : 确认维修后7个工作日
                    </li>
                    <li className="text-[13px] mb-1">
                        3.维护保固期 : 3个月(非人为损坏)
                    </li>
                    <li className="text-[13px] mb-1">
                        4.该报价单位为企业商业机密，未经允许禁止对外传播
                    </li>
                    <li className="text-[13px]">
                        5.如确认维护请将报价单签字盖章回传
                    </li>
                </ul>
                <ul className="mt-3">
                    <li className="text-[13px] mb-1">客户确认 :</li>
                    <li className="text-[13px] mb-1">(签字盖章)</li>
                    <li className="text-[13px]">确认日期 :</li>
                </ul>
            </div>
        </>
    );
}
