'use strict';

var MongoStore = require('./src/mongostore');

module.exports.create = function (options) {
  var was = {};
  if (!was.db) {
    was.db = new MongoStore();
  };

  var defaults = {};



  var accounts = {
    checkKeypair: function (opts, cb) {
      // opts.email // optional
      // opts.accountId // optional
      
      // check db and return null or keypair object with one of privateKeyPem or privateKeyJwk
      was.db && was.db.getAccount(opts, cb);
    }
  , setKeypair: function (opts, keypair, cb) {
      // opts.email // optional
      // opts.accountId // optional
      
      // SAVE to db (as PEM and/or JWK) and index each domain in domains to this keypair
      was.db && was.db.setAccount(opts, keypair, cb);
    }
  , check: function (opts, cb) {
      // opts.email // optional
      // opts.accountId // optional
      // opts.domains // optional
      
      // return account from db if it exists, otherwise null
      was.db && was.db.getAccount(opts, cb);
    }
  , set: function (opts, reg, cb) {
      // opts.email
      // reg.keypair
      // reg.receipt // response from acme server
      
      
      was.db && was.db.setAccount(opts, reg, cb);
    }
  };



  var certificates = {
    checkKeypair: function (opts, cb) {
      // opts.domains
      
      // check db and return null or keypair object with one of privateKeyPem or privateKeyJwk
      was.db && was.db.getCertificate(opts, cb);
    }
  , setKeypair: function (opts, keypair, cb) {
      // opts.domains
      
      // SAVE to db (as PEM and/or JWK) and index each domain in domains to this keypair
      was.db && was.db.setCertificate(opts, keypair, cb);
    }
  , check: function (opts, cb) {
      // You will be provided one of these (which should be tried in this order)
      // opts.domains
      // opts.email // optional
      // opts.accountId // optional
      
      // return certificate PEMs from db if they exist, otherwise null
      // optionally include expiresAt and issuedAt, if they are known exactly
      // (otherwise they will be read from the cert itself later)
      was.db && was.db.getCertificate(opts, cb);
    }
  , set: function (opts, pems, cb) {
      // opts.domains
      // opts.email // optional
      // opts.accountId // optional
      
      // pems.privkey
      // pems.cert
      // pems.chain
      
      // SAVE to the database, index the email address, the accountId, and alias the domains
      was.db && was.db.setCertificate(opts, pems, cb);
    }
  };



  return {
    getOptions: function () {
      // merge options with default settings and then return them
      return options;
    }
  , accounts: accounts
  , certificates: certificates
  };



};
