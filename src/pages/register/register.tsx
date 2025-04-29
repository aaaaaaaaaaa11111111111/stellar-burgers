import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { registerUser, userErrorSelector } from '../../services/user/userSlice';
import { TRegisterData } from '@api';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const error = useSelector(userErrorSelector);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const userData: TRegisterData = {
      email: email,
      name: userName,
      password: password
    };

    dispatch(registerUser(userData));
  };

  return (
    <RegisterUI
      errorText={error?.toString()}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
