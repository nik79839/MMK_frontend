import { Progress } from 'antd';
import React from 'react';
import { calculationType } from '../../../types/types';

type PropsType = {
    calculations: calculationType
};

const CalculationProgress: React.FC<PropsType> = (props) => { 

        return <div>                
                    <a className="active">{props.calculations.name}</a>
                    <Progress percent={props.calculations.progress} status="active" />
                </div>; 
}
export default CalculationProgress;
