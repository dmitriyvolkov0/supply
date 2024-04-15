const serverUrl = process.env.REACT_APP_SERVER_URL;

// Войти
export const signIn = (email, password) => {
    return fetch(serverUrl + 'signin/', {
        method: 'POST',
        body: JSON.stringify({email: email, password: password})
    })
    .then(res => res.json())
    .then(res => res)
    .catch(err => err);
}

// Зарегистрироваться
export const signUp = (name, email, password, role, division) => {
    return fetch(serverUrl + 'signup/', {
        method: 'POST',
        body: JSON.stringify({name: name, email: email, password: password, role: role, division: division})
    })
    .then(res => res.json())
    .then(res => res)
    .catch(err => err);
}

// Проверка авторизации
export const checkUserAuth = (token) => {
    return fetch(serverUrl + 'checkUserAuth/', {
        method: 'POST',
        body: JSON.stringify({token: token})
    })
    .then(res => res.json())
    .then(res => res)
    .catch(err => err);
}