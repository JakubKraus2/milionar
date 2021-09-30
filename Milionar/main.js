//questions
let question = document.getElementById("question");
let questionArr = ["Co je to ukulele?", "Narozené mládě ovce se nazývá?", "Jaké i/y jsou ve slově v*m*kat?", "Ktérý z těchto názvů nepatří do Shakespearových her?", "Co je calcium?",
"Jaký může být minimální věk prezidenta?", "Kdo nebo co je to baribal?", "Hra roku 2019 byla?", "Kdo je Maur?", "Kolik má Praha obyvatel?", "Facebook byl založen v roce...",
"Hlavní město Rumunska je?", "Co je to Chad?", "Co je to dugong?", "Jak se jmenuje manželka Rumcajse?", "Jak dlouho se psala Bible?", "Kolik autorů psalo Bibli?",
"Jaký je celý název pro českou hru Mafia?", "V jakém roce se odehrává příběh hry Kingdom Come: Deliverence?", "Která země má jedinečný tvar vlajky?", "Který pokémon je vývinem pikachua?",
"Jak dlouho trvala 100 letá válka?", "Kdo je vyobrazen na 5000Kč bankovce?", "Kdo je to žhář?", "Co byl nejinstalovanější software v roce 1993"];

//answers
let answers = document.getElementsByClassName("answers");

let answerArr = ["rostlina", "pohoří", "hudební nástroj", "země v Evropě", "tele", "jehně", "sele", "kolouch", "y y", "i i", "y i", "i y", "Macbeth", "Hamlet", "Romeo", "Darren",
"vápník", "železo", "sodík", "vodík", "38 let", "39 let", "40 let", "42 let", "ostrov", "město", "historická postava", "medvěd",
"Sekiro: Shadows Die Twice", "God of War", "The Last of Us Part II", "Death Stranding", "španěl", "afričan", "arab", "němec", "1 milion", "1,3 milionů", "900 tisíc", "998 tisíc",
"2007", "1997", "2002", "2004", "Bukurešť", "Sofie", "Bělehrad", "Lisabon", "tanec", "země v Africe", "zvíře", "strunový nástroj", "vodní savec", "homosexuál", "moře", "Asijské jídlo",
"Jelena", "Velena", "Bětka", "Manka", "2000 let", "1600 let", "500 let", "54 let", "cca 40", "cca 30", "cca 10", "1 autor",
"Mafia: Scholar of the first sin", "Mafia 1", "Mafia", "Mafia: The City of Lost Heaven", "1218", "1514", "1620", "1403", "Nepál", "Čína", "Tasmánie", "El salvador",
"pichu", "raichu" ,"lichu", "pikachu nemá vývin", "100 let", "106 let", "116 let", "98 let", "Karel IV.", "T.G.M.", "Ema Destinnová", "Jan Amos Komenský",
"člověk co nadbytečně utrácí", "pionýr", "úmyslný zakladatel požáru","lhář", "Linux", "Windows", "ani jedno z uvedených", "DOOM"];

let rightAnswer = ["hudební nástroj", "jehně", "y y", "Darren", "vápník", "40 let", "medvěd", "Sekiro: Shadows Die Twice", "arab", "1,3 milionů", "2004", "Bukurešť", "země v Africe",
"vodní savec", "Manka", "1600 let", "cca 40", "Mafia: The City of Lost Heaven", "1403", "Nepál", "raichu", "116 let", "T.G.M.", "úmyslný zakladatel požáru", "DOOM"];

//question generating
let usedQuestions = [];
let start = () =>{
    let randomQuestion = Math.max(0, Math.round(Math.random()*questionArr.length-1));
    for (let i = 0; i < usedQuestions.length; i++) {
        while(usedQuestions[i] == questionArr[randomQuestion]){
            randomQuestion = Math.max(0, Math.round(Math.random()*questionArr.length-1));
            i = 0;
        }
    }
    //setting answers to match the question
    let step = 4 * randomQuestion;
    question.innerText = questionArr[randomQuestion];
    answers[0].innerText = answerArr[step];
    answers[1].innerText = answerArr[step+1];
    answers[2].innerText = answerArr[step+2];
    answers[3].innerText = answerArr[step+3];
    usedQuestions.push(question.innerText);
}

//money count
let moneyList = document.getElementsByClassName("moneyList");
let moneyCount = 14;
moneyList[moneyCount].style.backgroundColor = "#5C2285";

//checking answers
let countWrongAnswers = 0;
[...answers].forEach((element) =>{
    element.onclick = () =>{
        for (let i = 0; i < rightAnswer.length; i++) {
            if(element.innerText == rightAnswer[i]){
                moneyCount -= 1;
                if(moneyCount < 0){
                    end();
                    return;
                }
                moneyList[moneyCount].style.backgroundColor = "#5C2285";
                countWrongAnswers++;
            }
        }
        if(countWrongAnswers == 0){
            end();
        }
        countWrongAnswers = 0;
        start();
    }
})

//ending the game
let balance = 0;
let end = () =>{
    let endMenu = document.createElement("div");
    endMenu.classList.add("endMenu");
    document.getElementById("container").appendChild(endMenu);
    let restart = document.createElement("div");
    restart.classList.add("restart");
    document.getElementById("container").appendChild(restart);
    restart.innerText = "restart";
    document.getElementById("question").style = "display: none";
    document.getElementById("answerContainer").style = "display: none";
    switch(true){
        case (moneyCount < 10 && moneyCount >= 5):{
            balance = "1K$";
            break;
        }
        case (moneyCount < 5 && moneyCount >= 0):{
            balance = "32$";
            break;
        }
        case (moneyCount < 0):{
            balance = "1M$";
            countWrongAnswers = 0;
            break;
        }
        default:{
            balance = "0$";
            break;
        }
    }
    endMenu.innerHTML = "GAME OVER" + "<p>" + "vyhrál si: " + balance;
    restart.onclick = restartGame;
}

let restartGame = () =>{
    location.reload();
}

//loading the game
window.onload = start;