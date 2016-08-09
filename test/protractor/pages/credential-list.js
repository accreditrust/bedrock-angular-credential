/*!
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */

var bedrock = global.bedrock;

var api = {};
module.exports = api;

var by = global.by;
var element = global.element;
var should = global.should;
var expect = global.expect;
var protractor = global.protractor;

api.COMPONENT_TAG = 'br-credentials';

api.credentials = function() {
  return element.all(by.repeater('credential in model.credentials'));
};

api.clickCredential = function(credential) {
  credential.element(by.tagName('a')).click();
};

api.credentialLink = function(credential) {
  return credential.element(by.tagName('a')).getAttribute('href');
};
