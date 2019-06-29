import * as firebase from 'firebase';
import { firebaseConfig,
         firebaseSubscriberTemplate,
         firebaseDBRefs } from './firebase_config';
import { printErrors } from '../utils/utils';
import { mapValues, forEach } from 'lodash';

const verboseInitialization = false, 
//  verboseInitialization = true, 
      verboseAuthorization = false,
      // verboseAuthorization = true,
      verboseSubscriptions = false,
      // verboseSubscriptions = true,
      verboseNotifications = false,
      // verboseNotifications = true,
      verboseDBInteractions = false;
      // verboseDBInteractions = true;

// --------- Set up Taskata function to deal with firebase ---------

firebase.initializeApp(firebaseConfig);

function Taskata() { this.initFirebase(); }

// Sets up shortcuts to Firebase features and initiate firebase auth.
Taskata.prototype.initFirebase = function() {
  // Shortcuts to Firebase SDK features.
  console.log('Begin initializing Taskata App');
  this.auth = firebase.auth();
  this.database = firebase.database();
  // this.storage = firebase.storage();

  if(verboseInitialization) {
    console.log("this: ", this);
    console.log("this.auth: ", this.auth);
    console.log("this.database: ", this.database);
  }

  this.checkingAuth = true;

  this.subscribers = firebaseSubscriberTemplate;
  this.dbRefs      = firebaseDBRefs;
  this.getRef      = this.getRef.bind(this);
  this.setRefs     = this.setRefs.bind(this);

  this.createItem  = this.createItem.bind(this);
  this.updateItem  = this.updateItem.bind(this);
  this.destroyItem = this.destroyItem.bind(this);

  this.subscribe   = this.subscribe.bind(this);
  this.unsubscribe = this.unsubscribe.bind(this);
  this.notify      = this.notify.bind(this);
  
  this.signInUser  = this.signInUser.bind(this);
  this.signUpUser  = this.signUpUser.bind(this);
  this.signOutUser = this.signOutUser.bind(this);

  this.checkCurrentUser = this.checkCurrentUser.bind(this);

  // Initiates Firebase auth and listen to auth state changes.
  this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));

  console.log('Finish initializing Taskata App');
};


// This whole function is the callback that fires when auth changes
Taskata.prototype.onAuthStateChanged = function(user){
  console.log("Auth state changed");
  
  this.checkingAuth = false;

  if (verboseAuthorization) { 
    console.log("User: ", user ? user : 'logged out'); }

  this.setRefs(user ? user.uid : null);
  this.notify({ subscribersTo: 'authChanges', data: user});    
}

Taskata.prototype.signUpUser = async function(email, password) {
  this.checkingAuth = true;
  try { await this.auth.createUserWithEmailAndPassword(email, password); }
  catch (err) { printErrors(err); }
};

Taskata.prototype.signInUser = async function(email, password) {
  this.checkingAuth = true;
  try { await this.auth.signInWithEmailAndPassword(email, password); }
  catch (err) { printErrors(err); }
};

Taskata.prototype.signOutUser = async function() {
  this.checkingAuth = true;
  try { await this.auth.signOut(); }
  catch (err) { printErrors(err); }
}

Taskata.prototype.setRefs = function(uid) {
  if(uid) {
    let copy = mapValues(this.dbRefs, v => v + uid + '/');
    this.dbRefs = copy;
  } else {
    this.dbRefs = firebaseDBRefs;
  }
}

Taskata.prototype.subscribe = function({ list, 
                                         type, 
                                         subscriberId, 
                                         callback,
                                         waitForAuth,
                                         dbKey }) {
  
  if(verboseSubscriptions){
  console.log(`Subscribe ${subscriberId} to ${list}${type ? '.'+type : ''}`);
  }
  switch(list){
    case 'authChanges':
      this.subscribers.authChanges[subscriberId] = callback;
      break;
    case 'dbChanges':
      if(type){
        if(waitForAuth && this.checkingAuth){
          if(verboseSubscriptions){
            console.log('Still checking auth, ' + subscriberId + ' waiting');
          }

          const authToDBCallback = () => {
            this.subscribe({
              list: 'dbChanges',
              type: type,
              subscriberId: subscriberId,
              callback: callback
            });
            this.unsubscribe({
              list: 'authChanges',
              subscriberId: subscriberId + '-' + type
            });
          }
          this.subscribe({
            list: 'authChanges',
            subscriberId: subscriberId + '-' + type,
            callback: authToDBCallback
          })
        } else {
          this.subscribers.dbChanges[type][subscriberId] = callback;

          const options = { type: type, action: 'read', dbKey: dbKey };

          this.database.ref(this.getRef(options)).on('value', (snapshot) => {
            if(verboseDBInteractions){
              console.log('====================================');
              console.log('subsribe()');
              console.log('subscriberId ' + subscriberId );
              console.log('type ' + type);
              console.log('snapshot.val()');
              console.log(snapshot.val());
              console.log('====================================');
            }
            this.notify({
              subscribersTo: 'dbChanges',
              subscriberId: subscriberId,
              type: type,
              data: snapshot
            })
          })
        }
      }
      break;
    default:
  }
}

