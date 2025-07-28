export async function GET(request: Request) {
  " Get Distance and Estimated Time of Arrival ";
  const { searchParams } = new URL(request.url);

  // searchParams is destrctured from URL object
  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");
  if (!origin || !destination) {
    return new Response(JSON.stringify({ error: "Missing address params" }), {
      status: 400,
    });
  }

  const apiKey = process.env.MAPS_API_KEY;
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&units=imperial&key=${apiKey}`
  );

  const data = await res.json();
  if (data.status !== "OK") {
    return new Response(data.error_message || `Distance could not be found`);
  }

  const results = data.rows[0].elements[0];

  return new Response(
    JSON.stringify({
      distance: results.distance,
      duration: results.duration,
    }),
    { status: 200 }
  );
}
