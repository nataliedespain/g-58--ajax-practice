$(document).ready(function() {

  const $temp = $('<div>').addClass('card');


  // get list of books
  $('#getBooks').click(function() {
    $('.results').empty()
    $.ajax({url: `https://tmartin-books-api.herokuapp.com/details`, success: function(result){
      for (var obj of result) {
        // $('.results').append(`<h3>${obj.title} by: ${obj.author_first_name} ${obj.author_last_name}</h3>`)
        $('.results').append(`<div class="card"><img src="${obj.cover_img}"><h1>${obj.title}</h1><p>${obj.author_last_name}</p></div>`)

      }
    }});
  });

  // get list of authors
  $('#getAuthors').click(function() {
    $('.results').empty()
    $.ajax({url: `https://tmartin-books-api.herokuapp.com/authors`, success: function(result){
      for (var obj of result) {
        $('.results').append(`<h3>${obj.first_name} ${obj.last_name}</h3>`)
      }
    }});
  });

  // search
  $('#findBooks').click(function() {
    $('.results').empty();
    var input = $('#search').val();
    $.ajax({url: `https://tmartin-books-api.herokuapp.com/details`, success: function(result){

      var inputResultsArr =[];
      for (var obj of result) {
        for (var item of Object.values(obj)) {
          if (item.toString().toLowerCase().includes(input.toLowerCase())) {
            inputResultsArr.push(obj.id);
          }
        }
      }

      var filteredResults = inputResultsArr.filter(function(val, idx, arr) {
        return arr.indexOf(val) === idx;
      });
      for (var eachId of filteredResults) {
        for (var obj of result) {
          if (eachId === obj.id) {
            $('.results').append(`<h3>${obj.title} by: ${obj.author_first_name} ${obj.author_last_name}</h3>`)
          }
        }
      }
    }});
  });


});
