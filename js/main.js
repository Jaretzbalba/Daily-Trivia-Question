
const select = document.querySelector('.difficulty')

let difficulty = 'easy'

select.addEventListener('change', event => {
  difficulty = event.target.value
})

document.querySelector('.genQuest').addEventListener('click', getFetch)

function getFetch(){
  const url = `https://opentdb.com/api.php?amount=1&difficulty=${difficulty}`

  document.querySelector('.result').innerHTML = ''
  document.querySelector('.answer').innerHTML = ``

  //Shuffle Function: Fisher-Yates(aka Knuth)Shuffle
  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        // console.log(data.results[0])
        // console.log(data.results[0].question)
        document.querySelector('.question').innerHTML = data.results[0].question
        let correctAnswer = data.results[0].correct_answer
        let wrongAnswers = data.results[0].incorrect_answers
        const answerArray = wrongAnswers.concat(correctAnswer)
        shuffle(answerArray)
      

        // console.log(wrongAnswers)
        // console.log(answerArray)

        let radioButton = document.createElement('input')
        radioButton.type = 'radio';

        const fragment = document.createDocumentFragment();
        answerArray.forEach( choice => {
          const input = document.createElement('input')
          const label = document.createElement('label')
          const section = document.createElement('section')
          section.className = 'choice'
          input.type = 'radio'
          input.id = choice
          input.name = 'choices'
          input.className = 'radio'
          label.innerHTML = choice
          label.htmlFor = choice
          fragment.appendChild(section)
          section.appendChild(input)
          section.appendChild(label)
        });
        document.querySelector('p.choices').replaceChildren(fragment);

        document.querySelector('.submit').addEventListener('click', checkAnswer)

        function checkAnswer() {
          if(document.getElementById(`${correctAnswer}`).checked) {
            // alert('Correct')
            document.querySelector('.result').innerHTML = 'Correct!'
            document.querySelector('.answer').innerHTML = ``
          } else {
            // alert('Wrong!')
            document.querySelector('.result').innerHTML = 'Wrong!'
            document.querySelector('.answer').innerHTML = `Correct Answer: ${correctAnswer}`
          }
        }

        document.querySelector('.genQuest').addEventListener('click', () => {
          document.querySelector('.submit').removeEventListener('click', checkAnswer)
          }, { once: true });
       
      })
      .catch(err => {
          console.log(`error ${err}`)
      });

      


}

