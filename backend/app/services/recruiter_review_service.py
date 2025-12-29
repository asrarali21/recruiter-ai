from sqlalchemy.orm import Session
from app.db.models.recruiter_review.recruiter_decision import RecruiterDecision
from app.db.models.Application_model.application_record import ApplicationRecord


class RecruiterReviewService:
    def __init__(self , db : Session):
        self.db = db

    def decide(self,application_id: int,job_id: int, decision: str,decided_by: str,notes: str | None = None ):
            if decision not in ["approved", "rejected"]:
                raise ValueError("Decision must be 'approved' or 'rejected'")
              

    
            decision_record = RecruiterDecision(
            application_id=application_id,
            job_id=job_id,
            decision=decision,
            decided_by=decided_by,
            notes=notes
            )

            self.db.add(decision_record)

            application = (
                self.db.query(ApplicationRecord)
                .filter(ApplicationRecord.id == application_id)
                .first()
            )

            if not application:
                raise Exception("Application not found")

            if decision == "approved":
                application.status = "shortlisted"
            else:
                application.status = "rejected"

            self.db.commit()
            self.db.refresh(decision_record)

            return decision_record
