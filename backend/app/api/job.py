from fastapi import APIRouter , Depends
from pydantic import BaseModel
from app.db.session import get_db
from sqlalchemy.orm import Session
from app.db.models.job_model import Job
from app.services.job_service import JobService
from typing import Optional , List




router = APIRouter(prefix="/jobs", tags=["jobs"])


class JobCreate(BaseModel):
    title : str
    experience: Optional[str] = None
    salary: Optional[str] = None
    skills: Optional[List[str]] = None
    domain: Optional[str] = None



@router.post("/create_job")
def job_create(job_data:JobCreate ,db: Session = Depends(get_db)):

    job_service = JobService(db)

    job = job_service.job_create(
        title=job_data.title
    )

    
             
    return job



@router.post("/generate_jd")
def generate_jd():
    pass
    



