#!/bin/bash

set -o allexport
source ../.env
set +o allexport

docker run --rm \
    -v ${PWD}:/liquibase/changelog liquibase/liquibase \
    --url="jdbc:postgresql://host.docker.internal:5432/$DB_DATABASE?currentSchema=myschema" \
    --changeLogFile=changelog.yml \
    --liquibase-schema-name=public \
    --default-schema-name=public \
    --username=$DB_USERNAME \
    --password=$DB_PASSWORD \
    update
