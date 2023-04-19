# invoiceMSSQLTest
import cli command for migration 
# creating new migration file for column update delete and change 
1 npx sequelize-cli migration:generate --name change-payemnt-colums
# run migration file 
npx sequelize-cli db:migrate
# undo migration file
npx sequelize-cli db:migrate:undo (--name) 
