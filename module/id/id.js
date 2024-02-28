const faker = require('faker/locale/id_ID');
const fs = require('fs');

function generateNewNumber(numbers) {
  const selectedNumber = numbers[Math.floor(Math.random() * numbers.length)];
  const prefix = selectedNumber.toString().padStart(4, '0');
  const random1 = Math.floor(Math.random() * 4) + 1;
  const random2 = Math.floor(Math.random() * 9) + 1;
  const random3 = (Math.floor(Math.random() * 12) + 1).toString().padStart(2, '0');
  const random4 = (Math.floor(Math.random() * 12) + 1).toString().padStart(2, '0');
  const zero = '00';
  const random5 = (Math.floor(Math.random() * 99) + 1).toString().padStart(2, '0');
  const newNumber = `${prefix}${random1}${random2}${random3}${random4}${zero}${random5}`;
  return newNumber;
}

function generateFullIdentity(quantity) {
  const jsonData = fs.readFileSync('./module/id/id_data.json', 'utf8');
  const json_data = JSON.parse(jsonData);
  const numbers = json_data.numbers;
  const data = [];

  for (let i = 0; i < quantity; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const userName = faker.internet.userName();
    const phoneNumber = faker.phone.phoneNumber();
    const email = faker.internet.email();
    const ip = faker.internet.ip();
    const userAgent = faker.internet.userAgent();
    const nik = generateNewNumber(numbers); 
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
      NIK: nik,
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
};
