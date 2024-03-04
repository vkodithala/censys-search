# censys-search
This repo contains a bare-bones replica of the Censys Search platform developed in Typescript and React. Censys Search is a web interface that allows you to view and analyze your existing web assets using a natural language query. 

## Project Structure
- `public/` contains all of the resources used elsewhere in the frontend
- `src/components` contains the two components used by the App.tsx file on the frontend
- `src` contains all of the core frontend logic

This project was developed entirely with Typescript using create-react-app. `npm` was used for dependency management.

## Installation
The below commands will install all the dependencies necessary for running the censys-search project. 
```
git clone https://github.com/vkodithala/censys-search.git
cd censys-search
npm install
```
Then, you must create a `.env` file in the root directory of `censys-search` and add in your API key and secret from the Censys Search platform (https://search.censys.io/) in the following format:
```
REACT_APP_API_KEY=YOUR_API_KEY
REACT_APP_API_SECRET=YOUR_API_SECRET
```
Run the following command in the root directory of `censys-search` to run the web interface. This will run on https://localhost:3000 by default.
```
npm run start
```
## Manual Testing Framework
1. Navigate to the `censys-search` directory and run the command `npm run start`. Make sure that you have followed the installation instructions before doing so. Then, open up your web broswer of choice and navigate https://localhost:3000. You should see the following: ![Screenshot 2024-03-04 at 1 32 33 AM](https://github.com/vkodithala/censys-search/assets/116049637/e25d96fe-a54a-4d42-b82d-911e0c4ebe2f)
2. Enter the query "services.service_name: HTTP" into the search bar and press "Search". Make sure that the page number is set to 1. The search button should become a lighter shade for a few seconds before you see the following:
![Screenshot 2024-03-04 at 1 35 25 AM](https://github.com/vkodithala/censys-search/assets/116049637/7e9e5310-7876-4254-8f07-638a0284ec61)
3. Try changing the page number to something different using the input to the right of the search button. You should see the page update with each increment/decrement. If you've made it here, congrats! Your code is running properly.
