const apiUrl = process.env.REACT_APP_API_URL;

// Войти
export const signIn = (data) => {
    return fetch(apiUrl + 'signin/', {
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => res)
    .catch(err => err);
}

// Зарегистрироваться
export const signUp = (name, email, password, role, division) => {
    return fetch(apiUrl + 'signup/', {
        method: 'POST',
        body: JSON.stringify({name: name, email: email, password: password, role: role, division: division})
    })
    .then(res => res.json())
    .then(res => res)
    .catch(err => err);
}

// Проверка авторизации
export const checkUserAuth = (token) => {
    return fetch(apiUrl + 'checkUserAuth/', {
        method: 'POST',
        body: JSON.stringify({token: token})
    })
    .then(res => res.json())
    .then(res => res)
    .catch(err => err);
}

// Получить все отделы
export const getUserDivisions = () =>{
    return [
        { id: 1, name: 'Бухгалтерия' },
        { id: 2, name: 'Снабжение' },
        { id: 3, name: 'Спецтехника' },
        { id: 4, name: 'IT отдел' },
        { id: 5, name: 'Склад' },
      ];
}

// Получить все роли пользователей
export const getUserRoles = () =>{
    return [
        { id: 1, name: 'Администратор'},
        { id: 2, name: 'Заказчик'},
        { id: 3, name: 'Зав. складом'},
        { id: 4, name: 'Снабжение'}
    ];
}

// Получить всех пользователей
export const getAllUsers = () => {
    return fetch(apiUrl + 'users/')
        .then(res => res.json())
        .then(res => res)
        .catch(err => err);
}