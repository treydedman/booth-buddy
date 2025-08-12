"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function TestFirebase() {
  const [users, setUsers] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const userList = querySnapshot.docs.map((doc) => doc.id);
        setUsers(userList);
      } catch (err) {
        setError("Failed to fetch users: " + (err as Error).message);
      }
    }
    fetchUsers();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Firebase Test</h1>
      {error && <p className="text-red-600">{error}</p>}
      {users ? (
        <ul className="list-disc pl-6">
          {users.length > 0 ? (
            users.map((user) => <li key={user}>{user}</li>)
          ) : (
            <li>No users found</li>
          )}
        </ul>
      ) : (
        <p>Loading users...</p>
      )}
    </main>
  );
}
