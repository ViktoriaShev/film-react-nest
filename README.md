# FILM!

**Доменное имя:**  
Проект доступен по адресу: [my-choice.nomorepartiesco.ru](https://my-choice.nomorepartiesco.ru)

---

## 📦 Установка

Проект развернут на сервере с использованием SSL, убедитесь, что сервер готов к развертыванию приложения и настройке HTTPS.

### Установите зависимости

Перед началом убедитесь, что на системе установлены следующие компоненты:

- **Docker**: [Установка Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Установка Docker Compose](https://docs.docker.com/compose/install/)

Проверьте успешность установки командой:

```bash
docker -v  # Должен вывести версию Docker
docker-compose -v  # Должен вывести версию Compose
```
### Настройте .env файл

Создайте файл .env в корне проекта, если его нет, и добавьте следующие переменные окружения:

#### Конфигурация Backend:
DEBUG=* — Включает отладку (может показывать расширенные логи). \
DATABASE_DRIVER=postgres — Используется PostgreSQL как база данных.\
DATABASE_URL=postgres — URL базы данных (может быть устаревшей переменной).\
DB_PORT=5432 — Порт для подключения к базе данных.\
DB_USERNAME=prac — Имя пользователя базы данных.\
DB_PASSWORD=strong_password — Пароль пользователя БД.\
DB_NAME=prac — Имя базы данных.\
DB_HOST=postgres — Имя контейнера PostgreSQL (используется для соединения в Docker).\
NODE_ENV=production — Режим работы сервера (продакшн).\

Эти переменные используются бэкендом для подключения к базе данных.

#### Конфигурация PostgreSQL:
POSTGRES_USER=prac — Имя пользователя PostgreSQL (создается при старте контейнера).\
POSTGRES_PASSWORD=strong_password — Пароль пользователя PostgreSQL.\
POSTGRES_DB=prac — Имя создаваемой базы данных.\

Эти переменные передаются в контейнер PostgreSQL и используются при его инициализации.

#### Конфигурация pgAdmin:
PGADMIN_DEFAULT_EMAIL=example@gmail.com — Почта для входа в pgAdmin.\
PGADMIN_DEFAULT_PASSWORD=admin — Пароль для входа в pgAdmin.\
PGADMIN_CONFIG_MAX_LOGIN_ATTEMPTS=0 — Отключает лимит попыток входа (0 = бесконечно).\

Эти настройки используются для администрирования PostgreSQL через pgAdmin.

#### Конфигурация Frontend (Vite):
VITE_API_URL=/api/afisha — URL, по которому фронтенд отправляет запросы к API.\
VITE_CDN_URL=/content/afisha — URL для загрузки статического контента (изображений, видео и т. д.).\

Эти переменные используются на фронтенде для взаимодействия с API и загрузки контента.

### Разместите SQL-скрипты
SQL-скрипты должны быть расположены в папке backend/test/, в которой будут следующие файлы:

```bash
backend/
 └── test/
    ├── prac.init.sql     # Скрипт создания БД и таблиц
    ├── prac.films.sql    # Данные для таблицы фильмов
    ├── prac.schedules.sql  # Данные для расписаний
```

### Настройте Nginx
Убедитесь, что у вас создана следующая структура для конфигурации Nginx и SSL:

```bash
film-react-nest/
 └── nginx/
    ├── nginx.conf         # Конфигурация для контейнера nginx (обратный прокси)
    └── ssl/               # Папка, где хранятся SSL ключи
        ├── fullchain.pem  # SSL сертификат
        └── privkey.pem    # Приватный ключ
```

### Развертывание проекта
Для развертывания проекта используйте следующую команду:

```bash

docker-compose up -d --build

```
Эта команда:

Соберет и запустит все контейнеры.\
Создаст базу данных и заполнит её данными.\
Раздаст фронтенд через Nginx.\

## Проверка работы контейнеров
Проверка базы данных PostgreSQL
Подключение к базе данных внутри контейнера:

bash

docker exec -it postgres psql -U postgres -d my_database
Проверьте список таблиц:

``` bash

\dt
Если таблиц нет, значит SQL-скрипты не выполнились. В таком случае:
```
Подключитесь к контейнеру:

```bash

docker exec -it postgres bash
Убедитесь, что ваши SQL-скрипты находятся в нужной директории:
```
```bash

ls /docker-entrypoint-initdb.d/
```
Запустите SQL-скрипты:

``` bash

psql -U prac -d prac -f /docker-entrypoint-initdb.d/1_init.sql
psql -U prac -d prac -f /docker-entrypoint-initdb.d/2_films.sql
psql -U prac -d prac -f /docker-entrypoint-initdb.d/3_schedules.sql
```
### Доступ к проекту
После успешного запуска:

Сайт доступен по адресу: https://my-choice.nomorepartiesco.ru\
Для доступа к pgAdmin: http://<ip_сервера>:5050/\
Логин: admin@example.com\
Пароль: admin\
Подключение к PostgreSQL:\
Хост: postgres\
База: prac\
Пользователь: prac\
Пароль: strong_password\

### ⏹️ Остановка и перезапуск проекта
Для остановки всех контейнеров используйте команду:

``` bash

docker-compose down
Просмотреть логи контейнеров:
```
```bash

docker logs -f postgres   # Логи PostgreSQL
docker logs -f backend    # Логи бэкенда
docker logs -f nginx      # Логи Nginx
```
🚀 Убедитесь, что все шаги выполнены правильно, и приложение должно быть успешно запущено. В случае проблем, проверьте логи для диагностики.
## Backend Stack (film):

### NestJS:
@nestjs/core: ^10.0.0 \
@nestjs/common: ^10.0.0 \
@nestjs/mongoose: ^10.1.0\
@nestjs/typeorm: ^10.0.2\

### ORM/Database:
Mongoose: ^8.9.2\
TypeORM: ^0.3.20\

### Testing:
Jest: ^29.5.0\

### TypeScript:
TypeScript: ^5.3.3\

## Frontend Stack (film):

### React:
react: ^18.3.1\
react-dom: ^18.3.1\

### Vite:
vite: ^5.3.1\
@vitejs/plugin-react: ^4.3.1\

### Storybook:
@storybook/react: ^8.1.11\

### TypeScript:
typescript: ^5.2.2\
