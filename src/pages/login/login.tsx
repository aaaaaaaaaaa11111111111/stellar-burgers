import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser, userErrorSelector } from '../../services/user/userSlice';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const error = useSelector(userErrorSelector);
  const localStorageEmail = localStorage.getItem('email') ?? '';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    localStorage.setItem('email', email);
    const userData = { email, password };
    dispatch(loginUser(userData));
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
