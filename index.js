const fs = require('fs');
const faker = require('faker');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function generateFakeName(quantity) {
  const data = [];
  for (let i = 0; i < quantity; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    data.push(`${firstName} ${lastName}`);
  }
  return data;
}

function generateUsername(quantity) {
  const data = [];
  for (let i = 0; i < quantity; i++) {
    const userName = faker.internet.userName();
    data.push(userName);
  }
  return data;
}

function generatePhoneNumber(quantity) {
  const data = [];
  for (let i = 0; i < quantity; i++) {
    const phoneNumber = faker.phone.phoneNumber();
    data.push(phoneNumber);
  }
  return data;
}

function generateEmail(quantity) {
  const data = [];
  for (let i = 0; i < quantity; i++) {
    const email = faker.internet.email();
    data.push(email);
  }
  return data;
}


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


function generateFullIdentityLOCKUS(quantity) {
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

function generateFullIdentityRandomCountry(quantity) {
  const data = [];
  for (let i = 0; i < quantity; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const userName = faker.internet.userName();
    const phoneNumber = faker.phone.phoneNumber();
    const email = faker.internet.email();
    const ip = faker.internet.ip();
    const userAgent = faker.internet.userAgent();
    const country = faker.address.country();
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
      Country: country,
      StreetAddress: streetAddress,
      ZipCode: zipCode,
      State: state
    };

    data.push(identity);
  }
  return data;
}

readline.question(`Choose an option: 
1. Generate Fake Name
2. Generate Username
3. Generate Phone Number
4. Generate Email
5. Generate Full Identity LOCK US
6. Generate Full Identity (Random Country)
Enter your choice: `, (option) => {
  option = parseInt(option);
  if (option >= 1 && option <= 6) {
    readline.question('How many data do you want to generate? ', (quantity) => {
      quantity = parseInt(quantity);
      let generatedData;
      switch (option) {
        case 1:
          generatedData = generateFakeName(quantity);
          break;
        case 2:
          generatedData = generateUsername(quantity);
          break;
        case 3:
          generatedData = generatePhoneNumber(quantity);
          break;
        case 4:
          generatedData = generateEmail(quantity);
          break;
        case 5:
          generatedData = generateFullIdentityLOCKUS(quantity);
          break;
        case 6:
          generatedData = generateFullIdentityRandomCountry(quantity);
          break;
        default:
          console.log('Invalid option');
      }

      const currentTime = new Date().toISOString().replace(/:/g, '-');
      const fileName = `generated_${currentTime}.txt`;

      fs.writeFile(fileName, JSON.stringify(generatedData, null, 2), (err) => {
        if (err) throw err;
        console.log(`Generated data saved to ${fileName}`);
        readline.close();
      });
    });
  } else {
    console.log('Invalid option');
    readline.close();
  }
});
