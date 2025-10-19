export const users = [
  { id: "1", name: "john" },
  { id: "2", name: "john" }
];

export async function GET() {
  return Response.json(users)
}

export async function POST() {

}
