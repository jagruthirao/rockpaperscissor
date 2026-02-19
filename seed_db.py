from sqlalchemy.orm import Session
from app.db.session import SessionLocal, engine
from app.models.product import Product
from app.db.base import Base

def init_db():
    Base.metadata.drop_all(bind=engine) # Drop to apply new schema
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # Clear existing
    db.query(Product).delete()
    
    products = [
        {
            "name": "Sabyasachi Bridal Lehenga",
            "description": "Hand-embroidered velvet lehenga in deep maroon.",
            "price": 450000.0,
            "image_url": "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=2883&auto=format&fit=crop", # Real Unsplash Image
            "category": "Bridal",
            "brand": "Sabyasachi",
            "gender": "Female",
            "occasion": "Wedding"
        },
        {
            "name": "Manish Malhotra Sequin Saree",
            "description": "Signature sequin saree in ombre blue.",
            "price": 125000.0,
            "image_url": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=2787&auto=format&fit=crop",
            "category": "Saree",
            "brand": "Manish Malhotra",
            "gender": "Female",
            "occasion": "Party"
        },
        {
            "name": "Anita Dongre Sherwani",
            "description": "Raw silk sherwani with gota element.",
            "price": 85000.0,
            "image_url": "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=2834&auto=format&fit=crop",
            "category": "Menswear",
            "brand": "Anita Dongre",
            "gender": "Male",
            "occasion": "Wedding"
        },
        {
             "name": "Tarun Tahiliani Anarkali",
             "description": "Flowy chiffon anarkali with crystal work.",
             "price": 65000.0,
             "image_url": "https://images.unsplash.com/photo-1583391733958-e0265af501a4?q=80&w=2787&auto=format&fit=crop",
             "category": "Anarkali",
             "brand": "Tarun Tahiliani",
             "gender": "Female",
             "occasion": "Wedding"
        },
        {
            "name": "Luxury Silk Scarf",
            "description": "Pure silk scarf with traditional motifs.",
            "price": 12000.0,
            "image_url": "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=2940&auto=format&fit=crop",
            "category": "Accessories",
            "brand": "FabIndia Premium",
            "gender": "Unisex",
            "occasion": "Casual"
        },
        {
            "name": "Gold Plated Kundan Set",
            "description": "Intricate kundan jewelry set for weddings.",
            "price": 45000.0,
            "image_url": "https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?q=80&w=2808&auto=format&fit=crop",
            "category": "Jewelry",
            "brand": "Tanishq",
            "gender": "Female",
            "occasion": "Wedding"
        },
        {
            "name": "Classic Black Tuxedo",
            "description": "Italian wool tuxedo with satin lapels.",
            "price": 55000.0,
            "image_url": "https://images.unsplash.com/photo-1594938298603-c8148c472958?q=80&w=2787&auto=format&fit=crop",
            "category": "Menswear",
            "brand": "Raymond Luxury",
            "gender": "Male",
            "occasion": "Party"
        }
    ]

    for p in products:
        db_product = Product(**p)
        db.add(db_product)
    
    db.commit()
    print("Database re-seeded with gender/occasion data!")
    db.close()

if __name__ == "__main__":
    init_db()
