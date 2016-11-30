
var chai = require('chai');
var request = require('supertest');
var expect = chai.expect;
var AppServer = require('../../server.js'); 

const url = "http://localhost:3000";

describe('Server', function () {
	it('testing that the server is running', function() {
		request(url)
			.get('/')
			.expect(200)
			.end(function(err, res) {
				if (err) throw err;
			});
	});
});