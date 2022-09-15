import React from 'react';
import useQuizzes from '../../../hooks/useQuizzes';
import Quiz from './Quiz';

const Quizzes = () => {
    const [quizzes] = useQuizzes();
    return (
        <div>
            <div>
			<h2
				style={{ fontFamily: "'Rajdhani', sans-serif" }}
				className={`${
					1>0 && 'text-gray-300'
				} uppercase text-gray-300 mt-8 font-bold text-3xl py-3 text-center`}
			>
				All <span className='text-primary'>Quizzes</span>
			</h2>
			<div className='flex justify-center'>
				<div className=' rounded-md w-32 h-1 bg-[#ef13bc]'></div>
				<div className=' rounded-md w-4 h-1 mx-2 bg-[#b60f8f]'></div>
				<div className=' rounded-md w-2 h-1 bg-[#8c2dd4]'></div>
			</div>
			<div className='flex justify-center items-center  py-20'>
				<div className='md:px-4 md:grid md:grid-cols-2 mx-width lg:grid-cols-3 gap-5 space-y-4 md:space-y-0'>
					{quizzes?.allQuiz?.map(quiz => (
						<Quiz quiz={quiz} key={quiz._id}></Quiz>
					))}
				</div>
			</div>
		</div>
        </div>
    );
};

export default Quizzes;