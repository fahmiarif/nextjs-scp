import { createContext, useContext, useState, useEffect } from 'react';

const AuthContent = createContext({
	accesstoken: '',
	user: '',
	settoken: (e:any) => {},
	setuser: (e:any) => {},
});

export const AuthProvider = ({ children }:any) => {
	const [accesstoken, _settoken] = useState('');
	const [user, _setuser] = useState<any>('');
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userlocal = localStorage.getItem('user');
        if (token) {
            _settoken(token)
            _setuser(userlocal)
        }
    }, [])

	// set token to local storage
	const settoken = (token:any) => {
		if (token) {
			localStorage.setItem('token', token);
		} else {
			localStorage.removeItem('token');
		}
		_settoken(token);
	};

	// set name user to local storage
	const setuser = (user:any) => {
        localStorage.setItem('user', user);
		_setuser(user);
	};

	return (
		<AuthContent.Provider value={{ accesstoken, settoken, user, setuser }}>
			{children}
		</AuthContent.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContent);
};