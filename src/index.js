const logger = require("./logger");

const employee = {
  name: "employee_name",
};

const registerEmployee = (employee) => {
  console.log(`Registering employee: ${employee.name}`);
};

const sendWelcomeEmail = (employee) => {
  if (!employee.email) {
    throw new Error("Email address not provided");
  }
  console.log(`Sending welcome email to: ${employee.email}`);
};

const sendAnalytics = () => {
  console.log("Sending analytics data...");
};

const main = () => {
  try {
    sendAnalytics();
    registerEmployee(employee);
    sendWelcomeEmail(employee);
  } catch (error) {
    logger.logError(error, { function: "main", employee: employee.name });
  }
};

main();
