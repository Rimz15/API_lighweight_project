# API Automation Framework

## Project Overview
This project is a lightweight API automation framework built using JavaScript and Cypress. It automates the testing of Forex conversion rates from the Bank of Canada's valet API.

## How to Run the Tests
1. **Clone the Repository**:
   git clone https://github.com/Rimz15/API_lighweight_project/tree/main
2) Navigate to the Project Directory:   
cd my-api-automation
3) Install dependencies
npm install
4) Open cypress test runner
npx cypress open
5) Run the tests 
In the Cypress Test Runner, click on the test file (forex.spec.js) to run the tests.
For reporting use npx cypress run
and reports folder will be created inside cypress

Observations
The average CAD to USD conversion rate for the last 10 weeks is calculated correctly.
Negative scenarios, such as invalid currency codes, are handled appropriately.

Additional steps
1) Created a Git repository
2) Implement more negative test scenarios to thoroughly test the API's error-handling capabilities.
3) Generate an HTML report using a suitable third-party plugin or library.
4) Deleted the cypress.json file as cypress no longer supports cypress.json file and added the base url in cypress.config.json file