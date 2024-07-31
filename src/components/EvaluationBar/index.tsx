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
      return 'text-orange-500';
    } else if (score >= 6 && score <= 8) {
      return 'text-yellow-600';
    } else if (score > 8) {
      return 'text-emerald-500';
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
                <span className='text-l'>
                  {evaluation?.titulo}
                </span>
                <span className={`text-xl ${scoreColor}`}>
                  {evaluation?.score}
                </span>
                <button className='text-xl' onClick={() => setShowDetails(true)}>+</button>
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