
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useAppDispatch } from 'hooks';
import React, { FC } from 'react';
import { axiosGetUsers } from 'store/users/actions';

export const HomePage: FC = () => {
  const dispatch = useAppDispatch();

  return (
<div>
  <button onClick={
        async() => await dispatch(axiosGetUsers()).
        then(item => console.log(item)).catch(e => console.log(e))}>dfdfdfdf</button>

</div>
  
  );
};
