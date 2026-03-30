const API_KEY = "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";

async function testKey() {
    try {
        const response = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
                "x-api-key": API_KEY,
                "anthropic-version": "2023-06-01",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "claude-sonnet-4-6",
                max_tokens: 5,
                messages: [{ role: "user", content: "Hi" }],
            }),
        });

        console.log(`Status: ${response.status} ${response.statusText}`);
        const data = await response.json();
        console.log("Response:", JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("Error:", err);
    }
}

testKey();
