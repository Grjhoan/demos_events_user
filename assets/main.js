jQuery(document).ready(function($) {
  // Initialise the Zendesk JavaScript API client
  var client = ZAFClient.init();
  client.invoke('resize', { width: '100%', height: '500px' });
  client.get('user').then(function(data){
    console.log(data);
    document.getElementById("content").innerHTML=data.user.name;
  });

  //escuchando los eventos de cambio en la data del usuario
  client.on('user.email.changed', function(){
    //una vez que escuchamos el evento retornamos el valor cambiado
    return client.get('user').then(function(data){
      document.getElementById("changeValue").innerHTML=data.user.email;
    });
  });
});