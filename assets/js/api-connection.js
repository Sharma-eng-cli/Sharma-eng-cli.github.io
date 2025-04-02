// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
// 🔥 Firebase Configuration (Replace with your Firebase config)
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCOKsCTiWnErtTpovgrX0zsZUDp4SIRxjQ",
    authDomain: "my-education-platform-ffa4b.firebaseapp.com",
    projectId: "my-education-platform-ffa4b",
    storageBucket: "my-education-platform-ffa4b.firebasestorage.app",
    messagingSenderId: "671611302747",
    appId: "1:671611302747:web:2b566c202247c490fa207e",
    measurementId: "G-S1CSW9926F"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  // 🔄 Fetch Publications from Firestore
  function fetchPublications() {
      db.collection("publications").get().then((querySnapshot) => {
          const pubContainer = document.getElementById("publications");
          if (!pubContainer) return;
  
          pubContainer.innerHTML = ""; // Clear existing content
  
          querySnapshot.forEach((doc) => {
              const pub = doc.data();
              const pubDiv = document.createElement("div");
              pubDiv.classList.add("publication");
              pubDiv.setAttribute("data-category", pub.category); // Ensures filtering works
  
              pubDiv.innerHTML = `
                  <h3>${pub.title}</h3>
                  <p><strong>Author:</strong> ${pub.author}</p>
                  <p><strong>Category:</strong> ${pub.category}</p>
              `;
  
              pubContainer.appendChild(pubDiv);
          });
  
          // Trigger event after data is loaded (so filtering works)
          document.dispatchEvent(new Event("dataLoaded"));
      }).catch(error => console.error("Error fetching publications:", error));
  }
  
  // Fetch Data on Page Load
  document.addEventListener("DOMContentLoaded", fetchPublications);
  
// Export Firestore instance
  export { app, db }; 