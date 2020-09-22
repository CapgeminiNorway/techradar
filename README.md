
# Capgemini Tech Radar

>NB! This project is inactive. It was maintained by Jørgen Lybeck Hansen (jorgenlybeck94@gmail.com) which sadly does not work at Capgemini anymore. The project also had to be taken down from AWS because of his Capgemini-AWS account being closed. However, AWS Amplify which was used to build this project works with AWS CloudFormation files. This means that all setup for this project still is available under /amplify/backend/*/*cloudformation-template.json files.
>
>You can install this locally and get the React GUI running pretty easily. Setting up the AWS resources can also easily be done by reading the AWS Amplify documentation :rocket:


This project was created with and [AWS Amplify](https://docs.amplify.aws)

## Installation

### AWS

Install [AWS Amplify (see tutorial here)](https://docs.amplify.aws/cli/start/install)

Follow the installation guide to setup the AWS Amplify CLI on your computer. 

There are 2 environments set up; Master, and Development. These are used to connect to the backend services, such as DynamoDB, Lambda functions, AppSync/GraphQL server and Cognito authentication. Therefore, it's important to set up the correct environment, so that developers doesn't make changes to the production environment. 

You also need the AWS Amplify environments set up to be able to actually log in.

**NB! There is a set up file missing in the Git, for security reasons. Ask Jørgen about this**

Get familiar with the [AWS Amplify teams environment here](https://docs.amplify.aws/cli/teams/overview)

Flow:
* I recommend using the Development branch locally, with the AWS Amplify configuration for the Development environment. 
* Then commit your changes to development. 
* Create a PR to master
* Have someone review your code, e.g. Jørgen Lybeck Hansen who'm can be notified on Teams or by mail
* PR is accepted to master, it will then build the production build through AWS


### Environments

Development: https://development.d35pmvnprdsmg2.amplifyapp.com/
Master: https://www.cop-tech-radar.com/

The goal is to always use Development locally, to test changes. 


## React
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Packages

The techradar app is heavily depending on these npm libraries
* Redux
* Styled Components
* Jest 
* Framer Motion (animations)
* React Router DOM
* AWS Amplify
* and more... 

### Scripts 

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
