/**
 * Tests sit right alongside the file they are testing, which is more intuitive
 * and portable than separating `src` and `test` directories. Additionally, the
 * build process will exclude all `.spec.js` files from the build
 * automatically.
 */

describe( 'Detail Events - ', function() {
  beforeEach( module( 'app') );
  beforeEach( module( 'ngMockE2E') );
  
  // Global Vars
  var scope;
  var DetailsEventsController;
  var detailsData = {"drug":{"brand_name":["ADVIL PM"],"purpose":["Purpose Pain reliever/fever reducer"],"generic_name":["IBUPROFEN"],"count":["2"]}};
  var stateparams;

  // Inject providers and initialize controller
  beforeEach( inject( function( $controller, _$location_, $rootScope,_$httpBackend_ ) {
      scope = $rootScope.$new();
      scope.currentPage = 1;
      scope.maxPerPage = 5;
      $httpBackend = _$httpBackend_;
      stateparams = { name: "ADVIL PM", typ : "brand"};
      DetailsEventsController = $controller( 'DetailsEventsController', { $scope: scope, $stateParams:stateparams, detailsData: detailsData, eventsData:{"response":{}}, recallsData:{"response":{}},referenceData:{"response":{}} });
   }));

  it( 'should return events details', inject( function() {


    // This is the mock for the back end call
    $httpBackend.expect('GET', '/api/events?limit=5&q=ADVIL+PM&skip=0&typ=brand')
        .respond('{"response":{"count":1624,"skip":0,"limit":5,"events":[{"safetyreportid":"10009511","receivedate":"2014-03-12","serious":["This was a serious event.","This event has an unknown level of seriousness."],"patient":{"reaction":"Anaemia","age":66,"gender":"Female","drugSubstance":["SERTRALINE HYDROCHLORIDE"]}},{"safetyreportid":"10012533","receivedate":"2014-03-12","serious":["This was a non-serious event."],"patient":{"reaction":"Poor quality drug administered,Thyroid function test abnormal,Blood cholesterol abnormal,Blood glucose increased,Product packaging quantity issue","age":41,"gender":"Male","drugSubstance":["METFORMIN HYDROCHLORIDE"]}},{"safetyreportid":"10014673","receivedate":"2014-03-17","serious":["This was a non-serious event."],"patient":{"reaction":"Application site discolouration,Pruritus,Erythema,Drug effect decreased,Product packaging issue","gender":"Female","drugSubstance":["SOTALOL HYDROCHLORIDE"]}},{"safetyreportid":"10021409","receivedate":"2014-03-18","serious":["This was a serious event.","This event has an unknown level of seriousness."],"patient":{"reaction":"Drug ineffective,Vision blurred,Insomnia","age":55,"gender":"Male"}},{"safetyreportid":"10021517","receivedate":"2014-03-19","serious":["This was a non-serious event."],"patient":{"reaction":"Drug ineffective,Psychomotor hyperactivity,Limb discomfort","age":67,"gender":"Female"}}]}}');


  
    // Call the controller function and see if the returned recalls are in the correct format
    scope.updateEvents().then(function() {
       expect(scope.events.response.count).toEqual(1624);
       expect(scope.events.response.events[0].safetyreportid).toEqual("10009511");
    });

    // Perform the async ajax call
    $httpBackend.flush();    
  }));
});

