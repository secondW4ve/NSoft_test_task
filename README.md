# NSoft_test_task
Приклади запитів:

POST: /validateRoom
Request Body:
{
    "room": [
        {
            "x": "0",
            "y": "0"
        },
        {
            "x": "0",
            "y": "2"
        },
        {
            "x": "2",
            "y": "2"
        },
        {
            "x": "2",
            "y": "0"
        }
    ]
}

Response Body:
{
    "room": [
        {
            "x": 0,
            "y": 0
        },
        {
            "x": 0,
            "y": 2
        },
        {
            "x": 2,
            "y": 2
        },
        {
            "x": 2,
            "y": 0
        }
    ]
}

POST: /validateRoom
Request Body:
{
    "room": [
        {
            "x": "0",
            "y": "0"
        },
        {
            "x": "0",
            "y": "3"
        },
        {
            "x": "-2",
            "y": "3"
        },
        {
            "x": "-2",
            "y": "5"
        },
        {
            "x": "3",
            "y": "5"
        },
        {
            "x": "3",
            "y": "3"
        },
        {
            "x": "2",
            "y": "3"
        },
        {
            "x": "2",
            "y": "0"
        }
    ]
}

Response Body:
{
    "room": [
        {
            "x": 0,
            "y": 0
        },
        {
            "x": 0,
            "y": 3
        },
        {
            "x": -2,
            "y": 3
        },
        {
            "x": -2,
            "y": 5
        },
        {
            "x": 3,
            "y": 5
        },
        {
            "x": 3,
            "y": 3
        },
        {
            "x": 2,
            "y": 3
        },
        {
            "x": 2,
            "y": 0
        }
    ]
}

POST: /validateRoom
Request Body:
{
    "room": [
        {
            "x": "0",
            "y": "0"
        },
        {
            "x": "0",
            "y": "3"
        }
    ]
}

Response Body:
{
    "error": "There should be at least 4 pairs of coordinates in request"
}

POST: /validateRoom
Request Body:
{
    "room": [
        {
            "x": "0",
            "y": "0"
        },
        {
            "x": "0",
            "y": "3"
        },
        {
            "x": "3",
            "y": "5"
        },
        {
            "x": "3",
            "y": "0"
        }
    ]
}

Response Body:
{
    "error": "Not all walls are perpendicular"
}

POST: /validateRoom
Request Body:
{
    "room": [
        {
            "x": "0",
            "y": "0"
        },
        {
            "x": "0",
            "y": "2"
        },
        {
            "x": "3",
            "y": "2"
        },
        {
            "x": "3",
            "y": "5"
        },
        {
            "x": "1",
            "y": "5"
        },
        {
            "x": "1",
            "y": "0"
        }
    ]
}

Response Body:
{
    "error": "Some walls intersect"
}

POST: /validateRoom
Request Body:
{
    "room": [
        {
            "x": "0",
            "y": "0"
        },
        {
            "x": "0",
            "y": "3"
        },
        {
            "x": "-4",
            "y": "3"
        },
        {
            "x": "-4",
            "y": "1"
        },
        {
            "x": "-2",
            "y": "1"
        },
        {
            "x": "-2",
            "y": "0"
        }
    ]
}

Response Body:
{
    "error": "Room's area is infinite"
}
