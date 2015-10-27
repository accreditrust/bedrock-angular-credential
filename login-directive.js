/*!
 * Login directive.
 *
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Matthew Collier
 */
define([], function() {

'use strict';

/* @ngInject */
function factory(brAuthenticationService, config) {
  return {
    restrict: 'E',
    scope: {
      callback: '&brLoginCallback'
    },
    templateUrl: requirejs.toUrl(
      'bedrock-angular-credential/login.html'),
    link: Link
  };

  function Link(scope) {
    var model = scope.model = {};
    model.baseUri = config.data.baseUri;
    model.aioBaseUri = config.data['authorization-io'].baseUri;
    model.siteTitle = config.data.siteTitle;

    model.login = function() {
      var identity_;
      navigator.credentials.get({
        query: {
          '@context': 'https://w3id.org/identity/v1',
          id: '',
          publicKey: ''
        },
        agentUrl: model.aioBaseUri + '/agent?op=get&route=params'
      }).then(function(identity) {
        if(!identity || !identity.id) {
          throw new Error('DID not provided.');
        }
        // POST identity for verification and to establish session
        return brAuthenticationService.login(identity);
      }).then(function(identity) {
        identity_ = identity;
      }).catch(function(err) {
        scope.callback({err: err});
      }).then(function() {
        scope.callback({err: null, identity: identity_});
      });
    };
  }
}

return {brLogin: factory};

});
