import React from 'react';
import usePayments from '../../../../hooks/usePayments';
import useUsers from '../../../../hooks/useUsers';
import PaymentRow from './PaymentRow';

const Payments = () => {
    const [payments] = usePayments();
    return (
        <div className='lg:px-4 px-2 pb-5'>
            <h2 className="text-2xl px-4 mb-2 text-gray-200">All Payments Lists: {payments?.length}</h2>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="text-gray-400 w-full text-sm text-left">
                    <thead className={`bg-gray-700 text-gray-400 text-xs uppercase`}>
                        <tr>
                        <th scope='col' className='py-2  sm:py-3'></th>
                        <th scope='col' className='py-2 sm:py-3'>
                                Name
                            </th>
                            <th scope='col' className='py-2 sm:py-3'>
                                Email
                            </th>
                            <th scope='col' className='py-2 sm:py-3 text-center'>
                                status
                            </th>
                            <th scope='col' className='py-2 sm:py-3 text-center'>
                                transaction ID
                            </th>
                            <th scope='col' className='py-2 sm:py-3 text-center'>
                                action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments?.map((payment, index)=><PaymentRow
                                index={index}
                                key={payment._id}
                                payment={payment}
                                // refetch={refetch}
                                ></PaymentRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Payments;