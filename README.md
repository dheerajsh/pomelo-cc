# pomelo coding challend

## Description of Task
In the first part of this assignment, you'll need to create a [HapiJS application](https://hapi.dev/).

- The application needs to have an endpoint that takes a body containing a `JSON` document following the format presented below under [Appendix 1 Input](#appendix-1-input) as one of the parameters.
- Upon receiving a call, the [HapiJS](https://hapi.dev/) application should run an algorithm to turn the input into the format shown under [Appendix 2 Output](#appendix-2-output). The `JSON` document needs to be re-organized by moving children into the correct parents.
- The application should then return the formatted document in a `JSON` document.

#### Algorithm Details

You'll need to write an algorithm in JavaScript in your [HapiJS](https://hapi.dev/) application to transform the `JSON` input below into the `JSON` output. Each child should be placed in the `children` array of its parent (as defined by the `parent_id`).

#### Appendix 1 Input

```json
{"0":
  [{"id": 10,
    "title": "House",
    "level": 0,
    "children": [],
    "parent_id": null}],
 "1":
  [{"id": 12,
    "title": "Red Roof",
    "level": 1,
    "children": [],
    "parent_id": 10},
   {"id": 18,
    "title": "Blue Roof",
    "level": 1,
    "children": [],
    "parent_id": 10},
   {"id": 13,
    "title": "Wall",
    "level": 1,
    "children": [],
    "parent_id": 10}],
 "2":
  [{"id": 17,
    "title": "Blue Window",
    "level": 2,
    "children": [],
    "parent_id": 12},
   {"id": 16,
    "title": "Door",
    "level": 2,
    "children": [],
    "parent_id": 13},
   {"id": 15,
    "title": "Red Window",
    "level": 2,
    "children": [],
    "parent_id": 12}]}
```

#### Appending 2 Output

```json
[{"id": 10,
  "title": "House",
  "level": 0,
  "children":
   [{"id": 12,
     "title": "Red Roof",
     "level": 1,
     "children":
      [{"id": 17,
        "title": "Blue Window",
        "level": 2,
        "children": [],
        "parent_id": 12},
       {"id": 15,
        "title": "Red Window",
        "level": 2,
        "children": [],
        "parent_id": 12}],
     "parent_id": 10},
    {"id": 18,
     "title": "Blue Roof",
     "level": 1,
     "children": [],
     "parent_id": 10},
    {"id": 13,
     "title": "Wall",
     "level": 1,
     "children":
      [{"id": 16,
        "title": "Door",
        "level": 2,
        "children": [],
        "parent_id": 13}],
     "parent_id": 10}],
  "parent_id": null}]
```

### Part 2

#### Instructions

Use the [GitHub Search API](https://docs.github.com/en/free-pro-team@latest/rest/guides/traversing-with-pagination) with pagination to find all the repositories that match the query `nodejs`. Display results 10 by 10 in a view in the [HapiJS](https://hapi.dev/) application you built in Step 1. Results should be displayed in a table (it doesn't have to look good) and, the pagination should be fully functional on the front-end side.
Note: this repo contains only API's for search the frontend part is developed in a separate repo [pomelo-cc-frontend](https://github.com/dheerajsh/pomelo-cc-frontend)

### Guidelines

- Don't forget documentation (inline, swagger, etc.).
- The pagination between your local application and the GitHub results should be synced.

## Installation local

```bash
# using docker
$ docker-compose build

# without using docker
$ npm install
$ npm run build
```

## Running the app local

```bash
# development using docker compose
$ docker-compose up

# development without using docker compose
$ npm run start

# watch mode
$ npm run start:dev
```

## Running test
```bash
$ npm run test
```

## Production Environment 

```bash
# production mode with docker
$ docker build -t pomeloChallenge:prod .
$ docker run -p4000:4000 -t pomeloChallenge:prod
```
### API Documentation is available through SWAGGER
Swagger api documentation can be access of http://localhost:4000/docs once the application is started
## Stay in touch
Please reach out to [Dheeraj](https://github.com/dheerajsh)
## License

This is [MIT licensed](LICENSE).
