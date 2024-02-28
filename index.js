const fs = require('fs');
const faker = require('faker');
const us = require('./module/us/us');
const id = require('./module/id/id')

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


function formatIdentityToCSV(identity) {
  return Object.values(identity).join('|');
}

function formatIdentityToText(identity) {
  let formattedData = '';
  for (const key in identity) {
    formattedData += `${key}: ${identity[key]}\n`;
  }
  return formattedData;
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
6. Generate Full Identity LOCK ID
7. Generate Full Identity (Random Country)
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
          generatedData = us.generateFullIdentity(quantity);
          break;
        case 6:
          generatedData = id.generateFullIdentity(quantity);
          break;
        case 7:
          generatedData = generateFullIdentityRandomCountry(quantity);
          break;
        default:
          console.log('Invalid option');
      }

      const currentTime = new Date().toISOString().replace(/:/g, '-'); // Definisi currentTime di sini
      readline.question(`Choose file format:
      1. Text
      2. CSV
      3. JSON
      Enter your choice: `, (fileFormat) => {
        fileFormat = parseInt(fileFormat);
        let fileName;
        switch (fileFormat) {
          case 1:
            fileName = `generated_${currentTime}.txt`;
            fs.writeFile(fileName, generatedData.map(formatIdentityToText).join('\n'), (err) => {
              if (err) throw err;
              console.log(`Generated data saved to ${fileName}`);
              readline.close();
            });
            break;
          case 2:
            fileName = `generated_${currentTime}.csv`;
            fs.writeFile(fileName, generatedData.map(formatIdentityToCSV).join('\n'), (err) => {
              if (err) throw err;
              console.log(`Generated data saved to ${fileName}`);
              readline.close();
            });
            break;
          case 3:
            fileName = `generated_${currentTime}.json`;
            fs.writeFile(fileName, JSON.stringify(generatedData, null, 2), (err) => {
              if (err) throw err;
              console.log(`Generated data saved to ${fileName}`);
              readline.close();
            });
            break;
          default:
            console.log('Invalid file format');
            readline.close();
        }
      });
    });
  } else {
    console.log('Invalid option');
    readline.close();
  }
});
