

let parser = {};
parser.returnQuestion = (test) =>{
    var questionObjArray = [];
    for ( var item in test){
        questionObjArray.push((({ stem, options }) => ({ stem, options }))(test[item]))
    }
    return questionObjArray;
}//returns object with all questions and its stems
parser.checkAnswer = (test, query) => {
    return test[query.q].answerIndex == query.a;
}//checks answer by comparing the query which is q alongside chosen stem ccompares it to json database answer index
parser.submitTest= (test, query) =>  {
    var right = 0;
    for (var item in query){
        console.log(query[item]);
        if(query[item] == test[item[1]].answerIndex) right++;
    }
    return ''+right+'';
}//compares the number of answers that equal the answer index and inceeasas count return
module.exports  = parser;