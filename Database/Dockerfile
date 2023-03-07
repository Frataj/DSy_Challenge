FROM postgres:15.2-alpine
ENV POSTGRES_USER root
ENV POSTGRES_PASSWORD root
ENV POSTGRES_DB test_db
COPY *.sql /docker-entrypoint-initdb.d/