import './styles.css';
import { getItem } from "../src/getItem.js";
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';

//looking into google maps api
$(document).ready(function() {
  console.log("API Key: " + process.env.exports.apiKey);
  console.log("Google API Key: " + process.env.exports.google.apiKey);

  $('.btn-success').click(function(event){
    event.preventDefault();
    const search = $("#search").val();
    const name = $("#name").val();
    const location = $("#location").val();
    $(".output").empty();

    const GoogleUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.exports.google.apiKey}`;
    getItem(fetchResults, badResults, search, GoogleUrl);

  });
});

let lat = "";
let lng = "";
let status = 0;

let fetchResults = function(response, url) {
  $(".error").empty();

  let items = JSON.parse(response);
  const search = $("#search").val();
  const name = $("#name").val();
  const location = $("#location").val();

  // console.log(response);
  if (url.match(/googleapis/) && status == 0) {
    lat = items.results[0].geometry.location.lat;
    lng = items.results[0].geometry.location.lng;

    let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${name}&query=${search}&location=45.523062%2C-122.676482%2C100&user_location=45.523062%2C-122.676482&skip=0&limit=20&user_key=${process.env.exports.apiKey}`;

    if (lat != 'undefined') {
      url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${name}&query=${search}&location=${lat}%2C${lng}%2C100&user_location=${lat}%2C${lng}&skip=0&limit=20&user_key=${process.env.exports.apiKey}`;
    }

    getItem(fetchResults, badResults, search, url);
    status = 1;
  }

  else {
    // console.log("betterdoctor");
    console.log("lat"+lat);

    if (items.data === undefined || items.data.length == 0) {
      $(".error").html("This query doesn't include any doctors");
    } else {
      // Could not find website
      let i = 0;
      items.data.forEach(function() {
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
    status = 0;
  }
}

let badResults = function(error){
  $(".error").html("There was an error processing your request: " + error);
}
