import { useAppDispatch } from 'hooks/redux';
import { IWorker } from 'models/ITower';
import { MockUser } from 'modules/area/mock-data';
import { FC, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useGetAreInfo, useGetRequestApprove } from 'services/tower/tower-queries';
import styles from '../../index.module.scss';
import Modal from '../modal';
import Person from '../person';

type IProps = {
    areaId: string
}

const AreaUser:FC<IProps> = ({areaId}) => {
  const dispatch = useAppDispatch();
    const [ builders, setBuilders ] = useState<Array<IWorker>>([]);
    const [ brigadiers,setBrigadiers ] = useState<Array<IWorker>>([]);
    const { data:requestData } = useGetRequestApprove(areaId);
    const [ bosses, setBosses ] = useState<Array<IWorker>>([]);
    const [ foremen,setForemen ] = useState<Array<IWorker>>([]);
    builders.length = Math.min(builders.length, 10);
    brigadiers.length = Math.min(builders.length, 4);
    foremen.length = Math.min(builders.length, 2);
    bosses.length = Math.min(builders.length, 1);
    const { data, isSuccess } = useGetAreInfo(areaId);
   
    useEffect( () => {
      if(isSuccess) {
        setBuilders( data?.data.area_workers.builders?.concat(MockUser));
        setBrigadiers( data?.data.area_workers.brigadiers?.concat(MockUser));
        setForemen( data?.data.area_workers.foremen?.concat(MockUser));
        setBosses(data.data.area_workers.bosses?.concat(MockUser));
      } 
    }, [isSuccess]);



  
  return (
    <div className={styles.person_wrapper}>
            
            <div className={styles.person_group}>
            {builders?.slice(0,5).map((item, i) => (
              <Person type={item.type} id={item.user.id}  isRequest={item.user.id === requestData?.data.from_user.id ? true : false}  username={item.user.username} />
              
            ))}
            </div>
            <div className={styles.person_group}>
            {brigadiers?.slice(0,2).map(item => <Person type={item.type} id={item.user.id} isRequest={item.user.id === requestData?.data.from_user.id ? true : false} username={item.user.username} />)}
            </div>
            <div className={styles.person_group}>
            {foremen?.slice(0,1).map(item => <Person type={item.type} id={item.user.id}  isRequest={item.user.id === requestData?.data.from_user.id ? true : false}   username={item.user.username} />)}
            </div>
            <div className={styles.person_group}>
              
            {bosses?.map(item => <Person type={item.type} id={item.user.id}  isApprove={item.user.id === requestData?.data.to_user.id ? true : false}    username={item.user.username} />)}
            </div>
            <div className={styles.person_group}>
            {foremen?.slice(1).map(item => <Person type={item.type }  isRequest={item.user.id === requestData?.data.from_user.id ? true : false}  id={item.user.id}  username={item.user.username} />)}
            </div>
            <div className={styles.person_group}>
            {brigadiers?.slice(2).map(item => <Person type={item.type}  isRequest={item.user.id === requestData?.data.from_user.id ? true : false}  id={item.user.id}  username={item.user.username} />)}
            </div>
            <div className={styles.person_group}>
            {builders?.slice(5).map((item, i) => (
              <Person type={item.type} id={item.user.id}  isRequest={item.user.id === requestData?.data.from_user.id ? true : false}   username={item.user.username} />
              
            ))}
            </div>
          </div>
  )
}

export default AreaUser