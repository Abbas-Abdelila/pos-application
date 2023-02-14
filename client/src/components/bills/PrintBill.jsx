import { Button, Modal, } from "antd"
import { useRef } from "react"
import { useReactToPrint } from "react-to-print"

const PrintBill = ({ isModalOpen, setIsModalOpen, customer }) => {
    
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

return (


<>
<Modal
title="Fatura Yazdir"
footer={false}
open={isModalOpen}
onCancel={() => setIsModalOpen(false)}
width={800}
>

<section className="bg-black py-20" ref={componentRef} >
<div className="max-w-5xl mx-auto bg-white px-6">
<article className="overflow-hidden">
    <div className="bg-white px-5">
        <div className="logo my-6">
            <h2 className="text-4xl font-bold text-slate-700">LOGO</h2>
        </div>

        <div className="bill-details">
            <div className="grid sm:grid-cols-4 grid-cols-3 gap-12">
                <div className="text-md text-slate-500 py-10">
                    <p className="text-slate-700 font-bold"> Fatura Detayi: </p>
                    Unwrapped
                    <p>Fake Street 123</p>
                    <p>San Javier</p>
                    <p>CA 1234</p>
                </div>
                <div className="text-md text-slate-500 sm:block hidden py-10">
                    <p className="text-slate-700 font-bold">Fatura</p>
                    The Boring Company
                    <p>Tesla Street 007</p>
                    <p>SanFrancisco</p>
                    <p>CA 2080</p>
                </div>
                <div className="text-md text-slate-500 py-10">
                    <p className="text-slate-700 font-bold"> Fatura Numarasi </p>

                    <p>001{Math.floor(Math.random() * 100)}</p>
                    <p className="text-slate-700 font-bold">Date of Issue</p>
                    <p>{customer?.createdAt.substring(0,10)}</p>
                </div>
                <div className="text-md text-slate-500 py-10">
                    <p className="text-slate-700 font-semibold"> Terms </p>

                    <p>0 days</p>
                    <p className="text-slate-700 font-semibold">Due</p>
                    <p>00.00.00</p>
                </div>
            </div>
        </div>

        <div className="bill-table-area mt-8">
            <table className="min-w-full divide-y divide-slate-500 overflow-hidden">
                <thead>
                    <tr>
                        <th scope="col"
                            className="py-3.5 text-left text-sm font-normal text-slate-700 md:pl-0 sm:table-cell hidden"
                        >Image</th>

                        <th scope="col"
                            className="py-3.5 text-left text-sm font-normal text-slate-700 md:pl-0 sm:table-cell hidden"
                        >Title</th>

                        <th
                            colSpan={4}
                            scope="col"
                            className="py-3.5 text-left text-sm font-normal text-slate-700 md:pl-0 sm:hidden"
                        >
                            {" "}
                            Title
                        </th>

                        <th scope="col"
                            className="py-3.5 text-center text-sm font-normal text-slate-700 md:pl-0 sm:table-cell hidden"
                        >Price</th>

                        <th scope="col"
                            className="py-3.5 text-center text-sm font-normal text-slate-700 md:pl-0 sm:table-cell hidden"
                        >Amount</th>

                        <th scope="col"
                            className="py-3.5 text-end text-sm font-normal text-slate-700 md:pl-0"
                        >Total</th>


                    </tr>

                </thead>
                <tbody>
                    {customer?.cartItems.map((item) => (
                        <tr className="border-b border-slate-200">
                            <td className="py-4 sm:table-cell hidden">
                                <img
                                    src={item.img}
                                    alt=""
                                    className="w-12 h-12 object-fit rounded-lg"
                                />
                            </td>
                            <td className="py-4 sm:table-cell hidden">
                                <div className="flex flex-col">
                                    <span className="font-medium">{item.title}</span>
                                    <span className="sm:hidden inline-block text-xs">
                                        Unit Price $ {item.price}
                                    </span>
                                </div>
                            </td>
                            <td className="py-4 sm:hidden" colSpan={4}>
                                <div className="flex flex-col">
                                    <span className="font-medium">{item.title}</span>
                                    <span className="sm:hidden inline-block text-xs">
                                        Unit Price $ {item.price}
                                    </span>
                                </div>
                            </td>
                            <td className="py-4 text-center sm:table-cell hidden">
                                <span>$ {item.price.toFixed(2)}</span>
                            </td>
                            <td className="py-4 sm:text-center text-right sm:table-cell hidden">
                                <span>$ {item.quantity}</span>
                            </td>
                            <td className="py-4 text-end">
                                <span>$ {(item.price * item.quantity).toFixed(2)}</span>
                            </td>
                        </tr>
                    ))}


                </tbody>
                <tfoot>
                    <tr>
                        <th className="text-right pt-6" colSpan={4} scope="row" >
                            <span>Total before tax</span>
                        </th>
                        <th className="text-right pt-6" scope="row" >
                            <span>$ {customer?.subTotal}</span>
                        </th>
                    </tr>

                    <tr>
                        <th className="text-right pt-6" colSpan={4} scope="row" >
                            <span>Tax</span>
                        </th>
                        <th className="text-right pt-4" scope="row" >
                            <span>$ {customer?.tax}</span>
                        </th>
                    </tr>

                    <tr>
                        <th className="text-right pt-4" colSpan={4} scope="row" >
                            <span>Total</span>
                        </th>
                        <th className="text-right pt-4" scope="row" >
                            <span>{customer?.totalAmount}</span>
                        </th>
                    </tr>
                </tfoot>
            </table>
            <div className="py-9">
                <div className="border-t pt-9 border-slate-200">
                    <p className="bg-slate-50 p-4 rounded-lg text-sm font-light text-slate-700">
                    Payment terms are 14 days. Please note that according to the Late Payment of Unpackaged Debts Act 0000,
                    freelancers are entitled to charge a 00.00 late fee if debts are not paid after this time, at which point
                    a new invoice will be submitted in addition to this fee.
                    </p>
                </div>
            </div>

        </div>

    </div>
</article>
</div>
</section>
<div className="flex justify-end mt-5">
<Button type="primary" size="large" onClick={handlePrint}>Yazdir</Button>
</div>

</Modal>


</>
);
}

export default PrintBill