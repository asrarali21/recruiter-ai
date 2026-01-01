# services/candidate_job_matching_service.py
from sqlalchemy.orm import Session
from app.db.models.Candidate_processing_model.resume_analysis import ResumeAnalysis
from app.db.models.Candidate_processing_model.job_analysis import JobAnalysis
from app.db.models.Candidate_processing_model.job_candidate_match import JobCandidateMatch
from app.agents.candidate_job_matching_agent import CandidateJobMatchingAgent
import json

class CandidateJobMatchingService:
    def __init__(self , db : Session ):
        self.db = db
        self.agent = CandidateJobMatchingAgent()


    def match(self, application_id: int, job_id: int):


            resume_analysis = (
                self.db.query(ResumeAnalysis)
                .filter(ResumeAnalysis.application_id == application_id)
                .first()
            )

            if not resume_analysis:
                raise Exception("Resume analysis not found")


            job_analysis = (
                self.db.query(JobAnalysis)
                .filter(JobAnalysis.job_id == job_id)
                .first()
            )

            if not job_analysis:
                raise Exception("Job analysis not found")


            parsed = self.agent.match(
                resume_analysis.analysis_json,
                job_analysis.analysis_json
            )



            match = JobCandidateMatch(
                application_id=application_id,
                job_id=job_id,
                match_score=parsed["match_score"],
                match_summary=parsed["summary"],
                reasoning_json=json.dumps(parsed)
            )

            self.db.add(match)
            self.db.commit()
            self.db.refresh(match)

            return match


    
        