import { useState } from "react";

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


function Button ({children, onClick}) {
  return (<button className="button" onClick={onClick}>{children}</button>)

}

export default function App() { 

  const [friends , SetAddFriends] = useState (initialFriends)

  const [showAddFriend, SetShowAddFriend] = useState(false);

  const [selectedFriend, SetSelectedFriend] = useState(null);

  function handleShowAddedFriend() {
    return  SetShowAddFriend(!showAddFriend);
  }

  function handlerAddFriend(friend) {
    SetAddFriends(friends => [...friends, friend]);
  }

function handleSelection(friend) {
  SetSelectedFriend((current) => (current?.id === friend.id ? null : friend));
  SetShowAddFriend(false);
  
}

  return <div className="app">
    
    <div className="sidebar">
      <FriendsList 
      friends = {friends}
      onSelection={handleSelection}
      selectedFriend={selectedFriend}/>    

      { showAddFriend  && < FormAddFriend onAddFriend ={handlerAddFriend} /> }
      <Button  onClick={handleShowAddedFriend} > {showAddFriend !==  false ? "Close"  : "Add friend"} </Button>
    </div>

    { selectedFriend && <FormSplitBill selectedFriend={selectedFriend} />}
    
    
    </div>
  
}


function FriendsList({friends, onSelection, selectedFriend}) {




  return <ul>{
    
    friends.map((friend)=> 
      <Friend friend= {friend} key={friend.id} onSelection={onSelection} selectedFriend={selectedFriend}/>
    

    )}
    </ul>

}

function Friend ({friend, onSelection, selectedFriend}) {

const isSelected = selectedFriend?.id === friend.id;

  return (<li className={isSelected? 'selected' : ""}>  
    <img src={friend.image} alt={friend.name}/>
    <h3>{friend.name}</h3>

    {friend.balance < 0 && <p className="red"> You Owe {friend.name} {Math.abs (friend.balance)} $</p> }
    {friend.balance > 0 && <p className="green"> {friend.name} Owes you {Math.abs (friend.balance)} $</p> }
    {friend.balance === 0 && <p> You and {friend.name} are even! </p> }
    

        <Button onClick={()=> onSelection(friend)}>{isSelected? 'close': 'select'}</Button>

  </li>
  
)
  
}




function FormAddFriend({ onAddFriend  }) {
  const [name, SetName] = useState("");
  const [image, SetImage] = useState("https://i.pravatar.cc/48");

  function handleSumbit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();

    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    onAddFriend(newFriend);

    SetName("");
    SetImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSumbit}>  
      <label> 👥 Friend name:</label> 
      <input type="text" value={name} onChange={(e)=>  SetName(e.target.value)}/>

      <label> 📷 Add a friend picture :</label> 
      <input type="text" value={image} onChange={(e)=>  SetImage(e.target.value)}/>

       <Button>Add</Button>
 
    </form>
  );
}

function FormSplitBill({selectedFriend}) {
  return (

    <form className="form-split-bill"> 
    <h2>Split a Bill with: {`${selectedFriend.name  }`}</h2>

      <label> 💸 Bill cost </label> 
      <input type="text"/>

      <label>🙋‍♂️ Your part </label> 
      <input type="text"/>

      <label> {`${selectedFriend.name}'s expense  `} </label> 
      <input type="text" disabled/>

       <label> Who is paying this time ?? 👀 </label> 
       <select>
        <option value="user">You</option>
        <option value="friend" >{`${selectedFriend.name}`}</option>
       </select>


       <Button>Split Bill</Button>
    </form>

    
    
  )

}
