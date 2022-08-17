import styles from './index.module.scss';
import { FC, useEffect, useState } from 'react';
//Images
import person from 'assets/images/person.svg';
import foreman from 'assets/images/foremen.svg'
import brigadiers from 'assets/images/brigadiers.svg';
import boss from 'assets/images/boss.svg';
import unknown from 'assets/images/unknown.svg';
import Timer from '../payment/approve-payment';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import RequestTimer from '../payment/reques-payment';
import { paymentsSlice } from 'redux/payments/reducer';
import Modal from '../modal';


type IProps = {
  id: string
  type: string
  username: string
  paymentId?:string
  isRequest?:boolean
  isApprove?: boolean
}

const Person:FC<IProps> = ({id, type, username, paymentId,isApprove, isRequest}) => {
  const { approve,request } = useAppSelector((state) => state.paymentReducer);
  const [ showUserInfo, setShowUserInfo ] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if(isRequest) {
      dispatch(paymentsSlice.actions.setRequest(true))
    }
  },[isRequest])


  useEffect(() => {
    if(isApprove) {
      dispatch(paymentsSlice.actions.setApprove(true))
    }
  },[isApprove]);


  console.log(id)
  return (
    <div style={{position: 'relative', paddingBottom: `${request || approve ? '20px' : '0px'}`}}>
    <div key={id} onClick={() => setShowUserInfo(e => !e)}  className={styles.column}>
        {type === 'Строитель' ? <img className={styles.person} src={person} alt="person" /> : 
        type === 'Прораб' ? <img className={styles.person} src={foreman} alt="person" /> : type === 'Бригадир' ? <img className={styles.person} src={brigadiers} alt="person" /> : 
        type === 'Шеф' ?<img className={styles.person} src={boss} alt="person" /> : <img className={styles.person} src={unknown} alt="person" />  }
       {request ? <RequestTimer />  : approve ? <Timer paymentId={paymentId} /> :  <span>{username}</span> }
    </div>
      { showUserInfo && type === 'Шеф' ? (
          <Modal id={id} />
    ) : ''}
    
    </div>
  )
}

export default Person