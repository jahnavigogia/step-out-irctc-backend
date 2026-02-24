from rest_framework.views import APIView
from rest_framework.response import Response
from .mongo import logs_collection

class TopRoutesView(APIView):
    def get(self, request):
        pipeline = [
            {
                "$match": {
                    "params.source": {"$exists": True},
                    "params.destination": {"$exists": True}
                }
            },
            {
                "$group": {
                    "_id": {
                        "source": "$params.source",
                        "destination": "$params.destination"
                    },
                    "count": {"$sum": 1}
                }
            },
            {"$sort": {"count": -1}},
            {"$limit": 5}
        ]

        result = list(logs_collection.aggregate(pipeline))

        formatted = [
                        {
                            "source": r["_id"].get("source"),
                            "destination": r["_id"].get("destination"),
                            "count": r["count"]
                        }
                        for r in result
        ]

        return Response(formatted)