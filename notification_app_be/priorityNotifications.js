const axios = require("axios");

const PRIORITY = {
    Placement: 3,
    Result: 2,
    Event: 1
};

function getScore(notification) {
    return PRIORITY[notification.Type] || 0;
}

async function main() {

    const response = await axios.get(
        "http://4.224.186.213/evaluation-service/notifications",
        {
            headers: {
                Authorization: "Bearer YOUR_TOKEN"
            }
        }
    );

    const notifications = response.data.notifications;

    notifications.sort((a, b) => {

        const priorityDiff =
            getScore(b) - getScore(a);

        if (priorityDiff !== 0)
            return priorityDiff;

        return new Date(b.Timestamp)
            - new Date(a.Timestamp);
    });

    const top10 = notifications.slice(0, 10);

    console.log(top10);
}

main();