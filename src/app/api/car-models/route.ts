export async function GET(req: Request) {
  try {
    const model = "Tesla"; // Default or extract from query if needed
    const API_KEY = process.env.API_NINJAS_KEY;

    if (!API_KEY) {
      throw new Error("API Key is missing. Check your .env file.");
    }

    const response = await fetch(`https://api.api-ninjas.com/v1/cars?model=${model}`, {
      headers: {
        "X-Api-Key": API_KEY as string, // Type assertion ensures TypeScript treats it as a string
      },
    });

    if (!response.ok) throw new Error("Failed to fetch car models");

    const data = await response.json();
    const models = data.map((car: any) => car.model); // Extract model names

    return Response.json({ models });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Error fetching car models" }, { status: 500 });
  }
}