Taskata.prototype.unsubscribe = function({ list, type, subscriberId}) {
  if(list === 'authChanges'){
    if(verboseSubscriptions){
      console.log(`Unsubscribe ${subscriberId} from authChanges`);
    }
    delete this.subscribers.authChanges[subscriberId];
    return true;
  } 
  else if(list === 'dbChanges') {
    if(type){
      if(verboseSubscriptions){
        console.log(`Unsubscribe ${subscriberId} from dbChanges.${type}`);
      }
      const subscriberCB = this.subscribers.dbChanges[type][subscriberId];
      this.database.ref(this.dbRefs[type]).off('value', subscriberCB);
      delete this.subscribers.dbChanges[type][subscriberId];
      return true;
    }
  }
  return false;
}

Taskata.prototype.notify = function({ subscribersTo, 
                                      subscriberId,
                                      type, 
                                      data }) {
  if(subscribersTo === 'authChanges'){
    if(verboseNotifications){
      console.log('Notifying authChange subscribers');
    }
    forEach(this.subscribers.authChanges, s => s(data));
  } 
  else if (subscribersTo === 'dbChanges' && type) {
    if(verboseNotifications){
      console.log(`Notifying dbChange.${type} subscribers`);
      console.log('Subscriber list: ');
      console.log(this.subscribers.dbChanges[type]);
      console.log('subscriberId');
      console.log(subscriberId);
    }
    if(type === 'kataLogs'){
      this.subscribers.dbChanges[type][subscriberId](data);
    } else {
      forEach(this.subscribers.dbChanges[type], s => s(data))
    }
  }
}

Taskata.prototype.createItem = async function({ type, data, dbKey }) {
  if(this.checkCurrentUser) {    
    if(type) {
      const ref = this.getRef({type: type, action: 'create', dbKey: dbKey});
      if(ref){
        if(verboseDBInteractions){console.log(data);}
        try { await this.database.ref(ref).push(data); } 
        catch(err) { printErrors(err) }
      }
    }
  }
}

Taskata.prototype.updateItem = async function({ type, dbKey, data }) {
  if(this.checkCurrentUser) {
    const ref = this.getRef({type: type, action: 'update', dbKey: dbKey});
    if(ref && data){
      if(verboseDBInteractions){console.log(data);}
      try { await this.database.ref(ref).update(data); } 
      catch(err) { printErrors(err); }
    } else {
      if(verboseDBInteractions){console.log('No data provided');}
    }
  } 
}  

Taskata.prototype.updateLastItem = async function({ type, dbKey, data }) {
  if(this.checkCurrentUser) {
    const ref = this.getRef({ type: type, 
                              action: 'update', 
                              dbKey: dbKey });
    if(ref && data){
      // let lastRef;
      const snapshot = await this.database.ref(ref)
                                        .limitToLast(1).once('value');

      const keys = Object.keys(snapshot.val());
      const fullRef = ref + '/' + keys[keys.length-1];

      try { await this.database.ref(fullRef).update(data) }
      catch(err) { printErrors(err) }
    }
  } 
}  

Taskata.prototype.destroyItem = async function({ type, dbKey }) {
  if(this.checkCurrentUser) {    
    const ref = this.getRef({type: type, action: 'destroy', dbKey: dbKey});
    if(ref){
      try { await this.database.ref(ref).remove(); } 
      catch(err) { printErrors(err); }
    }
  } 
}

Taskata.prototype.checkCurrentUser = function() {
  if(this.auth.currentUser) {
    return true;
  } else {
    if(verboseAuthorization){console.log('User not signed in');}
    return false;
  }
}

Taskata.prototype.getRef = function({type, action, dbKey}) {
  if(verboseDBInteractions) console.log('getRef()');

  if(type) {
    let ref = this.dbRefs[type];
    if(['create', 'read'].includes(action)){
      // ref = dbKey ? ref + dbKey : ref;
      ref += dbKey ? dbKey : '';

      if(verboseDBInteractions){
        console.log(`dbRef for refType ${type} is ${ref}`);
        console.log(`Try ${action==='create' ? 'pushing' : 'reading'} data`);
      }
      return ref;
    } 
    if(['update', 'destroy'].includes(action) && dbKey) {
      ref += dbKey;
      if(verboseDBInteractions){
        console.log(`dbRef for refType ${type} is ${ref}`);
        console.log(`Try ${action === 'update' ? 'updating' : 'removing'} data`);
      }
      return ref;
    } else {
      if(verboseDBInteractions){ console.log('No dbKey provided'); }
      return false;
    }
  } else {
    if(verboseDBInteractions){ console.log('No type provided'); }
    return false;
  } 
}

export default Taskata;