// questions.js — 5 questions per category (Total 45)
// Format: { id, category, difficulty, question, options, answer }

const QUESTIONS = [

  /* -------------------- GENERAL (5) -------------------- */
  { id:1, category:'General', difficulty:'easy',
    question:'What is the capital of India?',
    options:['Mumbai','Delhi','Kolkata','Chennai'], answer:1 },

  { id:2, category:'General', difficulty:'medium',
    question:'Who is known as the Father of the Nation in India?',
    options:['Subhash Bose','Bhagat Singh','Mahatma Gandhi','Jawaharlal Nehru'], answer:2 },

  { id:3, category:'General', difficulty:'easy',
    question:'Which festival is known as the Festival of Lights?',
    options:['Holi','Diwali','Eid','Christmas'], answer:1 },

  { id:4, category:'General', difficulty:'medium',
    question:'Which is the largest continent?',
    options:['Asia','Africa','Europe','Australia'], answer:0 },

  { id:5, category:'General', difficulty:'hard',
    question:'Which country invented paper?',
    options:['India','Egypt','China','Japan'], answer:2 },


  /* -------------------- MATH (5) -------------------- */
  { id:6, category:'Math', difficulty:'easy',
    question:'What is 12 + 18?',
    options:['20','22','30','24'], answer:2 },

  { id:7, category:'Math', difficulty:'medium',
    question:'What is the value of √169?',
    options:['12','13','14','15'], answer:1 },

  { id:8, category:'Math', difficulty:'medium',
    question:'What is 15 × 7?',
    options:['95','90','105','110'], answer:2 },

  { id:9, category:'Math', difficulty:'hard',
    question:'Value of π (pi) correct to 2 decimal places?',
    options:['3.14','3.12','3.18','3.20'], answer:0 },

  { id:10, category:'Math', difficulty:'hard',
    question:'Integral of x² dx is?',
    options:['x³/3 + C','x²/2 + C','2x + C','3x² + C'], answer:0 },


  /* -------------------- SCIENCE (5) -------------------- */
  { id:11, category:'Science', difficulty:'easy',
    question:'Water boils at what temperature (°C)?',
    options:['50°C','75°C','90°C','100°C'], answer:3 },

  { id:12, category:'Science', difficulty:'easy',
    question:'Which gas do plants absorb?',
    options:['Oxygen','Nitrogen','Carbon dioxide','Helium'], answer:2 },

  { id:13, category:'Science', difficulty:'medium',
    question:'What is the chemical symbol of Gold?',
    options:['Ag','Au','Go','Gd'], answer:1 },

  { id:14, category:'Science', difficulty:'hard',
    question:'Which part of the brain controls balance?',
    options:['Cerebrum','Cerebellum','Medulla','Pons'], answer:1 },

  { id:15, category:'Science', difficulty:'hard',
    question:'What is the speed of sound in air?',
    options:['343 m/s','300 m/s','250 m/s','500 m/s'], answer:0 },


  /* -------------------- TECHNOLOGY (5) -------------------- */
  { id:16, category:'Technology', difficulty:'easy',
    question:'What does HTML stand for?',
    options:['Hyper Trainer Marking Language','Hyper Text Markup Language','Hyper Text Making Language','High Tech Markup Language'], answer:1 },

  { id:17, category:'Technology', difficulty:'easy',
    question:'Which company created Android OS?',
    options:['Apple','Google','Microsoft','IBM'], answer:1 },

  { id:18, category:'Technology', difficulty:'medium',
    question:'What is the full form of CPU?',
    options:['Central Processing Unit','Computer Power Utility','Central Program Unit','Core Processing Unit'], answer:0 },

  { id:19, category:'Technology', difficulty:'medium',
    question:'Which is not a programming language?',
    options:['Python','HTML','Java','C++'], answer:1 },

  { id:20, category:'Technology', difficulty:'hard',
    question:'What does RAM stand for?',
    options:['Read Access Memory','Random Access Memory','Rapid Action Memory','Run Access Machine'], answer:1 },


  /* -------------------- HISTORY (5) -------------------- */
  { id:21, category:'History', difficulty:'easy',
    question:'Who was the first President of the USA?',
    options:['Abraham Lincoln','George Washington','John Adams','Thomas Jefferson'], answer:1 },

  { id:22, category:'History', difficulty:'easy',
    question:'Who built the Taj Mahal?',
    options:['Akbar','Shah Jahan','Aurangzeb','Humayun'], answer:1 },

  { id:23, category:'History', difficulty:'medium',
    question:'World War I began in which year?',
    options:['1910','1914','1918','1920'], answer:1 },

  { id:24, category:'History', difficulty:'medium',
    question:'Who discovered America?',
    options:['Vasco da Gama','Christopher Columbus','Ferdinand Magellan','Marco Polo'], answer:1 },

  { id:25, category:'History', difficulty:'hard',
    question:'The Great Wall of China was built to protect against whom?',
    options:['Romans','Vikings','Mongols','Persians'], answer:2 },


  /* -------------------- SPORTS (5) -------------------- */
  { id:26, category:'Sports', difficulty:'easy',
    question:'How many players per team in football (soccer)?',
    options:['9','10','11','12'], answer:2 },

  { id:27, category:'Sports', difficulty:'easy',
    question:'What sport uses a bat and ball?',
    options:['Tennis','Cricket','Hockey','Boxing'], answer:1 },

  { id:28, category:'Sports', difficulty:'medium',
    question:'How many rings are on the Olympic flag?',
    options:['3','5','7','6'], answer:1 },

  { id:29, category:'Sports', difficulty:'medium',
    question:'Which country invented badminton?',
    options:['China','India','Japan','England'], answer:3 },

  { id:30, category:'Sports', difficulty:'hard',
    question:'Which athlete has the most Olympic gold medals?',
    options:['Usain Bolt','Michael Phelps','Simone Biles','Mark Spitz'], answer:1 },


  /* -------------------- MOVIES (5) -------------------- */
  { id:31, category:'Movies', difficulty:'easy',
    question:'Which studio made Iron Man?',
    options:['DC','Marvel','Pixar','Disney'], answer:1 },

  { id:32, category:'Movies', difficulty:'easy',
    question:'Who played Harry Potter?',
    options:['Tom Holland','Daniel Radcliffe','Chris Evans','Leonardo DiCaprio'], answer:1 },

  { id:33, category:'Movies', difficulty:'medium',
    question:'Who directed Inception?',
    options:['Christopher Nolan','James Cameron','Steven Spielberg','Ridley Scott'], answer:0 },

  { id:34, category:'Movies', difficulty:'medium',
    question:'Which movie won Best Picture (2020 Oscars)?',
    options:['1917','Parasite','Joker','Ford v Ferrari'], answer:1 },

  { id:35, category:'Movies', difficulty:'hard',
    question:'Which is the highest-grossing movie of all time (2024)?',
    options:['Avatar','Titanic','Avengers: Endgame','Avatar: The Way of Water'], answer:0 },


  /* -------------------- GEOGRAPHY (5) -------------------- */
  { id:36, category:'Geography', difficulty:'easy',
    question:'Which is the largest ocean?',
    options:['Atlantic','Indian','Pacific','Arctic'], answer:2 },

  { id:37, category:'Geography', difficulty:'easy',
    question:'Which country has the most population?',
    options:['USA','India','China','Russia'], answer:1 },

  { id:38, category:'Geography', difficulty:'medium',
    question:'The Sahara Desert is located on which continent?',
    options:['Asia','Africa','Australia','Europe'], answer:1 },

  { id:39, category:'Geography', difficulty:'medium',
    question:'Mount Everest is located in?',
    options:['India','China','Nepal','Bhutan'], answer:2 },

  { id:40, category:'Geography', difficulty:'hard',
    question:'Which river is the longest in the world?',
    options:['Amazon','Nile','Yangtze','Mississippi'], answer:1 },


  /* -------------------- PROGRAMMING (5) -------------------- */
  { id:41, category:'Programming', difficulty:'easy',
    question:'Which language is used for web page styling?',
    options:['HTML','Python','CSS','C++'], answer:2 },

  { id:42, category:'Programming', difficulty:'easy',
    question:'JavaScript runs on?',
    options:['Browser','Compiler','Database','Router'], answer:0 },

  { id:43, category:'Programming', difficulty:'medium',
    question:'Which is NOT a programming language?',
    options:['Java','Python','HTML','Ruby'], answer:2 },

  { id:44, category:'Programming', difficulty:'medium',
    question:'Which database uses SQL?',
    options:['MongoDB','Firebase','MySQL','Neo4j'], answer:2 },

  { id:45, category:'Programming', difficulty:'hard',
    question:'Time complexity of binary search?',
    options:['O(n)','O(log n)','O(n²)','O(1)'], answer:1 }
];


// list categories
const CATEGORIES = [...new Set(QUESTIONS.map(q => q.category))];
