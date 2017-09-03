// import CONFIG from './config/environment';
// import _ from 'underscore';
// import Backend from './backend';
//
// export default class Parse extends Backend {
//   /**
//    * Parse.js client
//    * @throws tokenMissing if token is undefined
//    */
//   initialize(token) {
//     if (!_.isNull(token) && _.isUndefined(token.sessionToken)) {
//       throw new Error('TokenMissing');
//     }
//     this._sessionToken = _.isNull(token)
//       ? null
//       : token.sessionToken.sessionToken;
//
//     this._applicationId = CONFIG.PARSE.appId;
//     this.config.backendUrl = CONFIG.backend.parseLocal
//       ? CONFIG.PARSE.local.url
//       : CONFIG.PARSE.remote.url;
//   }
//   /**
//    * ### signup
//    *
//    * @param data object
//    *
//    * {username: ''poo', email: 'foo@gmail.com', password: 'Passw0rd!'}
//    *
//    * @return
//    * if ok, res.json={createdAt: '2017-12-30T15:17:05.379Z',
//    *   objectId: '5TgExo2wBA',
//    *   sessionToken: 'r:dEgdUkcs2ydMV9Y9mt8HcBrDM'}
//    *
//    * if error, {code: xxx, error: 'message'}
//    */
//   async signup(data) {
//     return await this._fetch({ method: 'POST', url: '/users', body: data })
//       .then(res => {
//         return res.json().then(function(json) {
//           if (res.status === 200 || res.status === 201) {
//             return json;
//           } else {
//             throw json;
//           }
//         });
//       })
//       .catch(error => {
//         throw error;
//       });
//   }
//   /**
//    * ### login
//    * encode the data and and call _fetch
//    *
//    * @param data
//    *
//    *  {username: ''poo', password: 'Passw0rd!'}
//    *
//    * @returns
//    *
//    * createdAt: '2017-12-30T15:29:36.611Z'
//    * updatedAt: '2017-12-30T16:08:50.419Z'
//    * objectId: 'Z4yvP19OeL'
//    * email: ''poo@foo.com'
//    * sessionToken: 'r:Kt9wXIBWD0dNijNIq2u5rRllW'
//    * username: ''poo'
//    *
//    */
//   async login(data) {
//     const formBody = [];
//     for (let property in data) {
//       const encodedKey = encodeURIComponent(property);
//       const encodedValue = encodeURIComponent(data[property]);
//       formBody.push(encodedKey + '=' + encodedValue);
//     }
//     formBody = formBody.join('&');
//
//     return await this._fetch({
//       method: 'GET',
//       url: '/login?' + formBody
//     })
//       .then(res => {
//         return res.json().then(function(json) {
//           if (res.status === 200 || res.status === 201) {
//             return json;
//           } else {
//             throw json;
//           }
//         });
//       })
//       .catch(error => {
//         throw error;
//       });
//   }
//   /**
//    * ### logout
//    * prepare the request and call _fetch
//    */
//   async logout() {
//     return await this._fetch({ method: 'POST', url: '/logout', body: { } })
//       .then(res => {
//         if (
//           res.status === 200 ||
//           res.status === 201 ||
//           res.status === 400 ||
//           res.code === 209
//         ) {
//           return {};
//         } else {
//           throw new Error({ code: 404, error: 'unknown error from OperationCode.com' });
//         }
//       })
//       .catch(error => {
//         throw error;
//       });
//   }
//   /**
//    * ### resetPassword
//    * the data is already in a JSON format, so call _fetch
//    *
//    * @param data
//    * {email: ''poo@foo.com'}
//    *
//    * @returns empty object
//    *
//    * if error:  {code: xxx, error: 'message'}
//    */
//   async resetPassword(data) {
//     return await this._fetch({
//       method: 'POST',
//       url: '/reset_password',
//       body: data
//     })
//       .then(res => {
//         return res.json().then(function(json) {
//           if (res.status === 200 || res.status === 201) {
//             return {};
//           } else {
//             throw json;
//           }
//         });
//       })
//       .catch(error => {
//         throw error;
//       });
//   }
//   /**
//    * ### getProfile
//    * Using the sessionToken, we'll get everything about
//    * the current user.
//    *
//    * @returns
//    *
//    * if good:
//    * {createdAt: '2017-12-30T15:29:36.611Z'
//    *  email: ''poo@onme.com'
//    *  objectId: 'Z4yvP19OeL'
//    *  sessionToken: 'r:uFeYONgIsZMPyxOWVJ6VqJGqv'
//    *  updatedAt: '2017-12-30T15:29:36.611Z'
//    *  username: ''poo'}
//    *
//    * if error, {code: xxx, error: 'message'}
//    */
//   async getProfile() {
//     return await this._fetch({ method: 'GET'
//      url: this.backendUrl(`${backendUrl}/${requestToken}`) })
//       .then(response => {
//         return response.json().then(function(res) {
//           if (response.status === 200 || response.status === 201) {
//             return res;
//           } else {
//             throw res;
//           }
//         });
//       })
//       .catch(error => {
//         throw error;
//       });
//   }
//   /**
//    * ### updateProfile
//    * for this user, update their record
//    * the data is already in JSON format
//    *
//    * @param userId  _id of Parse.com
//    * @param data object:
//    * {username: 'user', email: 'poo@foo.com'}
//    */
//   async updateProfile(userId, data) {
//     return await this._fetch({
//       method: 'PUT',
//       url: `'/${config.backendUrl}'/users/' + userId'`,
//       body: data
//     })
//       .then(res => {
//         if (res.status === 200 || res.status === 201) {
//           return {};
//         } else {
//           res.json().then(function(res) {
//             throw res;
//           });
//         }
//       })
//       .catch(error => {
//         throw error;
//       });
//   }
//   /**
//    * ### _fetch
//    * A generic function that prepares the request
//    * @returns object:
//    *   code: response.code
//    *   status: response.status
//    *   json: reponse.json()
//    */
//   async _fetch(opts) {
//     opts = _.extend(
//       {
//         method: 'GET',
//         url: `'/${config.backendUrl}/${request.opts}'`,
//         body: setAuthorizationHeader(),
//         callback: getRequests()
//       },
//       opts
//     );
//
//     const reqOpts = {
//       method: opts.method,
//       headers: {
//         'X-Parse-Application-Id': this._appId,
//         'X-Parse-REST-API-Key': this._restAPIKey
//       }
//     };
//     if (this._sessionToken) {
//       reqOpts.headers['X-Parse-Session-Token'] = this._sessionToken;
//     }
//
//     if (opts.method === 'POST' || opts.method === 'PUT') {
//       reqOpts.headers['Accept'] = 'application/json';
//       reqOpts.headers['Content-Type'] = 'application/json';
//     }
//
//     if (opts.body) {
//       reqOpts.body = JSON.stringify(opts.body);
//     }
//
//     return await fetch(this.API_BASE_URL + opts.url, reqOpts);
//   }
// }
// // The singleton constiable
// export let parse = new Parse();


