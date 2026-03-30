{
  "name": "Feedback",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "\u05e9\u05dd \u05d4\u05de\u05e9\u05d9\u05d1"
    },
    "type": {
      "type": "string",
      "enum": [
        "reader",
        "advertiser"
      ],
      "description": "\u05e1\u05d5\u05d2 - \u05e7\u05d5\u05e8\u05d0 \u05d0\u05d5 \u05de\u05e4\u05e8\u05e1\u05dd"
    },
    "text": {
      "type": "string",
      "description": "\u05ea\u05d5\u05db\u05df \u05d4\u05e4\u05d9\u05d3\u05d1\u05e7"
    },
    "is_active": {
      "type": "boolean",
      "default": true,
      "description": "\u05d4\u05d0\u05dd \u05dc\u05d4\u05e6\u05d9\u05d2"
    }
  },
  "required": [
    "name",
    "text",
    "type"
  ]
}