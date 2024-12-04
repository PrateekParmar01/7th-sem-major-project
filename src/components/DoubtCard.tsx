import React from 'react';
import {Eye} from 'lucide-react';
import AnswerModal from './AnswerModal';


const DoubtCard = ({ doubt }: { doubt: any }) => {

    return (
        <div className="flex flex-col gap-2 bg-white border border-gray-200 rounded-lg shadow  w-full pb-8 dark:border-gray-700 dark:bg-gray-800 ">
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{doubt?.question}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{doubt?.description}</p>
               <span className='text-lg font-bold'>Answer</span> <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">answer</p>
            </div>
            <div className='flex items-center justify-between p-2'>
                <div>
                    {
                        doubt?.isOwner && <AnswerModal doubtId={doubt?.id}/>
                    }
                    
                </div>
                <div className='flex items-center gap-2 text-gray-400'>
                    <Eye/><p>1</p>
                </div>
            </div>
        </div>
    )
}

export default DoubtCard