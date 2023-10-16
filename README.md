# content-service
Content Micro Service for Pratilipi Assignment

## Usage
### initiate
```
npm i
```
```
npm docker:compose
```
in another terminal
```
npm run start
```

## Database used
POSTGRESQL

## Swagger Doc
```
http://localhost:9080/doc.html
```

## for database:
```
create database pratilipi_content_db;
create user pratilipi with password 'pratilipi';
grant all privileges on database "pratilipi_content_db" to pratilipi;
```
### to add schema
```
psql -U pratilipi -d pratilipi_content_db -f ./schema.sql
```

## Postman
```
https://api.postman.com/collections/15620684-41de7e28-4972-444a-ab2f-56ad60b7373a?access_key=PMAT-01HCV0VXPXJ41S456FVB5T41ZM
```