// import React from 'react';
// import {Eye} from 'lucide-react';
// import AnswerModal from './AnswerModal';
 

// const DoubtCard = ({ doubt }: { doubt: any }) => {

//     return (
//         <div className="flex flex-col gap-2 bg-white border border-gray-200 rounded-lg shadow  w-full pb-8 dark:border-gray-700 dark:bg-gray-800 ">
//             <div className="flex flex-col justify-between p-4 leading-normal">
//                 <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{doubt?.question}</h5>
//                 <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{doubt?.description}</p>
//                <span className='text-lg font-bold'>Answer</span> <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">answer</p>
//             </div>
//             <div className='flex items-center justify-between p-2'>
//                 <div>
//                     {
//                         doubt?.isOwner && <AnswerModal doubtId={doubt?.id}/>
//                     }
                    
//                 </div>
//                 <div className='flex items-center gap-2 text-gray-400'>
//                     <Eye/><p>1</p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default DoubtCard

import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import axios from 'axios';
import AnswerModal from './AnswerModal';

interface Answer {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
  };
}

const DoubtCard = ({ doubt }: { doubt: any }) => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch answers when the component is mounted
  useEffect(() => {
    const fetchAnswers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/doubtanswer/${doubt.id}`);
        if (response.status === 200) {
          setAnswers(response.data.answers); // Assuming the response contains 'answers' key
        } else {
          throw new Error('Failed to fetch answers.');
        }
      } catch (err) {
        console.error('Error fetching answers:', err);
        setError('Unable to fetch answers. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnswers();
  }, [doubt.id]);

  return (
    <div className="flex flex-col gap-2 bg-white border border-gray-200 rounded-lg shadow w-full pb-8 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{doubt?.question}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{doubt?.description}</p>

        <span className="text-lg font-bold">Answer</span>
        {loading ? (
          <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">Loading answers...</p>
        ) : error ? (
          <p className="mb-3 font-normal text-red-600">{error}</p>
        ) : answers.length === 0 ? (
          <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">No answers yet. Be the first to answer!</p>
        ) : (
          <ul className="space-y-3">
            {answers.map((answer) => (
              <li key={answer.id} className="mb-3 font-normal text-gray-700 dark:text-gray-200">
                <p className="text-gray-900 dark:text-white">{answer.content}</p>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  By: {answer.user.name} | {new Date(answer.createdAt).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex items-center justify-between p-2">
        <div>{doubt?.isOwner && <AnswerModal doubtId={doubt?.id} />}</div>
        <div className="flex items-center gap-2 text-gray-400">
          <Eye />
          <p>{doubt?.views || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default DoubtCard;
