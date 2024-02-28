const faker = require('faker');

function generatessn() {
    // Generate random numbers for each section
    const section1 = pad(Math.floor(Math.random() * 1000), 3);
    const section2 = pad(Math.floor(Math.random() * 1000), 3);
    const section3 = pad(Math.floor(Math.random() * 10000), 4);
    
    // Concatenate sections with dashes
    return `${section1}-${section2}-${section3}`;
}


function pad(num, size) {
    let numString = num.toString();
    while (numString.length < size) numString = "0" + numString;
    return numString;
}


function generateFullIdentity(quantity) {
  const data = [];
  for (let i = 0; i < quantity; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const userName = faker.internet.userName();
    const phoneNumber = faker.phone.phoneNumber();
    const email = faker.internet.email();
    const ip = faker.internet.ip();
    const userAgent = faker.internet.userAgent();
    const ssn = generatessn()
    const streetAddress = faker.address.streetAddress();
    const zipCode = faker.address.zipCode();
    const state = faker.address.state();

    const identity = {
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Username: userName,
      PhoneNumber: phoneNumber,
      IP: ip,
      UserAgent: userAgent,
      SSN: ssn,
      StreetAddress: streetAddress,
      ZipCode: zipCode,
      State: state
    };

    data.push(identity);
  }
  return data;
}


module.exports = {
    generateFullIdentity
}