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
    return fetch(apiUrl + 'divisions/', {
        method: 'GET',
    })
    .then(res => res.json())
    .then(res => res)
    .catch(err => err);
}

// Получить все роли пользователей
export const getUserRoles = () =>{
    return fetch(apiUrl + 'roles/', {
        method: 'GET',
    })
    .then(res => res.json())
    .then(res => res)
    .catch(err => err);
}

// Получить всех пользователей
export const getAllUsers = () => {
    return fetch(apiUrl + 'users/')
        .then(res => res.json())
        .then(res => res)
        .catch(err => err);
}

// Получить все записи, к которым есть доступ у текущего пользователя
export const getUserRequests = (userId, count, status) => {
    return fetch(apiUrl + `requests/?status=${status}&userId=${userId}&count=${count}`)
        .then(res => res.json())
        .then(res => res)
        .catch(err => err);
}

// Получить список материалов, принадлежащих како-либо заявке по указанному id
export const getMaterialsByRequestId = (requestId) => {
    return fetch(apiUrl + `materials?requestId=${requestId}`)
        .then(res => res.json())
        .then(res => res)
        .catch(err => err);
}

// Удалить заявку по id
export const deleteRequestById = (requestId) => {
    return fetch(apiUrl + `deleteRequest/${requestId}`,{
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(res => res)
        .catch(err => err);
}