import {DOM} from 'aurelia-pal';

//Note: path and deepPath are designed to handle v0 and v1 shadow dom specs respectively
function findOriginalEventTarget(event) {
  return (event.path && event.path[0]) || (event.deepPath && event.deepPath[0]) || event.target;
}

function stopPropagation() {
  this.standardStopPropagation();
  this.propagationStopped = true;
}

function interceptStopPropagation(event) {
  event.standardStopPropagation = event.stopPropagation;
  event.stopPropagation = stopPropagation;
}

function handleCapturedEvent(event) {
  let interceptInstalled = false;
  event.propagationStopped = false;
  let target = findOriginalEventTarget(event);

  let orderedCallbacks = [];
  /**
   * During capturing phase, event 'bubbles' down from parent. Needs to reorder callback from root down to target
   */
  while (target) {
    if (target.capturedCallbacks) {
      let callback = target.capturedCallbacks[event.type];
      if (callback) {
        if (!interceptInstalled) {
          interceptStopPropagation(event);
          interceptInstalled = true;
        }
        orderedCallbacks.push(callback);
      }
    }
    target = target.parentNode;
  }
  for (let i = orderedCallbacks.length - 1; i >= 0; i--) {
    let orderedCallback = orderedCallbacks[i];
    orderedCallback(event);
    if (event.propagationStopped) {
      break;
    }
  }
}

class CapturedHandlerEntry {
  constructor(eventName) {
    this.eventName = eventName;
    this.count = 0;
  }

  increment() {
    this.count++;

    if (this.count === 1) {
      DOM.addEventListener(this.eventName, handleCapturedEvent, true);
    }
  }

  decrement() {
    this.count--;

    if (this.count === 0) {
      DOM.removeEventListener(this.eventName, handleCapturedEvent, true);
    }
  }
}

function handleDelegatedEvent(event) {
  let interceptInstalled = false;
  event.propagationStopped = false;
  let target = findOriginalEventTarget(event);

  while (target && !event.propagationStopped) {
    if (target.delegatedCallbacks) {
      let callback = target.delegatedCallbacks[event.type];
      if (callback) {
        if (!interceptInstalled) {
          interceptStopPropagation(event);
          interceptInstalled = true;
        }
        callback(event);
      }
    }

    target = target.parentNode;
  }
}

class DelegateHandlerEntry {
  constructor(eventName) {
    this.eventName = eventName;
    this.count = 0;
  }

