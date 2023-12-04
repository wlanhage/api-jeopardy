let allCategories = []; //någonstans att lägga 100 kategorier
const CATEGORY_COUNT = 7; // bestämma att vi bara ska ha 7 av de 100 kategorierna
let questionsAndAnswers = {}; //någonstans att lägga frågor och svar

document.getElementById('loadCats').addEventListener('click', function(event) { //knapp för att ladda kategorier
  
  if (allCategories.length === 0) { //om det inte finns kategorier, fetcha
    fetch('https://jservice.io/api/categories?count=100') // Hämta 100 kategorier
      .then(response => response.json()) //gör json
      .then(categories => {
        allCategories = categories;
        loadRandomCategories();
      });
  } else {
    loadRandomCategories();
  }
});

function chooseRandomCategories(categories, count) { // shufflar alla kategorier och väljer 7 random
  const shuffled = categories.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function loadRandomCategories() {
  const selectedCategories = chooseRandomCategories(allCategories, CATEGORY_COUNT);

  selectedCategories.forEach((category, index) => { // loopa igenom kategorierna och ge dem ett id
    document.querySelectorAll('.categoryTitle')[index].textContent = category.title;

    fetch(`http://jservice.io/api/category?id=${category.id}`) // hämta frågor från korrekt kategori-id
      .then(response => response.json())
      .then(categoryData => {
        categoryData.clues.forEach(clue => {
          const id = `cat${index + 1}-${clue.value}`;
          questionsAndAnswers[id] = { question: clue.question, answer: clue.answer }; // lägg till fråga och svar till varje ID
        });
      });
  });
}




  // Gör om html element till variabler
const clickableBoxes = document.querySelectorAll('.box'); 
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close');
const questionDisplay = document.querySelector('.question'); 
const answerButton = document.querySelector('#answerButton'); 
const answerDisplay = document.querySelector('.answer'); 

// Boxar som är klickbara
clickableBoxes.forEach(function(box) {
  box.addEventListener('click', function(event) {
    const boxId = box.getAttribute('data-id');
    const questionInfo = questionsAndAnswers[boxId]; //Hämtar fråga och svar från boxen

    if (questionInfo) { //Om det finns en fråga tillgänlig på boxen visa upp den
      questionDisplay.textContent = questionInfo.question; 
      answerDisplay.textContent = questionInfo.answer;
      modal.style.display = 'block';
    }
  });
});

// Stäng knapp modal
closeBtn.addEventListener('click', function(event) {
  modal.style.display = 'none';
  answerDisplay.classList.remove('answerShow'); // tar bort asnwerShow klassen när modal stängs, oavsett synlig eller ej
});

// Togglar svar
answerButton.addEventListener('click', function(event) {
  answerDisplay.classList.toggle('answerShow');
});

// Poäng system
document.querySelectorAll('.point-holder').forEach(holder => {
    let scoreDisplay = holder.querySelector('.score');
    let addBtn = holder.querySelector('.add');
    let subtractBtn = holder.querySelector('.subtract');

    addBtn.addEventListener('click', function() {
        scoreDisplay.textContent = parseInt(scoreDisplay.textContent) + 100;
    });

    subtractBtn.addEventListener('click', function() {
        scoreDisplay.textContent = Math.max(0, parseInt(scoreDisplay.textContent) - 100);
    });
});


document.querySelectorAll('.box').forEach(function(box) { //klickad box blir ej användbar igen
    box.addEventListener('click', function(event) {
        box.classList.toggle('clicked');
    });
});
