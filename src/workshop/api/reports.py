from fastapi import APIRouter, Depends, File, UploadFile, BackgroundTasks
from fastapi.responses import StreamingResponse

from workshop.models.auth import User
from workshop.services.auth import get_current_user
from workshop.services.reports import ReportsService

router = APIRouter(
    prefix='/reports'
)


@router.post('/import')
def import_csv(
        background: BackgroundTasks,
        file: UploadFile = File(...),
        user: User = Depends(get_current_user),
        service: ReportsService = Depends(),
):
    background.add_task(
        service.import_csv,
        user_id=user.id,
        file=file.file
    )
    return {'INFO': 'File is being downloading'}

@router.get('/export')
def export_csv(
        user: User = Depends(get_current_user),
        service: ReportsService = Depends()
):
    report = service.export_csv(user_id=user.id)
    return StreamingResponse(
        report,
        media_type='text/csv',
        headers={
            "Content-Disposition": "attachment; filename=report.csv"
        }
    )
