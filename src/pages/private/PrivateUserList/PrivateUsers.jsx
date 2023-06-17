import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getUsers } from "../../../features/user/userSlice"
import Spinner from "../../../components/shared/spinner/Spinner"
import UserItem from "../../../components/privateUser/UserItem"

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
        <table className="table-container">
          <thead>
            <tr>
              <th>Date de création</th>
              <th>Nom utilisateur</th>
              <th>Email</th>
              <th>role</th>
              <th>action</th>
              {/* Ajoutez d'autres en-têtes de colonne pour les autres informations sur l'utilisateur */}
            </tr>
          </thead>
          <tbody>
            {users.data.map((user) => (
              <UserItem key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      </section>
    </>

  );
}

export default PrivateUsers;