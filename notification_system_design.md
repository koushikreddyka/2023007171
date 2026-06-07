## Stage 1

## Notification System Design

For this notification platform, students should be able to receive notifications related to placements, events and results. The system should also allow users to view notifications, mark them as read and receive new notifications instantly.

## Main Features

* Get all notifications
* Get notification by ID
* Create notification
* Mark notification as read
* Mark all notifications as read
* Delete notification
* Real time notification delivery

## Common Headers
Request Header:

{
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
}

Response Header:

{
  "Content-Type": "application/json"
}



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


4. Mark Notification As Read

Endpoint

PATCH /api/v1/notifications/{notificationId}/read

Response

{
  "success": true,
  "message": "Notification marked as read"
}


5. Mark All Notifications As Read

Endpoint

PATCH /api/v1/notifications/read-all

Response

{
  "success": true,
  "message": "All notifications marked as read"
}


6. Delete Notification

Endpoint

DELETE /api/v1/notifications/{notificationId}

Response

{
  "success": true,
  "message": "Notification deleted successfully"
}


## Notification Schema

{
  "notificationId": "string",
  "title": "string",
  "message": "string",
  "type": "Placement/Event/Result",
  "isRead": false,
  "createdAt": "timestamp"
}


## Real Time Notification Mechanism

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

# Stage 2

## Database Choice

For this notification system, I would choose PostgreSQL as database.

### Why PostgreSQL?

- Structured data fits well in relational databases.
- Supports indexing which improves query performance.
- ACID compliance ensures data consistency.
- Good support for large scale applications.
- Easy to maintain relationships between students and notifications.


## Database Schema

### Students Table

 Column       Type 

 studentId    BIGINT 
 name         VARCHAR(100) 
 email        VARCHAR(100) 
 createdAt    TIMESTAMP 

### Notifications Table

 Column          Type 
 notificationId    UUID 
 title             VARCHAR(255) 
 message           TEXT 
 notificationType  ENUM('Placement','Event','Result') 
 createdAt         TIMESTAMP 

### StudentNotifications Table

This table stores which notification belongs to which student.

 Column           Type 

 id               BIGINT 
 studentId        BIGINT 
 notificationId   UUID 
 isRead           BOOLEAN 
 readAt           TIMESTAMP 



## Problems as Data Grows

As the number of students and notifications increases, some issues may occur:

1. Query performance may become slower.
2. Notification fetch requests may take more time.
3. Database storage size will increase.
4. Large table scans can affect response times.
5. Concurrent reads and writes may increase DB load.


## Possible Solutions

### Indexing

Create indexes on:

- studentId
- notificationId
- notificationType
- createdAt
- isRead

This helps faster searching and filtering.

### Pagination

Instead of loading all notifications at once, load notifications page by page.

### Database Partitioning

Notifications can be partitioned by creation date to reduce search space.

### Caching

Frequently accessed notification data can be stored in Redis cache.

### Archiving

Old notifications can be moved to archive tables after a fixed period.

---

## SQL Queries

### Get All Notifications

sql SELECT n.notificationId,        n.title,        n.message,        n.notificationType,        sn.isRead,        n.createdAt FROM notifications n JOIN student_notifications sn ON n.notificationId = sn.notificationId WHERE sn.studentId = 1001 ORDER BY n.createdAt DESC LIMIT 20 OFFSET 0; 

### Get Notification By ID

sql SELECT * FROM notifications WHERE notificationId = 'N101'; 

### Create Notification

sql INSERT INTO notifications (notificationId,title,message,notificationType,createdAt) VALUES (uuid_generate_v4(),  'Holiday announcement',  'Tomorrow is holliday cause its sunday',  'Holiday',  NOW()); 

### Mark Notification As Read

sql UPDATE student_notifications SET isRead = true,     readAt = NOW() WHERE studentId = 1001 AND notificationId = 'N101'; 

### Mark All Notifications As Read

sql UPDATE student_notifications SET isRead = true,     readAt = NOW() WHERE studentId = 1001; 

### Delete Notification

sql DELETE FROM notifications WHERE notificationId = 'N101'; 


## Conclusion

PostgreSQL is suitable for this notification platform because it provides reliable storage, supports indexing, handles large amounts of data efficiently and maintains data consistency. By using indexing, caching, pagination and partitioning, the system can continue to perform well even when the number of notifications grows significantly.