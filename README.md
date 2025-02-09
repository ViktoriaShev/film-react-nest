# FILM!

Найти мой проект можно по такому доменному имени: my-choice.nomorepartiesco.ru

## Установка

Мой проект развернут на сервере, где также лежат ssl, так что следует убедиться, что сервер готов к развертыванию приложения.

1. Установите зависимости
   Перед началом убедитесь, что на системе установлены:

- Docker → Установка Docker
- Docker Compose → Установка Docker Compose

- Проверьте установку:

  docker -v # Должен вывести версию Docker
  docker-compose -v # Должен вывести версию Compose

2.  Настройте .env файл
    Создайте файл .env в корне проекта, если его нет, и добавьте в него переменные окружения:

    Конфигурация Backend
    DEBUG=\* - Включает отладку (может показывать расширенные логи).
    DATABASE_DRIVER postgres - Определяет, что используется PostgreSQL как база данных.
    DATABASE_URL postgres - URL базы данных (может быть устаревшей переменной).
    DB_PORT 5432 - Порт для подключения к базе данных.
    DB_USERNAME prac - Имя пользователя базы данных.
    DB_PASSWORD strong_password - Пароль пользователя БД.
    DB_NAME prac Имя базы данных.
    DB_HOST postgres Имя контейнера PostgreSQL (используется для соединения в Docker).
    NODE_ENV production Указывает, что сервер работает в режиме продакшена.
    ✅ Эти переменные используются бэкендом для подключения к БД.

    Конфигурация базы данных PostgreSQL
    Переменная Значение Описание
    POSTGRES_USER prac - Имя пользователя PostgreSQL (создается при старте контейнера).
    POSTGRES_PASSWORD - strong_password Пароль пользователя PostgreSQL.
    POSTGRES_DB prac - Имя создаваемой базы данных.
    ✅ Эти переменные передаются в контейнер PostgreSQL и используются при его инициализации.

    Конфигурация pgAdmin
    Переменная Значение Описание
    PGADMIN_DEFAULT_EMAIL example@gmail.com - Почта для входа в pgAdmin.
    PGADMIN_DEFAULT_PASSWORD admin - Пароль для входа в pgAdmin.
    PGADMIN_CONFIG_MAX_LOGIN_ATTEMPTS 0 - Отключает лимит попыток входа (0 = бесконечно).
    ✅ Эти настройки используются для администрирования PostgreSQL через pgAdmin.

    Конфигурация frontend (Vite)
    Переменная Значение Описание
    VITE_API_URL /api/afisha - URL, по которому фронтенд отправляет запросы к API.
    VITE_CDN_URL /content/afisha - URL для загрузки статического контента (изображений, видео и т. д.).
    ✅ Эти переменные используются на фронтенде, чтобы взаимодействовать с API и загружать

3.  Убедитесь, что SQL-скрипты находятся в правильных местах и что они заполнены
    SQL-скрипты должны быть расположены в backend/test/:

    backend/
    └── test/
    ├── prac.init.sql # Скрипт создания БД и таблиц
    ├── prac.films.sql # Данные для таблицы фильмов
    ├── prac.schedules.sql # Данные для расписаний

4.  Также убедитесь, что у вас создана такая архитектура, перенесите созданные ssl ключи, наполните конфиг кодом:

    film-react-nest/
    └── nginx/
    └── nginx.conf # Конфигурация для контейнера nginx, настраивает обратный прокси сервер
    ├── ssl/ # папка, где лежат ssl ключи, что гарантируют https соединение
    └── fullchain.pem
    ├── privkey.pem

5.  Разверните проект с нуля
    Запустите команду:

    docker-compose up -d --build

    Эта команда:
    Соберет и запустит все контейнеры
    Создаст базу данных и заполнит её данными
    Раздаст фронтенд через Nginx 5. Проверьте работу контейнеров

6.  Проверка базы данных PostgreSQL
    Подключение к базе данных внутри контейнера:

    docker exec -it postgres psql -U postgres -d my_database

    Проверить список таблиц:

    \dt
    Если таблиц нет, значит, SQL-скрипты не выполнились. В таком случае:

    Подключитесь к контейнеру:
    docker exec -it postgres bash

    Убедитесь, что ваши SQL-скрипты находятся в нужной директории:
    ls /docker-entrypoint-initdb.d/

    Запустите SQL-скрипты:
    psql -U prac -d prac -f /docker-entrypoint-initdb.d/1_init.sql
    psql -U prac -d prac -f /docker-entrypoint-initdb.d/2_films.sql
    psql -U prac -d prac -f /docker-entrypoint-initdb.d/3_schedules.sql

7.  Доступ к проекту
    После успешного запуска:

    сайт доступен: ${твое доменное имя}

    pgAdmin: ${ip_server}:5050/
    Логин: admin@example.com
    Пароль: admin
    Подключение к PostgreSQL:
    Хост: postgres
    База: prac
    Пользователь: prac
    Пароль: strong_password

8.  Остановка и перезапуск проекта

    Остановить все контейнеры:
    docker-compose down

    Просмотреть логи контейнера:

    docker logs -f postgres # Логи PostgreSQL
    docker logs -f backend # Логи бэкенда
    docker logs -f nginx # Логи Nginx
