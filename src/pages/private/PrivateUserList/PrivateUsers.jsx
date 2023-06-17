import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getUsers } from "../../../features/user/userSlice"
import Spinner from "../../../components/shared/spinner/Spinner"
import UserItem from "../../../components/privateUser/UserItem"
import Ticket from "../../../components/shared/ticket/Ticket"
import { Link } from "react-router-dom"

function PrivateUsers() {
    const {users, isLoading} = useSelector((state) => state.user)

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    console.log(users);

    if(isLoading || !users.data) {
        return <Spinner />
    }

  return (
    <>
      
      <section className="headings">
        <h1>Gestion des utilisateurs</h1>
        <div className="btn-container">
          <button className="btn">Ajouter un utilisateur</button>
        </div>
      </section>
      <section className="userList">
        <h2>Liste des utilisateurs</h2>
        <div className="ticket-headings">
          <div>Nom utilisateur</div>
          <div>Email</div>
          <div>Rôle</div>
          <div>Actions</div>
        </div>
       
     
            {users.data.map((user) => (
              <Ticket>
              <div>{user.username}</div>
              <div>{user.email}</div>
              <div>{user.role}</div>
              <div>
                <Link to={`/private/details-utilisateur/${user.id}`} className="btn btn-sm"> Détail </Link>
                </div>
              </Ticket>
            ))}
        
    
      </section>
    </>

  );
}

export default PrivateUsers;