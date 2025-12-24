
from sqlalchemy.orm import Session
from typing import Optional
from app.db.models.Application_model.application_record import ApplicationRecord





class ApplicationSerivce:
    def __init__(self , db:Session):
        self.db = db
        

    def create_application(self ,        
    job_id: int,
    name: str,
    email: str,
    resume_link: str,
    github_link: Optional[str] = None
    )->ApplicationRecord:
            
            application = ApplicationRecord(
                job_id = job_id,
                name= name,
                email=email,
                resume_link=resume_link,
                github_link=github_link,
                application_status="submitted"
            )
            self.db.add(application)
            self.db.commit()
            self.db.refresh(application)
            
            return application
        

        


