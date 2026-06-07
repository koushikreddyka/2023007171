Stage 1

Notification System Design

For this notification platform, students should be able to receive notifications related to placements, events and results. The system should also allow users to view notifications, mark them as read and receive new notifications instantly.

Main Features

* Get all notifications
* Get notification by ID
* Create notification
* Mark notification as read
* Mark all notifications as read
* Delete notification
* Real time notification delivery

Common Headers
Request Header:

{
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
}

Response Header:

{
  "Content-Type": "application/json"
}

⸻

1. Get All Notifications

Endpoint

GET /api/v1/notifications

Request

{
  "page": 1,
  "limit": 20,
  "notificationType": "Placement"
}

Response

{
  "success": true,
  "data": [
    {
      "notificationId": "N101",
      "title": "Placement Drive",
      "message": "Microsoft is hiring interns",
      "type": "Placement",
      "isRead": false,
      "createdAt": "2026-06-07T10:00:00Z"
    }
  ]
}

⸻

2. Get Notification By ID

Endpoint

GET /api/v1/notifications/{notificationId}

Response

{
  "success": true,
  "data": {
    "notificationId": "N101",
    "title": "Placement Drive",
    "message": "Microsoft is hiring interns",
    "type": "Placement",
    "isRead": false
  }
}

⸻

3. Create Notification

Endpoint

POST /api/v1/notifications

Request

{
  "title": "Placement Drive",
  "message": "Microsoft is hiring interns",
  "type": "Placement",
  "studentIds": [1001, 1002, 1003]
}

Response

{
  "success": true,
  "message": "Notification created successfully",
  "notificationId": "N101"
}

⸻

4. Mark Notification As Read

Endpoint

PATCH /api/v1/notifications/{notificationId}/read

Response

{
  "success": true,
  "message": "Notification marked as read"
}

⸻

5. Mark All Notifications As Read

Endpoint

PATCH /api/v1/notifications/read-all

Response

{
  "success": true,
  "message": "All notifications marked as read"
}

⸻

6. Delete Notification

Endpoint

DELETE /api/v1/notifications/{notificationId}

Response

{
  "success": true,
  "message": "Notification deleted successfully"
}

⸻

Notification Schema

{
  "notificationId": "string",
  "title": "string",
  "message": "string",
  "type": "Placement/Event/Result",
  "isRead": false,
  "createdAt": "timestamp"
}

⸻

Real Time Notification Mechanism

For real time notification delivery, I would use WebSockets.

Working

1. User opens the application.
2. Frontend establishes a WebSocket connection.
3. When a new notification is created, it is first stored in the database.
4. The notification is then pushed through the WebSocket server.
5. Connected users receive the notification instantly without refreshing the page.

Advantages

* Fast notification delivery
* Better user experience
* No need for continuous polling
* Can support large number of students
