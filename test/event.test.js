var app = require('../server/server.js');
var should = require('should');
var supertest = require('supertest');
describe('Test Event Model', function(){
	 describe('Test REST API - fetchEvents', function(){

	 	it('Error Check - Typ is other than brand and generic', function(done){
	 		supertest(app).get('/api/events?q="ROCEPHIN"&typ=other&skip=1&limit=1').expect(400).end(function(err,res){
		 		if(err) throw err;
		 		res.status.should.equal(400);
		 		var responseOBJ = res.body; 
		 		responseOBJ.message.should.equal('Typ must be either brand or generic.');
		 		done();
	 		});	
	 	});

	 	it('Error Check - Limit cannot be more than 100.', function(done){
	 		supertest(app).get('/api/events?q="ROCEPHIN"&typ=brand&skip=1&limit=101').expect(400).end(function(err,res){
		 		if(err) throw err;
		 		res.status.should.equal(400);
		 		var responseOBJ = res.body; 
		 		responseOBJ.message.should.equal('Limit cannot be more than 100.');
		 		done();
	 		});	
	 	});

	 	it('Error Check - Skip cannot be more than 5000.', function(done){
	 		supertest(app).get('/api/events?q="ROCEPHIN"&typ=brand&skip=5001&limit=100').expect(400).end(function(err,res){
		 		if(err) throw err;
		 		res.status.should.equal(400);
		 		var responseOBJ = res.body; 
		 		responseOBJ.message.should.equal('Skip cannot be more than 5000.');
		 		done();
	 		});	
	 	});


	 	it('Results exists with brand name search', function(done){
	 		this.timeout(30000);
	 		supertest(app).get('/api/events?q="ROCEPHIN"&typ=brand&skip=1&limit=1').expect(200).end(function(err,res){
		 		if(err) throw err;
		 		res.status.should.equal(200)
		 		var responseOBJ = res.body; 
		 		responseOBJ.response.skip.should.equal(1);
		 		responseOBJ.response.limit.should.equal(1);
		 		should.exists(responseOBJ.response.events);
		 		responseOBJ.response.events.length.should.equal(1);
		 		done();
	 		});	
	 	});

	 	it('Results exists with generic name search', function(done){
	 		this.timeout(30000);
	 		supertest(app).get('/api/events?q="CEFTRIAXONE SODIUM"&typ=generic&skip=1&limit=1').expect(200).end(function(err,res){
		 		if(err) throw err;
		 		res.status.should.equal(200)
		 		var responseOBJ = res.body; 
		 		responseOBJ.response.skip.should.equal(1);
		 		responseOBJ.response.limit.should.equal(1);
		 		should.exists(responseOBJ.response.events);
		 		responseOBJ.response.events.length.should.equal(1);
		 		done();
	 		});	
	 	});

	 	it("Results don't exists with brand name search", function(done){
	 		this.timeout(30000);
	 		supertest(app).get('/api/events?q="XXYYY"&typ=brand&skip=1&limit=1').expect(200).end(function(err,res){
		 		if(err) throw err;
		 		res.status.should.equal(200);
		 		var responseOBJ = res.body; 
		 		should.not.exists(responseOBJ.response.events);
		 		done();
	 		});	
	 	});

	 	it("Results don't exists with generic name search", function(done){
	 		this.timeout(30000);
	 		supertest(app).get('/api/events?q="XXYYY"&typ=generic&skip=1&limit=1').expect(200).end(function(err,res){
		 		if(err) throw err;
		 		res.status.should.equal(200);
		 		var responseOBJ = res.body; 
		 		should.not.exists(responseOBJ.response.events);
		 		done();
	 		});	
	 	});

	 });

	describe('Test - processFetchEventsResponse', function(){

		it('Response - Error', function(done){
			error = new Error();
			error.status = 500;
			error.message = "Test Error";
			processFetchEventsResponse(error, {}, {}, function(error, result){
				error.status.should.equal(500);
				done();
			});
		});

		it('Response - No results found', function(done){
			var response = {};
			response.statusCode = 400;
			processFetchEventsResponse(null, response, {}, function(error, result){
				result.should.be.an.instanceOf(Object).and.not.have.property('count');
				done();
			});
		});


	});

});