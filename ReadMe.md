# Performance-and-Load-Testing-with-K6-and-Grafana

## Repository

This repository is all about Performance, Load testing the User Apis from Swagger and Bookings Api from Restful-Booker and it contains testing a postgres db.

### Database Testing

For testing the PostgreSQL Database, follow the steps:

1. Install pgAdmin from: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads.
2. Configure your server for `localhost` with default `port:5432`, you can change the port.
3. Create a database named as `your_database`, in this case it's `library`.
4. Perform the following query on your database:

`CREATE TABLE books (book_id serial PRIMARY KEY,title text,author text,publication_year integer);` : to create a table named books.

Make sure to place `books.csv` in a folder where PostgreSQL can easily access it. Now you can copy that csv data into the table by the query:

`COPY books (title, author, publication_year) FROM 'your_postgres_path/books.csv' DELIMITER ',' CSV HEADER`

## K6

K6 is an open-source performance testing tool used for load testing and performance testing of web applications, APIs and can be utilized for testing the performance of Databases as well. It's designed to be user-friendly and scriptable, making it a popular choice for developers and DevOps teams to ensure the reliability and scalability of their applications.

### Setting up K6

1. If you use the Chocolatey package manager you can install the unofficial k6 package with: `choco install k6`

   or

2. If you use the Windows Package Manager, install the official packages from the k6 with: `winget install k6 --source winget`

### K6 Script Blocks:

The three main blocks that a k6 script has are:

`export function setup() {}` : This is an optional function that is executed only once at the start for meeting the prerequisites of the test.

`export default function () {}` This is a default function and if there's no setup() then this function is called.

`export function teardown() {}` This is an optional function that is executed only once at the end for meeting the postrequisites of the test.

## Executing a K6 script

### Without external node libraries

For executing the script which contains no node libraries you can use the following command:

`k6 run <your_scriptname>.js`. For example: `k6 run k6.js`

### With external node libraries

If your script uses any node modules/libraries like in case of testing a database, you will need an external k6 extension

#### K6 Extensions

Since K6 is written in Go so it has no support for external node libraries. For that you need to go throught the following steps:

1. Install Go globally on your local machine. For Go installation, please visit: https://go.dev/doc/install.

2. Set up your environment variables. For that you can: 1. Create your project folder inside the folder where Go is installed. 2. Add the path of your project folder in User Defined Variables. 3. Add the path of the bin folder within Go folder to System Variables.

3. Install support for k6 extension with the following command:

`go install go.k6.io/xk6/cmd/xk6@latest`

This will install the latest version of k6 extensions.

4. `bin` folder would be created inside you project folder. Add this path to the User Defined Variables as well.

Now you can run the k6 script through the following command: `./k6 run <your_scriptname>.js`

## Grafana Cloud

To run you tests on Grafana cloud, you need to:

1. Create Grafana Account.
2. Create New Project under Performance testing.
3. Generate a new Api token and authenticate by executing the following command:

`k6 login cloud — token <YOUR_API_TOKEN>`

4. You can run your on Grafana Cloud tests by executing the following command:

`./k6 run -o cloud <your_scriptname>.js` and `k6 run -o cloud <your_scriptname>.js` if you are not using any extension.

### Reporting

Running on cloud generates dashboard but if you want to use a separate html report locally. You can import `htmlReport` from: https://raw.githubusercontent.com/benc-uk/k6-reporter/2.2.0/dist/bundle.js as well. You can use any other html reporter.
