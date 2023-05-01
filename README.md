# ReactNative-FireBase-ChatRandom
This is an application made with react-native(expo) and firebase. 

Start the application:

Download the repository and enter the command: npm start.

Then you must create an account in firebase and create a web service.
Copy the credentials that firebase will give you and create an .env file in the project and put:

API_KEY = <your firebase key>.
DOMAIN = <your firebase domain>.
PROJECT_ID = <your firebase project id>.
STORAGE_BUCKET = <your firebase storage bucket id>.
SENDER = <your firebase sender>.
APP_ID = <your firebase app idg>.
MEASUREMENT = <your firebase measure>.

Next create a database in firebase, put it in test mode and create the following collections: users and messages.

Inside messages create the following documents:

name : screamer
status : false
url : ""

name : background
url : https://firebasestorage.googleapis.com/v0/b/projectx-7ad0d.appspot.com/o/back-1.png?alt=media&token=87d17324-2212-48ab-a75d-584eb3de9151

Finally, download the expo application on your mobile device and run the command npm start and scan the QR code with the expo application.
