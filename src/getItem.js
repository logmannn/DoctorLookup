import $ from 'jquery';

// import fetchResults from "../src/main.js";

function getItem(fetchResults, badResults, search, url){
  let promise = new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();

    request.onload = function() {
      if (this.status === 200) {
        resolve(request.response);
      } else {
        reject(Error(request.statusText));
      }
    }
    request.open("GET", url, true);
    request.send();
  });

  promise.then(function(response) {

    let body = JSON.parse(response);
    console.log(body);
    fetchResults(response, url);
  }, function(error) {
    badResults (error);
  });
}

export { getItem };
