const fast2sms = require("fast-two-sms");

const sendSms = (message, numbers) => {
  var options = {
    authorization:
      "8GUYfvQETAmdx5ChHaMkWKtpoJBr1gsu7Ne6OD4wXcLzyZI92SW86lSzAo0IKNDYw4nhsmOMyp2aXZTg",
    message: message,
    numbers: numbers,
  };
  fast2sms.sendMessage(options).then((response) => {
    console.log(response);
    return response;
  });
};

module.exports = sendSms;
