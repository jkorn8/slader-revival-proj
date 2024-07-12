import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios, { AxiosResponse } from 'axios';

const TOKEN_KEY = 'my-jwt';
const API_URL = 'https://i7q4t70bv6.execute-api.us-west-1.amazonaws.com/dev/users';
const AuthContext = createContext<AuthContextProps>({});

interface AuthContextProps {
	authState?: { token: string | null; authenticated: boolean | null };
	onRegister?: (username: string, email: string, password: string) => Promise<any>;
	onLogin?: (email: string, password: string) => Promise<any>;
	onLogout?: () => Promise<any>;
}

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [authState, setAuthState] = useState<{
		token: string | null;
		authenticated: boolean | null;
	}>({
		token: null,
		authenticated: null
	});

	useEffect(() => {
		console.log('API Key set:', process.env.REACT_APP_AWS_API_KEY);
		axios.defaults.headers.common['x-api-key'] = `${process.env.REACT_APP_AWS_API_KEY}`;
		const loadToken = async () => {
            const token = Cookies.get(TOKEN_KEY);
			console.log('Token: ', token);
			if (token) {
				axios.defaults.headers.common['Authorization'] = `${token}`;
				setAuthState({ token: token, authenticated: true });
			}
		};
		loadToken();
	}, []);

	const register = async (username: string, email: string, password: string) => {
		try {
			console.log("Registering user: ", username, email, password)
			const response: AxiosResponse = await axios.post(`${API_URL}/create`, {
				"username": username,
				"email": email,
				"password": password
			});

			if (response.status === 200) {
				return { success: true, status: 200 };
			}
		} catch (error: any) {
			console.log(error);
			return { success: false, status: error.response.status };
		}
	};

	const login = async (id: string, password: string) => {
		try {
			console.log(`Logging in user "${id}" with password "${password}"`)
			const result = await axios.post(`${API_URL}/login`, { id: id, password: password });
			console.log(result.data.token);

			axios.defaults.headers.common['Authorization'] = `${result.data.token}`;
			Cookies.set(TOKEN_KEY, result.data.token, { expires: 7, secure: true });

			setAuthState({
				token: result.data.token,
				authenticated: true
			});
		} catch (e) {
			throw e;
		}
	};

	const logout = async () => {
        Cookies.remove(TOKEN_KEY);
		axios.defaults.headers.common['Authorization'] = '';

		setAuthState({
			token: null,
			authenticated: false
		});
	};

	const value = {
		onRegister: register,
		onLogin: login,
		onLogout: logout,
		authState
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
