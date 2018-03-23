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
    // 45.523062, -122.676482
    const url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${name}&query=${search}&location=45.523062%2C-122.676482%2C100&user_location=45.523062%2C-122.676482&skip=0&limit=10&user_key=${process.env.exports.apiKey}`;
    getItem(fetchResults, badResults, search, url)
  });
});

let fetchResults = function(response, url){

  $(".error").empty();

  let items = JSON.parse(response);

  // Could not find website
  let i = 0;
  items.data.forEach(function(item) {
    $(".doctoroutput").append("<b>Doctor</b>: <br>" + items.data[i].profile.first_name + " " + items.data[i].profile.last_name + "<br>");

    let x = 0;
    $(".doctoroutput").append("<b>Practice(s)</b>: <br>");
    items.data[i].practices.forEach(function(item) {
      $(".doctoroutput").append("Location: " + items.data[i].practices[x].name + "<br>Address: " + items.data[i].practices[x].visit_address.street + ", " + items.data[i].practices[x].visit_address.city + " " + items.data[i].practices[x].visit_address.state + ", " + items.data[i].practices[x].visit_address.zip + "<br>" + "Phone Number(s): <br>");

      let z = 0;
      items.data[i].practices[x].phones.forEach(function(item) {
        $(".doctoroutput").append(items.data[i].practices[x].phones[z].number + "<br>")
        z += 1;
      });

      $(".doctoroutput").append("Currently accepting patients? " + items.data[i].practices[x].accepts_new_patients + "<br>");

      x += 1;
      $(".doctoroutput").append("<br>");
    });
    $(".doctoroutput").append("<hr><br>");
    i += 1;
  });


}

let badResults = function(error){
  $(".error").html("There was an error processing your request: " + error);
}
