// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.12.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.12.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
var firebaseConfig = {
	apiKey: 'AIzaSyBDYAff-7BUJXxVVXOiJEN4nYPPTSLoU1Q',
	authDomain: 'pricing-blocker-dev.firebaseapp.com',
	databaseURL: 'https://pricing-blocker-dev.firebaseio.com',
	projectId: 'pricing-blocker-dev',
	storageBucket: 'pricing-blocker-dev.appspot.com',
	messagingSenderId: '946929904056',
	appId: '1:946929904056:web:25371cb46e33db94d5474d',
	measurementId: 'G-4JP64T7WFP',
};
firebase.initializeApp(firebaseConfig);
//to test
console.log('Initialsed');
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
// messaging.setBackgroundMessageHandler(function (payload) {
// 	//To check if the message is coming or not
// 	console.log(
// 		'[firebase-messaging-sw.js] Received background message ',
// 		payload
// 	);
// 	// Customize notification here
// 	const notificationTitle = 'payload.notification.title';
// 	const notificationOptions = {
// 		body: 'payload.notification.body',
// 		icon: 'payload.notification.icon', //Changed the icon
// 		requireInteraction: true,
// 	};
// 	// return self.registration.showNotification(notificationTitle, notificationOptions);
// });

const channel = new BroadcastChannel('sw-messages');

this.onpush = (event) => {
	console.log('Firebase push notif received');
	// console.log(event.data.json());
	channel.postMessage(event.data.json());
};

// addEventListener('message', (event) => {
// 	// event is an ExtendableMessageEvent object
// 	console.log('The client sent me a message', event.data);
// 	self.clients.matchAll(/* search options */).then((clients) => {
// 		console.log(clients);
// 		if (clients && clients.length) {
// 			// you need to decide which clients you want to send the message to..
// 			client = clients[0];
// 			client.postMessage('your message');
// 		}
// 	});
// 	// client.postMessage('Hi client');
// });
// addEventListener('push', (event) => {
// 	console.log('The client sent me a message', event.data);
// 	client.postMessage('Hi');
// });

// console.log(client);
