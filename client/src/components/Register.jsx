import { useState } from "react";

const Register = ({loading, setLoading}) => {
    const [role, setRole] = useState('pupil');

    const submitForm = async (e) => {
        e.preventDefault();

        // Fetch the form data
        const formData = new FormData(e.target);
        const formValues = {
            email: formData.get('email'),
            password: formData.get('password'),
            role: formData.get('role'),
            leaderEmail: formData.get('leaderEmail'),
            fullname: formData.get('fullname')
        };

        setLoading(true);

        try {
            const response = await fetch('http://localhost:3000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formValues)
            });

            if (!response.ok) {
                throw new Error('Failed to register user');
            }

            const data = await response.json();
            console.log('User registered successfully:', data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={submitForm}>
            <input type="email" name="email" placeholder="Email" required />
            <input type="text" name="fullname" placeholder="fullname" required />
            <input type="password" name="password" placeholder="Password" required />
            <select name="role" onChange={(e) => setRole(e.target.value)} value={role}>
                <option value="pupil">Pupil</option>
                <option value="leader">Leader</option>
            </select>

            {role === "pupil" && (
                <div>
                    <label htmlFor="leaderEmail">Leader Email:</label>
                    <input type="email" id="leaderEmail" name="leaderEmail" />
                </div>
            )}

            <button type="submit">Register</button>
            {loading && <p>Loading...</p>}
        </form>
    );
}

export default Register;
