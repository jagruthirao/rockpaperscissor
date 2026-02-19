
import sys
import os

# Add current directory to path so we can import 'app'
sys.path.append(os.getcwd())

try:
    print("Attempting to import app.api.recommendation...")
    from app.api import recommendation
    print("Success! Router is:", recommendation.router)
except Exception as e:
    print("FAILED to import:", e)
    import traceback
    traceback.print_exc()
