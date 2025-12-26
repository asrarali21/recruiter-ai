from fastapi import APIRouter , Depends 
from sqlalchemy.orm import Session
from pydantic import BaseModel , HttpUrl , EmailStr
from app.db.session import get_db
from app.db.models.Application_model.application_record import ApplicationRecord
from app.services.application_service import ApplicationService
from typing import Optional



router = APIRouter(prefix="/applications" , tags=["applications"])



class ApplicationData(BaseModel):
    name:str
    email:EmailStr
    resume_link:str
    github_link: Optional[str] = None 


class ApplicationResponse(BaseModel):
    id: int
    job_id: int
    name: str
    email: str
    resume_link: str
    github_link:str
    application_status: str



@router.post("/{job_id}/submit" , response_model=ApplicationResponse)
def application_record( job_id: int, application_data : ApplicationData , db:Session = Depends(get_db)):

    application_service = ApplicationService(db)

    application = application_service.create_application(
        job_id=job_id,
        name=application_data.name,
        email=application_data.email,
        resume_link=application_data.resume_link,
        github_link=application_data.github_link
    )
    return application