  increment() {
    this.count++;

    if (this.count === 1) {
      DOM.addEventListener(this.eventName, handleDelegatedEvent, false);
    }
  }

  decrement() {
    this.count--;

    if (this.count === 0) {
      DOM.removeEventListener(this.eventName, handleDelegatedEvent);
    }
  }
}

class DefaultEventStrategy {
  delegatedHandlers = {};
  capturedHandlers = {};

  subscribe(target, targetEvent, callback, strategy) {
    let delegatedHandlers;
    let capturedHandlers;
    let handlerEntry;

    if (strategy === delegationStrategy.bubbling) {
      delegatedHandlers = this.delegatedHandlers;
      handlerEntry = delegatedHandlers[targetEvent] || (delegatedHandlers[targetEvent] = new DelegateHandlerEntry(targetEvent));
      let delegatedCallbacks = target.delegatedCallbacks || (target.delegatedCallbacks = {});

      handlerEntry.increment();
      delegatedCallbacks[targetEvent] = callback;

      return function() {
        handlerEntry.decrement();
        delegatedCallbacks[targetEvent] = null;
      };
    }
    if (strategy === delegationStrategy.capturing) {
      capturedHandlers = this.capturedHandlers;
      handlerEntry = capturedHandlers[targetEvent] || (capturedHandlers[targetEvent] = new CapturedHandlerEntry(targetEvent));
      let capturedCallbacks = target.capturedCallbacks || (target.capturedCallbacks = {});

      handlerEntry.increment();
      capturedCallbacks[targetEvent] = callback;

      return function() {
        handlerEntry.decrement();
        capturedCallbacks[targetEvent] = null;
      };
    }

    target.addEventListener(targetEvent, callback, false);

    return function() {
      target.removeEventListener(targetEvent, callback);
    };
  }
}

export const delegationStrategy = {
  none: 0,
  capturing: 1,
  bubbling: 2
};

export class EventManager {
  constructor() {
    this.elementHandlerLookup = {};
    this.eventStrategyLookup = {};

    this.registerElementConfig({
      tagName: 'input',
      properties: {
        value: ['change', 'input'],
        checked: ['change', 'input'],
        files: ['change', 'input']
      }
    });

    this.registerElementConfig({
      tagName: 'textarea',
      properties: {
        value: ['change', 'input']
      }
    });

    this.registerElementConfig({
      tagName: 'select',
      properties: {
        value: ['change']
      }
    });

    this.registerElementConfig({
      tagName: 'content editable',
      properties: {
        value: ['change', 'input', 'blur', 'keyup', 'paste']
      }
    });

    this.registerElementConfig({
      tagName: 'scrollable element',
      properties: {
        scrollTop: ['scroll'],
        scrollLeft: ['scroll']
      }
    });

    this.defaultEventStrategy = new DefaultEventStrategy();
  }

  registerElementConfig(config) {
    let tagName = config.tagName.toLowerCase();
    let properties = config.properties;
    let propertyName;

    this.elementHandlerLookup[tagName] = {};

    for (propertyName in properties) {
      if (properties.hasOwnProperty(propertyName)) {
        this.registerElementPropertyConfig(tagName, propertyName, properties[propertyName]);
      }
    }
  }

  registerElementPropertyConfig(tagName, propertyName, events) {
    this.elementHandlerLookup[tagName][propertyName] = this.createElementHandler(events);
  }

  createElementHandler(events) {
    return {
      subscribe(target, callback) {
        events.forEach(changeEvent => {
          target.addEventListener(changeEvent, callback, false);
        });

        return function() {
          events.forEach(changeEvent => {
            target.removeEventListener(changeEvent, callback);
          });
        };
      }
    };
  }

  registerElementHandler(tagName, handler) {
    this.elementHandlerLookup[tagName.toLowerCase()] = handler;
  }

  registerEventStrategy(eventName, strategy) {
    this.eventStrategyLookup[eventName] = strategy;
  }

  getElementHandler(target, propertyName) {
    let tagName;
    let lookup = this.elementHandlerLookup;

    if (target.tagName) {
      tagName = target.tagName.toLowerCase();

      if (lookup[tagName] && lookup[tagName][propertyName]) {
        return lookup[tagName][propertyName];
      }

      if (propertyName === 'textContent' || propertyName === 'innerHTML') {
        return lookup['content editable'].value;
      }

      if (propertyName === 'scrollTop' || propertyName === 'scrollLeft') {
        return lookup['scrollable element'][propertyName];
      }
    }

    return null;
  }

  addEventListener(target, targetEvent, callback, delegate) {
    return (this.eventStrategyLookup[targetEvent] || this.defaultEventStrategy)
      .subscribe(target, targetEvent, callback, delegate);
  }
}
