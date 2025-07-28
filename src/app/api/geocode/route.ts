export async function GET(request: Request) {
  " Get Longitude and Latitude for Place API Markers ";
  const { searchParams } = new URL(request.url);
  // searchParams is destrctured from URL object
  const workerAddress = searchParams.get("worker");
  const customerAddress = searchParams.get("customer");

  if (!workerAddress || !customerAddress) {
    return new Response(JSON.stringify({ error: "Missing address params" }), {
      status: 400,
    });
  }

  const apiKey = process.env.MAPS_API_KEY;

  const geocode = async (address: string) => {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
    );

    const data = await res.json();

    if (!data.results[0]) {
      throw new Error(`No results found for address: ${address}`);
    }

    return {
      ...data.results[0].geometry.location, // {lat:... , lng:... }
      formatted_address: data.results[0].formatted_address,
    };
  };

  try {
    const [workerCoord, customerCoord] = await Promise.all([
      geocode(workerAddress),
      geocode(customerAddress),
    ]);

    return new Response(
      JSON.stringify({
        workerCoord: workerCoord,
        customerCoord: customerCoord,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Geocode failed" }), {
      status: 500,
    });
  }
}
