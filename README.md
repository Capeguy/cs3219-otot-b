# Task B
## Submission Information

| Option | Description |
| ------ | ----------- |
| Name   | Lau Jun Hao Benjamin |
| Matriculation Number | A01840840B |
| Link to GitHub Repository | https://github.com/Capeguy/cs3219-otot-b |
| Instructions | [Below](#foo) |
| Other Relevant Learnings | null |

- [Task B](#task-b)
  - [Submission Information](#submission-information)
  - [Task B1](#task-b1)
    - [Postman on Local](#postman-on-local)
      - [Base URL](#base-url)
      - [GET to List all Bobs](#get-to-list-all-bobs)
      - [POST to Create a Bob](#post-to-create-a-bob)
      - [GET after Creating a Bob](#get-after-creating-a-bob)
      - [PATCH to update a Bob](#patch-to-update-a-bob)
      - [DELETE to Delete a Bob](#delete-to-delete-a-bob)
    - [Postman on Deployed Endpoints](#postman-on-deployed-endpoints)
      - [GET to List all Bobs](#get-to-list-all-bobs-1)
      - [POST to Create a Bob](#post-to-create-a-bob-1)
      - [GET after Creating a Bob](#get-after-creating-a-bob-1)
      - [PATCH to update a Bob](#patch-to-update-a-bob-1)
      - [DELETE to Delete a Bob](#delete-to-delete-a-bob-1)
    - [Handling of Edge Cases and Error-Resiliency](#handling-of-edge-cases-and-error-resiliency)
      - [Creating a Bob with Empty Name](#creating-a-bob-with-empty-name)
      - [Updating a Bob with Invalid ID](#updating-a-bob-with-invalid-id)
      - [Updating a Deleted Bob](#updating-a-deleted-bob)
      - [Using invalid HTTP Methods](#using-invalid-http-methods)
        - [PURGE](#purge)
        - [HEAD](#head)
  - [Task B2](#task-b2)
    - [Successful Testing of API using Jest](#successful-testing-of-api-using-jest)
    - [Use of CI Tools - Travis](#use-of-ci-tools---travis)
      - [Travis Configuration File](#travis-configuration-file)

## Task B1

### Postman on Local

#### Base URL

![Base URL](images/b1.0.png)

#### GET to List all Bobs

![GET to List all Bobs](images/b1.1.png)

#### POST to Create a Bob

![POST to Create a Bob](images/b1.2a.png)

#### GET after Creating a Bob

![GET after Creating a Bob](images/b1.2b.png)

#### PATCH to update a Bob

![PATCH to update a Bob](images/b1.3.png)

#### DELETE to Delete a Bob

![DELETE to Delete a Bob](images/b1.4.png)

### Postman on Deployed Endpoints

![Base URL](images/b1.5.png)

#### GET to List all Bobs

![GET to List all Bobs](images/b1.6.png)

#### POST to Create a Bob

![POST to Create a Bob](images/b1.7a.png)

#### GET after Creating a Bob

![GET after Creating a Bob](images/b1.7b.png)

#### PATCH to update a Bob

![PATCH to update a Bob](images/b1.8.png)

#### DELETE to Delete a Bob

![DELETE to Delete a Bob](images/b1.9.png) 

### Handling of Edge Cases and Error-Resiliency 

#### Creating a Bob with Empty Name

![Creating a Bob with Empty Name](images/b1.10.png)

#### Updating a Bob with Invalid ID

![Creating a Bob with Empty Name](images/b1.11.png)

#### Updating a Deleted Bob

![Creating a Bob with Empty Name](images/b1.12.png)

#### Using invalid HTTP Methods

##### PURGE

![Creating a Bob with Empty Name](images/b1.13a.png)

##### HEAD

![Creating a Bob with Empty Name](images/b1.13b.png)

## Task B2

### Successful Testing of API using Jest

Command: 

`yarn test` or `node --inspect-brk node_modules/.bin/jest --runInBand`

Tests are located in: `/tests/`

Database is initialised and cleared before each test via `/tests/utils/setupTestDB.js`

Custom Tests are located in `/tests/integration/bob.test.js`

Test Run Outputs

![Test Run Output 1](images/b2.1a.png)
![Test Run Output 2](images/b2.1b.png)

### Use of CI Tools - Travis

#### Travis Configuration File

![Travis File](images/b2.2.png)

Lines 4-5: State that the job should run on Node version 12

Line 9-11: State that the job should only run on the `main` branch

Line 7: State the Services required (i.e. Mongo DB)

Line 20: Checks that the files are linted

Line 21: Start the tests ( `yarn test` which runs `jest -i --colors --verbose` as defined in package.json)

Line 22: Upon job success, generate coverage report