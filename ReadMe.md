# Performance-and-Load-Testing-with-K6-and-Grafana

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

For executing the script you can use the following command:

`k6 run <your_scriptname>.js`. For example: `k6 run k6.js`
