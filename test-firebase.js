// test-firebase.js - Simple Firebase connection test
// Run with: node test-firebase.js

require('dotenv').config();

async function testFirebaseConnection() {
  try {
    // console.log('Testing Firebase connection...');
    
    // Check environment variables
    if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      console.error('❌ FIREBASE_SERVICE_ACCOUNT_KEY not found in environment variables');
      return;
    }
    
    // console.log('✅ FIREBASE_SERVICE_ACCOUNT_KEY found');
    
    // Test parsing the service account key
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    // console.log('✅ Service account key parsed successfully');
    // console.log('Project ID:', serviceAccount.project_id);
    
    // Test Firebase Admin initialization
    const { cert, getApps, initializeApp } = require('firebase-admin/app');
    const { getFirestore } = require('firebase-admin/firestore');
    
    if (!getApps().length) {
      initializeApp({ credential: cert(serviceAccount) });
      // console.log('✅ Firebase Admin initialized');
    }
    
    const db = getFirestore();
    // console.log('✅ Firestore database instance created');
    
    // Test a simple read operation
    const testDoc = db.collection('test').doc('connection-test');
    await testDoc.set({ timestamp: new Date(), test: true });
    // console.log('✅ Write operation successful');
    
    const doc = await testDoc.get();
    if (doc.exists) {
      // console.log('✅ This is the data', doc.data());
      // console.log('✅ Read operation successful');
      await testDoc.delete(); // Clean up
      // console.log('✅ Delete operation successful');
    }
    
    console.log('🎉 All Firebase tests passed!');
    
  } catch (error) {
    console.error('❌ Firebase test failed:', error);
  }
}

testFirebaseConnection();