import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const TOKEN_KEY = 'my-jwt';
const API_URL = '';
const AuthContext = createContext({});

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const [authState, setAuthState] = useState({
		token: null,
		authenticated: null
	});

	useEffect(() => {
		// axios.defaults.headers.common['x-api-key'] = `${process.env.AWS_API_KEY}`;
		const loadToken = async () => {
            const token = Cookies.get(TOKEN_KEY);
			if (token) {
				axios.defaults.headers.common['Authorization'] = `${token}`;
				setAuthState({ token: token, authenticated: true });
			}
		};
		loadToken();
	}, []);

	const register = async (username, email, password) => {
		try {
			const response = await axios.post(`${API_URL}`, {
				username: username,
				email: email,
				password: password
			});

			if (response.status === 200) {
				return { success: true, status: 200 };
			}
		} catch (error) {
			return { success: false, status: error.response.status };
		}
	};

	const login = async (email, password) => {
		try {
			const result = await axios.post(`${API_URL}/login`, { email: email, password: password });
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
