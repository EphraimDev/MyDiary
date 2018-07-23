# MyDairy

MyDiary is an online journal where users can pen down their thoughts and feelings.

# Build Status

[![Build Status](https://travis-ci.org/EphraimDev/MyDiary.svg?branch=develop)](https://travis-ci.org/EphraimDev/MyDiary)
[![Coverage Status](https://coveralls.io/repos/github/EphraimDev/MyDiary/badge.svg?branch=develop)](https://coveralls.io/github/EphraimDev/MyDiary?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/9b8e520c8a2cc9c00392/maintainability)](https://codeclimate.com/github/EphraimDev/MyDiary/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/9b8e520c8a2cc9c00392/test_coverage)](https://codeclimate.com/github/EphraimDev/MyDiary/test_coverage)

### Style guide

[Airbnb ](https://github.com/airbnb/javascript)(Javascript style guide)

### Techn stack

- [Nodejs](https://nodejs.org/en/)
- [Expressjs](https://expressjs.com/)
- [Mocha](https://mochajs.org/)
- [Chai](http://www.chaijs.com/)

### Features

- Users can create an account and log in.
- Users can view all entries to their diary.
- Users can view the contents of a diary.
- Users can add or modify an entry.

## Installing

#### Prerequisites

Ensure you have **NodeJS** installed by entering `node -v` on your terminal
If you don't have **NodeJS** installed go to the [NodeJS Website](http://nodejs.org), and follow the download instructions

To install this app

```
git clone https://github.com/EphraimDev/MyDiary.git
```

And install the required dependencies

```
npm install
```

Run server

```
npm start
```

MyDiary app listening on port 4000!

## Running the tests

To run test cases

```
npm test
```

### Working Routes

<table>
<thead>
<tr>
<th>Endpoint</th>
<th>Functionality</th>
</tr>
</thead>
<tbody>
<tr>
<td>GET api/v1/entries</td>
<td>Fetch all entries</td>
</tr>
<tr>
<td>GET api/v1/entries/:entryId</td>
<td>Fetch a single entry</td>
</tr>
<tr>
<td>POST api/v1/entries</td>
<td>Create an entry</td>
</tr>
<tr>
<td>PUT api/v1/entries/:entryId</td>
<td>Modify an entry</td>
</tr>
</tbody></table>

## License

This projects is under the ISC LICENSE

## Author 

[Ephraim Aigbefo](https://github.com/EphraimDev)

## Acknowledgements

- [Andela](http://andela.com)
- [Google Search](https://google.com)
- [Stackoverflow](stackoverflow.com)

