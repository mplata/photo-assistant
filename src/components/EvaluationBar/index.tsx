import React, { useMemo, useState } from 'react';

import { PhotoEvaluation } from '@/services/openai/schemas';
import { EvalStatus } from '../Photo';
import DetailsDialog from '../DetailsDialog';

interface EvaluationBarProps {
  evaluation: PhotoEvaluation | null;
  evalStatus: EvalStatus;
}

const EvaluationBar = ({ evaluation, evalStatus }: EvaluationBarProps) => {

  const [showDetails, setShowDetails] = useState(false);

  const onCloseDetail = () => setShowDetails(false);

  const scoreColor = useMemo(() => {
    const score = evaluation?.score ?? 0;
    if (score < 6) {
      return 'text-orange-800';
    } else if (score >= 6 && score < 8) {
      return 'text-blue-800';
    } else if (score >= 8) {
      return 'text-green-500';
    } 
  }, [evaluation]);
  
  return (
    <div className='rounded-t-md bg-gray-100 p-2'>
      {
        evalStatus === 'EVALUATING'
          ? <span className='flex justify-center py-2'>⏳</span>
          : (
            <>
              <div className='flex justify-between py-2'>
                <div className='flex items-center justify-center'>
                  <button className='text-xl' onClick={() => setShowDetails(true)}>
                    <svg clip-rule="evenodd" width={32} fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m15 17.75c0-.414-.336-.75-.75-.75h-11.5c-.414 0-.75.336-.75.75s.336.75.75.75h11.5c.414 0 .75-.336.75-.75zm7-4c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm0-4c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm0-4c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75z" fill-rule="nonzero"/></svg>
                  </button>
                  <span className='text-l ml-2'>
                    {evaluation?.titulo}
                  </span>
                </div>
                <span className={`text-xl ${scoreColor}`}>
                  {evaluation?.score}
                </span>
              </div>
            </>
          )
      }
      { 
        showDetails && <DetailsDialog evaluation={evaluation} onCloseDetail={onCloseDetail}/>
      }
    </div>
  );
};

export default EvaluationBar;