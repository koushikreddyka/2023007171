const axios = require("axios");

const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJra2FAZ2l0YW0uaW4iLCJleHAiOjE3ODA4MTMwODQsImlhdCI6MTc4MDgxMjE4NCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImVkZjAyOTdjLWUzNWItNGUzZC1iYjlkLTUyMDRhZTMwMTJkNiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImtvdXNoaWsgcmVkZHkga2EiLCJzdWIiOiI1ZDFhNWE5MC03MzU0LTQ3YWYtOTQ3Zi00Y2EwN2I0MmZkZTMifSwiZW1haWwiOiJra2FAZ2l0YW0uaW4iLCJuYW1lIjoia291c2hpayByZWRkeSBrYSIsInJvbGxObyI6IjIwMjMwMDcxNzEiLCJhY2Nlc3NDb2RlIjoid2dLdGdaIiwiY2xpZW50SUQiOiI1ZDFhNWE5MC03MzU0LTQ3YWYtOTQ3Zi00Y2EwN2I0MmZkZTMiLCJjbGllbnRTZWNyZXQiOiJnRXhYU0JKcGVhSnhqQUp1In0.PHqrPj-zWC667YAb77kl7yTHL3WWR09OctFhL4unefE";

async function Log(stack, level, packageName, message) {
    try {
        const response = await axios.post(
            "http://4.224.186.213/evaluation-service/logs",
            {
                stack,
                level,
                package: packageName,
                message
            },
            {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                    "Content-Type": "application/json"
                }
            }
        );
        console.log("Token length:", ACCESS_TOKEN.length);

        return response.data;
    } catch (error) {
        console.log(error.response?.data || error.message);
        throw error;
    }
}

module.exports = Log;