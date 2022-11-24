from typing import List

from fastapi import APIRouter, Depends

from src.workshop.models.operations import Operations, OperationKind, OperationCreate, OperationUpdate
from src.workshop.services.operations import OperationsService
from workshop.models.auth import User
from workshop.services.auth import get_current_user

router = APIRouter(
    prefix='/operations',
)


# @router.get('/', response_model=List[Operations])
# def get_operations(session: Session = Depends(get_session)):
#     operations = (
#         session
#         .query(tables.Operation)
#         .all()
#     )
#     return operations


@router.get('/', response_model=list[Operations])
def get_operations(
        service: OperationsService = Depends(),
        kind: OperationKind = None,
        user: User = Depends(get_current_user)
):
    return service.get_list(param=kind, user_id=user.id)


@router.get('/filter/', response_model=List[Operations])
def get_operations_by_filter(
        kind: OperationKind = None,
        service: OperationsService = Depends(),
        user: User = Depends(get_current_user)
):
    return service.get_list(param=kind, user_id=user.id)


@router.post('/', response_model=Operations)
def create_operation(
        operation_data: OperationCreate,
        service: OperationsService = Depends(),
        user: User = Depends(get_current_user)
):
    return service.create(operation_data=operation_data, user_id=user.id)


@router.get('/{pk}/')
def get_operation(
        pk: int,
        service: OperationsService = Depends(),
        user: User = Depends(get_current_user)
):
    return service.get(operation_id=pk, user_id=user.id)


@router.delete('/delete/{id}/')
def delete_operation(
        operation_id: int,
        service: OperationsService = Depends(),
        user: User = Depends(get_current_user)
):
    return service.delete(operation_id=operation_id, user_id=user.id)


@router.put('/update/{id}/', response_model=Operations)
def update_operation(
        operation_data: OperationUpdate,
        operation_id: int,
        service: OperationsService = Depends(),
        user: User = Depends(get_current_user),
):
    return service.update(operation_id=operation_id, operation_data=operation_data, user_id=user.id)
