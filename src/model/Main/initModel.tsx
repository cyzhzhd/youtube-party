import { useLazyQuery, useReactiveVar } from '@apollo/client';
import { useEffect } from 'react';
import { fetchJWT } from '../../api';
import { jwtVar, userDataVar } from '../../cache';
import { GET_USER } from '../../queries/user';
import { UserData } from '../../types';

export default function useInit(): void {
  const jwt = useReactiveVar(jwtVar);
  useEffect(() => {
    if (!jwt) {
      const refreshToken = window.localStorage.getItem('refreshToken');
      if (refreshToken) {
        fetchJWT({ token: refreshToken })
          .then(jwt => jwtVar(jwt.accessToken))
          .catch(error => console.log(error));
      }
    }
  }, []);

  const [loadUserData, { called, data }] = useLazyQuery<{ user: UserData }>(GET_USER);
  useEffect(() => {
    if (jwt && !called) {
      loadUserData();
    }
  }, [jwt]);

  const userData = useReactiveVar(userDataVar);
  useEffect(() => {
    if (data) {
      userDataVar({ ...userData, ...data?.user });
    }
  }, [data]);
}
