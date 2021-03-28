import { useLazyQuery, useReactiveVar } from '@apollo/client';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { fetchJWT } from '../../api';
import { jwtVar, userVar } from '../../cache';
import { GET_USER } from '../../queries/user';
import { UserData } from '../../types';

export default function useInitAuth(): void {
  const jwt = useReactiveVar(jwtVar);
  useEffect(() => {
    setJWTUsingRefreshToken();

    function setJWTUsingRefreshToken() {
      if (!jwt) {
        const refreshToken = window.localStorage.getItem('refreshToken');
        if (refreshToken) {
          fetchJWT({ token: refreshToken })
            .then(jwt => jwtVar(jwt.accessToken))
            .catch(error => console.error(error));
        }
      }
    }
  }, []);

  const userData = useReactiveVar(userVar);
  const [loadUserData] = useLazyQuery<{ user: UserData }>(GET_USER, {
    fetchPolicy: 'network-only',
    onCompleted: data => userVar({ ...userData, ...data?.user }),
  });
  useEffect(() => {
    if (jwt) {
      loadUserData();
    }
  }, [jwt]);

  const history = useHistory();
  useEffect(() => {
    window.addEventListener('storage', logout);
    return () => window.removeEventListener('storage', logout);

    function logout(e: StorageEvent) {
      if (e.key === 'refreshToken' && e.newValue === null) {
        jwtVar('');
        history.push('/auth');
      }
    }
  }, [jwt]);
}
