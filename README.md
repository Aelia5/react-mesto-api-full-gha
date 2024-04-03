[![Статус тестов](../../actions/workflows/tests.yml/badge.svg)](../../actions/workflows/tests.yml)

# **Проект Mesto: фронтенд + бэкенд**

## _Учебный проект_ [Яндекс.Практикума](https://practicum.yandex.ru/)

## Автор: Ольга Любимова

Репозиторий включает фронтенд и бэкенд приложения, в котором пользователь может регистрироваться, авторизоваться, добавлять фотографии своих любимых мест в России и удалять их. Кроме того, он видит карточки, загруженные другими пользователями, и может ставить им лайки. Также у пользователя есть возможность редактировать информацию в своём профиле.  

Бэкенд расположен в директории `backend/`, а фронтенд - в `frontend/`. 
  
### Бэкенд

**Реализован следующий функционал:**

1. Получение списка пользователей из базы данных.
2. Получение пользователя по id.
3. Создание нового пользователя.
4. Авторизация пользователя. 
5. Обновление профиля пользователя.
6. Получение карточек из базы данных.
7. Создание новой карточки.
8. Удаление карточки. 
9. Добавление и снятие лайков карточкам.
10. Обработка ошибок.

**Реализованы следующие технологии:**

1. Разработка на express.js.
2. База данных MongoDB.

### Фронтенд

**Реализован следующий функционал:**

1. Загрузка начальных карточек и информации о пользователе с сервера.
2. Открытие фотографий для просмотра.
3. Редактирование информации о пользователе: открытие и закрытие формы, отправка данных на сервер.
4. Изменение аватара пользователя: открытие и закрытие формы, отправка данных на сервер.
5. Добавление новых карточек: открытие и закрытие формы, отправка данных на сервер.
6. Добавление и снятие лайков карточкам, обновление счётчика лайков.
7. Удаление карточек, загруженных пользователем.
8. Регистрация на сайте.
9. Авторизация на сайте.

**Реализованы следующие технологии:**

1. Флексбокс-вёрстка.
2. Грид-вёрстка.
3. Адаптивная вёрстка с использованием медиазапросов:

- страница свёрстана под два макета: 320px, 1280px;
- реализовано плавное сжатие и расширение элементов между точками перелома;
- использованы отзывчивые шрифты;

4. Анимация: прозрачность при наведении мыши, плавное появление и исчезновение попапов.
5. Локальное подключение шрифта (Inter) и его сглаживание.
6. Создание проекта с помощью библиотеки React.
7. Взаимодействие с сервером: отправка запросов методом GET, POST, PATCH, DELETE.
8. Маршрутизация с защитой маршрутов, доступных только авторизованным пользователям.
9. Сохранение токена в локальном хранилище.

**Используемые языки: HTML, CSS, JavaScript, JSX.**


<!--## Ссылки на проект

IP 84.201.178.216

Frontend https://aelia.students.nomoredomainsmonster.ru/

Backend https://api.aelia.students.nomoredomainsmonster.ru/-->
