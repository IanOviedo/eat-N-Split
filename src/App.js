
const initialFriends = [
  {
    id: 118836,
    name: "Jean Pierre" , 
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sara",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Kevin",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {



  return <div className="app">
    
    <div className="sidebar">
      <FriendsList/>    
      <FormAddFriend/>
      <Button> Add friend </Button>
    </div>

    <FormSplitBill/>
    
    
    </div>
  
}


function FriendsList() {

  const friends = initialFriends;

  return <ul>{
    friends.map((friend)=> 
      <Friend friend= {friend} key={friend.id}/>
    

    )}
    </ul>

}

function Friend ({friend}) {
  return (<li>
    <img src={friend.image} alt={friend.name}/>
    <h3>{friend.name}</h3>

    {friend.balance < 0 && <p className="red"> You Owe {friend.name} {Math.abs (friend.balance)} $</p> }
    {friend.balance > 0 && <p className="green"> {friend.name} Owes you {Math.abs (friend.balance)} $</p> }
    {friend.balance === 0 && <p> You and {friend.name} are even! </p> }
    

        <Button>Select</Button>

  </li>
  
)
  
}

function Button ({children}) {
  return (<button className="button">{children}</button>)

   
}

function FormAddFriend () {
  return (
    <form className="form-add-friend">
      <label> 👥 Friend name:</label> 
      <input type="text"/>

      <label> 📷 Add a friend picture :</label> 
      <input type="text"/>

       <Button>Add</Button>

    </form>
  )
}


function FormSplitBill(params) {
  return (

    <form className="form-split-bill"> 
    <h2>Split a Bill with: {`${"x"}`}</h2>

      <label> 💸 Bill cost </label> 
      <input type="text"/>

      <label>🙋‍♂️ Your part </label> 
      <input type="text"/>

      <label> {`${"🙋‍♂️ X's Part"}`} </label> 
      <input type="text" disabled/>

       <label> Who is paying this time ?? 👀 </label> 
       <select>
        <option value="user" >You</option>
        <option value="friend" >X</option>
       </select>
       

       <Button>Split bill</Button>
    </form>

    
    
  )

}
