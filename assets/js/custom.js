$(function() {
    $('.close-panel-button').click(function() {
        $(".comments-panel").css('display', 'none');
    });
    $('.comments-button').click(function() {
        $(".comments-panel").css('display', 'initial');
    });
    $("#welcomeLink").click(function() {
        $(".comments-panel").css('display', 'initial');
    });
    $('.close-welcome').click(function() {
        $(".popup").css('display', 'none');
    });
    $(".control input-control primary-control").click(function() {
        $(".control input-control primary-control").css('display', 'none');
    });
    $("button#comment-submit-button").click(function() {
        $('.this-one').css('display', 'block');
        $('#comment-textarea').val("");
    });
    var clickTab = function() {
        $(this).siblings().removeClass('selected');
        $(this).addClass('selected');
    };
    $('li.tab.all').click(clickTab());
    $('li.tab.reader').click(clickTab());
    $('li.tab.discussed').click(clickTab());
    $('li.tab.nytpicks').click(clickTab());
    var checkForText = function() {
        var textbox = $('#comment-textarea').val().length;
        if (textbox.length > 0) {
            $('#comment-submit-button').addClass('disabled');
        } else {
            $('#comment-submit-button').removeClass('disabled');
        }
        $('#comment-textarea').keydown(updateCount);
        $('#comment-textarea').keyup(updateCount);
    };
    checkForText();

    function updateCount() {
        var change = $(this).val().length;
        var charCount = 1500 - change;
        $('#comment-character-count').text(charCount);
    }
    var allAttributes = "yellow-attribute purple-attribute green-attribute blue-attribute";
    $('#first-attrib').click(function() {
        $('#first-attrib').siblings().removeClass('selected ' + allAttributes);
        $('#first-attrib').addClass('selected blue-attribute');
        $('.question').text("If you had had access to a Spanish-speaking curriculum growing up in the U.S., would you have been interested? Why or why not?");
    });
    $('#second-attrib').click(function() {
        $('#second-attrib').siblings().removeClass('selected ' + allAttributes);
        $('#second-attrib').addClass('selected yellow-attribute');
        $('.question').text("Do you agree that “being literate in the language of your immigrant ancestors (whether that language is Spanish, Korean, Mandarin or Armenian) makes you wiser and more powerful”?");
    });
    $('#fifth-attrib').click(function() {
        $('#fifth-attrib').siblings().removeClass('selected ' + allAttributes);
        $('#fifth-attrib').addClass('selected purple-attribute');
        $('.question').text("Based on your professional experience, what would you say are the greatest benefits of multilingualism?");
    });
    $('#seventh-attrib').click(function() {
        $('#seventh-attrib').siblings().removeClass('selected ' + allAttributes);
        $('#seventh-attrib').addClass('selected green-attribute');
        $('.question').text("question 4");
    });
});
