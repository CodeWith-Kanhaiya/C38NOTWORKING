class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
  }

  play(){
    form.hide();

    textSize(30);
    text("Game Start", 120, 100); 
    
     //get all the details of players from data base.
     //if you don't do this, var allPlayers will be empty/undefined 
    Player.updateAllPlayersInfo();

    //allPlayers - 1,2,3,4
    if(allPlayers != undefined){

      for( var plr in allPlayers){

        if(plr === "player" + player.index)
          fill("turquoise");//highlighted player
          else 
          fill("red");
          
          text("Distance covered by" + allPlayers[plr].name + ":"+ allPlayers[plr].distance, 10,200)

      }
    } 

      if (keyIsDown(UP_ARROW ) && player.index != null){
        player.distance += 70;      
        player.update();        
      }       
  }
}