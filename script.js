$( document ).ready(function() { //this let jquery know that the document is ready
    console.log( "ready!" );


let numOfQuestions = $('.question').length; //questions
let sumTotalOfAnswers = 0;  // total
let avgOfAnswers = 0;  //avg
let listOfQuestions = $('section.q-n-a');


shuffle(listOfQuestions);

listOfQuestions.each( function(){
    let myAnswers = $(this).find('.answer');
    shuffle(myAnswers);
    $(this).find('.answer-container').html(myAnswers);
})

$('#quiz-area').html(listOfQuestions);

/////////shuffles arrays, html collections and node lists////////////////////
function shuffle(array) {
    for(let i = array.length-1; i > 0; i--){
        let j = Math.floor( Math.random() * (i+1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

$('.answer').on('click', function(){
    if($(this).parent().find('.selected').length > 0){
        sumTotalOfAnswers -= $(this).parent().find('.selected').data('value');
        $(this).parent().find('.selected').removeClass('selected');
        
    };

    $(this).addClass('selected');
    sumTotalOfAnswers += $(this).data('value');

    //console.log(sumTotalOfAnswers);
});



$('.finish').on('click', function() {
    avgOfAnswers = sumTotalOfAnswers / numOfQuestions;
    let message = '';
    if ($('.selected').length === numOfQuestions){
        

        if(avgOfAnswers < 1.5) {
            message = 'Yes! Homeschooling sounds like a good fit for you! You have the time and resources to make it an enriching experience. Homeschooling is not for everyone but with strong guidance and a self motivated work ethic, you can thrive.';
        }else if(avgOfAnswers < 2.5){
            message = 'Hmmmm... It could be a good option with some dedication and extra effort. Homeschooling often takes more initiative';
        }else if(avgOfAnswers < 3.5){
            message = 'Homeschooling is probably not a good idea for you. You would need to make significant changes.';
        }else{
            message = 'No definitly not. Look into other education options like local public schools or charter schools.';
        }

        $('#quiz-area, .finish').hide();
    }else{
        message = 'You missed at least one question';
    }

    $('.response, p').text(message);
    $('.response').show();
})


});