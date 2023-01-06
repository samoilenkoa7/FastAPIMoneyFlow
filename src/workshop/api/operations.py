from fastapi import APIRouter, Depends, HTTPException
from starlette import status

from workshop.models.operations import Operations, OperationKind, OperationCreate, OperationUpdate
from workshop.services.operations import OperationsService
from workshop.models.auth import User
from workshop.services.auth import get_current_user

router = APIRouter(
    prefix='/operations',
)


@router.get('/', response_model=list[Operations])
def get_operations(
        kind: OperationKind = None,
        service: OperationsService = Depends(),
        user: User = Depends(get_current_user)
):
    return service.get_list(kind=kind, user_id=user.id)


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
    operation = service.get(user_id=user.id, operation_id=pk)
    if not operation:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail='Operation with provided user id and operation id is not found')
    return operation


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
