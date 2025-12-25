from sqlalchemy.orm import Session
from app.db.models.Job_model.job_model import Job
from app.db.models.Job_model.job_draft_model import JobDraft
from app.db.models.Job_model.job_description import Jobdescription
from app.agents.jd_generator import JDGeneratorAgent

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
    
    def generate_jd(self , job_id : int) -> Jobdescription:

        job = self.db.query(Job).filter(Job.id == job_id).first()

        if not job:
            raise Exception("Job not found")
        

        if job.status != "draft":
             raise Exception("JD can only be generated for draft jobs")
        

        draft = (
            self.db.query(JobDraft)
            .filter(JobDraft.job_id == job_id).first()
        )
        if not draft:
            raise Exception("Job draft not found")
        

        agent = JDGeneratorAgent()

        ai_response = agent.generate(draft.raw_input)


        jd_text = ai_response.content


        jd = Jobdescription(
            job_id = job.id,
            description=jd_text
        )


        self.db.add(jd)

        # 5️⃣ Update job status
        job.status = "pending_approval"

        self.db.commit()
        self.db.refresh(jd)

        return jd
    
    def approve_jd(self , job_id : int , decision : str):
        job = self.db.query(Job).filter(Job.id == job_id).first()
        
        if not job:
            raise Exception("Job not found")
        
        if job.status != "pending_approval":
            raise Exception("Job not in approval state")
        


        if decision == "approve":
            job.status = "open"

        elif decision == "reject":
            job.status = "rejected"
        else:
           raise Exception("Invalid decision")
        
        self.db.commit()
        return job
        

    





