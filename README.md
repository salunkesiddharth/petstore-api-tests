# Petstore API Automation

This is an API automation project focused on automating the `/pet` endpoint of [Swagger Petstore](https://petstore.swagger.io/#/). The purpose of this project is to provide automated tests for the `/pet` endpoint, ensuring API stability and proper functioning of various endpoints.

## Tech Stack

- **Programming Language**: Node.js
- **HTTP Client**: Axios
- **Testing Framework**: Mocha
- **Assertion Library**: Chai
- **CI/CD**: GitHub Actions

## Project Structure

The project is organized to facilitate ease of adding new tests and enhancing test coverage. The primary focus is on covering various scenarios for the `/pet` endpoint of the API.

The folder structure in the repo consists of a `tests` directory, which contains two subdirectories:

1. **api**: This subdirectory contains test files related to API endpoints. It includes various test scripts that verify the functionality, reliability, and behavior of the API. Currently, it is focused on the `/pet` endpoint of the Swagger Petstore.

2. **data**: This subdirectory holds test data used by the API tests. The files here may define sample request payloads, expected response structures, or any other test-related data needed for performing different scenarios, such as positive and negative test cases. Currently, it hosts an image file that is used to send an api request to the /uploadImage endpoint

This structure helps keep test scripts organized and maintains a clear separation between the test logic (`api`) and the data (`data`).

## Getting Started

### Prerequisites

- Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:salunkesiddharth/petstore-api-tests.git
   ```
2. Navigate into the project directory:
   ```bash
   cd petstore-api-tests
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running Tests

To run the tests locally:

```bash
npm test
```

### CI/CD

- The project uses GitHub Actions to run the tests automatically on pull requests (PRs).
- The CI workflow ensures that all tests are executed in a controlled and consistent environment before any code is merged.
- The tests can also be triggered manually using a `workflow_dispatch` event. This has been made possible to try out only because I've changed the default branch from `main` to `feature/SiddharthSalunke-CBATest`. You can try to trigger the tests by going [here](https://github.com/salunkesiddharth/petstore-api-tests/actions/workflows/pull-request.yml) and then clicking on `Run workflow` and selecting the branch `feature/SiddharthSalunke-CBATest`

## Future Scope

1. **Mocking Solution**:

   - Integrate a mock server to run tests against mocked API responses at the PR level.
   - Once the code is merged into the main branch and deployed to an environment, tests will run against the real API (`petstore.swagger.io/v2`).
   - This approach will mitigate issues related to third-party API dependencies, ensuring more reliable test execution.

2. **Negative Scenarios**:

   - Extend test coverage to include negative scenarios and more comprehensive testing.
   - The mocking solution will enable running both positive and negative tests efficiently at the PR stage.
   - Post-deployment tests will focus on the happy or critical path, keeping them lean and efficient.

3. **Slack Notifications**:

   - Implement Slack notifications to alert the team of build failures, enhancing communication and faster issue resolution.

4. **Reporting**:
   - Work on adding comprehensive test reporting for better insights into test results and coverage.
