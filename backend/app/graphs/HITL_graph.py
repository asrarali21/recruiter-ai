from typing import TypedDict
from app.db.session import SessionLocal
from app.services.job_service import JobService
from langgraph.graph import StateGraph , END

class ApprovalState(TypedDict):
    job_id : int
    decision:str | None



def route_decision(state:ApprovalState):
    decision = state["decision"]

    if decision == "approve":
        return approve_job
    
    elif decision == "reject":
        return reject_job
    else:
        raise ValueError("Invalid decision")
    


def approve_job(state:ApprovalState):
    db = SessionLocal()

   
    try:
        service = JobService(db)
        service.approve_jd(
            job_id=state["job_id"],
            decision="approve"
        )
    finally:
        db.close()
    return state


def reject_job(state:ApprovalState):
    db = SessionLocal()
    try:
        service = JobService(db)
        service.approve_jd(
            job_id=state["job_id"],
            decision="reject"
        )
    finally:
        db.close()
    return state



def build_approval_graph():
    graph = StateGraph(ApprovalState)


    graph.add_node('approve_job' , approve_job)
    graph.add_node('reject_job' , reject_job)

    graph.add_conditional_edges(
        "routes",
        route_decision,
        {
            "approve_job":"approve_job",
            "reject_job": "reject_job"
        }
    )
    graph.set_entry_point("route")
    graph.add_edge("approve_job", END)
    graph.add_edge("reject_job", END)

    return graph.compile()








