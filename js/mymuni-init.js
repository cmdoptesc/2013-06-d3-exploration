
// need to figure out where to put this global var
var routesList = {};

$(function() {

    // stops information of the routes the user has looked up for the session
  var routesInfo = {};

  $("#RouteSelector").change(function(){
    var routeTag = $("#RouteSelector").val();

      // if the route hasn't been looked up before, look it up and store it in routesInfo
    if(typeof routesInfo[routeTag] === 'undefined') {
      getNextbus({command: 'routeConfig', a:'sf-muni', r: routeTag}, function(xml) {
        routesInfo[routeTag] = parseXMLstops(xml);
        displayDirections(routesInfo[routeTag].stopsInfo, routesInfo[routeTag].directions);
      });
    } else {
      displayDirections(routesInfo[routeTag].stopsInfo, routesInfo[routeTag].directions);
    }
  });

  $("#DirectionSelector").change(function(){
    var route = routesInfo[$("#RouteSelector").val()];
    displayStops(route.stopsInfo, route.directions, $("#DirectionSelector").val());
  });

  $("#StopSelector").change(function(){
    var route = routesInfo[$("#RouteSelector").val()];
    var stopTag = $("#StopSelector").val();
    displayDestinations(route.stopsInfo, route.directions, $("#DirectionSelector").val(), stopTag);
  });

  $("#AddRouteButton").click(function(){
    var routeTag = $("#RouteSelector").val();
    var stopTag = $("#StopSelector").val();
    if(charts[0]) {
      updateChart(stopTag, routeTag, charts[0]);
    } else {
      charts.push(makeChart(stopTag, routeTag));
    }
  });

    // list pulled from: http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=sf-muni
  var routesToInsert = [
    ["F", "F-Market & Wharves"],
    ["J", "J-Church"],
    ["KT", "KT-Ingleside/Third Street"],
    ["L", "L-Taraval"],
    ["M", "M-Ocean View"],
    ["N", "N-Judah"],
    ["NX", "NX-N Express"],
    ["1", "1-California"],
    ["1AX", "1AX-California A Express"],
    ["1BX", "1BX-California B Express"],
    ["2", "2-Clement"],
    ["3", "3-Jackson"],
    ["5", "5-Fulton"],
    ["6", "6-Parnassus"],
    ["8X", "8X-Bayshore Express"],
    ["8AX", "8AX-Bayshore A Express"],
    ["8BX", "8BX-Bayshore B Express"],
    ["9", "9-San Bruno"],
    ["9L", "9L-San Bruno Limited"],
    ["10", "10-Townsend"],
    ["12", "12-Folsom/Pacific"],
    ["14", "14-Mission"],
    ["14L", "14L-Mission Limited"],
    ["14X", "14X-Mission Express"],
    ["16X", "16X-Noriega Express"],
    ["17", "17-Parkmerced"],
    ["18", "18-46th Avenue"],
    ["19", "19-Polk"],
    ["21", "21-Hayes"],
    ["22", "22-Fillmore"],
    ["23", "23-Monterey"],
    ["24", "24-Divisadero"],
    ["27", "27-Bryant"],
    ["28", "28-19th Avenue"],
    ["28L", "28L-19th Avenue Limited"],
    ["29", "29-Sunset"],
    ["30", "30-Stockton"],
    ["30X", "30X-Marina Express"],
    ["31", "31-Balboa"],
    ["31AX", "31AX-Balboa A Express"],
    ["31BX", "31BX-Balboa B Express"],
    ["33", "33-Stanyan"],
    ["35", "35-Eureka"],
    ["36", "36-Teresita"],
    ["37", "37-Corbett"],
    ["38", "38-Geary"],
    ["38AX", "38AX-Geary A Express"],
    ["38BX", "38BX-Geary B Express"],
    ["38L", "38L-Geary Limited"],
    ["39", "39-Coit"],
    ["41", "41-Union"],
    ["43", "43-Masonic"],
    ["44", "44-O'Shaughnessy"],
    ["45", "45-Union/Stockton"],
    ["47", "47-Van Ness"],
    ["48", "48-Quintara/24th Street"],
    ["49", "49-Mission/Van Ness"],
    ["52", "52-Excelsior"],
    ["54", "54-Felton"],
    ["56", "56-Rutland"],
    ["66", "66-Quintara"],
    ["67", "67-Bernal Heights"],
    ["71", "71-Haight/Noriega"],
    ["71L", "71L-Haight/Noriega Limited"],
    ["76X", "76X-Marin Headlands Express"],
    ["81X", "81X-Caltrain Express"],
    ["82X", "82X-Levi Plaza Express"],
    ["83X", "83X-Caltrain"],
    ["88", "88-Bart Shuttle"],
    ["90", "90-San Bruno Owl"],
    ["91", "91-Owl"],
    ["108", "108-Treasure Island"],
    ["K OWL", "K-Owl"],
    ["L OWL", "L-Owl"],
    ["M OWL", "M-Owl"],
    ["N OWL", "N-Owl"],
    ["T OWL", "T-Owl"],
    ["59", "Powell/Mason Cable Car"],
    ["60", "Powell/Hyde Cable Car"],
    ["61", "California Cable Car"]];

    // insert the routes into the drop down and also create a lookup hash
  _(routesToInsert).each(function(route){
    $("#RouteSelector").append('<option value="'+ route[0] +'">'+ route[1] +'</option>');
    routesList[route[0]] = route[1];
  });
});