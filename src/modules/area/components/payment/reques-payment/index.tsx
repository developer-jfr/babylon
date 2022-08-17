import React from 'react'
import { useState, useEffect } from 'react';
import styles from './index.module.scss';
import paymentapprove from 'assets/images/request-payment.svg';

const RequestTimer = (props:any) => {
    const {initialMinute = 2,initialSeconds = 0} = props;
    const [ minutes, setMinutes ] = useState(initialMinute);
    const [seconds, setSeconds ] =  useState(initialSeconds);
    const [ active, setActive ] = useState<boolean>(false);
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
            <img className={styles.payment_img} src={paymentapprove} />
        { minutes === 0 && seconds === 0
            ? null
            : <h1 className={styles.payment_text}> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1> 
        }
        </div>
    )
}

export default RequestTimer;