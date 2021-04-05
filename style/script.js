// save user input to local storage
var searchCity = function(){
    localStorage.setItem("city", $.trim($("#user-input").val()))
}