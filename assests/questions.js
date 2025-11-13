// assets/questions.js
// Each question: { id, category, difficulty, question, options:[], answer }

const QUESTIONS = [
  // GENERAL
  { id:1, category:'General', difficulty:'easy', question:'What is 2 + 1?', options:['1','2','3','4'], answer:2 },
  { id:2, category:'General', difficulty:'easy', question:'Which color is a banana?', options:['Red','Blue','Yellow','Black'], answer:2 },
  { id:3, category:'General', difficulty:'medium', question:'Which planet is known as the Red Planet?', options:['Earth','Mars','Jupiter','Venus'], answer:1 },
  { id:4, category:'General', difficulty:'hard', question:'Who wrote The Godfather?', options:['Mark Twain','Mario Puzo','Ernest Hemingway','Charles Dickens'], answer:1 },

  // MATH
  { id:5, category:'Math', difficulty:'easy', question:'What is 5 × 6?', options:['20','30','25','15'], answer:1 },
  { id:6, category:'Math', difficulty:'medium', question:'What is 12 × 3?', options:['36','30','42','33'], answer:0 },
  { id:7, category:'Math', difficulty:'medium', question:'What is the square root of 144?', options:['10','12','14','11'], answer:1 },
  { id:8, category:'Math', difficulty:'hard', question:'Integral of 2x dx is?', options:['x^2 + C','2x + C','x + C','ln x + C'], answer:0 },

  // SCIENCE
  { id:9, category:'Science', difficulty:'easy', question:'Water freezes at 0 on which scale?', options:['Kelvin','Celsius','Fahrenheit','Rankine'], answer:1 },
  { id:10, category:'Science', difficulty:'medium', question:'Symbol for Sodium is?', options:['S','So','Na','N'], answer:2 },
  { id:11, category:'Science', difficulty:'hard', question:'Which gas is most abundant in Earth’s atmosphere?', options:['Oxygen','Nitrogen','Carbon dioxide','Argon'], answer:1 },
  { id:12, category:'Science', difficulty:'hard', question:'Speed of light is approximately?', options:['3×10^5 m/s','3×10^6 m/s','3×10^8 m/s','3×10^10 m/s'], answer:2 },

  // TECHNOLOGY
  { id:13, category:'Technology', difficulty:'easy', question:'HTML stands for?', options:['Hyper Text Markup Language','Home Tool Markup Language','Hyperlinks Text Markup Level','High Tech Modern Language'], answer:0 },
  { id:14, category:'Technology', difficulty:'medium', question:'Which company created Java?', options:['Microsoft','Sun Microsystems','Apple','IBM'], answer:1 },
  { id:15, category:'Technology', difficulty:'hard', question:'What does CPU stand for?', options:['Central Process Unit','Central Processing Unit','Computer Personal Unit','Control Processing Utility'], answer:1 },

  // HISTORY
  { id:16, category:'History', difficulty:'easy', question:'Who was the first President of the USA?', options:['Abraham Lincoln','George Washington','John Adams','Thomas Jefferson'], answer:1 },
  { id:17, category:'History', difficulty:'medium', question:'World War II ended in?', options:['1942','1943','1945','1950'], answer:2 },
  { id:18, category:'History', difficulty:'hard', question:'Who built the Taj Mahal?', options:['Akbar','Humayun','Shah Jahan','Aurangzeb'], answer:2 },

  // SPORTS
  { id:19, category:'Sports', difficulty:'easy', question:'How many players are on a football (soccer) team?', options:['9','10','11','12'], answer:2 },
  { id:20, category:'Sports', difficulty:'medium', question:'Who has won the most Olympic gold medals?', options:['Usain Bolt','Michael Phelps','Simone Biles','Carl Lewis'], answer:1 },
  { id:21, category:'Sports', difficulty:'hard', question:'In cricket, how many legal deliveries are bowled in an over?', options:['5','6','7','8'], answer:1 },

  // MOVIES
  { id:22, category:'Movies', difficulty:'easy', question:'Which studio makes Iron Man?', options:['DC','Marvel','Pixar','DreamWorks'], answer:1 },
  { id:23, category:'Movies', difficulty:'medium', question:'Who directed "Inception"?', options:['Steven Spielberg','Christopher Nolan','James Cameron','Ridley Scott'], answer:1 },
  { id:24, category:'Movies', difficulty:'hard', question:'Which film won Best Picture at the 2020 Oscars?', options:['1917','Joker','Parasite','Ford v Ferrari'], answer:2 },

  // GEOGRAPHY
  { id:25, category:'Geography', difficulty:'easy', question:'What is the capital of France?', options:['Paris','Berlin','Rome','Madrid'], answer:0 },
  { id:26, category:'Geography', difficulty:'medium', question:'Which river is the longest in the world?', options:['Amazon','Nile','Yangtze','Mississippi'], answer:1 },
  { id:27, category:'Geography', difficulty:'hard', question:'Mount Kilimanjaro is located in which country?', options:['Kenya','Tanzania','South Africa','Uganda'], answer:1 },

  // PROGRAMMING
  { id:28, category:'Programming', difficulty:'easy', question:'Which language is used for styling HTML pages?', options:['Java','CSS','Python','C'], answer:1 },
  { id:29, category:'Programming', difficulty:'medium', question:'What does "==" mean in JavaScript?', options:['Assignment','Comparison (loose)','Strict comparison','Nothing'], answer:1 },
  { id:30, category:'Programming', difficulty:'hard', question:'What is the time complexity of binary search?', options:['O(n)','O(n log n)','O(log n)','O(1)'], answer:2 }
];

// derive categories
const CATEGORIES = [...new Set(QUESTIONS.map(q => q.category))];
