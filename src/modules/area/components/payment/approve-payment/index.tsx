import React, { FC } from 'react'
import { useState, useEffect } from 'react';
import styles from './index.module.scss';
import paymentapprove from 'assets/images/payment-approve.svg';
import { useAppDispatch } from 'hooks/redux';
import { getPaymentsInfo } from 'redux/tower/action';

type IProps = {
    paymentId: string | undefined
}

const Timer:FC<IProps> = ({paymentId}) => {
    const dispatch = useAppDispatch();
    const initialMinute = 0;
    const initialSeconds = 2
    const [ minutes, setMinutes ] = useState<number>(initialMinute);
    const [seconds, setSeconds ] =  useState<number>(initialSeconds);
    useEffect(()=>{
    let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    });


    return (
        <div className={`${styles.payment} ${seconds === 0 ? styles.payment_none : ''}`}>
            <img onClick={() => dispatch(getPaymentsInfo(paymentId))} className={styles.payment_img} src={paymentapprove} />
        { minutes === 0 && seconds === 0
            ? null
            : <h1 className={styles.payment_text}> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1> 
        }
        </div>
    )
}

export default Timer;