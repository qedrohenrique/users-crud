INSERT INTO logs (method, path, username, ip, body, created_at)
VALUES ('POST', '/api/login', 'admin', '192.168.1.100', '{"message": "User logged in"}', NOW());
