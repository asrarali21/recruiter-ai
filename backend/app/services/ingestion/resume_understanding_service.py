from sqlalchemy.orm import Session
from app.db.models.Candidate_processing_model.resume_ingestion_record import ResumeRecord
from app.db.models.Candidate_processing_model.resume_analysis import ResumeAnalysis
from app.agents.resume_understanding_agent import ResumeUnderstandingAgent


class ResumeUnderstandingService:
    def __init__(self, db: Session):
        self.db = db
        self.agent = ResumeUnderstandingAgent()

    def analyze_resume(self, application_id: int):

        resume_record = (
            self.db.query(ResumeRecord)
            .filter(
                ResumeRecord.application_id == application_id,
                ResumeRecord.extraction_status == "success"
            )
            .first()
        )

        if not resume_record:
            raise Exception("Resume not ingested or extraction failed")

        analysis_json = self.agent.analyze(resume_record.extracted_text)

        analysis = ResumeAnalysis(
            application_id=application_id,
            analysis_json=analysis_json
        )

        self.db.add(analysis)
        self.db.commit()
        self.db.refresh(analysis)

        return analysis


