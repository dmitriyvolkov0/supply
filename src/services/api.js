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

// Установить статус заявки
export const setStatus = (requestId, statusId) => {
    return fetch(apiUrl + `setRequestStatus`,{
        method: 'PUT',
        body: JSON.stringify({requestId: requestId, statusId: statusId})
    })
        .then(res => res.json())
        .then(res => res)
        .catch(err => err);
}

// Указать остатки материалов на складе
export const setBalances = (materials) => {
    return fetch(apiUrl + `setBalances`,{
        method: 'PUT',
        body: JSON.stringify(materials)
    })
        .then(res => res.json())
        .then(res => res)
        .catch(err => err);
}

// Получить информацию о пользователе по id заявки
export const getUserByRequestId = (requestId) => {
    return fetch(apiUrl + `getUserByRequestId/${requestId}`)
        .then(res => res.json())
        .then(res => res)
        .catch(err => err);
}

// Создать заявку
export const createRequest = (requestFormData) =>{
    return fetch(apiUrl + `createRequest`, {
        method: 'POST',
        body: requestFormData
    })
        .then(res => res.json())
        .then(res => res)
        .catch(err => err);
}

// Получить склады
export const getWarehouses = () =>{
    return fetch(apiUrl + `warehouses`)
        .then(res => res.json())
        .then(res => res)
        .catch(err => err);
}

// Указать на какой склад пришли материалы
export const setWarehouse = (requestId, warehouseId) => {
    return fetch(apiUrl + `setWarehouse`,{
        method: 'PUT',
        body: JSON.stringify({requestId: requestId, warehouseId: warehouseId})
    })
        .then(res => res.json())
        .then(res => res)
        .catch(err => err);
}

// Получить заявку по id
export const getRequestById = (requestId) =>{
    return fetch(apiUrl + `requests/${requestId}`)
    .then(res => res.json())
    .then(res => res)
    .catch(err => err);
}

// Получить файл по id материала
export const getFilesByMaterialId = (materialId) => {
    return fetch(apiUrl + `files?materialId=${materialId}`)
        .then(res => res.json())
        .then(res => res)
        .catch(err => err);
}