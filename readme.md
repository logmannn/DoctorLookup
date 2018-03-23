<h1>Doctor Lookup</h1>

<!--insert img here-->

<h3>Setup Instructions</h3>
<ul>
  <li>$cd Desktop</li>
  <li>$ git clone https://github.com/logmannn/DoctorLookup</li>
  <li>$ cd DoctorLookup</li>
  <li>$ npm install</li>
  <li>Create a .env file</li>
  <li>Add the following api keys:
    <ul>
      <li>exports.apiKey (betterdoctor.com)</li>
      <li>exports.google.apiKey (google geocoding)</li>
    </ul>
  </li>
  <li>$ npm run start</li>
</ul>

<h3>Specifications:</h3>
<ul>
  <li>A user should be able to <b>enter a medical issue</b> to <b>receive a list of doctors</b> in the Portland area that fit the search query.</li>
  <li>A user should be able to to <b>enter a doctor's name</b> to receive a list of doctors in the Portland area that fit the search query.</li>
  <li>If the query response includes any doctors, the following information should be included about each doctor: <b>first name, last name, address, phone number and whether or not the doctor is accepting new patients</b>.</li>
  <li>If the API call results in an error (any message not a 200 OK), the application should return a notification that states what the error is.</li>
  <li>If the query response doesn't include any doctors (for instance, if no doctors meet the search criteria), the application should return a notification that states that no doctors meet the criteria. (This is not an error so it should be handled separately from any errors.)</li>
  <li><i>New Feature</i>: Allow users to <b>search by location</b> (instead of just hardcoding a value for Portland). This will involve making two API calls: one to geocode the latitude and longitude of a location and then a second call to the BetterDoctor API.</li>
</ul>

<i>Created 3/23/18 by Logan Tanous</i>
