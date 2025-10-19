import { revalidatePath } from "next/cache";

type MockUser = {
  id: number;
  name: string;
};

export default async function Users() {
  const res = await fetch("https://67ceae8c125cd5af757b8644.mockapi.io/users");
  const users = await res.json();

  async function addUser(formData: FormData) {
    "use server";
    const name = formData.get("name");
    const res = await fetch(
      "https://67ceae8c125cd5af757b8644.mockapi.io/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      }
    );
    const newUser = await res.json();
    revalidatePath("/mock-users");
    console.log(newUser);
  }

  return (
    <div className="py-10">
      <form action={addUser} className="mb-4">
        <input
          type="text"
          name="name"
          required
          className="p-2 mr-2 border border-gray-300 rounded text-gray-700"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add User
        </button>
      </form>
      <div className="grid grid-cols-4 gap-4 ">
        {users.map((user: MockUser) => (
          <div
            key={user.id}
            className="p-4 bg-white shadow-md rounded-lg text-gray-700"
          >
            {user.name}
          </div>
        ))}
      </div>
    </div>
  );
}
