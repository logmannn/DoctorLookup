import './styles.css';
import { getItem } from "../src/getItem.js";
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';


$(document).ready(function() {
  console.log("API Key: "+process.env.exports.apiKey);
  $('.btn-success').click(function(event){
    event.preventDefault();
    const search = $("#search").val();
    const name = $("#name").val();
    $(".output").empty();
    const url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${name}&query=${search}&location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=${process.env.exports.apiKey}`;
    getItem(fetchResults, badResults, search, url)
  });
});

let fetchResults = function(response, url){
  let items = JSON.parse(response);

  // console.log(items.data[0].profile.first_name);
  // console.log(items.data[0].profile.last_name);
  // console.log(items.data[0].practices[0].name);
  let i = 0;
  items.data.forEach(function(item) {
    // let x = 0;
    // $(".doctoroutput").append("Practices: <br>");
    // items.data[i].practices[x].forEach(function(item) {
    //   $(".doctoroutput").append(items.data[i].practices[x].name);
    //   x += 1;
    // });
    $(".doctoroutput").append(items.data[i].profile.first_name + " " + items.data[i].profile.last_name + "<br>");
    i += 1;
  });


}

let badResults = function(error){
  $("#results").text("There was an error processing your request");
}
