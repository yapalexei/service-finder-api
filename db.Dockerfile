FROM postgres:12

# ENV POSTGIS_MAJOR 3
# ENV POSTGIS_VERSION 3.0.0+dfsg-2~exp1.pgdg100+1

# RUN apt-get update \
#   && apt-cache showpkg postgresql-$PG_MAJOR-postgis-$POSTGIS_MAJOR \
#   && apt-get install -y --no-install-recommends \
#   postgresql-$PG_MAJOR-postgis-$POSTGIS_MAJOR=$POSTGIS_VERSION \
#   postgresql-$PG_MAJOR-postgis-$POSTGIS_MAJOR-scripts=$POSTGIS_VERSION \
#   && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /docker-entrypoint-initdb.d
COPY ./db-scripts/initdb.sh /docker-entrypoint-initdb.d/postgis.sh
