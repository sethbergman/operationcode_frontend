import config from './config/environment';
import _ from 'underscore';
import Backend from './backend';

export default class Parse extends Backend {
  export const setAuthorizationHeader = () => {
    const cookies = new Cookies();
    return {
      Authorization: `bearer ${cookies.get('token')}`
      initialize(token) {
        if (!_.isNull(token) && _.isUndefined(token.sessionToken)) {
          throw new Error('TokenMissing');
        }
        _sessionToken = _.isNull(token)
          ? null
          : token.sessionToken.sessionToken;

        _applicationId = config.PARSE.appId;
        config.backendUrl = config.backend.parseLocal
          ? config.PARSE.local.url
          : config.PARSE.remote.url;
      }
    };
  };

  async signup(data) {
    return await _fetch({ method: 'POST', url: '/users', body: data })
      .then(res => {
        return res.json().then(function(json) {
          if (res.status === 200 || res.status === 201) {
            return json;
          } else {
            throw json;
          }
        });
      })
      .catch(error => {
        throw error;
      });
  }

  async login(data) {
    const formBody = [];
    for (let property in data) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    return await _fetch({
      method: 'GET',
      url: '/login/' + formBody
    })
      .then(res => {
        return res.json().then(function(json) {
          if (res.status === 200 || res.status === 201) {
            return json;
          } else {
            throw json;
          }
        });
      })
      .catch(error => {
        throw error;
      });
  }

  async logout() {
    return await _fetch({ method: 'POST', url: '/logout', body: { } })
      .then(res => {
        if (
          res.status === 200 ||
          res.status === 201 ||
          res.status === 400 ||
          res.code === 209
        ) {
          return {};
        } else {
          throw new Error({ code: 404, error: 'unknown error from OperationCode.com' });
        }
      })
      .catch(error => {
        throw error;
      });
  }

  async resetPassword(data) {
    return await _fetch({
      method: 'POST',
      url: '/reset_password',
      body: data
    })
      .then(res => {
        return res.json().then(function(json) {
          if (res.status === 200 || res.status === 201) {
            return {};
          } else {
            throw json;
          }
        });
      })
      .catch(error => {
        throw error;
      });
  }

  async getProfile() {
    return await _fetch({ method: 'GET'
     url: backendUrl(`${backendUrl}/${requestToken}`) })
      .then(response => {
        return response.json().then(function(res) {
          if (response.status === 200 || response.status === 201) {
            return res;
          } else {
            throw res;
          }
        });
      })
      .catch(error => {
        throw error;
      });
  }

  async updateProfile(userId, data) {
    return await _fetch({
      method: 'PUT',
      url: `'/${config.backendUrl}'/users/' + userId'`,
      body: data
    })
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          return {};
        } else {
          res.json().then(function(res) {
            throw res;
          });
        }
      })
      .catch(error => {
        throw error;
      });
  }

  async _fetch(opts) {
    opts = _.extend(
      {
        method: 'GET',
        url: `'/${config.backendUrl}/${request.opts}'`,
        body: setAuthorizationHeader(),
        callback: getRequests()
      },
      opts
    );

    const reqOpts = {
      method: opts.method,
      headers: {
        'X-Parse-Application-Id': _appId,
        'X-Parse-REST-API-Key': _restAPIKey
      }
    };
    if (_sessionToken) {
      reqOpts.headers['X-Parse-Session-Token'] = _sessionToken;
    }

    if (opts.method === 'POST' || opts.method === 'PUT') {
      reqOpts.headers['Accept'] = 'application/json';
      reqOpts.headers['Content-Type'] = 'application/json';
    }

    if (opts.body) {
      reqOpts.body = JSON.stringify(opts.body);
    }

    return await fetch(API_BASE_URL + opts.url, reqOpts);
  }
}

export let parse = new Parse();
