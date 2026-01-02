from langgraph.graph import StateGraph , END
from typing import TypedDict

from app.services.ingestion.resume_ingestion_service import ResumeIngestionService
from app.services.ingestion.resume_understanding_service import ResumeUnderstandingService
from app.services.job_understanding_service import JobUndertandingService
from app.services.candidate_job_matching_service import CandidateJobMatchingService


class CandidateProcessingState(TypedDict):
    job_id : int
    application_id:int





from app.db.session import SessionLocal

def ingest_resume(state):
    db = SessionLocal()
    try:
        service = ResumeIngestionService(db)
        service.ingest_resume(state["application_id"])
        return state
    finally:
        db.close()


def understand_resume(state):
    db = SessionLocal()
    try:
        service = ResumeUnderstandingService(db)
        service.analyze_resume(state["application_id"])
        return state
    finally:
        db.close()




def understand_job(state):
    db = SessionLocal()
    try:
        service = JobUndertandingService(db)
        service.analyze_job(state["job_id"])
        return state
    finally:
        db.close()



def match_candidate(state):
    db = SessionLocal()
    try:
        service = CandidateJobMatchingService(db)
        service.match(
            application_id=state["application_id"],
            job_id=state["job_id"]
        )
        return state
    finally:
        db.close()




def build_candidate_processing_graph():
    graph = StateGraph(CandidateProcessingState)

    graph.add_node("ingest_resume", ingest_resume)
    graph.add_node("understand_resume", understand_resume)
    graph.add_node("understand_job", understand_job)
    graph.add_node("match_candidate", match_candidate)

    graph.set_entry_point("ingest_resume")

    graph.add_edge("ingest_resume", "understand_resume")
    graph.add_edge("understand_resume", "understand_job")
    graph.add_edge("understand_job", "match_candidate")
    graph.add_edge("match_candidate", END)

    return graph.compile()