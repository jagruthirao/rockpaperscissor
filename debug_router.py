
import sys
import os

sys.path.append(os.getcwd())

try:
    print("Importing app.api.router...")
    from app.api import router
    print("Router routes count:", len(router.routes))
    for route in router.routes:
        print(f"Route: {route.path} [{route.methods}]")
except Exception as e:
    print("FAILED:", e)
    import traceback
    traceback.print_exc()
