const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-27",
  headers: {
    authorization: "4d005c46-ea96-417e-ac32-9143ae88b3d7",
    "Content-Type": "application/json",
  },
};

function getResponseData(res) {
  if (res.ok) {
    return res.json();
  }

  // если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.status}`);
}

/**
 * Получает от сервера профиль пользовтеля по токену
 *
 * @return Данные пользователя
 */
export function getUserProfile() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => {
    return getResponseData(res);
  });
}
/**
 * Редактирует профиль пользователя
 *
 * @return Обновленные данные пользователя
 */
export function patchUserProfile(User) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: User.name,
      about: User.about,
    }),
  }).then((res) => {
    return getResponseData(res);
  });
}
/**
 * Получает актульный массив карточек с сервера
 *
 * @return Массив обьектов карточек
 */
export function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    return getResponseData(res);
  });
}

/**
 * Редактирует аватар пользователя
 *
 * @return Обновленные данные пользователя
 */
export function patchUserAvatar(avatarLink) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  }).then((res) => {
    return getResponseData(res);
  });
}

/**
 * Добавляет на сервер новую карточку
 *
 * @param Объект новой карточки
 * @return Данные созданной на сервере карточки
 */
export function postCard(Card) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: Card.name,
      link: Card.link,
    }),
  }).then((res) => {
    return getResponseData(res);
  });
}

/**
 * Удаляет созданную пользователем на сервере карточку по ее id
 *
 * @param id карточки
 */
export function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    return getResponseData(res);
  });
}

/**
 * Добавляет лайк на карточку по ее id
 *
 * @param id карточки
 * @return Обновленные данные карточки
 */
export function likeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => {
    return getResponseData(res);
  });
}

/**
 * Убирает лайк с карточки по ее id
 *
 * @param id карточки
 * @return Обновленные данные карточки
 */
export function dislikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    return getResponseData(res);
  });
}
