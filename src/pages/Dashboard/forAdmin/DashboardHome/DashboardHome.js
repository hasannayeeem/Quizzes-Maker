import React from 'react';
import { MdOutlineQuiz } from 'react-icons/md';
import { GiPayMoney } from "react-icons/gi";
import usersSVG from '../../../../assests/images/user-profile-svgrepo-com.svg'
import useQuizzes from '../../../../hooks/useQuizzes';
import usePayments from '../../../../hooks/usePayments';
const DashboardHome = () => {
  const [quizzes] = useQuizzes();
  const [payments] = usePayments();
  
    return (
        <div>
                      <section className="flex lg:flex-row flex-col">
        {/* division 01 */}
        <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
          <div className="h-full flex items-center border-teal-600 border-4 p-4 rounded-lg hover:bg-slate-200  after:duration-1000">
            <img
              alt="users"
              className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
              src={usersSVG}
            />
            <div className="flex-grow">
              <h2 className="text-secondary  title-font font-bold">
                User Feedback
              </h2>
              <p className="text-gray-400 ">more than 85%</p>
            </div>
          </div>
        </div>
        {/* division 02 */}
        <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
          <div className="h-full flex items-center border-teal-600 border-4  p-4 rounded-lg hover:bg-slate-200 duration-1000">
            <MdOutlineQuiz className="text-6xl p-2 text-secondary bg-gray-300 hover:border-secondary border-primary border-2 object-cover object-center flex-shrink-0 rounded-full mr-4" />
              
            
            <div className="flex-grow">
              <h2 className="text-secondary title-font font-bold">Total Quiz</h2>
              <p className="text-gray-400">{quizzes?.allQuiz?.length} quizzes</p>
            </div>
          </div>
        </div>
        {/* division 03 */}
        <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
          <div className="h-full flex items-center border-teal-600 border-4 p-4 rounded-lg hover:bg-slate-200 duration-1000">
            
            <GiPayMoney className="text-6xl p-2 text-secondary bg-gray-300 hover:border-secondary border-primary border-2 object-cover object-center flex-shrink-0 rounded-full mr-4" />
            
            <div className="flex-grow">
              <h2 className="text-secondary title-font font-bold">Revenue</h2>
              <p className="text-gray-400">{payments?.allPay?.length * 107} Dollars</p>
            </div>
          </div>
        </div>
      </section>
        </div>
    );
};

export default DashboardHome;