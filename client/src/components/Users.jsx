import { useEffect, useState } from "react";

const Users = () => {
    const [pupils, setPupils] = useState([]);
    const [leaders, setLeaders] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {

        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/users');
                const data = await response.json();

                setUsers(data[0]);
                setLeaders(data[0].filter(user => user.role === 'leader'));
                setPupils(data[1]);

            } catch (err) {
                console.error(err);
                return <p>Error fetching users</p>;
            }
        }

        fetchUsers();
    })
    

    return (
        <div>
            {users.length === 0 ? 
                <p>No users found</p> 
                : 
                <div>
                    <h2>All Users</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Fullname</th>
                                <th>Email</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>{user.fullname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h2>All Leaders</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Fullname</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaders.map(leader => (
                                <tr key={leader._id}>
                                    <td>{leader.fullname}</td>
                                    <td>{leader.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h2>All Pupils</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Fullname</th>
                                <th>Email</th>
                                <th>Leader Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pupils.map(pupil => (
                                <tr key={pupil._id}>
                                    <td>{pupil.fullname}</td>
                                    <td>{pupil.email}</td>
                                    <td>{pupil.leader}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}

export default Users;