// Lovebug
// A somewhat buggy dating app.
// Fix it up if you can!


// our clients' names, used only for grabbing the right client from the user input
const names = [
  'ladybug',
  'caterpillar',
  'bee',
  'ant',
  'snail',
  'spider',
]

// the data we working with
// rank 1 is best
const clients = [
  '🐞', // rank: 6
  '🐛', // rank: 5
  '🐝', // rank: 4
  '🐜', // rank: 3
  '🐌', // rank: 2
  '🕷', // rank: 1
]


// the command the user wants run
const command = process.argv[2];
// the name they want it run on
const name = process.argv[3]
// the corresponding client
const client = clients[names.indexOf(name)]//removed -1


// get a random client from whatever list was passed in
const randomClient = function(clients) {
  return clients[Math.floor(Math.random() * clients.length)];//removed -1
}

const matchRandomly = function() {//removed client from function argument
  // get our client's location within our system
  const clientLocation = clients.indexOf(clients[Math.ceil(Math.random()*clients.length-1)+1]);//added clients[Math.ceil(Math.random()*clients.length-1)+1] to get random client
  // exclude our client from matches by making an array of everyone else
  // find all the clients before our client in the system
  const clientsBeforeOurClient = clients.slice(0,clientLocation);
  // find all the clients after our client in the system
  const clientsAfterOurClient = clients.slice(clientLocation)//
  // add them together
  const otherClients = clientsBeforeOurClient[clientsBeforeOurClient.length-1]+ ' and '+clientsAfterOurClient[0];//changes here, look at next line
  //before   const otherClients = clientsBeforeOurClient + clientsAfterOurClient; after is above
  // return a random client from the remaining pool
  return `The random good matches " ${otherClients}  ."  `

}
// console.log(matchRandomly());

const getRank = function(client) {
  // this is backwards or something? they're supposed to be ranked
  // from lowest to highest, and the top one (spider, obvously) should
  // be ranked #1
  let newClients = [];
  for ( let i = 0; i< clients.length;i++){//loop through to get the ranking from backward
    newClients.unshift(clients[i])
  }

  return `The rank of ${client}  is: ${newClients.indexOf(client)+1}`;
}
// console.log(getRank('ant'))

const getMatch = function(client) {
  // get the client's location in our data
  const clientLocation = clients.indexOf(client);
// console.log(clientLocation)
  // find their two nearest neighbors
  const neighbor1 = clients[clientLocation - 1];
  const neighbor2 = clients[clientLocation + 1];
  const neighbors = [neighbor1, neighbor2];
  
  // pick one of them and return it
  if ( neighbors[0] && !neighbors[1]){// to not get the undefined value when there is only one match for the first or last rank
    return `it's the only match ${neighbors[0]}`;
  } else if ( !neighbors[0] && neighbors[1]){
    return `it's the only match ${neighbors[1]}`;
  } else {

    return `Heres the choice ${neighbor1} and ${neighbor2} and the random match is ${neighbors[Math.floor(Math.random() * neighbors.length)]}`
  }
  
}



if (command === 'random' && !name) {//added !name
  // match them randomly
  console.log(matchRandomly(client));
} else if (command === 'rate' && name) {//added name
  // get back their rank in the system
  console.log(getRank(client));
} else if (command === 'match' && name) {//added name
  // get one of their neighbors in the ranking
  console.log(getMatch(client));
} else  {
  console.log('Please try one of our options:');
  console.log('random [client name] -> a totally random other user');
  console.log('match [client name] -> a match of similar ranking');
  console.log("rate [client name] -> the client's ranking in our system");
}