import React from 'react';
import useQuizzes from '../../../../hooks/useQuizzes';
import QuizzesRow from './QuizzesRow';

const ManageQuizzes = () => {
    const [quizzes] = useQuizzes();
    return (
        <div className='lg:px-4 px-2 pb-5'>
            <h2 className="text-2xl px-4 mb-2 text-gray-200">All Quizzes: {quizzes?.allQuiz?.length}</h2>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="text-gray-400 w-full text-sm text-left">
                    <thead className={`bg-gray-700 text-gray-400 text-xs uppercase`}>
                        <tr>
                        <th scope='col' className='py-2  sm:py-3'></th>
                        <th scope='col' className='py-2 sm:py-3'>
                                Image
                            </th>
                            <th scope='col' className='py-2 sm:py-3'>
                                Name
                            </th>
                            <th scope='col' className='py-2 sm:py-3 text-center'>
                                status
                            </th>
                            <th scope='col' className='py-2 sm:py-3 text-center'>
                                submission
                            </th>
                            <th scope='col' className='py-2 sm:py-3 text-center'>
                            Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            quizzes?.allQuiz?.map((quiz, index)=><QuizzesRow
                                index={index}
                                key={quiz._id}
                                quiz={quiz}
                                // refetch={refetch}
                                ></QuizzesRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageQuizzes;