from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()


class AdminLogin(BaseModel):
    email: str
    password: str

admin_email = os.getenv("ADMIN_EMAIL")
admin_password = os.getenv("ADMIN_PASSWORD")



@router.post("/admin/login")
def admin_login(admin_login:AdminLogin):
    if admin_login.email == admin_email and admin_login.password == admin_password:
        return {
            "message": "Admin logged in successfully"
        }
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")
        

    