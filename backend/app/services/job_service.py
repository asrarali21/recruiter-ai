from sqlalchemy.orm import Session
from app.db.models.job_model import Job
from app.db.models.job_draft_model import JobDraft



class JobService:
    def __init__(self , db:Session):
        self.db = db

    def job_create(self , title:str , status : str = "draft")->Job:
         job = Job(
         company_id=1,
         title=title,
         status=status
        )
         self.db.add(job)
         self.db.commit()
         self.db.refresh(job)

         return job
    
    def job_draft(self ,job:Job , raw_input : dict) -> JobDraft:
        draft = JobDraft(
            job_id = job.id,
            raw_input = raw_input
        )
        self.db.add(draft)
        self.db.commit()
        return draft


