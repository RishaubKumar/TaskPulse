// using fetch (built-in in Node 18+)

async function testApi() {
    try {
        console.log("Testing Health...");
        const healthRes = await fetch('http://127.0.0.1:3000/health');
        console.log("Health Status:", healthRes.status);
        if (healthRes.ok) console.log(await healthRes.json());

        console.log("Testing API...");
        const response = await fetch('http://127.0.0.1:3000/api/suggest-todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ task: "Plan a surprise party" }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Success! Response:", JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Error testing API:", error);
    }
}

testApi();
