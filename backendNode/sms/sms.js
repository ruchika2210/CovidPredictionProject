const fast2sms = require("fast-two-sms");

const sendSms = (message, numbers) => {
  var options = {
    authorization:
      "IcH06pujTyWMlEDvmfiK4RBbSkZLAh1ozaJxPY7nstgFV8wUOQnPk0Yl3QBDIdA2E4qtLJKMfip1Wh8r",
    message: message,
    numbers: numbers,
  };
  fast2sms.sendMessage(options).then((response) => {
    console.log(response);
    return response;
  });
};

module.exports = sendSms;
