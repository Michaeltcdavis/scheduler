# Interview Scheduler

Interview scheduler is a React application that allows a user to navigate through interview times and days of the week to book, edit and cancel interviews.

The website is built with React components and uses custom hooks to separate functions communicating with its API.

The website was tested using Storybook for unit tests, jest for integration tests and Cypress for end-to-end tests.

A mock axios file was used to test how the site responds to axios call errors, so the user experience is not interrupted.

## Final Product

### Navigation

!["navigation"](/public/images/navigation.gif?raw=true "navigation")

### Add an Appointment

!["adding appointment"](/public/images/adding-appointment?raw=true "adding appointment")

### Delete an Appointment

!["deleting appointment"](/public/images/delete-appointment.gif?raw=true "deleting appointment")

### Edit an Appointment

!["editing appointment"](/public/images/edit-appointment.gif?raw=true "editing appointment")


## Setup

Install dependencies with `npm install`.

### Running Webpack Development Server

```sh
npm start
```


### Running Jest Test Framework

```sh
npm test
```

### Running Storybook Visual Testbed

```sh
npm run storybook
```

### Running Cypress Testing Software

Cypress requires a global install. This project used version 9.7.0. Once Cypress is installed separatetly, it can be run with:

```sh
npm run cypress
```
