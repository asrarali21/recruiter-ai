from sqlalchemy.orm import Session
from app.agents.job_understanding_agent import JobUnderstandingAgent
from app.db.models.Job_model.job_description import Jobdescription
from app.db.models.Candidate_processing_model.resume_analysis import ResumeAnalysis
class JobUndertandingService:
    def __init__(self , db : Session):
        self.db = db
        self.agent = JobUnderstandingAgent()


    def analyze_job(self , job_id : int):


        jd = (
            self.db.query(Jobdescription).filter(
                Jobdescription.id == job_id
            ).first()
        )
        if not jd:
            raise Exception("Job description not found")
        


        analysis_json = self.agent.analyze_job(jd.description)


        analysis = ResumeAnalysis(
            job_id=job_id,
            analysis_json=analysis_json
        )


        self.db.add(analysis)
        self.db.commit()
        self.db.refresh(analysis)

        return analysis