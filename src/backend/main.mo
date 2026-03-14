import Map "mo:core/Map";
import Blob "mo:core/Blob";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";

actor {
  let worlds = Map.empty<Text, Blob>();

  type PlayerPosition = {
    x : Float;
    y : Float;
    z : Float;
  };

  var currentPlayerPosition : ?PlayerPosition = null;

  // Store world data for a given world name
  public shared ({ caller }) func saveWorld(worldName : Text, worldData : Blob) : async () {
    worlds.add(worldName, worldData);
  };

  // Retrieve world data for a given world name
  public query ({ caller }) func loadWorld(worldName : Text) : async Blob {
    switch (worlds.get(worldName)) {
      case (null) { Runtime.trap("World does not exist") };
      case (?data) { data };
    };
  };

  // Store the player's current position
  public shared ({ caller }) func updatePlayerPosition(x : Float, y : Float, z : Float) : async () {
    currentPlayerPosition := ?{ x; y; z };
  };

  // Retrieve the player's current position
  public query ({ caller }) func getPlayerPosition() : async PlayerPosition {
    switch (currentPlayerPosition) {
      case (null) { Runtime.trap("Player position not set") };
      case (?position) { position };
    };
  };
};
