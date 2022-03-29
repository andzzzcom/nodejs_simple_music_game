var t = 5
var question = 1
var score = 0
const URL = "http://localhost:1122/"

var obj = document.createElement('audio');
obj.src = 'music/'+song
obj.play(); 
setInterval(function(){
    if(t<=0){
        ending()
    }else{
        t--;
    }
    
    if(t<10)
        $("#timer").html('Timer: 00:0'+t);
    else
        $("#timer").html('Timer: '+toSecs(t));

}, 1000)

        
obj.addEventListener('ended',function(){
    nextSong(id)
}, false);

function answer(n){
    $.ajax({
        url: URL+'answer',
        type: "post",
        data: {id:id, c:n} ,
        success: function (response) {
            
            var answer = response.hasil
            if(answer==1) 
                $("#score").html("Score: "+(++score))

            nextSong(id)
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function nextSong(id){

    question++;
    if(question==3){
        ending()
        return false
    }

    $.ajax({
        url: URL+'nextSong',
        type: "post",
        data: {id:id} ,
        success: function (response) {
            var nextQ = response.next[0]

            //next id
            id = nextQ.id

            //next song
            var song = nextQ.name
            obj.src = 'music/'+song
            obj.play(); 

            //next choice
            var A = nextQ.choice_a
            var B = nextQ.choice_b
            var C = nextQ.choice_c
            var D = nextQ.choice_d

            initQuestion(t, score, A, B, C, D)

        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function toSecs(t){
    let min = Math.floor(t/60)
    let sec = t%60
    if(sec<10) sec='0'+sec
    return '0'+min+':'+sec
}

function initTime(t){
    const time = 'Timer: '+toSecs(t)
    $("#timer").html(time)
}

function initScore(s){
    $("#score").html('Score: '+s)
}

function initChoice(a, b, c, d){
    $("#btnA").html(a)
    $("#btnB").html(b)
    $("#btnC").html(c)
    $("#btnD").html(d)
}

//init question
function initQuestion(t, score, choiceA, choiceB, choiceC, choiceD){
    initTime(t)
    initScore(score)
    initChoice(choiceA, choiceB, choiceC, choiceD)

    $("#urutan").html("Question: "+question)
}

//ending game
function ending()
{
    //$("#scoreEnd").html("Score: "+score)
    //$("#game").addClass("d-none")
    //$("#end").removeClass("d-none")
}

initQuestion(t, score, choiceA, choiceB, choiceC, choiceD)
