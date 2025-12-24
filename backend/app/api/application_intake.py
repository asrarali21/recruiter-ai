from fastapi import APIRouter , Depends 
from sqlalchemy.orm import Session
from pydantic import BaseModel , HttpUrl
from app.db.session import get_db
from app.db.models.Application_model.application_record import ApplicationRecord
from app.services.application_service import ApplicationSerivce


router = APIRouter(prefix="/applications" , tags=["applications"])



class ApplicationData(BaseModel):
    job_id:int
    name:str
    email:str
    resume_link:HttpUrl
    github_link:str
    status:str


class ApplicationResponse(BaseModel):
    id: int
    job_id: int
    name: str
    email: str
    resume_link: str
    application_status: str



@router.post("/submit" , response_model=ApplicationResponse)
def application_record(application_data : ApplicationData , db:Session = Depends(get_db)):

    application_service = ApplicationSerivce(db)









