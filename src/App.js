import React, {Component} from 'react';
import './App.css';
import axios from 'axios';


class App extends Component{
  constructor(props){
    super(props)
    this.state={
      playerName: null,
      playerTeam: null,
      playerStats: {},
      playerInfo: {}
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.getPlayerId()
    console.log(this.state.playerName)
  }

  handleChange = (event) => {
    const replace = event.target.value.split(" ").join("_");
    if(replace.length > 0){
      this.setState({playerName: replace})
    } else {
      alert("Please type player's name")
    }
  }

  getPlayerId = () =>{
    axios.get('https://www.balldontlie.io/api/v1/players?search=' + this.state.playerName)
    .then(async res => {
      console.log(res.data.data)
      if(res.data.data[0] === undefined){
        alert("This player might be injured or isn't playing.")
      } else if(res.data.data.length > 1){
        alert("Please further specify their name.")
      } else{
        await this.getPlayerStats(res.data.data[0].id)
        await this.setState({playerInfo: res.data.data[0]})
        await this.setState({playerTeam: res.data.data[0].team.full_name})
      }
    }).catch(err => {
      console.log(err)
    })
  }

  getPlayerStats = (playerId) =>{
    axios.get('https://www.balldontlie.io/api/v1/season_averages?season=2021&player_ids[]=' + playerId)
    .then(async res => {
      console.log(res.data.data)
      this.setState({playerStats: res.data.data[0]})
    }).catch(err => {
      console.log(err)
    })
  }

  // getPlayerInfo = (playerId) =>{
  //   axios.get('https://www.balldontlie.io/api/v1/players/' + playerId)
  //   .then(async res => {
  //     console.log(res.data.data)
  //     this.setState({playerInfo: res.data.data[0]})
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // }

  // allStar = () =>{
  //   const allStarsId = []
  //   let count = 1

  //   for (let i = 1; i < 450; i++){
  //     axios.get('https://www.balldontlie.io/api/v1/season_averages?season=2021&player_ids[]=' + i)
  //     .then(async res =>{
  //       if ((res.data.data["pts"] > 18)||(res.data.data["ast"] > 6)||(res.data.data["reb"]) > 10){
  //         allStarsId[count] = i
  //         count++
  //       }
  //     })
  //   }

  //   for (let i = 0; i < allStarsId.length; i++){
  //     axios.get('https://www.balldontlie.io/api/v1/players?search=' + allStarsId[i])
  //     .then(async res =>{
  //       this.setState({allStar: res.data.data[i]})
  //     }).catch(err => {
  //       console.log(err)
  //     })

  //   }

  // }

  render(){
  return (
    <div className="App">
      <div className="intro">
        <h1>Welcome to the NBA Player Tracker! Please enter a player who has currently played this season.</h1>
      </div>

      <div className="section-one">
          <div className="search">
            <form onSubmit={this.handleSubmit}>
              Player:
              <label className="player"> 
                <input 
                className="typer"
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
                placeholder= "Please enter player's name"
                />
              </label>
              
            </form>
          </div>
    </div>

    <div className="lower-row">
          <div className="info">
              First Name: {this.state.playerInfo["first_name"]}
              <br />
              Last Name: {this.state.playerInfo["last_name"]}
              <br />
              Position: {this.state.playerInfo["position"]}
              <br />
              Height: {this.state.playerInfo["height_feet"]}'{this.state.playerInfo["height_inches"]}"
              <br />
              Weight: {this.state.playerInfo["weight_pounds"]}lbs
              <br />
              Team: {this.state.playerTeam}
              <br />
          </div>

          <div className="stats">
              Games Played: {this.state.playerStats["games_played"]}
              <br />
              Minutes Per Game: {this.state.playerStats["min"]}
              <br />
              Points Per Game: {this.state.playerStats["pts"]}
              <br />
              Assists Per Game: {this.state.playerStats["ast"]}
              <br />
              Rebounds Per Game: {this.state.playerStats["reb"]}
              <br />
              Steals Per Game: {this.state.playerStats["stl"]}
              <br />
              Blocks Per Game: {this.state.playerStats["blk"]}
              <br />
            </div>
        </div>

    </div>
  )}
}

export default App;
