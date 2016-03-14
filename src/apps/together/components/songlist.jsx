MyComponents.Song = React.createClass({
 render: function() {
   var songName = this.props.song['songName']
   var artist = this.props.song['artist']
   
   if (typeof this.props.song['album'] == "undefined"){
    var album = "None Provided"
   }
   else{
    var album = this.props.song['album']
   }

   // TODO - Iterate through upVote and downVote list and check if the user's name is in one of them
   // If it is, color that list item accordingly
   // Only do it if the user is logged in so make sure to check logged condition.

   if (typeof this.props.song['upVote'] == "undefined") {
    var upVotes = 0
   }
   else{
    var upVotesList = this.props.song['upVote']
    var upVotes = Object.keys(upVotesList).length
   }

   if (typeof this.props.song['downVote'] == "undefined") {
    var downVotes = 0
   }
   else{
    var downVotesList = this.props.song['downVote']
    var downVotes = Object.keys(downVotesList).length
   }

   var voteCount = upVotes - downVotes

   if (this.props.user) {
     return (
     	<li>
     		<div className="collapsible-header">{ songName }</div>
     		<div className="collapsible-body"><p>Artist: { artist }<br/>Album: { album }<br/>Votes: { voteCount }<br/><a href="#"><i className="small material-icons">thumb_up</i></a>  <a href="#"><i className="small material-icons">thumb_down</i></a></p></div>
      </li>
     );
   }
   else {
    return (
      <li>
        <div className="collapsible-header">{ songName }</div>
        <div className="collapsible-body"><p>Artist: { artist }<br/>Album: { album }<br/>Votes: { voteCount }</p></div>
      </li>
     );
   }
 }
});

class SongList extends React.Component {
  render(){
    var u = this.props.user
    var voteList = this.props.songList.map(function(s,i){
      var upVotes = 0
      var downVotes = 0
      if (typeof s['upVote'] != "undefined") {
        var upVotesList = s['upVote']
        var upVotes = Object.keys(upVotesList).length
      }
      if (typeof s['downVote'] != "undefined") {
        var downVotesList = s['downVote']
        var downVotes = Object.keys(downVotesList).length
      }
      return upVotes-downVotes
    })
    console.log(voteList)
  	
    var songList = this.props.songList.map(function(s,i){
      // TODO - Figure out how to order these by upvotes minus downvotes
      return <MyComponents.Song song={s} key={i} user={u}/>
    })

    return (
      <div>
        <div className="card">
          <div className="card-content">
      <div className="row">
      <div className="col s1"><i className="small material-icons">queue_music</i></div>
      <div className="col s6"><h6>Suggested Songs</h6></div>
      <div className="progress ">
        <div className="determinate"></div>
      </div>
      </div>      
            <ul className="collapsible" data-collapsible="expandable">
              { songList }
            </ul>
          </div>
        </div>      
      </div>
    )
  }
  componentDidMount(){
    $(document).ready(function(){
      $('.collapsible').collapsible({
        accordion : false
      });
    });
  }
}
MyComponents.SongList = SongList