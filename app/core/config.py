import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "StyleFusion"
    API_V1_STR: str = "/api/v1"
    
    # Database
    ASTRA_DB_TOKEN: str = os.getenv("ASTRA_DB_TOKEN", "")
    ASTRA_DB_ID: str = os.getenv("ASTRA_DB_ID", "")
    
    # External APIs
    AMAZON_PA_API_KEY: str = os.getenv("AMAZON_PA_API_KEY", "")
    MYNTRA_API_KEY: str = os.getenv("MYNTRA_API_KEY", "")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")

    class Config:
        case_sensitive = True

settings = Settings()
