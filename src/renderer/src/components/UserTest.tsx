import { type ReactElement, useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

export default function UserTest(): ReactElement {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const fetchUsers = async (): Promise<void> => {
    console.log('Fetching users...');
    try {
      const result = (await window.electron.ipcRenderer.invoke(
        'account/user/findAll',
      )) as User[];
      console.log('Fetched users:', result);
      setUsers(result);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  useEffect(() => {
    void fetchUsers();
  }, []);

  const handleCreate = async (): Promise<void> => {
    console.log('Creating user:', { name, email });
    try {
      const result = (await window.electron.ipcRenderer.invoke(
        'account/user/create',
        {
          name,
          email,
        },
      )) as User;
      console.log('User created:', result);
      setName('');
      setEmail('');
      void fetchUsers();
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    console.log('Deleting user:', id);
    try {
      await window.electron.ipcRenderer.invoke('account/user/remove', id);
      console.log('User deleted:', id);
      void fetchUsers();
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  return (
    <div
      style={{ padding: '20px', border: '1px solid #ccc', marginTop: '20px' }}
    >
      <h3>User Test</h3>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <button onClick={() => void handleCreate()}>Create User</button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {users.map(user => (
          <li
            key={user.id}
            style={{
              marginBottom: '5px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span>ID: {user.id}</span>
            <span>Name: {user.name}</span>
            <span>Email: {user.email}</span>
            <button
              onClick={() => void handleDelete(user.id)}
              style={{ marginLeft: 'auto' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
