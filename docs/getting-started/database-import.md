# Introduction

This article describes the process of importing existing database in D2C.

## First step. Creating a backup

The easiest way is to use [backup and restore features](platform/backups/).

### MySQL, MariaDB, Percona

To make a backup of **all databases** connect to a host and execute:

```bash
mysqldump --skip-lock-tables --ignore-table mysql.innodb_index_stats --ignore-table mysql.innodb_table_stats --hex-blob --all-databases | gzip > backup.gz
```

To make a backup of specific database(s):

```bash
mysqldump --skip-lock-tables --hex-blob --databases db1 db2 db3 | gzip > backup.gz
```

### MongoDB

To make a backup of **all databases** connect to a host and execute:

```bash
mongodump --gzip --archive=backup.gz
```

To make a backup of specific database(s):

```bash
mongodump --db db1 --gzip --archive=backup.gz
```

### PostgreSQL

To make a backup of **all databases** connect to a host and execute:

```bash
pg_dumpall --clean | gzip > backup.gz
```

To make a backup of specific database(s):

```bash
pg_dump --clean db1 | gzip > backup.gz
```

## Second step. Restoring

To [restore a database](platform/backups/#how-to-restore-from-a-backup) follow the next steps:

1. Create a database service or open an existing one
2. Click **Restore** button
3. Choose a provider
4. Specify a path to a backup and the name of archive
5. Click **Restore data**
