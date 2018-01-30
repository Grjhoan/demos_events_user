// Initialise the Zendesk JavaScript API client
var client = ZAFClient.init();
//end resize modal topbar
jQuery(document).ready(function($) {
  client.invoke('resize', { width: '100%', height: '500px' });
  client.get('ticket.id').then(
    function(data) {
      var ticketID = data['ticket.id'];
          getAudiTicket(client, ticketID);
    }
  );
});

//get all tickets
function getAudiTicket(client, ticketID){
  //creamos la url
  var peticion = {
    url: '/api/v2/tickets/'+ticketID+'/audits.json',
    type: 'GET',
    dataType: 'json'
  };
  //luego solicitamos a zendesk la data
  client.request(peticion).then(function(data){
    showInfo(data);
  });

}//end getTickets

//mostrar auditoria del ticket en el HTML
function showInfo(data){
      var myObj, i, j, x, detail = "";
      myObj = data;
      //console.log(myObj);
      for (i in myObj.audits) {
          x += "<h5><b>ID Ticket:</b> " + myObj.audits[i].ticket_id + "</h5><p><b>Canal:</b> "+myObj.audits[i].via.channel+"</p>";
          for (j in myObj.audits[i].events) {
            if(myObj.audits[i].events[j].html_body == null){
              detail = "No hay detalle.";
            }else{
              detail=myObj.audits[i].events[j].html_body;
            }
            x += "<p><b>Tipo acción:</b> " + myObj.audits[i].events[j].type + "</p>" + "<p><b>Detalle:</b> " + detail + "</p>";
          }
      }

      document.getElementById("content").innerHTML = x;    
    }