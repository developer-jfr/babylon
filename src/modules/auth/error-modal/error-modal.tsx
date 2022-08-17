import { useAppDispatch } from 'hooks/redux';
import { FC, useEffect, useState } from 'react';
import { authSlice } from 'redux/auth/reducer';

type IProps = {
  error: string
}

const ErrorModal:FC<IProps> = ({error}) => {
    const [isActive, setIsActive] = useState<boolean>(true);
    const dispatch = useAppDispatch();
    useEffect( () => {
        let timer1 = setTimeout(() => {
          setIsActive(false);
           dispatch(authSlice.actions.setError(''));
        }, 10000);
        // this will clear Timeout
        // when component unmount like in willComponentUnmount
        // and show will not change to true
        return () => {
          clearTimeout(timer1);
        };
  
    })
  return (
    <div style={{position: 'fixed', display: `${isActive ? 'block' : 'none'}`}} className="notification is-danger is-light ">
    <button onClick={() => setIsActive(false)} className="delete"></button>
   {error}
  </div>
  )
}

export default ErrorModal