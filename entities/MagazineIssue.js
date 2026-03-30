{
  "name": "MagazineIssue",
  "type": "object",
  "properties": {
    "title": {
      "type": "string",
      "description": "\u05db\u05d5\u05ea\u05e8\u05ea \u05d4\u05d2\u05dc\u05d9\u05d5\u05df"
    },
    "issue_number": {
      "type": "number",
      "description": "\u05de\u05e1\u05e4\u05e8 \u05d4\u05d2\u05dc\u05d9\u05d5\u05df"
    },
    "parasha": {
      "type": "string",
      "description": "\u05e4\u05e8\u05e9\u05ea \u05d4\u05e9\u05d1\u05d5\u05e2"
    },
    "date": {
      "type": "string",
      "format": "date",
      "description": "\u05ea\u05d0\u05e8\u05d9\u05da \u05e4\u05e8\u05e1\u05d5\u05dd"
    },
    "cover_image_url": {
      "type": "string",
      "description": "\u05ea\u05de\u05d5\u05e0\u05ea \u05e9\u05e2\u05e8"
    },
    "drive_url": {
      "type": "string",
      "description": "\u05e7\u05d9\u05e9\u05d5\u05e8 \u05dc\u05e7\u05d5\u05d1\u05e5 \u05d1\u05d3\u05e8\u05d9\u05d9\u05d1"
    },
    "description": {
      "type": "string",
      "description": "\u05ea\u05d9\u05d0\u05d5\u05e8 \u05e7\u05e6\u05e8 \u05e9\u05dc \u05d4\u05d2\u05dc\u05d9\u05d5\u05df"
    }
  },
  "required": [
    "title",
    "issue_number"
  ]
}