
var getTest = document.getElementById('getQuiz');
var TestUI = document.getElementById('testUI');
var form = document.createElement('form')
form.id = 'test';
var qList = document.createElement('ol');
qList.id = 'qList';
form.appendChild(qList);
function load(){

    var xhr = new XMLHttpRequest();
      
    getTest.addEventListener('click', ()=>{
        
        xhr.onload = ()=> {
            returnQuestion(xhr.responseText);//add questions to html using response object
            TestUI.append(form);//adds form to ui
        }
        getTest.remove();//removes start test button
        xhr.open('GET', 'startQuiz', true);
        xhr.send();//send request
    
    });
}

function returnQuestion(questions){ //functions used to creat questions from servers response
    var br = document.createElement('br');
    var q = 0;
    var testObj = JSON.parse(questions);
    
    testObj.forEach((element, li) => {//loop used to create questions

        li = document.createElement('li');
        li.id = 'Q' + q;
        li.innerHTML = element.stem;//adds stem
        li.append(br.cloneNode(true));
        qList.appendChild(li);
        for (var e = 0 ; e <element.options.length; e++){ //loop used to create question otpions
            let rInput = document.createElement('input');
            rInput.setAttribute('type', 'radio');
            rInput.setAttribute('name', 'Q' + (q));
            rInput.setAttribute('id', q+ ':' + e);//crafts id using index of question q plus index of options e
            rInput.setAttribute('value',  e);
            rInput.addEventListener('click', function(){//adds listener for every input to check answer 
                    let rInputId = rInput.id
                    checkAnswer(rInputId, questions)
                });
            var label = document.createElement('label');//labrl for radio button
            label.setAttribute('for', q+':'+e);
            label.setAttribute('id', q+ '-' + e);
            label.setAttribute('class','L'+q)
            label.innerHTML = element.options[e];   //add option each rendition of loop    
            li.appendChild(rInput);
            li.appendChild(label);
            li.appendChild(br.cloneNode(true));//adds breakes between radio buttons
        }
        q++;    
    
    });
    var done = document.createElement('input');//create and add button for submitting tewst
    done.setAttribute('type', 'submit');
    done.innerHTML = 'Submit Quiz';
    done.addEventListener('click', function(event){// event listener to submit test
        sendForm();
    });
    qList.append(done);
}

function checkAnswer(id) { //function used to communicate with server to check answer
    var xhr = new XMLHttpRequest()
    xhr.open('POST', '/checkAnswer', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = () => {
        document.getElementById('Q'+id[0]).style.color = 'grey';// to indicate it isnt first attempt to answer test
        if (xhr.readyState == 4)alert(xhr.responseText == 'true' ? 'Correct' : 'Incorrect');//informs user if choice is correct or not

    }
    xhr.send('q='+id[0] + '&&a='+id[2]);//sends question plus answer selected using id 
}
function sendForm(){// function used to send form
    var data;
    var xhr = new XMLHttpRequest();
    data = $('#test').serialize();//gets data from form
    xhr.open('POST', '/submitTest', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4 ){//allerts on valid answer
            if(xhr.responseText > 0)alert(xhr.responseText + '/5 correct grade of ' +( xhr.responseText/5)*100 + '%' );
            else alert('0/5 correct grade of ' +( xhr.responseText/5)*100 + '%' );
        }

    }
    xhr.send(data);

}
