
import requests
import tempfile
import os
from sqlalchemy.orm import Session
from langchain_community.document_loaders import PyPDFLoader

from app.db.models.Application_model.application_record import ApplicationRecord
from app.db.models.Candidate_processing_model.resume_ingestion_record import ResumeRecord


class ResumeIngestionService:
    def __init__(self, db: Session):
        self.db = db

    def ingest_resume(self, application_id: int):

        # 1. GET APPLICATION FROM DB
        application = (
            self.db.query(ApplicationRecord)
            .filter(ApplicationRecord.id == application_id)
            .first()
        )

        if not application:
            raise Exception("Application not found")

        resume_link = application.resume_link

        try:
            # 2. DOWNLOAD RESUME
            response = requests.get(resume_link)
            response.raise_for_status()

            with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as f:
                f.write(response.content)
                temp_path = f.name

            # 3. EXTRACT TEXT
            loader = PyPDFLoader(temp_path)
            pages = loader.load()
            extracted_text = "\n".join(p.page_content for p in pages)

            # 4. SAVE TO DB
            record = ResumeRecord(
                application_id=application_id,
                resume_link=resume_link,
                extracted_text=extracted_text,
                extraction_status="success"
            )

            self.db.add(record)
            self.db.commit()

            return record

        except Exception as e:
            record = ResumeRecord(
                application_id=application_id,
                resume_link=resume_link,
                extraction_status="failed",
                extraction_error=str(e)
            )
            self.db.add(record)
            self.db.commit()
            return record

        finally:
            if "temp_path" in locals() and os.path.exists(temp_path):
                os.remove(temp_path)
