const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const userId = 'Harsh_Kumar_Singh/13/08/2002';

app.post('/bfhl', (req, res) => {
  try {
 
    const inputData = req.body.data;

    const status = true;
    const collegeEmail = 'hs9427@srmist.edu.in';
    const collegeRollNumber = 'RA2011042020034';
    const numbersArray = inputData.filter(item => !isNaN(item)); 
    const alphabetsArray = inputData.filter(item => typeof item === 'string' && /^[A-Za-z]$/.test(item)); 
    const highestAlphabet = findHighestAlphabet(alphabetsArray);

    const response = {
      is_success: status,
      user_id: userId,
      email: collegeEmail,
      roll_number: collegeRollNumber,
      numbers: numbersArray,
      alphabets: alphabetsArray,
      highest_alphabet: highestAlphabet,
    };


    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/bfhl', (req, res) => {

  const getResp = { operation_code: 1 };
  res.status(200).json(getResp);
});


function findHighestAlphabet(alpha_Array) {
  if (alpha_Array.length === 0) {
    return [];
  }

  alpha_Array.sort((a, b) => b.localeCompare(a, undefined, { sensitivity: 'base' }));


  const BiggestAlphabet = [alpha_Array[0]]; 

  
  for (let i = 1; i < alpha_Array.length; i++) {
    if (alpha_Array[i].localeCompare(alpha_Array[0], undefined, { sensitivity: 'base' }) === 0) {
      BiggestAlphabet.push(alpha_Array[i]);
    } else {
      break; 
    }
  }

  return BiggestAlphabet;
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
