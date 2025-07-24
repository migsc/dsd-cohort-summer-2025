export async function GET(request: Request){
    " Get Longitude and Latitude for Place API Markers "
    const { searchParams } = new URL(request.url);
    console.log(searchParams)
    // searchParams is destrctured from URL object
    const workerAddress = searchParams.get('worker');
    const customerAddress = searchParams.get('customer');

    if(!workerAddress || !customerAddress){
        return new Response(JSON.stringify({error: "Missing address params"}), {status: 400});
    }

    const apiKey = process.env.MAPS_API_KEY;

    const geocode = async(address : string) => {
        const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
        );

        const data = await res.json();
        console.log(data);
        return data
    }

    const [workerCoord, customerCoord] = await Promise.all([
        geocode(workerAddress),
        geocode(customerAddress)
    ]);

}