import React from 'react';
import { useEffect, useState, useRef, useImperativeHandle, forwardRef } from 'react';
import axios from 'axios';
import { API_ADRESS } from '../../config';
import Disability from './Disability';
import LoadingCard from '../LoadingCard';

const disabilityStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '10px',
    backgroundColor: 'var(--white)',
    borderRadius: '10px',
    padding: '10px',
    margin: '0 0 20px 0',
}

const DisabilityInput = forwardRef((props, _ref) => {

    const [disabilities, setDisabilities] = useState([]);
    const [state, setState] = useState('loading');

    const pills = useRef([]);

    useEffect(() => {
        axios.get(API_ADRESS + '/api/disability')
            .then(res => {
                setDisabilities(res.data);
                setTimeout(() => {
                    setState('loaded')
                }, 1500);
            })
    }, []);

    // useImperativeHabdle makes "getPillStates" visible from child reference in parent component. 
    // from: ref.current.getPillStates()
    useImperativeHandle(_ref, () => ({
        // Toss child state into parent component
        getPillStates: () => {

            let selections = [];
            pills.current.forEach(pill => {
                selections.push(pill.getSelected())
            })
            let disabilities = [];
            console.log(selections);
            for (let i = 0; i < selections.length; i++) {
                if (selections[i] === true) {
                    console.log(i)
                    disabilities.push({ Dis_Id: i + 1 })
                }
            }
            return disabilities;
        },
        setPillStates: (disabilities) => {

            disabilities.forEach(disability => {
                console.log(pills.current)
                pills.current[disability.dis_Id].setSelected(true);
            })
        }
    }));

    const renderPills = (d) => {
        return d.map(disability => {
            return (<div key={disability.di_Id}><Disability name={disability.di_Name} ref={el => pills.current[disability.di_Id] = el} /></div>)
        })
    }

    return (
        <div>
            <label>{props.label ? props.label : 'Disabilities'}</label>
            <div style={disabilityStyle}>
                {state === 'loaded' ?
                    (
                        renderPills(disabilities)
                    ) : (
                        <LoadingCard />
                    )}
            </div>
        </div>
    )
})

export default DisabilityInput;