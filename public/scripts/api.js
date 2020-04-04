$(document).ready(function() {

  const API_KEY = '15882418-eb2d4329ee8c6bbbbc2d87a8c';
  const URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent('red roses');
  $.getJSON(URL, function(data){
  if (parseInt(data.totalHits) > 0)
    $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
  else
    console.log('No hits');
  });

});

