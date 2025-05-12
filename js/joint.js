// Include Firebase SDK via CDN
// Add the following script tags in your HTML file:
// <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js"></script>
// <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js"></script>

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCpyGybkDzb8vg6CLrq94Obr_6ocNW3I48",
    authDomain: "postandearn-913e7.firebaseapp.com",
    databaseURL: "https://postandearn-913e7-default-rtdb.firebaseio.com",
    projectId: "postandearn-913e7",
    storageBucket: "postandearn-913e7.appspot.com",
    messagingSenderId: "516981459091",
    appId: "1:516981459091:web:252fa231f2b08c8a752566",
    measurementId: "G-4J5FET99CL"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database(app);

// Reference to your database path
const dbRef = firebase.database().ref('admins/002/LinkType');

// Fetch data from the database
dbRef.on('value', (snapshot) => {
    const data = snapshot.val();
    console.log("Fetched data:", data);
    let html = '';
    console.log("Data type:", typeof data);
    for (const key in data) {
        if (data.hasOwnProperty(key)) {

            const value = data[key];
            if(value){
            console.log(`Key: ${key}, Value: ${value}`);
            const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
            // itteration for facebook, instagram, twitter, google, yahoo and hotmail buttons or links
            const icons = {
                facebook: '<i class="fab fa-facebook"></i>',
                instagram: '<i class="fab fa-instagram"></i>',
                twitter: '<i class="fab fa-twitter"></i>',
                google: '<i class="fab fa-google"></i>',
                yahoo: '<i class="fab fa-yahoo"></i>',
                hotmail: '<i class="fas fa-envelope"></i>'
            };

            const icon = icons[key] || ''; // Default to empty if no icon is found
            html += `<a href="/${key}.html" class="button ${key}">${icon} Sign in with ${capitalizedKey}</a>`;
            }
        }
    }
    document.getElementById("choose").innerHTML += html;
}, (error) => {
    console.error("Error fetching data:", error);
});