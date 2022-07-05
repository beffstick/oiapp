const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGH_SCORES = 15

finalScore.innerText = mostRecentScore

var a = document.getElementById("finalScore").textContent;
if(a < 100) {
    document.getElementById( "failed" ).style.display = "inline";
}   else if (a <= 300) {
    document.getElementById( "bronze" ).style.display = "inline";
}   else if (a <= 600) {
    document.getElementById( "silver" ).style.display = "inline";
}   else if (a <= 900) {
    document.getElementById( "gold" ).style.display = "inline";
}   else if (a >= 1000) {
    document.getElementById( "perfect" ).style.display = "inline";
}

var b = document.getElementById("finalScore").textContent;
document.getElementById("savedScore").value = b

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})

saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(15)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('highscores.html')


}

var form = document.getElementById('sheetdb-form');
  form.addEventListener("submit", e => {
    e.preventDefault();
    fetch(form.action, {
        method : "POST",
        body: new FormData(document.getElementById("sheetdb-form")),
    }).then(
        response => response.json()
    ).then((html) => {
      window.location.assign('highscores.html')
    });
  });