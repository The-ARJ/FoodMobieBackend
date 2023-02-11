const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://<DATABASE_NAME>.firebaseio.com"
});

// Store the information about the push notification
var notification = {
  title: "Hello World!",
  message: "This is a test notification",
  targetDevices: ["device_token_1", "device_token_2"],
  timeSent: new Date().getTime()
};

// Write the notification to Firebase Realtime Database
var notificationsRef = admin.database().ref("notifications");
notificationsRef.push(notification, function(error) {
  if (error) {
    console.error("Error storing the notification: " + error);
  } else {
    console.log("Notification stored successfully");
  }
});