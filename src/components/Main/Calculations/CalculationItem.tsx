import s from './Calculations.module.css';
import { NavLink } from "react-router-dom";
import { calculationType } from '../../../types/types';
import React from 'react';

type PropsType = {
    calculations: calculationType
};

const CalculationItem: React.FC<PropsType> = (props) => {
        return (<div>                
                    <NavLink to={props.calculations.id} className={({ isActive }) => (isActive ? s.active : null)}>{props.calculations.name}</NavLink>
                </div>);
}

export default CalculationItem;
