import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
	createUserMutation,
	deleteUserMutation,
	updateUserMutation,
	usersQuery,
} from "../lib/tanstack/users.sample.ts";

export function UsersSample() {
	return (
		<>
			<h3>Users</h3>
			<ListSection />
			<CreateSection />
		</>
	);
}

function ListSection() {
	const users = useQuery(usersQuery);
	const deleteUser = useMutation(deleteUserMutation);
	const updateUser = useMutation(updateUserMutation);

	if (users.error) {
		return <p>Error: {users.error.message}</p>;
	}
	if (users.isLoading) {
		return <p>Loading...</p>;
	}
	return (
		<ul>
			{users.data?.map((user) => (
				<li key={user.id}>
					<span>{user.name}</span> (<span>{user.age}</span>)
					<button
						onClick={() =>
							updateUser.mutate({ id: user.id, data: { age: user.age + 1 } })
						}
						type="button"
					>
						Increment Age
					</button>
					<button
						onClick={() => deleteUser.mutate({ id: user.id })}
						type="button"
					>
						Delete
					</button>
				</li>
			))}
		</ul>
	);
}

function CreateSection() {
	const createUser = useMutation(createUserMutation);

	const [name, setName] = useState("");
	const [age, setAge] = useState(0);

	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();
				await createUser.mutateAsync({ name, age });
				setName("");
				setAge(0);
			}}
		>
			<div>
				<label>
					Name
					<input
						type="text"
						required
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</label>
			</div>
			<div>
				<label>
					Age
					<input
						type="number"
						value={age}
						onChange={(e) => setAge(Number(e.target.value))}
					/>
				</label>
			</div>
			<button type="submit" disabled={createUser.isPending}>
				Create
			</button>
		</form>
	);
}
