/**
 * @fileoverview Externs for Firebase
 *
 * @externs
 */



/**
  @param {string} firebaseURL
  @constructor
 */
function Firebase(firebaseURL) {}


/**
 * Firebase timestamp.
 *
 * @type {Object}
 */
Firebase.ServerValue = {
  TIMESTAMP: null
};


/**
  @param {string} authToken
  @param {Function=} opt_onComplete
  @param {Function=} opt_onCancel
 */
Firebase.prototype.auth = function(authToken, opt_onComplete, opt_onCancel) {};


/**
  @param {string} authToken
  @param {Function=} opt_onComplete
  @param {Function=} opt_onCancel
 */
Firebase.prototype.unauth =
    function(authToken, opt_onComplete, opt_onCancel) {};


/**
  @param {string} childPath
  @return {Firebase}
 */
Firebase.prototype.child = function(childPath) {};


/**
  @return {Firebase}
 */
Firebase.prototype.parent = function() {};


/**
  @return {string}
 */
Firebase.prototype.name = function() {};


/**
  @param {(Object|string|number|boolean)} value
  @param {Function=} opt_onComplete
 */
Firebase.prototype.set = function(value, opt_onComplete) {};


/**
  @param {Object} value
  @param {Function=} opt_onComplete
 */
Firebase.prototype.update = function(value, opt_onComplete) {};


/**
  @param {Function=} opt_onComplete
 */
Firebase.prototype.remove = function(opt_onComplete) {};


/**
  @param {(Object|string|number|boolean)=} opt_value
  @param {Function=} opt_onComplete
  @return {Firebase}
 */
Firebase.prototype.push = function(opt_value, opt_onComplete) {};


/**
  @param {(Object|string|number|boolean)} value
  @param {(string|number|Object)} priority
  @param {Function=} opt_onComplete
 */
Firebase.prototype.setWithPriority =
    function(value, priority, opt_onComplete) {};


/**
  @param {(string|number|Object)} priority
  @param {Function=} opt_onComplete
 */
Firebase.prototype.setPriority = function(priority, opt_onComplete) {};


/**
  @param {Function} updateFunction
  @param {Function=} opt_onComplete
  @param {Function=} opt_applyLocally
 */
Firebase.prototype.transaction =
    function(updateFunction, opt_onComplete, opt_applyLocally) {};


/**
  @param {Function} updateFunction
  @param {Function=} opt_onComplete
  @param {Function=} opt_applyLocally
 */
Firebase.prototype.goOffline =
    function(updateFunction, opt_onComplete, opt_applyLocally) {};


/**
  @param {Function} updateFunction
  @param {Function=} opt_onComplete
  @param {Function=} opt_applyLocally
 */
Firebase.prototype.goOnline =
    function(updateFunction, opt_onComplete, opt_applyLocally) {};


/**
  @param {string} eventType
  @param {function(FirebaseDataSnapshot)} callback
  @param {Function=} opt_cancelCallback
  @param {Object=} opt_context
  @return {Function}
 */
Firebase.prototype.on =
    function(eventType, callback, opt_cancelCallback, opt_context) {};


/**
  @param {string=} opt_eventType
  @param {Function=} opt_callback
  @param {Object=} opt_context
  @return {Function}
 */
Firebase.prototype.off = function(opt_eventType, opt_callback, opt_context) {};


/**
  @param {string} eventType
  @param {function(FirebaseDataSnapshot)} successCallback
  @param {Function=} opt_failureCallback
  @param {Object=} opt_context
  @return {Function}
 */
Firebase.prototype.once =
    function(eventType, successCallback, opt_failureCallback, opt_context) {};


/**
  @param {number} limit
  @return {Firebase} Actually it returns Query
 */
Firebase.prototype.limit = function(limit) {};


/**
  @param {(string|number)=} opt_priority
  @param {(string|number)=} opt_name
  @return {Firebase} Actually it returns Query
 */
Firebase.prototype.startAt = function(opt_priority, opt_name) {};


/**
  @param {(string|number)=} opt_priority
  @param {(string|number)=} opt_name
  @return {Firebase} Actually it returns Query
 */
Firebase.prototype.endAt = function(opt_priority, opt_name) {};


/**
  @param {(string|number)=} opt_priority
  @param {(string|number)=} opt_name
  @return {Firebase} Actually it returns Query
 */
Firebase.prototype.equalTo = function(opt_priority, opt_name) {};


/**
  Get a Firebase reference to the Query's location.
  @return {Firebase}
 */
Firebase.prototype.ref = function() {};


/**
  Get a Firebase reference to the Query's location.
  @return {Firebase}
 */
Firebase.prototype.onDisconnect = function() {};



/**
  @param {Firebase} ref
  @param {Function} callback
  @param {Object=} opt_context
  @constructor
 */
function FirebaseSimpleLogin(ref, callback, opt_context) {}


/**
  @param {string} provider
  @param {Object=} opt_options
 */
FirebaseSimpleLogin.prototype.login = function(provider, opt_options) {};


/**
  @param {string} provider
  @param {Object=} opt_options
 */
FirebaseSimpleLogin.prototype.logout = function(provider, opt_options) {};


/**
  @param {string} email
  @param {string} password
  @param {Function=} opt_callback
 */
FirebaseSimpleLogin.prototype.createUser =
    function(email, password, opt_callback) {};


/**
  @param {string} email
  @param {string} oldPassword
  @param {string} newPassword
  @param {Function} callback
 */
FirebaseSimpleLogin.prototype.changePassword =
    function(email, oldPassword, newPassword, callback) {};


/**
  @param {string} email
  @param {Function} callback
 */
FirebaseSimpleLogin.prototype.sendPasswordResetEmail =
    function(email, callback) {};


/**
  @param {string} email
  @param {string} password
  @param {Function} callback
 */
FirebaseSimpleLogin.prototype.removeUser =
    function(email, password, callback) {};



/**
  @constructor
 */
function FirebaseDataSnapshot() {}


/**
  @return {(Object|String|Number|Boolean|Null)}
 */
FirebaseDataSnapshot.prototype.val = function() {};


/**
  @param {string} childPath
  @return {FirebaseDataSnapshot}
 */
FirebaseDataSnapshot.prototype.child = function(childPath) {};


/**
  @param {function(FirebaseDataSnapshot): boolean} childAction
  @return {boolean}
 */
FirebaseDataSnapshot.prototype.forEach = function(childAction) {};


/**
  @param {string} childPath
  @return {boolean}
 */
FirebaseDataSnapshot.prototype.hasChild = function(childPath) {};


/**
  @return {boolean}
 */
FirebaseDataSnapshot.prototype.hasChildren = function() {};


/**
  @return {string}
 */
FirebaseDataSnapshot.prototype.name = function() {};


/**
  @return {number}
 */
FirebaseDataSnapshot.prototype.numChildren = function() {};


/**
  @return {Firebase}
 */
FirebaseDataSnapshot.prototype.ref = function() {};


/**
  @return {(string|number|null)}
 */
FirebaseDataSnapshot.prototype.getPriority = function() {};


/**
  @return {Object}
 */
FirebaseDataSnapshot.prototype.exportVal = function() {};
